// delta3 Website JavaScript - German Version with Carousel
document.addEventListener('DOMContentLoaded', function() {
    
    // Hero Carousel Functionality
    const initCarousel = () => {
        // Wait for DOM elements to be available
        const carousel = document.querySelector('.carousel-slides');
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const carouselContainer = document.querySelector('.hero-carousel');
        
        // Check if all required elements exist
        if (!carousel || !slides.length || !indicators.length || !prevBtn || !nextBtn || !carouselContainer) {
            console.log('Carousel elements not found, retrying...');
            setTimeout(initCarousel, 100);
            return;
        }
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoSlideInterval;
        
        // Update active slide
        const updateSlide = (index) => {
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            
            // Update carousel transform
            carousel.style.transform = `translateX(-${index * 100}%)`;
            currentSlide = index;
        };
        
        // Next slide
        const nextSlide = () => {
            const next = (currentSlide + 1) % totalSlides;
            updateSlide(next);
        };
        
        // Previous slide
        const prevSlide = () => {
            const prev = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlide(prev);
        };
        
        // Auto slide functionality with consistent timing
        const startAutoSlide = () => {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 6000); // Consistent 6 seconds
        };
        
        const stopAutoSlide = () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        };
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 8000); // Restart after 8 seconds
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 8000); // Restart after 8 seconds
            });
        }
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                updateSlide(index);
                stopAutoSlide();
                setTimeout(startAutoSlide, 8000); // Restart after 8 seconds
            });
        });
        
        // Pause on hover
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', () => {
            setTimeout(startAutoSlide, 1000); // Small delay before restarting
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoSlide();
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            e.preventDefault();
        });
        
        carousel.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            setTimeout(startAutoSlide, 8000);
        });
        
        // Initialize first slide
        updateSlide(0);
        
        // Start auto slide after a short delay
        setTimeout(startAutoSlide, 6000); // First auto-advance after 6 seconds
    };
    
    // Mobile Navigation Toggle
    const createMobileNav = () => {
        const nav = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Check if elements exist
        if (!nav || !navMenu) {
            console.log('Navigation elements not found for mobile menu');
            return;
        }
        
        // Don't create button if it already exists
        if (document.querySelector('.mobile-menu-btn')) {
            return;
        }
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<span class="material-icons">menu</span>';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #0c2340;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 1001;
        `;
        
        // Create mobile search button (separate from hamburger menu)
        const mobileSearchBtn = document.createElement('button');
        mobileSearchBtn.className = 'mobile-search-btn-header';
        mobileSearchBtn.innerHTML = '<span class="material-icons">search</span>';
        mobileSearchBtn.setAttribute('aria-label', 'Search');
        mobileSearchBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #0c2340;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 1001;
        `;
        
        mobileSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Trigger the same search dialog as desktop
            const searchDialog = document.querySelector('.nav-search');
            if (searchDialog) {
                searchDialog.click();
            }
        });
        
        // Create a container for mobile buttons to keep them together
        const mobileButtonGroup = document.createElement('div');
        mobileButtonGroup.className = 'mobile-button-group';
        mobileButtonGroup.appendChild(mobileMenuBtn);
        mobileButtonGroup.appendChild(mobileSearchBtn);
        
        // Insert button group at the end of nav container (right side)
        nav.appendChild(mobileButtonGroup);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('mobile-active');
            const icon = mobileMenuBtn.querySelector('.material-icons');
            icon.textContent = navMenu.classList.contains('mobile-active') ? 'close' : 'menu';
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('mobile-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links and convert dropdown links for mobile
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            // Convert dropdown navigation to direct links for mobile
            if (link.getAttribute('href') === '#' || !link.getAttribute('href')) {
                const text = link.textContent.trim();
                if (text.includes('Produkte') || text.includes('Products')) {
                    link.setAttribute('href', '#products-page');
                } else if (text.includes('Wissen') || text.includes('Knowledge')) {
                    link.setAttribute('href', '#knowledge-page');
                } else if (text.includes('Service')) {
                    link.setAttribute('href', '#service-page');
                } else if (text.includes('Kontakt') || text.includes('Contact')) {
                    link.setAttribute('href', '#contact-page');
                }
            }
            
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-active');
                const icon = mobileMenuBtn.querySelector('.material-icons');
                icon.textContent = 'menu';
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navMenu.classList.contains('mobile-active')) {
                navMenu.classList.remove('mobile-active');
                const icon = mobileMenuBtn.querySelector('.material-icons');
                icon.textContent = 'menu';
                document.body.style.overflow = '';
            }
        });
        
        // Create mobile-specific navigation items
        createMobileNavItems();
    };
    
    const createMobileNavItems = () => {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;
        
        // Check if mobile items already exist
        if (navMenu.querySelector('.mobile-nav-items')) return;
        
        // Create container for mobile-specific items
        const mobileNavItems = document.createElement('div');
        mobileNavItems.className = 'mobile-nav-items';
        
        
        // Add Demo vereinbaren button
        const demoBtn = document.createElement('a');
        demoBtn.className = 'mobile-demo-btn';
        demoBtn.href = '#demo';
        demoBtn.textContent = 'Demo vereinbaren';
        
        // Add Leichte Sprache link
        const leichteLink = document.createElement('a');
        leichteLink.className = 'mobile-nav-item nav-accessibility';
        leichteLink.href = '#leichte-sprache';
        leichteLink.textContent = 'Leichte Sprache';
        
        // Append all items
        mobileNavItems.appendChild(demoBtn);
        mobileNavItems.appendChild(leichteLink);
        
        // Add to nav menu
        navMenu.appendChild(mobileNavItems);
    };
    
    // Smooth Scrolling for Anchor Links
    const initSmoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#demo') {
                    e.preventDefault();
                    if (href === '#demo') {
                        showDemoModal();
                    }
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Demo Modal Functionality
    const showDemoModal = () => {
        let modal = document.getElementById('demo-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'demo-modal';
            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <button class="modal-close"><span class="material-icons">close</span></button>
                        <h2>Demo vereinbaren</h2>
                        <form class="demo-form">
                            <div class="form-group">
                                <label for="name">Name *</label>
                                <input type="text" id="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">E-Mail *</label>
                                <input type="email" id="email" required>
                            </div>
                            <div class="form-group">
                                <label for="organization">Organisation</label>
                                <input type="text" id="organization">
                            </div>
                            <div class="form-group">
                                <label for="interest">Interessensbereich</label>
                                <select id="interest">
                                    <option value="">Bitte wählen...</option>
                                    <option value="bildung">Bildung</option>
                                    <option value="inklusion">Inklusion</option>
                                    <option value="industrie">Industrie</option>
                                    <option value="werkstaetten">Werkstätten</option>
                                    <option value="alle">Alle Lösungen</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="message">Ihre Nachricht</label>
                                <textarea id="message" rows="4"></textarea>
                            </div>
                            <button type="submit" class="cta-button primary large">Demo anfragen</button>
                        </form>
                    </div>
                </div>
            `;
            
            // Add modal styles
            const modalStyles = document.createElement('style');
            modalStyles.textContent = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .modal-overlay.active {
                    opacity: 1;
                }
                
                .modal-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 15px;
                    width: 90%;
                    max-width: 500px;
                    max-height: 80vh;
                    overflow-y: auto;
                    position: relative;
                    transform: translateY(-50px);
                    transition: transform 0.3s ease;
                }
                
                .modal-overlay.active .modal-content {
                    transform: translateY(0);
                }
                
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease;
                }
                
                .modal-close:hover {
                    background-color: #f5f5f5;
                    color: #418FDE;
                }
                
                .demo-form {
                    margin-top: 1rem;
                }
                
                .form-group {
                    margin-bottom: 1rem;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 0.25rem;
                    font-weight: 500;
                    color: #0c2340;
                }
                
                .form-group input,
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #e9ecef;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-family: 'Roboto', sans-serif;
                    transition: border-color 0.3s ease;
                }
                
                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #418FDE;
                }
                
                .demo-form .cta-button {
                    width: 100%;
                    margin-top: 1rem;
                }
            `;
            document.head.appendChild(modalStyles);
            document.body.appendChild(modal);
            
            // Modal event listeners
            const overlay = modal.querySelector('.modal-overlay');
            const closeBtn = modal.querySelector('.modal-close');
            const form = modal.querySelector('.demo-form');
            
            closeBtn.addEventListener('click', hideModal);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) hideModal();
            });
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Vielen Dank für Ihr Interesse! Wir melden uns bald bei Ihnen, um Ihre Demo zu vereinbaren.');
                hideModal();
            });
            
            function hideModal() {
                overlay.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        }
        
        // Show modal
        modal.style.display = 'block';
        setTimeout(() => {
            modal.querySelector('.modal-overlay').classList.add('active');
        }, 10);
    };
    
    // Enhanced Animate on Scroll with Staggered Animations
    const initAnimateOnScroll = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.dataset.delay || 0;

                    setTimeout(() => {
                        element.classList.add('animated');
                    }, delay);

                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe different types of elements with appropriate animations
        const elementsToAnimate = [
            { selector: '.product-card', animation: 'fade-in-up', stagger: 100 },
            { selector: '.why-card', animation: 'fade-in-up', stagger: 150 },
            { selector: '.action-card', animation: 'scale-in', stagger: 100 },
            { selector: '.review-card', animation: 'fade-in-up', stagger: 200 },
            { selector: '.section-title', animation: 'fade-in-up', stagger: 0 },
            { selector: '.section-subtitle', animation: 'fade-in-up', stagger: 100 },
            { selector: '.partners-content', animation: 'fade-in', stagger: 0 },
            { selector: '.assistenz-content', animation: 'fade-in-right', stagger: 0 }
        ];

        elementsToAnimate.forEach(({ selector, animation, stagger }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, index) => {
                el.classList.add('animate-on-scroll');
                el.dataset.delay = index * stagger;
                observer.observe(el);
            });
        });
    };

    // Enhanced Product Interactions with More Animations
    const initEnhancedProductInteractions = () => {
        const productCards = document.querySelectorAll('.product-card');
        const actionCards = document.querySelectorAll('.action-card');
        const allCards = [...productCards, ...actionCards];

        allCards.forEach(card => {
            // Enhanced hover animations
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';

                // Animate card content
                const content = this.querySelector('.card-content') || this;
                if (content !== this) {
                    content.style.transform = 'translateY(-5px)';
                }
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';

                const content = this.querySelector('.card-content') || this;
                if (content !== this) {
                    content.style.transform = 'translateY(0)';
                }
            });

            // Click animation
            card.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(-8px) scale(0.98)';
            });

            card.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
        });
    };

    // Add Page Load Animations
    const initPageLoadAnimations = () => {
        // Animate header on load
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.6s ease';

            setTimeout(() => {
                header.style.transform = 'translateY(0)';
            }, 100);
        }

        // Animate hero content
        const heroContent = document.querySelector('.carousel-slide.active');
        if (heroContent) {
            const title = heroContent.querySelector('.slide-title');
            const subtitle = heroContent.querySelector('.slide-subtitle');
            const button = heroContent.querySelector('.cta-button');

            [title, subtitle, button].forEach((el, index) => {
                if (el) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    el.style.transition = 'all 0.6s ease';

                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 300 + (index * 150));
                }
            });
        }

        // Add floating animation to certain elements
        const floatingElements = document.querySelectorAll('.product-icon, .why-icon');
        floatingElements.forEach(el => {
            el.classList.add('float-animation');
        });
    };
    
    
    // Header Background on Scroll
    const initHeaderScroll = () => {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#fff';
                header.style.backdropFilter = 'none';
            }
        });
    };
    
    

    // Search Dialog Functionality
    const initSearchDialog = () => {
        const searchBtn = document.querySelector('.nav-search');
        
        searchBtn.addEventListener('click', () => {
            showSearchDialog();
        });
        
        function showSearchDialog() {
            let modal = document.getElementById('search-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'search-modal';
                modal.innerHTML = `
                    <div class="modal-overlay">
                        <div class="search-modal-content">
                            <div class="search-header">
                                <h2>Suchen</h2>
                                <button class="modal-close"><span class="material-icons">close</span></button>
                            </div>
                            <div class="search-form">
                                <div class="search-input-group">
                                    <span class="material-icons search-icon">search</span>
                                    <input type="text" id="search-input" placeholder="Wonach suchen Sie?" autocomplete="off">
                                </div>
                                <div class="search-suggestions">
                                    <div class="suggestion-category">
                                        <h3>Beliebte Suchbegriffe</h3>
                                        <div class="suggestion-tags">
                                            <button class="suggestion-tag">D3 Editor</button>
                                            <button class="suggestion-tag">Inklusion</button>
                                            <button class="suggestion-tag">Barrierefreiheit</button>
                                            <button class="suggestion-tag">Demo</button>
                                            <button class="suggestion-tag">Tutorials</button>
                                        </div>
                                    </div>
                                    <div class="suggestion-category">
                                        <h3>Schnellzugriff</h3>
                                        <div class="quick-links">
                                            <a href="#d3-editor" class="quick-link">
                                                <span class="material-icons">edit_note</span>
                                                <span>D3 Editor</span>
                                            </a>
                                            <a href="#support" class="quick-link">
                                                <span class="material-icons">help</span>
                                                <span>Support</span>
                                            </a>
                                            <a href="#demo" class="quick-link">
                                                <span class="material-icons">play_circle</span>
                                                <span>Demo anfordern</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add search modal styles
                const searchStyles = document.createElement('style');
                searchStyles.textContent = `
                    #search-modal {
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100vw !important;
                        height: 100vh !important;
                        z-index: 10000 !important;
                        pointer-events: none;
                    }
                    
                    #search-modal .modal-overlay {
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100vw !important;
                        height: 100vh !important;
                        background: rgba(0, 0, 0, 0.5) !important;
                        display: flex !important;
                        justify-content: center !important;
                        align-items: center !important;
                        z-index: 10001 !important;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        pointer-events: all;
                    }
                    
                    #search-modal .modal-overlay.active {
                        opacity: 1;
                    }
                    
                    .search-modal-content {
                        background: white;
                        border-radius: 15px;
                        width: 90%;
                        max-width: 600px;
                        max-height: 80vh;
                        overflow-y: auto;
                        position: relative;
                        transform: translateY(-50px);
                        transition: transform 0.3s ease;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    }
                    
                    .modal-overlay.active .search-modal-content {
                        transform: translateY(0);
                    }
                    
                    .search-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1.5rem 2rem;
                        border-bottom: 1px solid #e9ecef;
                    }
                    
                    .search-header h2 {
                        color: #0c2340;
                        margin: 0;
                    }
                    
                    .search-form {
                        padding: 2rem;
                    }
                    
                    .search-input-group {
                        position: relative;
                        margin-bottom: 2rem;
                    }
                    
                    .search-icon {
                        position: absolute;
                        left: 1rem;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #666;
                        font-size: 1.2rem;
                    }
                    
                    #search-input {
                        width: 100%;
                        padding: 1rem 1rem 1rem 3rem;
                        border: 2px solid #e9ecef;
                        border-radius: 10px;
                        font-size: 1.1rem;
                        font-family: 'Roboto', sans-serif;
                        transition: border-color 0.3s ease;
                    }
                    
                    #search-input:focus {
                        outline: none;
                        border-color: #418FDE;
                    }
                    
                    .suggestion-category {
                        margin-bottom: 2rem;
                    }
                    
                    .suggestion-category h3 {
                        color: #0c2340;
                        margin-bottom: 1rem;
                        font-size: 1rem;
                    }
                    
                    .suggestion-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                    }
                    
                    .suggestion-tag {
                        background: #f8f9fa;
                        border: 1px solid #e9ecef;
                        border-radius: 20px;
                        padding: 0.5rem 1rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: 0.9rem;
                        color: #333;
                    }
                    
                    .suggestion-tag:hover {
                        background: #418FDE;
                        color: white;
                        border-color: #418FDE;
                    }
                    
                    .quick-links {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    
                    .quick-link {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        padding: 0.75rem 1rem;
                        border-radius: 8px;
                        text-decoration: none;
                        color: #333;
                        transition: background-color 0.3s ease;
                    }
                    
                    .quick-link:hover {
                        background-color: #f8f9fa;
                        color: #418FDE;
                    }
                    
                    .quick-link .material-icons {
                        color: #418FDE;
                        font-size: 1.2rem;
                    }
                `;
                document.head.appendChild(searchStyles);
                document.body.appendChild(modal);
                
                // Add event listeners
                const overlay = modal.querySelector('.modal-overlay');
                const closeBtn = modal.querySelector('.modal-close');
                const searchInput = modal.querySelector('#search-input');
                
                closeBtn.addEventListener('click', hideModal);
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) hideModal();
                });
                
                // Focus search input when modal opens
                setTimeout(() => {
                    searchInput.focus();
                }, 300);
                
                // Handle search input
                searchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const query = searchInput.value.trim();
                        if (query) {
                            // Simulate search - in real app, this would trigger actual search
                            alert(`Suche nach: "${query}"`);
                            hideModal();
                        }
                    } else if (e.key === 'Escape') {
                        hideModal();
                    }
                });
                
                function hideModal() {
                    overlay.classList.remove('active');
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 300);
                }
            }
            
            // Show modal
            modal.style.display = 'block';
            setTimeout(() => {
                modal.querySelector('.modal-overlay').classList.add('active');
            }, 10);
        }
    };

    // Reviews Carousel - Simple static version
    const initReviewsCarousel = () => {
        const slideGroups = document.querySelectorAll('.review-slide-group');
        const navBtns = document.querySelectorAll('.review-nav-btn');

        if (slideGroups.length === 0 || navBtns.length === 0) return;

        let currentSlide = 0;
        let autoPlayInterval;

        const showSlide = (index) => {
            slideGroups.forEach((group, i) => {
                group.classList.toggle('active', i === index);
            });
            navBtns.forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slideGroups.length;
            showSlide(currentSlide);
        };

        const startAutoPlay = () => {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 4000);
        };

        const stopAutoPlay = () => {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
        };

        // Navigation event listeners
        navBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopAutoPlay();
                setTimeout(startAutoPlay, 3000);
            });
        });

        // Hover pause
        const carousel = document.querySelector('.reviews-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }

        // Initialize
        showSlide(0);
        startAutoPlay();
    };

    // Build dynamic content if needed
    const buildDynamicContent = (reviewItems, slidesContainer, navContainer) => {
        console.log('🔧 Building dynamic content...');
        console.log('Items to process:', reviewItems.length);

        const itemsPerSlide = 2;
        const totalSlides = Math.ceil(reviewItems.length / itemsPerSlide);
        console.log('Total slides to create:', totalSlides);

        // Build slides
        slidesContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            console.log(`Creating slide ${i + 1}`);
            const slideGroup = document.createElement('div');
            slideGroup.className = 'review-slide-group';
            if (i === 0) slideGroup.classList.add('active');

            let cardsInThisSlide = 0;
            for (let j = 0; j < itemsPerSlide; j++) {
                const itemIndex = i * itemsPerSlide + j;
                if (itemIndex < reviewItems.length) {
                    console.log(`Processing item ${itemIndex}`);
                    const clonedItem = reviewItems[itemIndex].cloneNode(true);
                    const reviewCard = clonedItem.querySelector('.review-card');
                    if (reviewCard) {
                        slideGroup.appendChild(reviewCard);
                        cardsInThisSlide++;
                        console.log(`Added card ${cardsInThisSlide} to slide ${i + 1}`);
                    } else {
                        console.warn(`No review-card found in item ${itemIndex}`);
                    }
                } else {
                    console.log(`Item ${itemIndex} is beyond available items`);
                }
            }
            console.log(`Slide ${i + 1} has ${cardsInThisSlide} cards`);
            slidesContainer.appendChild(slideGroup);
        }

        // Build navigation
        navContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const navBtn = document.createElement('button');
            navBtn.className = 'review-nav-btn';
            navBtn.setAttribute('data-slide', i);
            navBtn.setAttribute('aria-label', `Bewertungen ${i * itemsPerSlide + 1}-${Math.min((i + 1) * itemsPerSlide, reviewItems.length)}`);
            if (i === 0) navBtn.classList.add('active');
            navContainer.appendChild(navBtn);
        }

        console.log(`✅ Dynamic content built: ${totalSlides} slides from ${reviewItems.length} items`);
        console.log('Slides container HTML length:', slidesContainer.innerHTML.length);
        console.log('Nav container HTML length:', navContainer.innerHTML.length);
    };

    // Initialize all functionality
    initCarousel();
    createMobileNav();
    initSmoothScroll();
    initAnimateOnScroll();
    initEnhancedProductInteractions();
    initPageLoadAnimations();
    initHeaderScroll();
    initSearchDialog();
    initReviewsCarousel();
    
    // Console message for developers
    console.log('%cdelta3 Website', 'color: #418FDE; font-size: 20px; font-weight: bold;');
    console.log('%cEinfache Assistenz für alle', 'color: #0c2340; font-size: 14px;');
});