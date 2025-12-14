# LifePrice - Chrome Extension

**LifePrice** is a Chrome Extension that helps you make more informed purchasing decisions by converting Amazon product prices into hours of work based on your hourly wage. See the real time cost of products and spend more mindfully.

## ✨ Features

- 🛒 **Automatic Price Detection** - Automatically detects product prices on Amazon product pages
- ⏰ **Time Conversion** - Converts prices to hours/days of work using your saved hourly wage
- 💾 **Persistent Storage** - Saves your wage securely in Chrome's sync storage
- 🔄 **Dynamic Updates** - Uses MutationObserver to handle dynamic page updates
- 🎨 **Beautiful UI** - Clean, modern interface with Inter font and sage green design
- 📊 **Live Examples** - See example conversions as you set your wage
- ⚡ **Quick Presets** - One-click preset buttons for common hourly wages

## 🚀 Installation

### From Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) and search for "LifePrice"
2. Click "Add to Chrome"
3. The extension is now installed!

### Manual Installation (Developer Mode)
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked"
4. Select this folder
5. The extension is now installed!

## 📖 Usage

1. Click the LifePrice extension icon in Chrome's toolbar
2. Enter your hourly wage (e.g., `25.00`) or use a preset button
3. Click "Save Wage"
4. Visit any Amazon product page
5. Prices will automatically convert to show hours/days of work
   - Example: "$529.99" becomes "**21.2 hours ($529.99)**"
   - For larger amounts: "2 days 3.5 hours ($500.00)"

## 🔒 Privacy

LifePrice is committed to your privacy:
- **No data collection** - Your hourly wage is stored locally in Chrome's sync storage
- **No tracking** - We don't track your browsing or purchases
- **No external servers** - All processing happens locally in your browser
- **Amazon only** - Only runs on Amazon.com pages

## 📁 Files

- `manifest.json` - Extension manifest (Manifest V3)
- `content.js` - Content script that detects and converts prices on Amazon pages
- `popup.html` - Popup UI for setting hourly wage
- `popup.js` - Popup logic and storage handling
- `icons/` - Extension icons (16x16, 48x48, 128x128)

## 🛠️ Development

This extension uses:
- **Manifest V3** - Latest Chrome extension API
- **Chrome Storage API** - `chrome.storage.sync` for data persistence
- **Content Scripts** - Injected into Amazon pages
- **MutationObserver API** - Handles dynamic page updates
- **Google Fonts** - Inter font family

### Building for Store Submission

1. Ensure all icons are in `icons/` folder:
   - `icon16.png` (16x16 pixels)
   - `icon48.png` (48x48 pixels)
   - `icon128.png` (128x128 pixels)

2. Create a ZIP file with all files except:
   - `.git/`
   - `.gitignore`
   - `README.md` (optional, not needed by Chrome Store)

3. Submit to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

## 📝 Chrome Web Store Requirements

### Required Icons
Before submission, create icons in the `icons/` folder:
- **icon16.png** - 16x16 pixels (toolbar icon)
- **icon48.png** - 48x48 pixels (extension management page)
- **icon128.png** - 128x128 pixels (Chrome Web Store)

### Privacy Policy
You'll need to provide a privacy policy URL. A sample privacy policy should state:
- LifePrice only stores your hourly wage locally
- No personal data is collected or transmitted
- The extension only runs on Amazon.com pages
- No third-party services are used

### Store Listing
You'll need:
- **Detailed description** (up to 132 characters for short, unlimited for detailed)
- **Screenshots** (at least 1, up to 5)
- **Promotional images** (optional but recommended)
- **Category**: Productivity or Shopping

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this code for your own projects.

## 💡 Tips

- Set your wage once and it syncs across all your Chrome devices
- Use preset buttons for quick setup
- The extension shows both hours and original price for easy comparison
- Works on all Amazon product pages automatically

---

Made with ❤️ to help you make more mindful purchasing decisions.

