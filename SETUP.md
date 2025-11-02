# Setup Guide

## Quick Start Checklist

### 1. Generate App Pages
Run one of the following to create individual app detail pages:

```bash
# Option 1: Shell script (requires jq)
bash generate-app-pages.sh

# Option 2: Node.js script
node generate-pages.js

# Option 3: Manual
# Copy app-template.html to app/[app-id].html for each app in data/apps.json
```

### 2. Add Required Images

Place these files in `/assets/images/`:

- **favicon.ico** - Site favicon (32x32 or 16x16)
- **app-store-badge.svg** - App Store download badge
  - Download from: https://developer.apple.com/app-store/marketing/guidelines/
- **google-play-badge.svg** - Google Play download badge  
  - Download from: https://play.google.com/intl/en_us/badges/
- **placeholder.png** - Default image (512x512px) shown when app icons are missing

For each app, add:
- **`[app-id]-icon.png`** - App icon (512x512px recommended)
- **`[app-id]-1.jpg`**, **`[app-id]-2.jpg`**, etc. - Screenshots

### 3. Configure Contact Form

1. Sign up for a free account at:
   - [Formspree](https://formspree.io) (recommended), or
   - [Getform](https://getform.io), or
   - [Netlify Forms](https://www.netlify.com/products/forms/) (if hosting on Netlify)

2. Create a new form and get your form endpoint URL

3. Open `contact.html` and find line ~170

4. Replace `YOUR_FORM_ID` with your actual form endpoint:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_ACTUAL_FORM_ID', {
   ```

### 4. Customize Content

1. **Update app data**: Edit `/data/apps.json` to add/modify your apps
2. **Update About page**: Edit `/about.html` with your company information
3. **Update footer**: Edit the footer section in each HTML file if needed
4. **Update meta tags**: Edit SEO meta tags in each HTML file's `<head>` section

### 5. Test Locally

You can test the site locally using Python's HTTP server:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Or use any local server
```

Then visit: http://localhost:8000

### 6. Deploy to GitHub Pages

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. Go to your repository on GitHub

3. Navigate to **Settings** > **Pages**

4. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`

5. Click **Save**

6. Your site will be live at: `https://YOUR_USERNAME.github.io`

### 7. Custom Domain Setup

1. The `CNAME` file is already configured with `web.cooolapps.com`

2. Configure DNS:
   - **Option A (CNAME)**: Add a CNAME record:
     - Name: `web` (or `@` for root domain)
     - Value: `cool2apps.github.io`
   
   - **Option B (A records)**: Add A records pointing to GitHub IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

3. Wait for DNS propagation (can take up to 48 hours)

4. GitHub will automatically detect and configure your custom domain

## Notes

- All pages load app data dynamically from `/data/apps.json`
- Theme preference is saved in browser localStorage
- The site is fully static - no server-side code required
- All pages work offline once loaded (except form submission)

## Troubleshooting

**App pages not loading?**
- Make sure you've generated the app detail pages (step 1)
- Check that `data/apps.json` is valid JSON
- Check browser console for JavaScript errors

**Contact form not working?**
- Verify your Formspree/Getform endpoint is correct
- Check browser console for errors
- Ensure you're not hitting rate limits on free tier

**Images not showing?**
- Verify image paths in `apps.json` match actual file locations
- Check that images exist in `/assets/images/`
- Use browser DevTools to check for 404 errors

**Theme not working?**
- Clear browser localStorage and reload
- Check that `theme.js` is loaded correctly
- Verify Tailwind CSS is loading from CDN

## Next Steps

1. ✅ Generate app pages
2. ✅ Add images and assets
3. ✅ Configure contact form
4. ✅ Customize content
5. ✅ Test locally
6. ✅ Deploy to GitHub Pages
7. ✅ Set up custom domain (optional)

Your site is ready! 🚀

