// Utility functions
function loadApps() {
    // Try absolute path first (works for GitHub Pages root)
    return fetch('/data/apps.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✓ Apps loaded successfully:', data.length, 'apps');
            return data;
        })
        .catch(error => {
            console.warn('Failed to load from /data/apps.json, trying relative path...', error.message);
            // Try relative path as fallback
            return fetch('./data/apps.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('✓ Apps loaded successfully (relative path):', data.length, 'apps');
                    return data;
                })
                .catch(err => {
                    console.error('✗ Failed to load apps.json from both paths');
                    console.error('Make sure:');
                    console.error('1. The file exists at: data/apps.json');
                    console.error('2. You are serving the site via HTTP (not file://)');
                    console.error('3. For local testing, use: python3 -m http.server 8000');
                    return [];
                });
        });
}

function getAppsByCategory(category) {
    return loadApps().then(apps => {
        return apps.filter(app => app.category === category);
    });
}

function getAppById(id) {
    return loadApps().then(apps => {
        return apps.find(app => app.id === id);
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// Smooth scroll
function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

