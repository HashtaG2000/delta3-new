import { initNavigation } from './components/navigation.js';
import { initFooter } from './components/footer.js';
import { initHeroCarousel } from './features/heroCarousel.js';
import { initSmoothScroll } from './features/smoothScroll.js';
import { initSearchModal } from './features/searchModal.js';
import { initDemoRouting } from './features/demoModal.js';
import { initAnimations } from './features/animations.js';
import { initReviewsCarousel } from './features/reviewsCarousel.js';
import { initGlobalEventHandlers } from './features/eventBus.js';

const pageSpecificInitialisers = [
    {
        test: () => window.location.pathname.includes('/wissen/blog'),
        loader: () => import('./pages/blog.js').then((module) => module.initBlogPage()),
    },
    {
        test: () => window.location.pathname.includes('/wissen/whitepaper'),
        loader: () => import('./pages/whitepaper.js').then((module) => module.initWhitepaperPage()),
    },
    {
        test: () => window.location.pathname.includes('/kontakt/kontakt-anfragen'),
        loader: () => import('./pages/contact.js').then((module) => module.initContactPage()),
    },
];

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFooter();
    initGlobalEventHandlers();

    initSmoothScroll();
    initSearchModal();
    initDemoRouting();
    initAnimations();
    initHeroCarousel();
    initReviewsCarousel();

    pageSpecificInitialisers
        .filter(({ test }) => {
            try {
                return test();
            } catch (error) {
                console.error('Page test failed', error);
                return false;
            }
        })
        .forEach(({ loader }) => loader().catch((error) => console.error('Page init failed', error)));
});
