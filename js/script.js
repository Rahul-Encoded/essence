document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const initMobileMenu = () => {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        const toggleIcon = toggle.querySelector('i');
        
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                
                // Toggle between menu and x icon
                const isOpened = nav.classList.contains('active');
                if (isOpened) {
                    toggleIcon.setAttribute('data-lucide', 'x');
                } else {
                    toggleIcon.setAttribute('data-lucide', 'menu');
                }
                
                // Refresh Lucide Icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });

            // Close menu when clicking a link
            nav.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    toggleIcon.setAttribute('data-lucide', 'menu');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                });
            });
        }
    };

    // Initialize mobile menu
    initMobileMenu();

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
        // Gallery Logic
        const initGallery = () => {
            const mainImage = document.getElementById('main-product-image');
            const thumbnails = document.querySelectorAll('.thumbnail');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.querySelector('.gallery-nav.prev');
            const nextBtn = document.querySelector('.gallery-nav.next');
            
            if (!mainImage || thumbnails.length === 0) return;

            let currentIndex = 0;
            const images = Array.from(thumbnails).map(thumb => {
                const img = thumb.querySelector('img');
                return {
                    src: img ? img.src : '',
                    alt: img ? img.alt : ''
                };
            });
            const totalImages = images.length;

            const updateGallery = (index) => {
                // Fade out effect
                mainImage.style.opacity = '0';
                
                setTimeout(() => {
                    currentIndex = index;
                    mainImage.src = images[currentIndex].src;
                    mainImage.alt = images[currentIndex].alt;
                    
                    // Update active states
                    thumbnails.forEach((thumb, i) => {
                        thumb.classList.toggle('active', i === currentIndex);
                    });

                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === currentIndex);
                    });

                    // Fade in effect
                    mainImage.style.opacity = '1';
                }, 300);
            };

            // Thumbnail clicks
            thumbnails.forEach((thumb, index) => {
                thumb.addEventListener('click', () => {
                    if (index !== currentIndex) updateGallery(index);
                });
            });

            // Dot clicks
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    if (index !== currentIndex) updateGallery(index);
                });
            });

            // Arrow clicks
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    let newIndex = currentIndex - 1;
                    if (newIndex < 0) newIndex = totalImages - 1;
                    updateGallery(newIndex);
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    let newIndex = currentIndex + 1;
                    if (newIndex >= totalImages) newIndex = 0;
                    updateGallery(newIndex);
                });
            }
        };

        initGallery();

        // Subscription & Cart Logic
        const initSubscription = () => {
            const addToCartBtn = document.querySelector('.btn-add-to-cart');
            const subOptions = document.querySelectorAll('.subscription-option');
            const subRadios = document.querySelectorAll('input[name="subscription-type"]');
            
            let cartState = {
                type: 'single',
                price: '$99.99',
                fragrance: 'original',
                inclusion: '30-days'
            };

            const updateAddToCart = () => {
                if (!addToCartBtn) return;
                
                // Construct a dynamic link or just update text
                // For this demo, we'll update the text and log selection
                addToCartBtn.textContent = `Add to Cart - ${cartState.price}`;
                
                // In a real app, you'd update an href like:
                // addToCartBtn.href = `/cart/add?type=${cartState.type}&fragrance=${cartState.fragrance}&inclusion=${cartState.inclusion}`;
            };

            const refreshState = () => {
                const activeSub = document.querySelector('.subscription-option.active');
                if (!activeSub) return;

                cartState.type = activeSub.id.replace('-sub', '');
                cartState.price = activeSub.querySelector('.current-price').textContent;
                
                const activeFrag = activeSub.querySelector('.fragrance-card.active');
                if (activeFrag) {
                    cartState.fragrance = activeFrag.dataset.fragrance;
                }

                const activeInclusion = activeSub.querySelector('.inclusion-card.active');
                if (activeInclusion) {
                    const label = activeInclusion.querySelector('.inclusion-label');
                    cartState.inclusion = label ? label.textContent.trim() : 'standard';
                }

                updateAddToCart();
            };

            // Main Subscription Toggle (Single vs Double)
            subOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const radio = option.querySelector('input[name="subscription-type"]');
                    if (radio) {
                        radio.checked = true;
                        radio.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
            });

            subRadios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const val = e.target.value;
                    const singleSub = document.getElementById('single-sub');
                    const doubleSub = document.getElementById('double-sub');

                    if (val === 'single') {
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
                    refreshState();
                });
            });

            // Fragrance Selection
            const fragImages = {
                'original': 'Public/PerfumeOriginal.png',
                'lily': 'Public/PerfumeLily2.png',
                'rose': 'Public/PerfumeRose.png'
            };

            subOptions.forEach(subOption => {
                const fragranceCards = subOption.querySelectorAll('.fragrance-card');
                const inclusionImg = subOption.querySelector('.inclusion-img img');
                const mainImage = document.getElementById('main-product-image');
                
                fragranceCards.forEach(card => {
                    card.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const frag = card.dataset.fragrance;
                        
                        fragranceCards.forEach(c => c.classList.remove('active'));
                        card.classList.add('active');
                        
                        // Update UI
                        if (mainImage && fragImages[frag]) {
                            mainImage.style.opacity = '0';
                            setTimeout(() => {
                                mainImage.src = fragImages[frag];
                                mainImage.style.opacity = '1';
                            }, 300);
                            if (inclusionImg) inclusionImg.src = fragImages[frag];
                        }
                        refreshState();
                    });
                });

                // Inclusions selection
                const inclusionCards = subOption.querySelectorAll('.inclusion-card');
                inclusionCards.forEach(card => {
                    card.addEventListener('click', (e) => {
                        e.stopPropagation();
                        inclusionCards.forEach(c => c.classList.remove('active'));
                        card.classList.add('active');
                        refreshState();
                    });
                });
            });

            // Init state
            refreshState();
            
            // Add to Cart Click log
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    console.log('Cart State:', cartState);
                    alert(`Added to Cart: ${cartState.type} subscription with ${cartState.fragrance} scent at ${cartState.price}`);
                });
            }
        };

        initSubscription();
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

    // Metrics Animation Logic
    const initMetricsAnimation = () => {
        const metrics = document.querySelectorAll('.metric-number');
        
        const animateValue = (obj, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                obj.innerHTML = value + '%';
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.textContent);
                    animateValue(target, 0, finalValue, 1500);
                    observer.unobserve(target); // Only animate once
                }
            });
        }, observerOptions);

        metrics.forEach(metric => {
            observer.observe(metric);
        });
    };

    initCollectionAccordion();
    initProductDetails();
    initNewsletterForm();
    initMetricsAnimation();

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
