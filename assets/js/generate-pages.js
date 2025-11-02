// Script to generate app detail pages
// This can be run in Node.js or browser console to generate static pages

async function generateAppPages() {
    const apps = await fetch('/data/apps.json').then(r => r.json());
    
    apps.forEach(app => {
        // Generate app detail page
        generateAppDetailPage(app);
        // Generate privacy page
        generatePrivacyPage(app);
        // Generate terms page
        generateTermsPage(app);
    });
}

function generateAppDetailPage(app) {
    // This would generate the HTML file
    // In a static setup, we use JavaScript to load dynamically
    console.log(`Would generate /app/${app.id}.html`);
}

function generatePrivacyPage(app) {
    console.log(`Would generate /app/${app.id}/privacy.html`);
}

function generateTermsPage(app) {
    console.log(`Would generate /app/${app.id}/terms.html`);
}

