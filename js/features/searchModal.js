function buildSearchModal() {
    const modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.innerHTML = `
        <div class="modal-overlay" role="dialog" aria-modal="true">
            <div class="search-modal-content">
                <div class="search-header">
                    <h2>Suchen</h2>
                    <button class="modal-close" aria-label="Schließen"><span class="material-icons">close</span></button>
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
                                <button class="suggestion-tag" data-suggest="D3 Editor">D3 Editor</button>
                                <button class="suggestion-tag" data-suggest="Inklusion">Inklusion</button>
                                <button class="suggestion-tag" data-suggest="Barrierefreiheit">Barrierefreiheit</button>
                                <button class="suggestion-tag" data-suggest="Demo">Demo</button>
                                <button class="suggestion-tag" data-suggest="Tutorials">Tutorials</button>
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

    return modal;
}

function trapFocus(container, firstFocusable, lastFocusable) {
    container.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab') {
            return;
        }
        if (event.shiftKey) {
            if (document.activeElement === firstFocusable) {
                event.preventDefault();
                lastFocusable.focus();
            }
        } else if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable.focus();
        }
    });
}

export function initSearchModal() {
    const trigger = document.querySelector('.nav-search');
    if (!trigger) {
        return;
    }

    let modal;
    let previouslyFocusedElement;

    const closeModal = () => {
        if (!modal) {
            return;
        }
        const overlay = modal.querySelector('.modal-overlay');
        overlay.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            if (previouslyFocusedElement) {
                previouslyFocusedElement.focus();
            }
        }, 200);
        document.removeEventListener('keydown', escListener);
    };

    const escListener = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    const openModal = () => {
        previouslyFocusedElement = document.activeElement;

        if (!modal) {
            modal = buildSearchModal();
            document.body.appendChild(modal);

            const overlay = modal.querySelector('.modal-overlay');
            const closeButton = modal.querySelector('.modal-close');
            const input = modal.querySelector('#search-input');
            const focusable = modal.querySelectorAll('button, input, a');
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];

            trapFocus(overlay, firstFocusable, lastFocusable);

            closeButton.addEventListener('click', closeModal);
            overlay.addEventListener('click', (event) => {
                if (event.target === overlay) {
                    closeModal();
                }
            });

            modal.querySelectorAll('.suggestion-tag').forEach((tag) => {
                tag.addEventListener('click', () => {
                    input.value = tag.dataset.suggest || tag.textContent.trim();
                    input.focus();
                });
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    const query = input.value.trim();
                    if (query) {
                        const searchEvent = new CustomEvent('site:search', {
                            detail: { query },
                        });
                        document.dispatchEvent(searchEvent);
                        closeModal();
                    }
                }
            });
        }

        modal.style.display = 'block';
        requestAnimationFrame(() => {
            modal.querySelector('.modal-overlay').classList.add('active');
            const input = modal.querySelector('#search-input');
            if (input) {
                input.focus();
            }
        });

        document.addEventListener('keydown', escListener);
    };

    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openModal();
    });
}
