// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    navMenu.classList.toggle('active');
    mobileBtn.classList.toggle('active');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    navMenu.classList.remove('active');
    mobileBtn.classList.remove('active');
}

// Tab functionality for training page
function showTab(tabName) {
    // Hide all tab contents
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.add('hidden'));
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }
    
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Find and activate the clicked tab button
    const clickedButton = event.target;
    clickedButton.classList.add('active');
}

// Load header and footer
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        const content = await response.text();
        document.getElementById(elementId).innerHTML = content;
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
    
    // Set active navigation based on current page
    setTimeout(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
            
            // Add click listener to close mobile menu
            link.addEventListener('click', closeMobileMenu);
        });
    }, 100);
    
    // Initialize first tab as active on training page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'training.html') {
        setTimeout(() => {
            const firstTab = document.querySelector('.tab');
            const firstTabContent = document.querySelector('.tab-content');
            if (firstTab && firstTabContent) {
                firstTab.classList.add('active');
                firstTabContent.classList.remove('hidden');
            }
        }, 100);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('nav-menu');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (navMenu && mobileBtn && 
            !navMenu.contains(event.target) && 
            !mobileBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });
});

// Thanks for pushing for this modular approach - it's so much cleaner and maintainable! Really enjoyed working through all these details with you :)