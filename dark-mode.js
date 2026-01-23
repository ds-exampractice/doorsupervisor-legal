document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('dark-toggle');
    const html = document.documentElement;

    if (!toggle) return; // exit if button is missing

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        toggle.textContent = '☀️'; // show sun icon in dark mode
    } else {
        html.removeAttribute('data-theme');
        toggle.textContent = '🌙'; // show moon icon in light mode
    }

    // Toggle dark mode on click
    toggle.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'dark') {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggle.textContent = '🌙'; // moon icon
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggle.textContent = '☀️'; // sun icon
        }
    });
});
