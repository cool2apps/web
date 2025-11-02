// Load and display app details
async function loadAppDetail() {
    // Extract app ID from URL path
    // URL format: /app/[app-id].html
    const pathParts = window.location.pathname.split('/');
    let appId = pathParts[pathParts.length - 1];
    
    // Remove .html extension if present
    if (appId.endsWith('.html')) {
        appId = appId.replace('.html', '');
    }
    
    // If path is /app/[id]/ or similar, get the ID part
    if (pathParts.length > 2 && pathParts[pathParts.length - 2] === 'app') {
        appId = pathParts[pathParts.length - 1];
        if (appId.endsWith('.html')) {
            appId = appId.replace('.html', '');
        }
    }
    
    const app = await getAppById(appId);
    
    if (!app) {
        document.getElementById('app-content').innerHTML = `
            <div class="text-center py-16">
                <h1 class="text-3xl font-bold mb-4">App Not Found</h1>
                <p class="text-gray-600 dark:text-gray-400 mb-8">The app you're looking for doesn't exist.</p>
                <a href="/apps.html" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    Back to Apps
                </a>
            </div>
        `;
        return;
    }
    
    // Update page title and meta
    document.title = `${app.name} - Cool Apps`;
    
    // Populate app details
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-animate">
            <div>
                <img src="${app.icon || '/assets/images/placeholder.png'}" 
                     alt="${app.name}" 
                     class="w-full rounded-lg shadow-lg mb-6"
                     onerror="this.src='/assets/images/placeholder.png'">
                
                ${app.screenshots && app.screenshots.length > 0 ? `
                    <div class="grid grid-cols-3 gap-4">
                        ${app.screenshots.map(screenshot => `
                            <img src="${screenshot}" 
                                 alt="${app.name} screenshot" 
                                 class="w-full rounded-lg shadow-md cursor-pointer hover:opacity-80 transition"
                                 onclick="window.open('${screenshot}', '_blank')"
                                 onerror="this.style.display='none'">
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
                            <img src="/assets/images/app-store-badge.svg" alt="Download on App Store" class="h-12" onerror="this.parentElement.innerHTML='Download on App Store';">
                        </a>
                    ` : ''}
                    ${app.googlePlayUrl ? `
                        <a href="${app.googlePlayUrl}" target="_blank" rel="noopener noreferrer" class="store-button">
                            <img src="/assets/images/google-play-badge.svg" alt="Get it on Google Play" class="h-12" onerror="this.parentElement.innerHTML='Get it on Google Play';">
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
    `;
    
    // Update breadcrumb if exists
    const breadcrumb = document.getElementById('breadcrumb-app-name');
    if (breadcrumb) {
        breadcrumb.textContent = app.name;
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAppDetail);
} else {
    loadAppDetail();
}

