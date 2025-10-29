function initAnimateOnScroll() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (animatedElements.length === 0) {
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = Number(entry.target.dataset.delay || 0);
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
    });

    animatedElements.forEach((element) => observer.observe(element));
}

function initCardHoverAnimations() {
    const cards = document.querySelectorAll('.product-card, .action-card');
    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
        card.addEventListener('mousedown', () => {
            card.style.transform = 'translateY(-6px) scale(0.98)';
        });
        card.addEventListener('mouseup', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
    });
}

function initPageLoadAnimation() {
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.6s ease';
        requestAnimationFrame(() => {
            header.style.transform = 'translateY(0)';
        });
    }

    const heroSlide = document.querySelector('.carousel-slide.active');
    if (heroSlide) {
        const items = heroSlide.querySelectorAll('.slide-title, .slide-subtitle, .cta-button');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 + index * 150);
        });
    }
}

function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) {
        return;
    }

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
}

function markAnimatedElements() {
    const selectors = [
        { selector: '.product-card', delay: 100 },
        { selector: '.why-card', delay: 150 },
        { selector: '.action-card', delay: 100 },
        { selector: '.review-card', delay: 200 },
        { selector: '.section-title', delay: 0 },
        { selector: '.section-subtitle', delay: 120 },
        { selector: '.partners-content', delay: 0 },
        { selector: '.assistenz-content', delay: 0 },
    ];

    selectors.forEach(({ selector, delay }) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.dataset.animate = 'true';
            element.classList.add('animate-on-scroll');
            element.dataset.delay = (index * delay).toString();
        });
    });
}

export function initAnimations() {
    markAnimatedElements();
    initAnimateOnScroll();
    initCardHoverAnimations();
    initPageLoadAnimation();
    initHeaderScrollEffect();
}
