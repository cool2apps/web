// Theme management
(function() {
    const themeKey = 'theme-preference';
    
    function getThemePreference() {
        const saved = localStorage.getItem(themeKey);
        if (saved) return saved;
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    function setTheme(theme) {
        const root = document.documentElement;
        
        if (theme === 'auto') {
            const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.setAttribute('data-theme', systemTheme);
            localStorage.setItem(themeKey, 'auto');
            
            // Listen for system theme changes
            if (window.matchMedia) {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                mediaQuery.addEventListener('change', (e) => {
                    root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                });
            }
        } else {
            root.setAttribute('data-theme', theme);
            localStorage.setItem(themeKey, theme);
        }
    }
    
    function initTheme() {
        const theme = getThemePreference();
        setTheme(theme);
        
        // Update theme selector if it exists
        const themeSelector = document.getElementById('theme-selector');
        if (themeSelector) {
            themeSelector.value = theme === 'light' || theme === 'dark' ? theme : 'auto';
        }
    }
    
    // Initialize theme on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
    
    // Export theme functions globally
    window.setTheme = setTheme;
    window.getThemePreference = getThemePreference;
})();

