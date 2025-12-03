// Time For Money - Popup Script
(function() {
  'use strict';

  const hourlyWageInput = document.getElementById('hourlyWage');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');

  // Load current wage from storage
  chrome.storage.sync.get(['hourlyWage'], (result) => {
    if (result.hourlyWage) {
      hourlyWageInput.value = result.hourlyWage;
    }
  });

  // Save wage
  saveBtn.addEventListener('click', () => {
    const wage = parseFloat(hourlyWageInput.value);
    
    if (isNaN(wage) || wage <= 0) {
      showStatus('Please enter a valid hourly wage greater than 0.', 'error');
      return;
    }

    chrome.storage.sync.set({ hourlyWage: wage }, () => {
      if (chrome.runtime.lastError) {
        showStatus('Error saving wage: ' + chrome.runtime.lastError.message, 'error');
      } else {
        showStatus(`Hourly wage saved: $${wage.toFixed(2)}/hour`, 'success');
        
        // Notify content script to update
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0] && tabs[0].url && tabs[0].url.includes('amazon.com')) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'updateWage', wage: wage });
          }
        });
      }
    });
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

