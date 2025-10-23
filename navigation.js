// Dynamic Navigation Generator
// This script generates and injects a consistent navigation across all pages

function createNavigation() {
    // Detect the current page depth to adjust relative paths
    const currentPath = window.location.pathname;
    // Count directory depth (e.g., /index.html = 0, /produkte/alino.html = 1)
    const pathParts = currentPath.split('/').filter(part => part && !part.endsWith('.html'));
    const depth = pathParts.length;
    const basePath = depth === 0 ? '' : '../';

    const navigationHTML = `
    <header class="header">
        <nav class="nav-container">
            <div class="nav-brand" onclick="window.location.href='${basePath}index.html'">
                <img src="https://delta3.io/wp-content/uploads/2023/05/cropped-cropped-logo-transparent_LONG_22_05_600dpi-2.png" alt="delta3" class="logo">
            </div>

            <ul class="nav-menu">
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link">Produkte <span class="material-icons dropdown-arrow">expand_more</span></a>
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
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link">Wissen <span class="material-icons dropdown-arrow">expand_more</span></a>
                    <div class="dropdown-content mega-menu three-column wissen-menu">
                        <div class="dropdown-column wissen-left">
                            <a href="${basePath}service-support/produkt-schulungen.html" class="dropdown-item-main">
                                <h4>Schulungen & Beratung</h4>
                                <p>Lernen Sie Arbeit einfacher, inklusiver und nachhaltiger zu gestalten</p>
                            </a>
                            <a href="${basePath}wissen/blog-post-1.html" class="dropdown-item-main">
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
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link">Service & Support <span class="material-icons dropdown-arrow">expand_more</span></a>
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
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link">Kontakt <span class="material-icons dropdown-arrow">expand_more</span></a>
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

    return navigationHTML;
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find existing header and replace it, or prepend if it doesn't exist
    const existingHeader = document.querySelector('header.header');
    const navigationHTML = createNavigation();

    if (existingHeader) {
        existingHeader.outerHTML = navigationHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navigationHTML);
    }
});
