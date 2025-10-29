import { resolvePath } from '../utils/path.js';

function buildDemoLink(trigger) {
    const url = new URL(resolvePath('kontakt/kontakt-anfragen.html'), window.location.href);
    url.searchParams.set('demo', 'true');
    url.searchParams.set('category', 'demo');

    if (trigger instanceof HTMLAnchorElement) {
        const original = trigger.getAttribute('href');
        if (original) {
            const originalUrl = new URL(original, window.location.href);
            originalUrl.searchParams.forEach((value, key) => {
                if (!url.searchParams.has(key)) {
                    url.searchParams.set(key, value);
                }
            });
        }
    }

    if (trigger.dataset.position) {
        url.searchParams.set('position', trigger.dataset.position);
    }

    return url.pathname + url.search;
}

export function initDemoRouting() {
    const triggers = Array.from(document.querySelectorAll('[data-demo-link], a[href*="demo=true"], .cta-button[data-demo]'));
    if (triggers.length === 0) {
        return;
    }

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const targetHref = buildDemoLink(trigger);
            window.location.href = targetHref;
        });
    });
}
