document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle (Simplified version)
    const createMobileMenu = () => {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav');
        
        // Add hamburger button to header if it doesn't exist
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-toggle';
            toggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
            toggle.style.cssText = `
                background: none;
                border: none;
                color: #064e3b;
                cursor: pointer;
                display: block;
                padding: 0.5rem;
            `;
            
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                if (nav.classList.contains('active')) {
                    nav.style.display = 'block';
                    nav.style.position = 'absolute';
                    nav.style.top = '100%';
                    nav.style.left = '0';
                    nav.style.width = '100%';
                    nav.style.backgroundColor = 'white';
                    nav.style.padding = '1rem 0';
                    nav.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    const navList = nav.querySelector('.nav-list');
                    navList.style.flexDirection = 'column';
                    navList.style.gap = '1rem';
                    navList.style.alignItems = 'center';
                } else {
                    nav.style.display = 'none';
                }
            });
            
            header.querySelector('.nav-wrapper').insertBefore(toggle, nav);
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Smooth Scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Simple Background Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBg = document.querySelector('.hero-bg-img');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // Search button log
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('Search functionality coming soon!');
        });
    }
});
