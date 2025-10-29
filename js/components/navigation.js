import { getBasePath } from '../utils/path.js';

function buildNavigationHTML(basePath) {
    return `
    <header class="header">
        <nav class="nav-container">
            <div class="nav-brand" data-nav-home>
                <img src="https://delta3.io/wp-content/uploads/2023/05/cropped-cropped-logo-transparent_LONG_22_05_600dpi-2.png" alt="delta3" class="logo">
            </div>

            <ul class="nav-menu">
                <li class="nav-item dropdown" data-mobile-dropdown>
                    <a href="#" class="nav-link" data-nav-dropdown data-mobile-toggle>
                        Produkte
                        <span class="material-icons dropdown-arrow">expand_more</span>
                        <span class="material-icons mobile-toggle-icon">chevron_right</span>
                    </a>
                    <div class="dropdown-content mega-menu three-column">
                        <div class="dropdown-column">
                            <a href="${basePath}produkte/alino.html" class="dropdown-item-main">
                                <h4>Alino</h4>
                                <p>Unsere einfache ALL-IN-ONE Assistenz Lösung</p>
                            </a>
                        </div>
                        <div class="dropdown-column">
                            <a href="${basePath}produkte/alinoplanner.html" class="dropdown-item-main">
                                <h4>AlinoPlanner</h4>
                                <p>Speziell für strukturierte Tagespläne entwickelt</p>
                            </a>
                        </div>
                        <div class="dropdown-column">
                            <a href="${basePath}produkte/xtendplatform.html" class="dropdown-item-main">
                                <h4>Xtend Platform</h4>
                                <p>Unsere Modulare Lösung für komplexe Anwendungsfälle</p>
                            </a>
                        </div>
                        <div class="dropdown-column">
                            <a href="${basePath}produkte/individuellesoftware.html" class="dropdown-item-main">
                                <h4>Individuelle Software</h4>
                                <p>Wir unterstützen Sie mit individuellen Assistenz-Lösungen</p>
                            </a>
                        </div>
                    </div>
                </li>
                <li class="nav-item dropdown" data-mobile-dropdown>
                    <a href="#" class="nav-link" data-nav-dropdown data-mobile-toggle>
                        Wissen
                        <span class="material-icons dropdown-arrow">expand_more</span>
                        <span class="material-icons mobile-toggle-icon">chevron_right</span>
                    </a>
                    <div class="dropdown-content mega-menu three-column wissen-menu">
                        <div class="dropdown-column wissen-left">
                            <a href="${basePath}service-support/produkt-schulungen.html" class="dropdown-item-main">
                                <h4>Schulungen & Beratung</h4>
                                <p>Lernen Sie Arbeit einfacher, inklusiver und nachhaltiger zu gestalten</p>
                            </a>
                            <a href="${basePath}wissen/fallbeispiele.html" class="dropdown-item-main">
                                <h4>Fallbeispiele</h4>
                                <p>So nutzen Werkstätten und Unternehmen unsere Lösungen</p>
                            </a>
                        </div>
                        <div class="dropdown-column wissen-right">
                            <a href="${basePath}wissen/blog.html" class="dropdown-item-main">
                                <h4>Blog</h4>
                                <p>Lassen Sie sich von unseren Ideen und Beispielen inspirieren</p>
                            </a>
                            <a href="${basePath}wissen/forschung.html" class="dropdown-item-main">
                                <h4>Forschung</h4>
                                <p>Wir forschen aktiv an neuen Lösungen für Assistenz</p>
                            </a>
                            <a href="${basePath}wissen/whitepaper.html" class="dropdown-item-main">
                                <h4>Whitepaper</h4>
                                <p>Wir denken Forschung praxisnah, damit aus Erkenntnissen Assistenz wird</p>
                            </a>
                        </div>
                    </div>
                </li>
                <li class="nav-item dropdown" data-mobile-dropdown>
                    <a href="#" class="nav-link" data-nav-dropdown data-mobile-toggle>
                        Service & Support
                        <span class="material-icons dropdown-arrow">expand_more</span>
                        <span class="material-icons mobile-toggle-icon">chevron_right</span>
                    </a>
                    <div class="dropdown-content mega-menu three-column service-menu">
                        <div class="dropdown-column">
                            <a href="${basePath}service-support/technischer-support.html" class="dropdown-item-main">
                                <h4>Technischer Support</h4>
                                <p>Wir helfen Ihnen schnell, wenn es darauf ankommt</p>
                            </a>
                            <a href="${basePath}service-support/produkt-schulungen.html" class="dropdown-item-main">
                                <h4>Produkt-Schulungen</h4>
                                <p>Wir vermitteln Ihnen das nötige Know-How schnell & kompakt</p>
                            </a>
                        </div>
                        <div class="dropdown-column">
                            <a href="${basePath}service-support/anwendungsbeitrag.html" class="dropdown-item-main">
                                <h4>Anwendungsbeitrag</h4>
                                <p>Wir finden Lösungen, die zu Ihnen passen</p>
                            </a>
                            <a href="${basePath}service-support/video-tutorials.html" class="dropdown-item-main">
                                <h4>Video Tutorials</h4>
                                <p>Einfache Schritt-für-Schritt Anleitungen</p>
                            </a>
                        </div>
                        <div class="dropdown-column">
                            <a href="${basePath}service-support/processberatung.html" class="dropdown-item-main">
                                <h4>Processberatung</h4>
                                <p>Wir helfen Ihnen ihre Abläufe zu optimieren</p>
                            </a>
                            <a href="${basePath}service-support/integrationberatung.html" class="dropdown-item-main">
                                <h4>Integrationberatung</h4>
                                <p>Wir unterstützen Sie bei einer nahtlosen Integration in bestehende Strukturen</p>
                            </a>
                        </div>
                    </div>
                </li>
                <li class="nav-item dropdown" data-mobile-dropdown>
                    <a href="#" class="nav-link" data-nav-dropdown data-mobile-toggle>
                        Kontakt
                        <span class="material-icons dropdown-arrow">expand_more</span>
                        <span class="material-icons mobile-toggle-icon">chevron_right</span>
                    </a>
                    <div class="dropdown-content mega-menu three-column kontakt-menu">
                        <div class="dropdown-column">
                            <a href="${basePath}kontakt/kontakt-anfragen.html" class="dropdown-item-main">
                                <h4>Kontakt</h4>
                                <p>Wir unterstützen Sie gerne. Nehmen Sie Kontakt auf.</p>
                            </a>
                        </div>
                        <div class="dropdown-column">
                            <a href="${basePath}kontakt/ueber-uns.html" class="dropdown-item-main">
                                <h4>Über uns</h4>
                                <p>einfache Assistenz für alle – damit Arbeit verständlicher, flexibler und inklusiver wird.</p>
                            </a>
                        </div>
                        <div class="dropdown-column">
                            <a href="${basePath}kontakt/ueber-uns.html#offene-stellen" class="dropdown-item-main">
                                <h4>Karriere</h4>
                                <p>Sie möchten Teil des Teams werden?</p>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="nav-cta">
                <button class="nav-search" aria-label="Suchen">
                    <span class="material-icons">search</span>
                </button>
                <a href="${basePath}kontakt/kontakt-anfragen.html?demo=true" class="cta-button primary">Demo vereinbaren</a>
                <a href="#leichte-sprache" class="nav-accessibility">Leichte Sprache</a>
            </div>
        </nav>
    </header>
    `;
}

function setupHomeLink(basePath) {
    const brand = document.querySelector('[data-nav-home]');
    if (!brand) return;
    brand.addEventListener('click', () => {
        window.location.href = `${basePath}index.html`;
    });
    brand.style.cursor = 'pointer';
}

function setupMobileDropdowns() {
    const dropdownItems = document.querySelectorAll('[data-mobile-dropdown]');
    console.log('Setting up mobile dropdowns, found:', dropdownItems.length);

    dropdownItems.forEach(item => {
        const toggle = item.querySelector('[data-mobile-toggle]');
        const dropdown = item.querySelector('.dropdown-content');
        const icon = toggle.querySelector('.mobile-toggle-icon');

        if (!toggle || !dropdown) {
            console.warn('Missing toggle or dropdown for item:', item);
            return;
        }

        toggle.addEventListener('click', (e) => {
            // Only handle mobile dropdown toggle on mobile/tablet screens (< 1024px)
            if (window.innerWidth < 1024) {
                e.preventDefault();
                e.stopPropagation();

                console.log('Mobile dropdown clicked, window width:', window.innerWidth);

                // Close other dropdowns
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('mobile-expanded');
                        const otherIcon = otherItem.querySelector('.mobile-toggle-icon');
                        if (otherIcon) otherIcon.textContent = 'chevron_right';
                    }
                });

                // Toggle current dropdown
                const isExpanded = item.classList.contains('mobile-expanded');
                item.classList.toggle('mobile-expanded');
                console.log('Dropdown expanded:', !isExpanded);

                // Force the dropdown to be visible
                if (!isExpanded) {
                    dropdown.style.display = 'block';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.opacity = '1';
                }

                if (icon) {
                    icon.textContent = item.classList.contains('mobile-expanded') ? 'expand_more' : 'chevron_right';
                }
            }
        });
    });
}

function setupMobileNavigation() {
    const nav = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');

    if (!nav || !navMenu || nav.dataset.mobileInitialised) {
        return;
    }

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = `
        <div class="hamburger-lines">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    mobileMenuBtn.setAttribute('aria-label', 'Menü öffnen');

    const mobileSearchBtn = document.createElement('button');
    mobileSearchBtn.className = 'mobile-search-btn-header';
    mobileSearchBtn.innerHTML = '<span class="material-icons">search</span>';
    mobileSearchBtn.setAttribute('aria-label', 'Suche öffnen');

    const mobileButtonGroup = document.createElement('div');
    mobileButtonGroup.className = 'mobile-button-group';
    mobileButtonGroup.appendChild(mobileMenuBtn);
    mobileButtonGroup.appendChild(mobileSearchBtn);

    nav.appendChild(mobileButtonGroup);

    mobileMenuBtn.addEventListener('click', (event) => {
        event.preventDefault();
        navMenu.classList.toggle('mobile-active');
        document.body.style.overflow = navMenu.classList.contains('mobile-active') ? 'hidden' : '';
        mobileMenuBtn.setAttribute('aria-label', navMenu.classList.contains('mobile-active') ? 'Menü schließen' : 'Menü öffnen');
    });

    mobileSearchBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const searchTrigger = document.querySelector('.nav-search');
        if (searchTrigger) {
            searchTrigger.click();
        }
    });

    // Close menu when clicking dropdown sub-items
    navMenu.querySelectorAll('.dropdown-item-main').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
            mobileMenuBtn.setAttribute('aria-label', 'Menü öffnen');
            document.body.style.overflow = '';

            // Close all expanded dropdowns
            document.querySelectorAll('[data-mobile-dropdown]').forEach(item => {
                item.classList.remove('mobile-expanded');
                const icon = item.querySelector('.mobile-toggle-icon');
                if (icon) icon.textContent = 'chevron_right';
            });
        });
    });

    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            mobileMenuBtn.setAttribute('aria-label', 'Menü öffnen');
            document.body.style.overflow = '';
        }
    });

    nav.dataset.mobileInitialised = 'true';
}

export function initNavigation() {
    const basePath = getBasePath();
    const existing = document.querySelector('header.header');
    if (existing) {
        existing.remove();
    }
    document.body.insertAdjacentHTML('afterbegin', buildNavigationHTML(basePath));
    setupHomeLink(basePath);
    setupMobileNavigation();
    setupMobileDropdowns();
}
