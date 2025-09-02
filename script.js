// Delta3 Website JavaScript - German Version with Carousel
document.addEventListener('DOMContentLoaded', function() {
    
    // Hero Carousel Functionality
    const initCarousel = () => {
        const carousel = document.querySelector('.carousel-slides');
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        
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
        
        // Auto slide functionality
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextSlide, 5000); // 5 seconds
        };
        
        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 10000); // Restart after 10 seconds
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 10000); // Restart after 10 seconds
        });
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                updateSlide(index);
                stopAutoSlide();
                setTimeout(startAutoSlide, 10000); // Restart after 10 seconds
            });
        });
        
        // Pause on hover
        const carouselContainer = document.querySelector('.hero-carousel');
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
        
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
            
            setTimeout(startAutoSlide, 10000);
        });
        
        // Start auto slide
        startAutoSlide();
    };
    
    // Mobile Navigation Toggle
    const createMobileNav = () => {
        const nav = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<span class="material-icons">menu</span>';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #0c2340;
            cursor: pointer;
        `;
        
        nav.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            const icon = mobileMenuBtn.querySelector('.material-icons');
            icon.textContent = navMenu.classList.contains('mobile-active') ? 'close' : 'menu';
        });
        
        // Add mobile styles
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            @media (max-width: 968px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                .nav-menu {
                    position: fixed;
                    top: 80px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 80px);
                    background: white;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 2rem;
                    transition: left 0.3s ease;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    z-index: 999;
                }
                
                .nav-menu.mobile-active {
                    left: 0;
                }
                
                .nav-item {
                    width: 100%;
                    margin: 1rem 0;
                }
                
                .nav-cta {
                    display: none;
                }
                
                .dropdown-content {
                    position: static;
                    opacity: 1;
                    visibility: visible;
                    transform: none;
                    box-shadow: none;
                    background: #f8f9fa;
                    margin-top: 0.5rem;
                    padding: 1rem;
                    border-radius: 8px;
                }
            }
        `;
        document.head.appendChild(mobileStyles);
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
    
    // Animate on Scroll
    const initAnimateOnScroll = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Add animation styles
        const animationStyles = document.createElement('style');
        animationStyles.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
        `;
        document.head.appendChild(animationStyles);
        
        // Observe elements
        const elementsToAnimate = document.querySelectorAll(
            '.product-card, .why-card, .assistenz-content, .partners-content'
        );
        elementsToAnimate.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    };
    
    // Product Card Interactions
    const initProductInteractions = () => {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
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
    
    // Language and Accessibility Features
    const initAccessibilityFeatures = () => {
        // High contrast mode toggle
        const addHighContrastToggle = () => {
            const toggle = document.createElement('button');
            toggle.innerHTML = '<span class="material-icons">contrast</span>';
            toggle.className = 'accessibility-toggle';
            toggle.title = 'Hohen Kontrast umschalten';
            toggle.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #418FDE;
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            `;
            
            toggle.addEventListener('click', () => {
                document.body.classList.toggle('high-contrast');
                toggle.style.background = document.body.classList.contains('high-contrast') 
                    ? '#000' : '#418FDE';
            });
            
            document.body.appendChild(toggle);
        };
        
        // Add high contrast styles
        const contrastStyles = document.createElement('style');
        contrastStyles.textContent = `
            .high-contrast {
                filter: contrast(150%) brightness(110%);
            }
            
            .high-contrast .cta-button.primary {
                background: #000 !important;
                color: #fff !important;
            }
            
            .high-contrast .cta-button.secondary {
                background: #fff !important;
                color: #000 !important;
                border-color: #000 !important;
            }
        `;
        document.head.appendChild(contrastStyles);
        
        addHighContrastToggle();
    };
    
    // Language Switcher Functionality
    const initLanguageSwitcher = () => {
        const currentLangDisplay = document.querySelector('.current-lang');
        const langDropdown = document.querySelector('.lang-dropdown');
        const currentLang = localStorage.getItem('language') || 'de';
        
        // Translation dictionary
        const translations = {
            de: {
                'nav-demo': 'Demo vereinbaren',
                'nav-solutions': 'Lösungen',
                'nav-applications': 'Anwendungen',
                'nav-about': 'Über uns',
                'nav-contact': 'Kontakt',
                'hero-title-1': 'ASSISTENZ-SOFTWARE, DIE JEDER VERSTEHT',
                'hero-subtitle-1': 'Einfach erklärt. Einfach genutzt.',
                'hero-title-2': 'ASSISTENZ-SOFTWARE FÜR JEDE ANWENDUNG',
                'hero-subtitle-2': 'Für Bildung, Inklusion & Industrie.',
                'hero-title-3': 'EINFACHE ASSISTENZ',
                'hero-subtitle-3': 'Digitale Barrieren abbauen, Menschen befähigen.',
                'cta-demo': 'Demo vereinbaren',
                'cta-learn': 'Mehr erfahren',
                'cta-solutions': 'Lösungen entdecken',
                'cta-why': 'Warum Delta3?',
                'section-assistenz': 'EINFACHE ASSISTENZ',
                'section-partners': 'Vertrauen Sie auf bewährte Partnerschaften',
                'section-solutions': 'Unsere Lösungen',
                'section-why': 'Warum Delta3?',
                'cta-final-title': 'Bereit für einfache Assistenz?',
                'cta-final-text': 'Entdecken Sie, wie Delta3 Ihre Arbeitsprozesse vereinfachen und Barrieren abbauen kann.',
                'modal-title': 'Demo vereinbaren',
                'modal-submit': 'Demo anfragen'
            },
            en: {
                'nav-demo': 'Book Demo',
                'nav-solutions': 'Solutions',
                'nav-applications': 'Applications',
                'nav-about': 'About',
                'nav-contact': 'Contact',
                'hero-title-1': 'ASSISTIVE SOFTWARE EVERYONE UNDERSTANDS',
                'hero-subtitle-1': 'Simply explained. Simply used.',
                'hero-title-2': 'ASSISTIVE SOFTWARE FOR EVERY APPLICATION',
                'hero-subtitle-2': 'For Education, Inclusion & Industry.',
                'hero-title-3': 'SIMPLE ASSISTANCE',
                'hero-subtitle-3': 'Breaking down digital barriers, empowering people.',
                'cta-demo': 'Book Demo',
                'cta-learn': 'Learn More',
                'cta-solutions': 'Discover Solutions',
                'cta-why': 'Why Delta3?',
                'section-assistenz': 'SIMPLE ASSISTANCE',
                'section-partners': 'Trust in Proven Partnerships',
                'section-solutions': 'Our Solutions',
                'section-why': 'Why Delta3?',
                'cta-final-title': 'Ready for Simple Assistance?',
                'cta-final-text': 'Discover how Delta3 can simplify your workflows and break down barriers.',
                'modal-title': 'Book Demo',
                'modal-submit': 'Request Demo'
            }
        };
        
        // Language options
        const langOptions = {
            de: { flag: '🇩🇪', name: 'DE' },
            en: { flag: '🇬🇧', name: 'EN' }
        };
        
        // Set initial language
        setLanguage(currentLang);
        
        // Add event listener for dropdown options
        langDropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-option')) {
                const lang = e.target.dataset.lang;
                setLanguage(lang);
                localStorage.setItem('language', lang);
            }
        });
        
        function setLanguage(lang) {
            // Update current language display
            const current = langOptions[lang];
            currentLangDisplay.textContent = `${current.flag} ${current.name}`;
            
            // Update dropdown to show the other language
            const otherLang = lang === 'de' ? 'en' : 'de';
            const other = langOptions[otherLang];
            langDropdown.innerHTML = `<button class="lang-option" data-lang="${otherLang}">${other.flag} ${other.name}</button>`;
            
            // Update page language
            document.documentElement.lang = lang;
            
            // Translate elements
            const elementsToTranslate = document.querySelectorAll('[data-translate]');
            elementsToTranslate.forEach(element => {
                const key = element.dataset.translate;
                if (translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });
            
            // Update navigation links
            const navLinks = {
                'Lösungen': lang === 'de' ? 'Lösungen' : 'Solutions',
                'Anwendungen': lang === 'de' ? 'Anwendungen' : 'Applications',
                'Über uns': lang === 'de' ? 'Über uns' : 'About',
                'Kontakt': lang === 'de' ? 'Kontakt' : 'Contact'
            };
            
            document.querySelectorAll('.nav-link').forEach(link => {
                const currentText = link.textContent.trim();
                for (const [de, translation] of Object.entries(navLinks)) {
                    if ((lang === 'de' && currentText === translation) || 
                        (lang === 'en' && currentText === de)) {
                        link.textContent = lang === 'de' ? de : translation;
                        break;
                    }
                }
            });
            
            // Update carousel slides
            updateCarouselLanguage(lang);
        }
        
        function updateCarouselLanguage(lang) {
            const slides = document.querySelectorAll('.carousel-slide');
            slides.forEach((slide, index) => {
                const title = slide.querySelector('.slide-title');
                const subtitle = slide.querySelector('.slide-subtitle');
                
                if (title && subtitle) {
                    const titleKey = `hero-title-${index + 1}`;
                    const subtitleKey = `hero-subtitle-${index + 1}`;
                    
                    if (translations[lang][titleKey]) {
                        title.textContent = translations[lang][titleKey];
                    }
                    if (translations[lang][subtitleKey]) {
                        subtitle.textContent = translations[lang][subtitleKey];
                    }
                }
            });
        }
    };

    // Initialize all functionality
    initCarousel();
    createMobileNav();
    initSmoothScroll();
    initAnimateOnScroll();
    initProductInteractions();
    initHeaderScroll();
    initAccessibilityFeatures();
    initLanguageSwitcher();
    
    // Console message for developers
    console.log('%cDelta3 Website', 'color: #418FDE; font-size: 20px; font-weight: bold;');
    console.log('%cEinfache Assistenz für alle', 'color: #0c2340; font-size: 14px;');
});