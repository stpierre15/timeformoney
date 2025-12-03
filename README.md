# Time For Money - Chrome Extension

A Chrome Extension (Manifest V3) that converts Amazon product prices into hours of work based on your hourly wage.

## Features

- 🛒 Automatically detects product prices on Amazon
- ⏰ Converts prices to hours of work using your saved hourly wage
- 💾 Saves wage in `chrome.storage.sync` for persistence
- 🔄 Uses MutationObserver to handle dynamic page updates
- 🎨 Clean popup interface for setting your hourly wage

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked"
4. Select this folder
5. The extension is now installed!

## Usage

1. Click the extension icon in Chrome's toolbar
2. Enter your hourly wage (e.g., `25.00`)
3. Click "Save Wage"
4. Visit any Amazon product page
5. Prices will automatically convert to hours of work

## Files

- `manifest.json` - Extension manifest (Manifest V3)
- `content.js` - Content script that detects and converts prices
- `popup.html` - Popup UI for setting hourly wage
- `popup.js` - Popup logic and storage handling

## Development

This extension uses:
- Manifest V3
- Chrome Storage API (`chrome.storage.sync`)
- Content Scripts
- MutationObserver API

## License

MIT

