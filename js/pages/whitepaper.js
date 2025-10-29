function initDownloadButtons() {
    document.querySelectorAll('.download-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const url = button.getAttribute('href');
            const card = button.closest('.whitepaper-card');
            const titleElement = card ? card.querySelector('h3') : null;
            const title = titleElement ? titleElement.textContent : 'whitepaper';

            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    });
}

function initPreviewButtons() {
    document.querySelectorAll('.preview-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const url = button.getAttribute('href');
            window.open(url, '_blank');
        });
    });
}

function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) {
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailField = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button');
        if (!emailField || !submitButton) {
            return;
        }

        const email = emailField.value.trim();
        if (!email) {
            return;
        }

        const originalText = submitButton.textContent;
        submitButton.textContent = 'Wird verarbeitet...';
        submitButton.disabled = true;

        setTimeout(() => {
            alert(`Vielen Dank! Sie erhalten zukünftig Benachrichtigungen über neue Whitepaper an ${email}.`);
            emailField.value = '';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1200);
    });
}

function initAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) {
                return;
            }
            event.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    });
}

const TRANSLATIONS = {
    de: {
        'hero-title': 'UNSERE WHITEPAPER',
        'hero-subtitle': 'Wissen aus Forschung und Praxis – kompakt für Sie aufbereitet',
        'newsletter-title': 'Bleiben Sie informiert',
        'newsletter-subtitle': 'Erhalten Sie Benachrichtigungen über neue Whitepaper und Forschungsergebnisse',
        'newsletter-placeholder': 'Ihre E-Mail-Adresse',
        'newsletter-button': 'Anmelden',
        'download-button': 'PDF herunterladen',
        'preview-button': 'Vorschau',
    },
    en: {
        'hero-title': 'OUR WHITEPAPERS',
        'hero-subtitle': 'Knowledge from research and practice – concisely prepared for you',
        'newsletter-title': 'Stay Informed',
        'newsletter-subtitle': 'Get notifications about new whitepapers and research results',
        'newsletter-placeholder': 'Your email address',
        'newsletter-button': 'Subscribe',
        'download-button': 'Download PDF',
        'preview-button': 'Preview',
    },
};

function applyTranslations(language) {
    const dictionary = TRANSLATIONS[language] || TRANSLATIONS.de;
    Object.entries(dictionary).forEach(([key, value]) => {
        document.querySelectorAll(`[data-translate="${key}"]`).forEach((element) => {
            if (element.tagName === 'INPUT') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        });
    });
}

function initTranslation() {
    const savedLanguage = localStorage.getItem('preferred-language') || 'de';
    applyTranslations(savedLanguage);

    document.addEventListener('languageChanged', (event) => {
        const { language } = event.detail || {};
        if (language) {
            localStorage.setItem('preferred-language', language);
            applyTranslations(language);
        }
    });
}

export function initWhitepaperPage() {
    initDownloadButtons();
    initPreviewButtons();
    initNewsletterForm();
    initAnchorScroll();
    initTranslation();
}
