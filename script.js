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

    // Product Details Logic
    const initProductDetails = () => {
        // Gallery Thumbnail Logic
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-product-image');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const img = thumb.querySelector('img');
                if (img && mainImage) {
                    mainImage.src = img.src;
                    mainImage.alt = img.alt;
                    
                    // Update active state
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                }
            });
        });

        // Fragrance Selector Logic
        const subscriptionOptionsForFragrance = document.querySelectorAll('.subscription-option');
        
        const fragImages = {
            'original': 'Public/PerfumePurple.png',
            'lily': 'Public/PerfumeLily.png',
            'rose': 'Public/PerfumeRose.png'
        };

        subscriptionOptionsForFragrance.forEach(subOption => {
            const fragranceCards = subOption.querySelectorAll('.fragrance-card');
            const inclusionImg = subOption.querySelector('.inclusion-img img');
            
            fragranceCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent triggering the subscription toggle click
                    const frag = card.dataset.fragrance;
                    
                    // Update active fragrance card within THIS sub option
                    fragranceCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    
                    // Update main gallery image and inclusion preview for THIS sub option
                    if (mainImage && fragImages[frag]) {
                        mainImage.src = fragImages[frag];
                        if (inclusionImg) inclusionImg.src = fragImages[frag];
                    }
                });
            });

            // Inclusions Toggle within THIS sub option
            const inclusionCards = subOption.querySelectorAll('.inclusion-card');
            inclusionCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent triggering the subscription toggle click
                    inclusionCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                });
            });
        });

        // Subscription Toggle Logic
        const subscriptionOptions = document.querySelectorAll('.subscription-option');

        subscriptionOptions.forEach(option => {
            option.addEventListener('click', () => {
                const radio = option.querySelector('input[name="subscription-type"]');
                if (radio) {
                    radio.checked = true;
                    // Trigger change manually since we're setting checked property
                    radio.dispatchEvent(new Event('change'));
                }
            });
        });

        const subRadios = document.querySelectorAll('input[name="subscription-type"]');
        const singleSub = document.getElementById('single-sub');
        const doubleSub = document.getElementById('double-sub');

        subRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'single') {
                    singleSub.classList.add('active');
                    doubleSub.classList.remove('active');
                    singleSub.closest('.subscription-card').classList.add('active');
                    doubleSub.closest('.subscription-card').classList.remove('active');
                } else {
                    doubleSub.classList.add('active');
                    singleSub.classList.remove('active');
                    doubleSub.closest('.subscription-card').classList.add('active');
                    singleSub.closest('.subscription-card').classList.remove('active');
                }
            });
        });

        // Inclusions Toggle
        const inclusionCards = document.querySelectorAll('.inclusion-card');
        inclusionCards.forEach(card => {
            card.addEventListener('click', () => {
                inclusionCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
    };

    // Collection Accordion Logic
    const initCollectionAccordion = () => {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                accordionItems.forEach(i => {
                    i.classList.remove('active');
                    const icon = i.querySelector('[data-lucide]');
                    if (icon) {
                        icon.setAttribute('data-lucide', 'plus');
                    }
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    const icon = item.querySelector('[data-lucide]');
                    if (icon) {
                        icon.setAttribute('data-lucide', 'minus');
                    }
                }
                
                // Update icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });
    };

    // Newsletter Form Logic
    const initNewsletterForm = () => {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                if (emailInput && emailInput.value) {
                    alert(`Thank you for subscribing with: ${emailInput.value}`);
                    emailInput.value = '';
                }
            });
        }
    };

    initCollectionAccordion();
    initProductDetails();
    initNewsletterForm();

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
