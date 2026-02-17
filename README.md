# Universal Ad Blocker - Firefox Extension

A comprehensive ad blocker that removes ads from Google, LinkedIn, YouTube, Reddit, Twitter/X, and many other websites.

## Features

- Blocks Google Ads (AdSense, DoubleClick)
- Removes LinkedIn sponsored content
- Removes Reddit promoted posts
- Blocks Twitter/X ads
- Removes various overlay and banner ads
- Blocks video ads (IMA SDK, Fluid Player, Innovid)
- Removes Disqus Polls ads
- Network-level blocking of ad scripts

## Installation

### Method 1: Temporary Installation (For Testing)

1. Open Firefox
2. Type `about:debugging` in the address bar
3. Click "This Firefox" on the left sidebar
4. Click "Load Temporary Add-on"
5. Navigate to the extension folder and select the `manifest.json` file
6. The extension will be active until you close Firefox

### Method 2: Permanent Installation (Recommended)

#### Option A: Install as unsigned extension (requires Firefox Developer Edition or Nightly)

1. Open Firefox Developer Edition or Nightly
2. Type `about:config` in the address bar
3. Search for `xpinstall.signatures.required`
4. Set it to `false`
5. Package the extension:
   - Zip all files: `manifest.json`, `content.js`, `background.js`, `icon48.png`, `icon96.png`
   - Rename the `.zip` file to `.xpi`
6. Drag and drop the `.xpi` file into Firefox

#### Option B: Sign and publish (for regular Firefox)

1. Create an account at [addons.mozilla.org](https://addons.mozilla.org)
2. Go to Developer Hub
3. Submit your extension for review
4. Once approved, you can install it from the Mozilla Add-ons store

I've published it from my account, you can either search it in oficial Firefox extensions store or use this direct link: https://addons.mozilla.org/en-US/firefox/addon/universal-ad-blocker-ap/

### Creating the XPI Package

To package the extension for distribution:

```bash
cd /path/to/extension
zip -r universal-adblocker.xpi manifest.json content.js background.js icon48.png icon96.png
```

## Files Included

- `manifest.json` - Extension configuration
- `content.js` - Main ad blocking logic (runs on web pages)
- `background.js` - Network-level ad blocking
- `icon48.png` - Extension icon (48x48)
- `icon96.png` - Extension icon (96x96)
- `README.md` - This file

## How It Works

The extension uses multiple strategies to block ads:

1. **CSS Hiding**: Hides ad elements using CSS rules
2. **DOM Removal**: Actively removes ad elements from web pages
3. **Script Blocking**: Prevents ad scripts from loading
4. **Network Blocking**: Blocks ad requests at the network level
5. **Mutation Observer**: Watches for dynamically loaded ads

## Permissions Required

- `<all_urls>` - To block ads on all websites
- `webRequest` - To intercept network requests
- `webRequestBlocking` - To block ad requests

## Troubleshooting

If ads are still appearing:

1. Check the browser console (F12) for any errors
2. Make sure the extension is enabled in `about:addons`
3. Try refreshing the page
4. Clear your browser cache

## Privacy

This extension:
- Does NOT collect any user data
- Does NOT track your browsing
- Works completely locally in your browser
- Does NOT send any information to external servers

## License

This extension is provided as-is for personal use.
Any support appreciated.
Crypto ETH wallet: 0xA07170D3306917eae333F0763BaB61ACbbE3150F

## Support

If you encounter any issues or have suggestions contact me on telegram: @AndriiPovkh, or please check the browser console for error messages.
