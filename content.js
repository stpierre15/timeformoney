// LifePrice - Content Script
(function() {
  'use strict';

  let hourlyWage = 0;
  let observer = null;

  // Load hourly wage from storage
  chrome.storage.sync.get(['hourlyWage'], (result) => {
    hourlyWage = result.hourlyWage || 0;
    if (hourlyWage > 0) {
      convertPrices();
      startObserver();
    }
  });

  // Listen for wage updates from popup
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.hourlyWage) {
      hourlyWage = changes.hourlyWage.newValue || 0;
      if (hourlyWage > 0) {
        convertPrices();
      } else {
        restorePrices();
      }
    }
  });

  // Convert price to hours of work
  function priceToHours(price) {
    if (!hourlyWage || hourlyWage <= 0) return null;
    const hours = price / hourlyWage;
    return hours.toFixed(2);
  }

  // Format hours text with days/hours breakdown for better readability
  function formatHoursText(hours) {
    const hoursNum = parseFloat(hours);
    const days = Math.floor(hoursNum / 8);
    const remainingHours = (hoursNum % 8).toFixed(1);
    
    if (days > 0) {
      if (remainingHours > 0) {
        return `${days} day${days > 1 ? 's' : ''} ${remainingHours} hour${remainingHours !== '1.0' ? 's' : ''}`;
      } else {
        return `${days} day${days > 1 ? 's' : ''}`;
      }
    }
    return `${hours} hour${hoursNum !== 1 ? 's' : ''}`;
  }

  // Extract price from text
  function extractPrice(text) {
    // Remove currency symbols and commas, extract number
    const cleaned = text.replace(/[^\d.,]/g, '');
    const price = parseFloat(cleaned.replace(/,/g, ''));
    return isNaN(price) ? null : price;
  }

  // Extract full price from Amazon's structured price format
  function extractPriceFromStructured(element) {
    const parent = element.closest('.a-price');
    if (parent) {
      // First, check if there's an .a-offscreen element with the full price
      const offscreenElement = parent.querySelector('.a-offscreen');
      if (offscreenElement) {
        const offscreenText = offscreenElement.textContent.trim();
        const offscreenPrice = extractPrice(offscreenText);
        if (offscreenPrice && offscreenPrice > 0) {
          return offscreenPrice;
        }
      }
      
      // Otherwise, combine whole and fraction parts
      const wholePart = parent.querySelector('.a-price-whole');
      const fractionPart = parent.querySelector('.a-price-fraction');
      
      if (wholePart) {
        const wholeText = wholePart.textContent.trim().replace(/,/g, '');
        const whole = parseFloat(wholeText);
        
        if (!isNaN(whole)) {
          if (fractionPart) {
            const fractionText = fractionPart.textContent.trim();
            const fraction = parseFloat(fractionText);
            if (!isNaN(fraction)) {
              // Combine whole and fraction: 529 + 0.99 = 529.99
              return whole + (fraction / 100);
            }
          }
          return whole;
        }
      }
    }
    
    // Fallback to regular extraction
    const text = element.textContent || element.innerText || '';
    return extractPrice(text);
  }

  // Convert prices on the page
  function convertPrices() {
    if (!hourlyWage || hourlyWage <= 0) return;

    // First, find all .a-price containers (main method for modern Amazon pages)
    const priceContainers = document.querySelectorAll('.a-price');
    priceContainers.forEach(container => {
      // Skip if already converted
      if (container.dataset.timeForMoneyConverted === 'true') {
        return;
      }

      // Try to extract price from this container
      const priceElement = container.querySelector('.a-price-whole') || 
                          container.querySelector('.a-offscreen') ||
                          container;
      const price = extractPriceFromStructured(priceElement);

      if (price && price > 0) {
        const hours = priceToHours(price);
        if (hours) {
          // Store original
          container.dataset.timeForMoneyOriginal = container.textContent;
          container.dataset.timeForMoneyPrice = price;
          container.dataset.timeForMoneyConverted = 'true';
          
          // Hide the individual price parts
          const symbolPart = container.querySelector('.a-price-symbol');
          const wholePart = container.querySelector('.a-price-whole');
          const fractionPart = container.querySelector('.a-price-fraction');
          
          if (symbolPart) symbolPart.style.display = 'none';
          if (wholePart) wholePart.style.display = 'none';
          if (fractionPart) fractionPart.style.display = 'none';
          
          // Create or update display with full format
          let hoursContainer = container.querySelector('.time-for-money-display');
          if (!hoursContainer) {
            hoursContainer = document.createElement('span');
            hoursContainer.className = 'time-for-money-display';
            hoursContainer.style.display = 'inline-block';
            hoursContainer.style.fontSize = 'inherit';
            hoursContainer.style.lineHeight = 'inherit';
            container.appendChild(hoursContainer);
          }
          
          const formattedPrice = `$${price.toFixed(2)}`;
          const formattedHours = formatHoursText(hours);
          
          // Create HTML with styled parts
          hoursContainer.innerHTML = `
            <strong style="color: #B12704; font-weight: 600;">${formattedHours}</strong>
            <span style="color: #767676; font-size: 0.9em; margin-left: 4px;">(${formattedPrice})</span>
          `;
          
          // Store text version for offscreen elements
          const hoursText = `${formattedHours} (${formattedPrice})`;
          
          // Also update any .a-offscreen elements
          const offscreenElements = container.querySelectorAll('.a-offscreen');
          offscreenElements.forEach(offscreen => {
            offscreen.textContent = hoursText;
          });
        }
      }
    });

    // Also handle legacy price selectors (for older Amazon pages or special cases)
    const legacySelectors = [
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      '#priceblock_saleprice',
      '#price'
    ];

    legacySelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Skip if already converted or if it's part of a .a-price container we already handled
        if (element.dataset.timeForMoneyConverted === 'true' || 
            element.closest('.a-price')?.dataset.timeForMoneyConverted === 'true') {
          return;
        }

        const text = element.textContent || element.innerText || '';
        const price = extractPrice(text);

        if (price && price > 0) {
          const hours = priceToHours(price);
          if (hours) {
            element.dataset.timeForMoneyOriginal = text;
            element.dataset.timeForMoneyPrice = price;
            element.dataset.timeForMoneyConverted = 'true';

            const formattedPrice = `$${price.toFixed(2)}`;
            const formattedHours = formatHoursText(hours);
            const hoursText = `${formattedHours} (${formattedPrice})`;
            
            element.innerHTML = `
              <strong style="color: #B12704; font-weight: 600;">${formattedHours}</strong>
              <span style="color: #767676; font-size: 0.9em; margin-left: 4px;">(${formattedPrice})</span>
            `;
          }
        }
      });
    });

    // Also handle price in various text formats
    const priceTextPatterns = [
      /\$\d+\.\d{2}/g,
      /\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g
    ];

    // Find and convert standalone price mentions (be more careful here)
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while (node = walker.nextNode()) {
      if (node.parentElement && 
          node.parentElement.dataset.timeForMoneyConverted !== 'true' &&
          !node.parentElement.closest('[data-time-for-money-converted="true"]')) {
        
        const text = node.textContent;
        const priceMatch = text.match(/\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
        
        if (priceMatch && priceMatch[1]) {
          const price = parseFloat(priceMatch[1].replace(/,/g, ''));
          if (price > 0 && price < 100000) { // Reasonable price range
            const hours = priceToHours(price);
            if (hours) {
              const formattedPrice = `$${price.toFixed(2)}`;
              const formattedHours = formatHoursText(hours);
              const hoursText = `${formattedHours} (${formattedPrice})`;
              node.textContent = text.replace(priceMatch[0], hoursText);
              node.parentElement.dataset.timeForMoneyConverted = 'true';
            }
          }
        }
      }
    }
  }

  // Restore original prices (if wage is cleared)
  function restorePrices() {
    const convertedElements = document.querySelectorAll('[data-time-for-money-converted="true"]');
    convertedElements.forEach(element => {
      const original = element.dataset.timeForMoneyOriginal;
      if (original) {
        element.textContent = original;
        element.removeAttribute('data-time-for-money-converted');
        element.removeAttribute('data-time-for-money-original');
        element.removeAttribute('data-time-for-money-price');
      }
    });
  }

  // Start MutationObserver to handle dynamic updates
  function startObserver() {
    if (observer) {
      observer.disconnect();
    }

    observer = new MutationObserver((mutations) => {
      let shouldConvert = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Check if new price elements were added
              const hasPrice = node.querySelector && (
                node.querySelector('#priceblock_ourprice') ||
                node.querySelector('#priceblock_dealprice') ||
                node.querySelector('.a-price-whole') ||
                node.matches && node.matches('.a-price-whole')
              );
              
              if (hasPrice) {
                shouldConvert = true;
              }
            }
          });
        }
      });

      if (shouldConvert) {
        // Debounce conversions
        setTimeout(() => {
          convertPrices();
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Initial conversion when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (hourlyWage > 0) {
        setTimeout(convertPrices, 500);
        startObserver();
      }
    });
  } else {
    if (hourlyWage > 0) {
      setTimeout(convertPrices, 500);
      startObserver();
    }
  }
})();

