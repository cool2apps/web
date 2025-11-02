# Images Directory

Place your app assets here:

## Required Images

1. **App Store Badge**: `app-store-badge.svg`
   - Download from: https://developer.apple.com/app-store/marketing/guidelines/
   - Or create a simple badge with text "Download on the App Store"

2. **Google Play Badge**: `google-play-badge.svg`
   - Download from: https://play.google.com/intl/en_us/badges/
   - Or create a simple badge with text "Get it on Google Play"

3. **Favicon**: `favicon.ico`
   - Create a 32x32 or 16x16 icon file
   - Online generators: https://favicon.io/ or https://realfavicongenerator.net/

4. **Placeholder Image**: `placeholder.png`
   - A default image to show when app icons/screenshots are missing
   - Recommended: 512x512px with a simple design

## App-Specific Images

For each app in `data/apps.json`, add:

- **App Icon**: `[app-id]-icon.png` (e.g., `zx-spectrum-gamer-icon.png`)
  - Recommended size: 512x512px
  
- **Screenshots**: `[app-id]-[number].jpg` (e.g., `zx-spectrum-gamer-1.jpg`)
  - Recommended size: 1080x1920px (portrait) or 1920x1080px (landscape)
  - Use 3-5 screenshots per app

## Image Formats

- Icons: PNG format (transparent background recommended)
- Screenshots: JPG or PNG format
- Badges: SVG or PNG format

## Example Structure

```
assets/images/
├── favicon.ico
├── app-store-badge.svg
├── google-play-badge.svg
├── placeholder.png
├── zx-spectrum-gamer-icon.png
├── zx-spectrum-gamer-1.jpg
├── zx-spectrum-gamer-2.jpg
├── zx-spectrum-gamer-3.jpg
├── treasure-island-icon.png
├── treasure-island-1.jpg
├── treasure-island-2.jpg
└── treasure-island-3.jpg
```

