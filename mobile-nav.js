/**
 * Mobile Navigation JavaScript
 * Handles sidebar menu toggle functionality for mobile devices
 */
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavSidebar = document.getElementById('mobile-nav-sidebar');
    const body = document.body;

    // Open mobile menu
    function openMobileMenu() {
        mobileNavOverlay.classList.add('active');
        mobileNavSidebar.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent background scrolling
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileNavOverlay.classList.remove('active');
        mobileNavSidebar.classList.remove('active');
        body.style.overflow = 'auto'; // Restore scrolling
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    // Event listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on navigation links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavSidebar.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize - close menu on desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNavSidebar.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});
