// Theme toggle wiring. Initial theme is set synchronously by an inline
// script in each page's <head> to avoid a flash of the wrong theme.
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('dark-toggle');
    const html = document.documentElement;

    const syncToggle = () => {
        if (!toggle) return;
        const isLight = html.getAttribute('data-theme') === 'light';
        toggle.textContent = isLight ? '🌙' : '☀️';
        toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    };

    syncToggle();
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        html.setAttribute('data-theme', next);
        syncToggle();
    });
});

// Mobile nav hamburger
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.nav-mobile-btn');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        links.classList.toggle('active');
    });
});
