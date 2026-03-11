/**
 * Mobile Navigation JavaScript for Door Supervisor Exam Practice
 * Handles sidebar menu toggle functionality for mobile devices
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all the mobile navigation elements - using correct IDs
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavSidebar = document.getElementById('mobileNavSidebar');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const body = document.body;

    // Check if all required elements exist (safety check)
    if (!mobileMenuBtn || !mobileNavSidebar || !mobileNavOverlay || !mobileCloseBtn) {
        console.warn('Mobile navigation elements not found - mobile nav will not work');
        console.warn('Expected elements: mobileMenuBtn, mobileNavSidebar, mobileNavOverlay, mobileCloseBtn');
        return;
    }

    // Function to open the mobile menu
    function openMobileMenu() {
        mobileNavSidebar.classList.add('active');
        mobileNavOverlay.classList.add('active');
        body.classList.add('mobile-nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }

    // Function to close the mobile menu
    function closeMobileMenu() {
        mobileNavSidebar.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        body.classList.remove('mobile-nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    // Event listener for the mobile menu button (hamburger)
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openMobileMenu();
    });

    // Event listener for the close button (X)
    mobileCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
    });

    // Event listener for clicking the overlay (dark background)
    mobileNavOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
    });

    // Close the menu when clicking on any navigation link
    const mobileNavLinks = mobileNavSidebar.querySelectorAll('a');
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close menu when pressing the Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavSidebar.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Prevent clicks inside the sidebar from closing the menu
    mobileNavSidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Initialize aria attributes
    mobileMenuBtn.setAttribute('aria-expanded', 'false');

    console.log('Mobile navigation initialized successfully');
});
