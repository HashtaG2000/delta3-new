import { getBasePath } from '../utils/path.js';

function buildFooterHTML(basePath) {
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3>Produkte</h3>
                    <ul>
                        <li><a href="${basePath}produkte/alino.html">Alino</a></li>
                        <li><a href="${basePath}produkte/alinoplanner.html">AlinoPlanner</a></li>
                        <li><a href="${basePath}produkte/xtendplatform.html">Xtend Platform</a></li>
                        <li><a href="${basePath}produkte/individuellesoftware.html">Individuelle Software</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Wissen</h3>
                    <ul>
                        <li><a href="${basePath}service-support/produkt-schulungen.html">Schulungen & Beratung</a></li>
                        <li><a href="${basePath}wissen/blog-post-1.html">Fallbeispiele</a></li>
                        <li><a href="${basePath}wissen/blog.html">Blog</a></li>
                        <li><a href="${basePath}wissen/forschung.html">Forschung</a></li>
                        <li><a href="${basePath}wissen/whitepaper.html">Whitepaper</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Service & Support</h3>
                    <ul>
                        <li><a href="${basePath}service-support/technischer-support.html">Technischer Support</a></li>
                        <li><a href="${basePath}service-support/anwendungsbeitrag.html">Anwendungsbeitrag</a></li>
                        <li><a href="${basePath}service-support/processberatung.html">Processberatung</a></li>
                        <li><a href="${basePath}service-support/produkt-schulungen.html">Produkt-Schulungen</a></li>
                        <li><a href="${basePath}service-support/video-tutorials.html">Video Tutorials</a></li>
                        <li><a href="${basePath}service-support/integrationberatung.html">Integrationberatung</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Kontakt</h3>
                    <ul>
                        <li><a href="${basePath}kontakt/kontakt-anfragen.html">Kontakt</a></li>
                        <li><a href="${basePath}kontakt/ueber-uns.html">Über uns</a></li>
                        <li><a href="${basePath}kontakt/ueber-uns.html#offene-stellen">Karriere</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-company">
                <div class="company-info">
                    <div class="company-name-email">
                        <h4>delta3 GmbH</h4>
                        <p>hello(at)delta3.io</p>
                        <a href="https://www.linkedin.com/company/delta3-io/" aria-label="LinkedIn" class="social-link" target="_blank" rel="noopener">
                            <i class="fab fa-linkedin"></i>
                        </a>
                    </div>
                    <div class="company-address">
                        <p>Campusallee 6</p>
                        <p>32657 Lemgo</p>
                        <p>Deutschland</p>
                    </div>
                    <div class="social-links">
                        <img src="${basePath}assets/FuE.png" alt="Forschung und Entwicklung" class="fue-logo">
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="footer-legal">
                    <span>Copyright © delta3 GmbH 2025</span>
                    <a href="${basePath}kontakt/datenschutz.html">Datenschutzrichtlinie</a>
                    <a href="${basePath}kontakt/impressum.html">Impressum</a>
                    <a href="${basePath}kontakt/agb.html">AGBs</a>
                    <a href="${basePath}kontakt/cookies.html">Cookie-Richtlinie</a>
                </div>
            </div>
        </div>
    </footer>
    `;
}

export function initFooter() {
    const basePath = getBasePath();
    const existing = document.querySelector('footer.footer');
    const markup = buildFooterHTML(basePath);

    if (existing) {
        existing.outerHTML = markup;
    } else {
        document.body.insertAdjacentHTML('beforeend', markup);
    }
}
