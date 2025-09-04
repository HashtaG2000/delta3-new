// Delta3 Website JavaScript - German Version with Carousel
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
                // Navigation
                'nav-produkte': 'Produkte',
                'nav-wissen': 'Wissen',
                'nav-branchen': 'Branchen',
                'nav-service': 'Service & Support',
                'nav-kontakt': 'Kontakt',
                'nav-demo': 'Demo vereinbaren',
                'nav-leichte-sprache': 'Leichte Sprache',
                
                // Hero Section
                'hero-title-1': 'ASSISTENZ-SOFTWARE, DIE JEDER VERSTEHT',
                'hero-subtitle-1': 'Einfach erklärt. Einfach genutzt.',
                'hero-title-2': 'ASSISTENZ-SOFTWARE FÜR JEDE ANWENDUNG',
                'hero-subtitle-2': 'Für Bildung, Inklusion & Industrie.',
                'hero-title-3': 'ASSISTENZ-SOFTWARE, DIE IN 3 SCHRITTEN EINSETZBAR IST',
                'hero-subtitle-3': 'Digital. Flexibel. Verständlich.',
                'cta-learn': 'Mehr erfahren',
                
                // About Section
                'about-title': 'ORIENTIERUNG GEBEN. SELBSTSTÄNDIGKEIT FÖRDERN. PROZESSE ERLEICHTERN.',
                'about-text': 'Damit Arbeit gelingt: Unsere Lösungen stellen Wissen im Arbeitsfluss bereit, erklären Aufgaben Schritt für Schritt und ermöglichen Selbstständigkeit – im Bereich Bildung, Inklusion & Industrie.',
                
                // Action Cards
                'card1-title': 'Produkte Entdecken',
                'card1-desc': 'Unsere modularen Lösungen machen Arbeit verständlich, sicher und dokumentierbar – für Bildung, Inklusion & Industrie.',
                'card1-link': 'Zu Den Produkten',
                'card2-title': 'WISSEN VERTIEFEN',
                'card2-desc': 'Ob Assistenz, Lean oder Gamification – unsere Schulungen geben Impulse, wie Arbeit einfacher, inklusiver und nachhaltiger gelingt.',
                'card2-link': 'Zu Den Schulungen',
                'card3-title': 'PERSPEKTIVEN ERWEITERN',
                'card3-desc': 'Im Blog berichten wir über Ideen, Geschichten und Praxisbeispiele, die zeigen, wie Assistenz Menschen in Arbeit und Lernen stärkt.',
                'card3-link': 'Zum Blog',
                'card4-title': 'UNTERSTÜTZUNG ERHALTEN',
                'card4-desc': 'Ob Fragen, technische Unterstützung oder individuelle Beratung: Wir sind für Sie da, wenn Sie Hilfe brauchen.',
                'card4-link': 'Zum Support',
                
                // Partners Section
                'partners-title': 'AUSWAHL UNSERER PARTNER',
                'partners-desc': 'Wir arbeiten mit führenden Organisationen aus Bildung, Forschung, Inklusion und Industrie zusammen, um innovative Assistenz-Lösungen zu entwickeln und zu implementieren.',
                
                // Why Delta3 Section
                'why-title': 'Why Delta3?',
                'why1-title': 'EINFACHE ASSISTENZ',
                'why1-item1': 'Keine Vorkenntnisse nötig – sofort verständlich',
                'why1-item2': 'Inhalte in Text, Bild oder Video – angepasst an die Zielgruppe',
                'why1-item3': '„Aufklappen und loslegen" statt lange Einrichtungszeiten',
                'why2-title': 'FLEXIBEL EINSETZBAR',
                'why2-item1': 'Ein System für unterschiedliche Arbeitsplätze und Aufgaben',
                'why2-item2': 'Portabel – einfach mitnehmen, wo es gebraucht wird oder Stationär installiert',
                'why2-item3': 'Leicht an neue Prozesse oder Aufträge anpassbar',
                'why3-title': 'FÜR ALLE ZIELGRUPPEN',
                'why3-item1': 'Entwickelt für Werkstätten, Bildungseinrichtungen & Industrie',
                'why3-item2': 'Fördert Teilhabe, Effizienz und Zusammenarbeit',
                'why3-item3': 'Einfach zugänglich – unabhängig von Vorkenntnissen',
                
                // Reviews Section
                'reviews-title': 'STIMMEN UNSERER KUNDEN',
                'reviews-subtitle': 'Echte Geschichten, echte Wirkung: Unsere Kund*innen teilen, wie einfache Assistenz-Software Barrieren abbaut und Zusammenarbeit stärkt.',
                
                // Contact CTA
                'cta-final-title': 'Bereit für einfache Assistenz?',
                'cta-final-text': 'Entdecken Sie, wie Delta3 Ihre Arbeitsprozesse vereinfachen und Barrieren abbauen kann.',
                'cta-demo-btn': 'Demo vereinbaren',
                'cta-contact-btn': 'Kontakt aufnehmen',
                
                // Footer
                'footer-company': 'delta3 GmbH',
                'footer-copyright': 'Copyright © delta3 GmbH 2025'
            },
            en: {
                // Navigation
                'nav-produkte': 'Products',
                'nav-wissen': 'Knowledge',
                'nav-branchen': 'Industries',
                'nav-service': 'Service & Support',
                'nav-kontakt': 'Contact',
                'nav-demo': 'Book Demo',
                'nav-leichte-sprache': 'Easy Language',
                
                // Hero Section
                'hero-title-1': 'ASSISTIVE SOFTWARE EVERYONE UNDERSTANDS',
                'hero-subtitle-1': 'Simply explained. Simply used.',
                'hero-title-2': 'ASSISTIVE SOFTWARE FOR EVERY APPLICATION',
                'hero-subtitle-2': 'For Education, Inclusion & Industry.',
                'hero-title-3': 'ASSISTIVE SOFTWARE DEPLOYABLE IN 3 STEPS',
                'hero-subtitle-3': 'Digital. Flexible. Understandable.',
                'cta-learn': 'Learn More',
                
                // About Section
                'about-title': 'PROVIDE GUIDANCE. PROMOTE INDEPENDENCE. FACILITATE PROCESSES.',
                'about-text': 'Making work successful: Our solutions provide knowledge in the workflow, explain tasks step by step and enable independence – in education, inclusion & industry.',
                
                // Action Cards
                'card1-title': 'Discover Products',
                'card1-desc': 'Our modular solutions make work understandable, safe and documentable – for education, inclusion & industry.',
                'card1-link': 'To Products',
                'card2-title': 'DEEPEN KNOWLEDGE',
                'card2-desc': 'Whether assistance, lean or gamification – our training provides impulses on how work becomes simpler, more inclusive and sustainable.',
                'card2-link': 'To Training',
                'card3-title': 'EXPAND PERSPECTIVES',
                'card3-desc': 'In our blog we report on ideas, stories and practical examples that show how assistance strengthens people in work and learning.',
                'card3-link': 'To Blog',
                'card4-title': 'GET SUPPORT',
                'card4-desc': 'Whether questions, technical support or individual consulting: We are here for you when you need help.',
                'card4-link': 'To Support',
                
                // Partners Section
                'partners-title': 'SELECTION OF OUR PARTNERS',
                'partners-desc': 'We work together with leading organizations from education, research, inclusion and industry to develop and implement innovative assistance solutions.',
                
                // Why Delta3 Section
                'why-title': 'Why Delta3?',
                'why1-title': 'SIMPLE ASSISTANCE',
                'why1-item1': 'No prior knowledge required – immediately understandable',
                'why1-item2': 'Content in text, image or video – adapted to the target group',
                'why1-item3': '"Unfold and get started" instead of long setup times',
                'why2-title': 'FLEXIBLY DEPLOYABLE',
                'why2-item1': 'One system for different workplaces and tasks',
                'why2-item2': 'Portable – easy to take where needed or stationary installation',
                'why2-item3': 'Easy to adapt to new processes or orders',
                'why3-title': 'FOR ALL TARGET GROUPS',
                'why3-item1': 'Developed for workshops, educational institutions & industry',
                'why3-item2': 'Promotes participation, efficiency and cooperation',
                'why3-item3': 'Easily accessible – regardless of prior knowledge',
                
                // Reviews Section
                'reviews-title': 'VOICES OF OUR CUSTOMERS',
                'reviews-subtitle': 'Real stories, real impact: Our customers share how simple assistance software breaks down barriers and strengthens collaboration.',
                
                // Contact CTA
                'cta-final-title': 'Ready for Simple Assistance?',
                'cta-final-text': 'Discover how Delta3 can simplify your workflows and break down barriers.',
                'cta-demo-btn': 'Book Demo',
                'cta-contact-btn': 'Get in Touch',
                
                // Footer
                'footer-company': 'delta3 GmbH',
                'footer-copyright': 'Copyright © delta3 GmbH 2025'
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

    // Reviews Carousel Functionality
    const initReviewsCarousel = () => {
        const slides = document.querySelectorAll('.review-slide');
        const navBtns = document.querySelectorAll('.review-nav-btn');
        
        if (slides.length === 0 || navBtns.length === 0) return;
        
        let currentSlide = 0;
        
        const showSlide = (index) => {
            // Remove active class from all slides and nav buttons
            slides.forEach(slide => slide.classList.remove('active'));
            navBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current slide and nav button
            slides[index].classList.add('active');
            navBtns[index].classList.add('active');
        };
        
        // Add click event listeners to navigation buttons
        navBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-advance slides (optional)
        const autoAdvance = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };
        
        // Auto-advance every 6 seconds
        setInterval(autoAdvance, 6000);
        
        // Initialize first slide
        showSlide(0);
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
    initSearchDialog();
    initReviewsCarousel();
    
    // Console message for developers
    console.log('%cDelta3 Website', 'color: #418FDE; font-size: 20px; font-weight: bold;');
    console.log('%cEinfache Assistenz für alle', 'color: #0c2340; font-size: 14px;');
});