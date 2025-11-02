// Node.js script to generate static HTML pages for each app
// Run with: node generate-pages.js

const fs = require('fs');
const path = require('path');

// Read apps data
const appsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'apps.json'), 'utf8'));

// App detail page template
function generateAppDetailPage(app) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${app.description.substring(0, 160)}">
    <meta property="og:title" content="${app.name} - Cool Apps">
    <meta property="og:description" content="${app.shortDescription}">
    <title>${app.name} - Cool Apps</title>
    <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Navigation -->
    <nav class="navbar sticky top-0 z-50 shadow-md" id="navbar">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="/" class="text-2xl font-bold text-blue-600 dark:text-blue-400">Cool Apps</a>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</a>
                    <a href="/apps.html" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Apps</a>
                    <a href="/games.html" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Games</a>
                    <a href="/about.html" class="hover:text-blue-600 dark:hover:text-blue-400 transition">About</a>
                    <a href="/contact.html" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a>
                    <select id="theme-selector" class="theme-selector" onchange="window.setTheme(this.value)">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>
                <button id="mobile-menu-btn" class="md:hidden text-gray-700 dark:text-gray-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div id="mobile-menu" class="hidden md:hidden mt-4 space-y-2">
                <a href="/" class="block py-2 hover:text-blue-600 dark:hover:text-blue-400">Home</a>
                <a href="/apps.html" class="block py-2 hover:text-blue-600 dark:hover:text-blue-400">Apps</a>
                <a href="/games.html" class="block py-2 hover:text-blue-600 dark:hover:text-blue-400">Games</a>
                <a href="/about.html" class="block py-2 hover:text-blue-600 dark:hover:text-blue-400">About</a>
                <a href="/contact.html" class="block py-2 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
                <select id="theme-selector-mobile" class="theme-selector mt-2" onchange="window.setTheme(this.value)">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                </select>
            </div>
        </div>
    </nav>

    <!-- Breadcrumb -->
    <section class="bg-gray-100 dark:bg-gray-800 py-4">
        <div class="container mx-auto px-4">
            <nav class="text-sm">
                <a href="/" class="text-blue-600 dark:text-blue-400 hover:underline">Home</a>
                <span class="mx-2">/</span>
                <a href="/${app.category === 'game' ? 'games' : 'apps'}.html" class="text-blue-600 dark:text-blue-400 hover:underline">${app.category === 'game' ? 'Games' : 'Apps'}</a>
                <span class="mx-2">/</span>
                <span class="text-gray-600 dark:text-gray-400">${app.name}</span>
            </nav>
        </div>
    </section>

    <!-- App Details -->
    <section class="py-16 container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-animate">
            <div>
                <img src="${app.icon || '/assets/images/placeholder.png'}" 
                     alt="${app.name}" 
                     class="w-full rounded-lg shadow-lg mb-6">
                
                ${app.screenshots && app.screenshots.length > 0 ? `
                    <div class="grid grid-cols-3 gap-4">
                        ${app.screenshots.map(screenshot => `
                            <img src="${screenshot}" 
                                 alt="${app.name} screenshot" 
                                 class="w-full rounded-lg shadow-md cursor-pointer hover:opacity-80 transition"
                                 onclick="window.open('${screenshot}', '_blank')">
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            
            <div>
                <h1 class="text-4xl font-bold mb-4">${app.name}</h1>
                <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">${app.description}</p>
                
                <div class="mb-6">
                    <h2 class="text-2xl font-bold mb-4">Features</h2>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        ${app.features && app.features.length > 0 
                            ? app.features.map(feature => `<li>${feature}</li>`).join('')
                            : '<li>Coming soon</li>'
                        }
                    </ul>
                </div>
                
                <div class="mb-6 flex flex-wrap gap-4">
                    ${app.appStoreUrl ? `
                        <a href="${app.appStoreUrl}" target="_blank" rel="noopener noreferrer" class="store-button">
                            <img src="/assets/images/app-store-badge.svg" alt="Download on App Store" class="h-12">
                        </a>
                    ` : ''}
                    ${app.googlePlayUrl ? `
                        <a href="${app.googlePlayUrl}" target="_blank" rel="noopener noreferrer" class="store-button">
                            <img src="/assets/images/google-play-badge.svg" alt="Get it on Google Play" class="h-12">
                        </a>
                    ` : ''}
                </div>
                
                <div class="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                    <h3 class="text-xl font-bold mb-4">Legal</h3>
                    <div class="flex flex-col space-y-2">
                        <a href="/app/${app.id}/privacy.html" class="text-blue-600 dark:text-blue-400 hover:underline">
                            Privacy Policy
                        </a>
                        <a href="/app/${app.id}/terms.html" class="text-blue-600 dark:text-blue-400 hover:underline">
                            Terms & Conditions
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 dark:bg-gray-900 text-gray-300 py-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-white font-bold text-lg mb-4">Cool Apps</h3>
                    <p class="text-sm">Innovative mobile apps and games for iOS and Android.</p>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-4">Navigation</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/" class="hover:text-white transition">Home</a></li>
                        <li><a href="/apps.html" class="hover:text-white transition">Apps</a></li>
                        <li><a href="/games.html" class="hover:text-white transition">Games</a></li>
                        <li><a href="/about.html" class="hover:text-white transition">About</a></li>
                        <li><a href="/contact.html" class="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-4">Legal</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/privacy.html" class="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="/terms.html" class="hover:text-white transition">Terms & Conditions</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-4">Connect</h4>
                    <p class="text-sm">© 2024 Cool Apps. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="/assets/js/theme.js"></script>
    <script src="/assets/js/utils.js"></script>
    <script>
        document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        window.addEventListener('DOMContentLoaded', () => {
            const theme = window.getThemePreference();
            const selectors = document.querySelectorAll('#theme-selector, #theme-selector-mobile');
            selectors.forEach(sel => {
                if (sel) sel.value = theme === 'light' || theme === 'dark' ? theme : 'auto';
            });
        });

        tailwind.config = {
            darkMode: ['class', '[data-theme="dark"]'],
        }
    </script>
</body>
</html>`;
}

// Privacy page template
function generatePrivacyPage(app) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${app.name} Privacy Policy">
    <title>${app.name} - Privacy Policy - Cool Apps</title>
    <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    ${require('fs').readFileSync(path.join(__dirname, 'app', 'privacy-template.html'), 'utf8').replace('<div id="privacy-content"', '<div id="privacy-content" data-app-id="${app.id}"').replace('Loading privacy policy...', '')}
</body>
</html>`;
}

// Terms page template
function generateTermsPage(app) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${app.name} Terms & Conditions">
    <title>${app.name} - Terms & Conditions - Cool Apps</title>
    <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    ${require('fs').readFileSync(path.join(__dirname, 'app', 'terms-template.html'), 'utf8').replace('<div id="terms-content"', '<div id="terms-content" data-app-id="${app.id}"').replace('Loading terms and conditions...', '')}
</body>
</html>`;
}

// Create app directory
const appDir = path.join(__dirname, 'app');
if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
}

// Generate pages for each app
appsData.forEach(app => {
    // Create app detail page
    const appDetailPath = path.join(appDir, `${app.id}.html`);
    fs.writeFileSync(appDetailPath, generateAppDetailPage(app));
    console.log(`Generated: ${appDetailPath}`);
    
    // Create app subdirectory for privacy/terms
    const appSubDir = path.join(appDir, app.id);
    if (!fs.existsSync(appSubDir)) {
        fs.mkdirSync(appSubDir, { recursive: true });
    }
    
    // Create privacy page
    const privacyPath = path.join(appSubDir, 'privacy.html');
    fs.writeFileSync(privacyPath, generatePrivacyPage(app));
    console.log(`Generated: ${privacyPath}`);
    
    // Create terms page
    const termsPath = path.join(appSubDir, 'terms.html');
    fs.writeFileSync(termsPath, generateTermsPage(app));
    console.log(`Generated: ${termsPath}`);
});

console.log('\nAll pages generated successfully!');

