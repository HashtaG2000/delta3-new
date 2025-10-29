export function initSmoothScroll() {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    if (links.length === 0) {
        return;
    }

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top,
                behavior: 'smooth',
            });
        });
    });
}
