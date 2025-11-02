# Cool Apps Website

A static website showcasing mobile apps and games, built for GitHub Pages deployment.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 🌓 Light/Dark/Auto theme support
- 📱 Mobile-first responsive layout
- 🎮 Separate sections for Apps and Games
- 📄 Individual pages for each app with Privacy Policy and Terms & Conditions
- 📧 Contact form (configured for Formspree)
- 🚀 Fully static, no build process required

## Project Structure

```
/
├── index.html          # Home page
├── apps.html          # Apps listing page
├── games.html         # Games listing page
├── about.html         # About/Vision page
├── contact.html       # Contact page with form
├── privacy.html       # General privacy policy
├── terms.html         # General terms & conditions
├── CNAME              # Custom domain configuration
├── data/
│   └── apps.json     # App data (easy to add/remove apps)
├── assets/
│   ├── css/
│   │   └── style.css # Custom styles
│   ├── js/
│   │   ├── theme.js  # Theme management
│   │   ├── utils.js  # Utility functions
│   │   └── app-detail.js # App detail page loader
│   └── images/       # Images, icons, badges
└── app/              # Individual app pages (auto-generated)
    ├── [app-id].html
    └── [app-id]/
        ├── privacy.html
        └── terms.html
```

## Setup

1. Clone the repository
2. Update `/data/apps.json` with your app information
3. Add app icons and screenshots to `/assets/images/`
4. Configure the contact form:
   - Sign up for [Formspree](https://formspree.io) or [Getform](https://getform.io)
   - Replace `YOUR_FORM_ID` in `contact.html` (line ~170) with your actual form endpoint
5. Generate app detail pages:
   - **Option 1 (Recommended)**: Use the shell script:
     ```bash
     bash generate-app-pages.sh
     ```
   - **Option 2**: Use Node.js script:
     ```bash
     node generate-pages.js
     ```
   - **Option 3**: Manually copy `app-template.html` to `app/[app-id].html` for each app
6. **Images are optional!** (See `IMAGES-NOT-REQUIRED.md`)
   - The site works perfectly without any images
   - Missing app icons automatically generate beautiful SVG placeholders
   - Store badges fall back to text if images are missing
   - You can add these later for a polished look:
     - `favicon.ico` - Site favicon
     - `app-store-badge.svg` - App Store download badge (optional)
     - `google-play-badge.svg` - Google Play download badge (optional)
     - App icons and screenshots (optional - placeholders will show if missing)

## Adding/Removing Apps

Simply edit `/data/apps.json` to add, remove, or modify apps. The structure is:

```json
{
  "id": "app-id",
  "name": "App Name",
  "category": "app" or "game",
  "description": "Full description",
  "shortDescription": "Short description for cards",
  "appStoreUrl": "https://...",
  "googlePlayUrl": "https://...",
  "screenshots": ["/path/to/screenshot1.jpg", ...],
  "features": ["Feature 1", "Feature 2", ...],
  "icon": "/path/to/icon.png"
}
```

## Deployment to GitHub Pages

1. Push to your GitHub repository
2. Go to Settings > Pages
3. Select the branch (usually `main`) and folder (`/ (root)`)
4. The site will be available at `https://yourusername.github.io`
5. For custom domain, add your domain to the CNAME file and configure DNS

## Custom Domain Setup

1. Add your domain to the `CNAME` file
2. Configure DNS:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Or add A records pointing to GitHub's IP addresses
3. Wait for DNS propagation (can take up to 48 hours)

## Theme Support

The website supports three theme modes:
- **Light**: Always light mode
- **Dark**: Always dark mode
- **Auto**: Follows system preference (default)

Theme preference is saved in localStorage.

## Contact Form

The contact form is configured to use Formspree. To set it up:

1. Sign up at https://formspree.io
2. Create a new form
3. Get your form endpoint URL
4. Update the fetch URL in `contact.html` (line ~XXX)

Alternatively, you can use:
- **Getform**: Similar setup process
- **Netlify Forms**: If hosting on Netlify
- **EmailJS**: For direct email sending

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2024 Cool Apps. All rights reserved.

