// LifePrice - Popup Script
(function() {
  'use strict';

  const hourlyWageInput = document.getElementById('hourlyWage');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');
  const currentWageDisplay = document.getElementById('currentWageDisplay');
  const currentWageValue = document.getElementById('currentWageValue');
  const examplesDiv = document.getElementById('examples');
  const examplesList = document.getElementById('examplesList');
  const presetButtons = document.querySelectorAll('.preset-btn');

  // Load current wage from storage
  chrome.storage.sync.get(['hourlyWage'], (result) => {
    if (result.hourlyWage) {
      hourlyWageInput.value = result.hourlyWage;
      updateCurrentWageDisplay(result.hourlyWage);
      updateExamples(result.hourlyWage);
    }
  });

  // Preset button handlers
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const wage = parseFloat(btn.dataset.wage);
      hourlyWageInput.value = wage;
      saveWage(wage);
    });
  });

  // Save wage
  saveBtn.addEventListener('click', () => {
    const wage = parseFloat(hourlyWageInput.value);
    
    if (isNaN(wage) || wage <= 0) {
      showStatus('Please enter a valid hourly wage greater than 0.', 'error');
      return;
    }

    saveWage(wage);
  });

  function saveWage(wage) {
    chrome.storage.sync.set({ hourlyWage: wage }, () => {
      if (chrome.runtime.lastError) {
        showStatus('Error saving wage: ' + chrome.runtime.lastError.message, 'error');
      } else {
        showStatus(`✓ Wage saved: $${wage.toFixed(2)}/hour`, 'success');
        updateCurrentWageDisplay(wage);
        updateExamples(wage);
        
        // Notify content script to update
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0] && tabs[0].url && tabs[0].url.includes('amazon.com')) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'updateWage', wage: wage });
          }
        });
      }
    });
  }

  function updateCurrentWageDisplay(wage) {
    if (wage > 0) {
      currentWageValue.textContent = `$${wage.toFixed(2)}/hr`;
      currentWageDisplay.style.display = 'block';
    } else {
      currentWageDisplay.style.display = 'none';
    }
  }

  function updateExamples(wage) {
    if (!wage || wage <= 0) {
      examplesDiv.style.display = 'none';
      return;
    }

    const examplePrices = [10, 25, 50, 100, 250, 500];
    examplesList.innerHTML = '';

    examplePrices.forEach(price => {
      const hours = (price / wage).toFixed(2);
      const days = Math.floor(hours / 8);
      const remainingHours = (hours % 8).toFixed(1);
      
      const item = document.createElement('div');
      item.className = 'example-item';
      
      const priceSpan = document.createElement('span');
      priceSpan.className = 'example-price';
      priceSpan.textContent = `$${price}`;
      
      const hoursSpan = document.createElement('span');
      hoursSpan.className = 'example-hours';
      if (hours >= 8) {
        hoursSpan.textContent = `${days}d ${remainingHours}h`;
      } else {
        hoursSpan.textContent = `${hours}h`;
      }
      
      item.appendChild(priceSpan);
      item.appendChild(hoursSpan);
      examplesList.appendChild(item);
    });

    examplesDiv.style.display = 'block';
  }

  // Update examples as user types
  hourlyWageInput.addEventListener('input', () => {
    const wage = parseFloat(hourlyWageInput.value);
    if (!isNaN(wage) && wage > 0) {
      updateExamples(wage);
    } else {
      examplesDiv.style.display = 'none';
    }
  });

  // Allow Enter key to save
  hourlyWageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveBtn.click();
    }
  });

  // Show status message
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      statusDiv.className = 'status';
    }, 3000);
  }
})();

