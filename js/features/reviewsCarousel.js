export function initReviewsCarousel() {
    const container = document.querySelector('.review-items-container');
    const groups = Array.from(document.querySelectorAll('.review-slide-group'));
    const navButtons = Array.from(document.querySelectorAll('.review-nav-btn'));

    if (!container || groups.length === 0 || navButtons.length === 0) {
        return;
    }

    let current = 0;
    let autoTimer;

    const activateSlide = (index) => {
        current = (index + groups.length) % groups.length;
        groups.forEach((group, idx) => {
            group.classList.toggle('active', idx === current);
        });
        navButtons.forEach((button, idx) => {
            button.classList.toggle('active', idx === current);
        });
    };

    const startAuto = () => {
        stopAuto();
        autoTimer = setInterval(() => {
            activateSlide(current + 1);
        }, 5000);
    };

    const stopAuto = () => {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = undefined;
        }
    };

    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            activateSlide(index);
            stopAuto();
            setTimeout(startAuto, 6000);
        });
    });

    const carousel = document.querySelector('.reviews-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAuto);
        carousel.addEventListener('mouseleave', startAuto);
    }

    activateSlide(0);
    startAuto();
}
