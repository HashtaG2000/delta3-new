import { search } from '../data/searchIndex.js';
import { getBasePath } from '../utils/path.js';

function showSearchResults(query, results) {
    // Remove any existing search results modal
    const existingModal = document.querySelector('#search-results-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const basePath = getBasePath();

    // Create search results modal
    const modal = document.createElement('div');
    modal.id = 'search-results-modal';
    modal.className = 'search-results-modal';

    const resultsHTML = results.length > 0
        ? results.map(result => `
            <a href="${basePath}${result.url}" class="search-result-item">
                <div class="search-result-category">${result.category}</div>
                <h4 class="search-result-title">${highlightQuery(result.title, query)}</h4>
                <p class="search-result-description">${highlightQuery(result.description, query)}</p>
            </a>
        `).join('')
        : `
            <div class="search-no-results">
                <span class="material-icons">search_off</span>
                <p>Keine Ergebnisse für "${query}" gefunden</p>
                <small>Versuchen Sie es mit anderen Suchbegriffen</small>
            </div>
        `;

    modal.innerHTML = `
        <div class="search-results-overlay">
            <div class="search-results-content">
                <div class="search-results-header">
                    <h3>Suchergebnisse für "${query}"</h3>
                    <button class="search-results-close" aria-label="Schließen">
                        <span class="material-icons">close</span>
                    </button>
                </div>
                <div class="search-results-list">
                    ${resultsHTML}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    const closeBtn = modal.querySelector('.search-results-close');
    const overlay = modal.querySelector('.search-results-overlay');

    closeBtn.addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Show modal with animation
    requestAnimationFrame(() => {
        modal.querySelector('.search-results-overlay').classList.add('active');
    });
}

function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

export function initGlobalEventHandlers() {
    document.addEventListener('site:search', (event) => {
        const { query } = event.detail || {};
        if (query) {
            const results = search(query);
            showSearchResults(query, results);
        }
    });

    document.addEventListener('site:demo-request', (event) => {
        const { detail } = event;
        console.info('Demoanfrage gesendet:', detail);
        alert('Vielen Dank für Ihr Interesse! Wir melden uns bald bei Ihnen.');
    });
}
