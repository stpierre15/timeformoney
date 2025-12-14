# LifePrice Privacy Policy

**Last Updated:** [Date]

## Introduction

LifePrice ("we", "our", or "the extension") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use the LifePrice Chrome extension.

## Information We Collect

LifePrice collects **minimal information** necessary for functionality:

### Stored Data
- **Hourly Wage**: The only data stored is your hourly wage, which you voluntarily enter in the extension popup.
- **Storage Location**: Your hourly wage is stored locally in Chrome's sync storage (`chrome.storage.sync`), which syncs across your Chrome devices.

### What We DON'T Collect
- We do **NOT** collect any personal information
- We do **NOT** track your browsing history
- We do **NOT** track your Amazon purchases or product views
- We do **NOT** collect any analytics data
- We do **NOT** use cookies or tracking pixels
- We do **NOT** transmit any data to external servers

## How We Use Information

Your hourly wage is used **solely** to calculate and display time-to-price conversions on Amazon product pages. This calculation happens entirely on your device—no data leaves your browser.

## Data Storage and Sync

Your hourly wage is stored using Chrome's `chrome.storage.sync` API, which:
- Stores data locally on your device
- Optionally syncs across your Chrome devices (if you have Chrome Sync enabled)
- Is encrypted in transit by Chrome
- Can be cleared at any time through Chrome's extension settings

## Third-Party Services

LifePrice does **NOT** use any third-party services, analytics tools, or external APIs except:
- **Google Fonts**: Used only to load the Inter font family in the extension popup (no data collection)
- **Chrome APIs**: Standard Chrome extension APIs for storage and content scripts

## Permissions Explanation

LifePrice requires the following permissions:

### Storage Permission
- **Purpose**: To save your hourly wage preference
- **Data**: Only your hourly wage value
- **Scope**: Local Chrome storage only

### Host Permissions (Amazon.com)
- **Purpose**: To run content scripts on Amazon product pages to convert prices
- **Scope**: Only active on `amazon.com` domains
- **Data Access**: Only reads price information already visible on the page
- **No Transmission**: Price data is never sent anywhere—only converted for display

## Your Rights

You have full control over your data:
- **View**: Check your stored wage in the extension popup
- **Modify**: Change your wage at any time
- **Delete**: Clear extension data through Chrome's extension settings
- **Uninstall**: Remove the extension at any time, which deletes all stored data

## Data Security

- All data storage uses Chrome's built-in secure storage APIs
- No data is transmitted over the network
- No external servers are involved
- All processing happens locally in your browser

## Children's Privacy

LifePrice does not knowingly collect information from children under 13. If you are under 13, please do not use this extension.

## Changes to This Policy

We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.

## Contact

If you have questions about this Privacy Policy, please contact us through the Chrome Web Store listing or via GitHub (if applicable).

## Compliance

LifePrice complies with:
- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)
- Chrome Web Store Developer Program Policies

---

**Summary**: LifePrice stores only your hourly wage locally. No personal data is collected, tracked, or transmitted. All processing happens on your device.
