// Time For Money - Content Script
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

  // Extract price from text
  function extractPrice(text) {
    // Remove currency symbols and commas, extract number
    const cleaned = text.replace(/[^\d.,]/g, '');
    const price = parseFloat(cleaned.replace(/,/g, ''));
    return isNaN(price) ? null : price;
  }

  // Convert prices on the page
  function convertPrices() {
    if (!hourlyWage || hourlyWage <= 0) return;

    // Amazon price selectors (multiple possible locations)
    const priceSelectors = [
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      '#priceblock_saleprice',
      '.a-price-whole',
      '.a-price .a-offscreen',
      '[data-a-color="price"] .a-offscreen',
      '#price',
      '.a-price-range .a-offscreen',
      '.a-price-symbol + .a-price-whole',
      'span.a-price[data-a-color="base"] span.a-offscreen',
      'span.a-price[data-a-color="price"] span.a-offscreen'
    ];

    priceSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Skip if already converted
        if (element.dataset.timeForMoneyConverted === 'true') {
          return;
        }

        const text = element.textContent || element.innerText || '';
        const price = extractPrice(text);

        if (price && price > 0) {
          const hours = priceToHours(price);
          if (hours) {
            // Store original price
            element.dataset.timeForMoneyOriginal = text;
            element.dataset.timeForMoneyPrice = price;
            element.dataset.timeForMoneyConverted = 'true';

            // Replace with hours
            const hoursText = `${hours} hours`;
            
            // Handle different element types
            if (element.classList.contains('a-offscreen')) {
              // For screen reader text, update it
              element.textContent = hoursText;
            } else {
              // For visible price elements
              element.textContent = hoursText;
              element.style.color = '#B12704'; // Amazon's price color
            }

            // Also update parent containers if needed
            const parent = element.closest('.a-price');
            if (parent) {
              const wholePart = parent.querySelector('.a-price-whole');
              const fractionPart = parent.querySelector('.a-price-fraction');
              if (wholePart) {
                wholePart.textContent = hours.split('.')[0];
                if (fractionPart) {
                  fractionPart.textContent = hours.split('.')[1] || '00';
                }
              }
            }
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
              const hoursText = `${hours} hours`;
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

