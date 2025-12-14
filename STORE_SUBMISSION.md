# Chrome Web Store Submission Guide for LifePrice

This guide will help you submit LifePrice to the Chrome Web Store.

## Pre-Submission Checklist

### ✅ Required Files

- [x] `manifest.json` - Updated with all required fields
- [x] `content.js` - Content script
- [x] `popup.html` - Extension popup
- [x] `popup.js` - Popup functionality
- [ ] **Icons** - Need to create (see below)

### 🎨 Icons Required

You need to create three icon sizes and place them in an `icons/` folder:

1. **icon16.png** - 16x16 pixels (toolbar icon)
2. **icon48.png** - 48x48 pixels (extension management)
3. **icon128.png** - 128x128 pixels (Chrome Web Store)

**Icon Design Tips:**
- Use sage green (#9CAF88) as primary color
- Keep design simple and recognizable at small sizes
- Consider a clock/hourglass/time symbol
- Ensure icons are readable at all sizes
- PNG format with transparency (optional but recommended)

**Tools for Creating Icons:**
- Figma, Sketch, or Adobe Illustrator
- Online tools like Canva or Favicon.io
- Export at required sizes

### 📦 Package Structure

Your extension folder should contain:
```
LifePrice/
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── content.js
├── manifest.json
├── popup.html
└── popup.js
```

**Do NOT include:**
- `.git/` folder
- `.gitignore`
- `README.md` (optional)
- `PRIVACY.md` (keep for reference, but privacy policy should be hosted online)
- `STORE_SUBMISSION.md` (this file)

## Step-by-Step Submission Process

### Step 1: Create Icons
1. Design icons in sage green (#9CAF88)
2. Export at 16x16, 48x48, and 128x128 pixels
3. Save as PNG files in `icons/` folder
4. Verify icons display correctly

### Step 2: Create ZIP Package
1. Create a ZIP file with all extension files (except excluded files above)
2. Test the ZIP by loading it as an unpacked extension
3. Verify everything works correctly

### Step 3: Prepare Store Listing

#### Basic Information
- **Name**: LifePrice
- **Category**: Productivity or Shopping
- **Language**: English (United States)

#### Detailed Description (Short - 132 characters)
```
Convert Amazon prices to hours of work. Make informed purchases by seeing the real time cost of products.
```

#### Full Description (use this)
```
LifePrice helps you make more mindful purchasing decisions by converting Amazon product prices into hours of work based on your hourly wage.

✨ KEY FEATURES:
• Automatic price detection on Amazon product pages
• Converts prices to hours/days of work
• Beautiful, modern interface with sage green design
• Quick preset buttons for common wages
• Live conversion examples
• Secure local storage - your data stays private

🎯 HOW IT WORKS:
1. Set your hourly wage in the extension popup
2. Visit any Amazon product page
3. See prices converted to time (e.g., "21.2 hours ($529.99)")
4. Make more informed purchasing decisions

🔒 PRIVACY FIRST:
• No data collection or tracking
• Your wage stored locally only
• No external servers or analytics
• Only runs on Amazon.com pages

Perfect for anyone who wants to think about purchases in terms of time worked rather than just dollars spent.
```

#### Screenshots (Required)
You'll need at least 1, recommended 3-5 screenshots showing:
1. Extension popup with wage settings
2. Amazon product page with converted prices
3. Example showing hours/days conversion
4. Preset buttons and examples

**Screenshot Requirements:**
- PNG or JPEG format
- Minimum 1280x800 pixels (recommended 1280x800 or 640x400)
- Show actual extension functionality
- No placeholder text

#### Promotional Images (Optional but Recommended)
- Small promotional tile (440x280)
- Large promotional tile (920x680)
- Marquee promotional tile (1400x560)

### Step 4: Privacy Policy

You'll need a publicly accessible privacy policy URL. Options:

1. **Host on GitHub Pages** (free)
   - Create a `docs/` folder in your repo
   - Copy `PRIVACY.md` to `docs/privacy.html` (convert to HTML)
   - Enable GitHub Pages
   - Use URL: `https://yourusername.github.io/lifeprice/privacy.html`

2. **Host on your own website**
   - Upload privacy policy HTML
   - Use your domain URL

3. **Use a privacy policy generator**
   - Services like PrivacyPolicyGenerator.com
   - Customize with LifePrice-specific details

**Privacy Policy must state:**
- What data is collected (hourly wage only)
- How data is used (local calculations only)
- Data storage (Chrome sync storage)
- That no data is transmitted externally
- User rights (view, modify, delete data)

### Step 5: Submit to Chrome Web Store

1. **Create Developer Account**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Pay one-time $5 registration fee (if not already registered)

2. **Upload Extension**
   - Click "New Item"
   - Upload your ZIP file
   - Fill in all required fields

3. **Fill Store Listing**
   - Use descriptions above
   - Upload screenshots
   - Add promotional images
   - Select category
   - Add privacy policy URL

4. **Distribution**
   - Choose: "Public" (available to everyone)
   - Or: "Unlisted" (only accessible via direct link)

5. **Submit for Review**
   - Review all information
   - Submit for review
   - Typically reviewed within 1-3 business days

### Step 6: Post-Submission

1. **Respond to Review Feedback** (if any)
   - Chrome team may ask questions
   - Respond promptly with clarifications

2. **Monitor Listing**
   - Check for user reviews
   - Monitor for issues
   - Update as needed

## Common Rejection Reasons

Avoid these issues:
- ❌ Missing or incorrect icons
- ❌ Missing privacy policy URL
- ❌ Insufficient description
- ❌ No screenshots or poor quality screenshots
- ❌ Permissions not properly justified
- ❌ Code errors or security issues

## Version Updates

When updating the extension:
1. Increment version in `manifest.json` (e.g., 1.0.0 → 1.0.1)
2. Create new ZIP package
3. Upload new version in Developer Dashboard
4. Describe changes in "What's New" section

## Resources

- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [Chrome Web Store Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)

## Support

For issues or questions:
- Check Chrome Web Store policies
- Review Chrome extension documentation
- Test extension thoroughly before submission

---

Good luck with your submission! 🚀
