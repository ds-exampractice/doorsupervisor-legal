// Mobile Navigation JavaScript - FIXED VERSION

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavSidebar = document.getElementById('mobileNavSidebar');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const body = document.body;

    // Check if elements exist (safety check)
    if (!mobileMenuBtn || !mobileNavSidebar || !mobileNavOverlay || !mobileCloseBtn) {
        console.warn('Mobile navigation elements not found');
        return;
    }

    // Open mobile menu
    function openMobileMenu() {
        mobileNavSidebar.classList.add('active');
        mobileNavOverlay.classList.add('active');
        body.classList.add('mobile-nav-open');
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileNavSidebar.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        body.classList.remove('mobile-nav-open');
    }

    // Event listeners
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openMobileMenu();
    });

    mobileCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
    });

    // Close menu when clicking overlay
    mobileNavOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
    });

    // Close menu when clicking on navigation links
    const mobileNavLinks = mobileNavSidebar.querySelectorAll('a');
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavSidebar.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Prevent clicks inside sidebar from closing menu
    mobileNavSidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close menu when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    console.log('Mobile navigation initialized successfully');
});
