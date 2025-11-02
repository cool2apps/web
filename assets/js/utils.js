// Utility functions
function loadApps() {
    return fetch('/data/apps.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Error loading apps:', error);
            return [];
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

