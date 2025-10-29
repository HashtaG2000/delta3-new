const AUTO_ADVANCE_DELAY = 6000;
const RESTART_DELAY = 8000;

function applyActiveState(slides, indicators, index) {
    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === index);
    });

    indicators.forEach((indicator, indicatorIndex) => {
        indicator.classList.toggle('active', indicatorIndex === index);
    });
}

function updateCarouselPosition(track, index) {
    track.style.transform = `translateX(-${index * 100}%)`;
}

export function initHeroCarousel() {
    const track = document.querySelector('.carousel-slides');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const carouselWrapper = document.querySelector('.hero-carousel');

    if (!track || slides.length === 0 || indicators.length === 0 || !prevBtn || !nextBtn || !carouselWrapper) {
        return;
    }

    let currentIndex = 0;
    let autoAdvanceTimer;

    const goToSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        applyActiveState(slides, indicators, currentIndex);
        updateCarouselPosition(track, currentIndex);
    };

    const next = () => goToSlide(currentIndex + 1);
    const prev = () => goToSlide(currentIndex - 1);

    const stopAutoAdvance = () => {
        if (autoAdvanceTimer) {
            clearInterval(autoAdvanceTimer);
            autoAdvanceTimer = undefined;
        }
    };

    const startAutoAdvance = (delay = AUTO_ADVANCE_DELAY) => {
        stopAutoAdvance();
        autoAdvanceTimer = setInterval(next, delay);
    };

    nextBtn.addEventListener('click', () => {
        next();
        stopAutoAdvance();
        setTimeout(() => startAutoAdvance(), RESTART_DELAY);
    });

    prevBtn.addEventListener('click', () => {
        prev();
        stopAutoAdvance();
        setTimeout(() => startAutoAdvance(), RESTART_DELAY);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoAdvance();
            setTimeout(() => startAutoAdvance(), RESTART_DELAY);
        });
    });

    let startX = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        isSwiping = true;
        stopAutoAdvance();
    }, { passive: true });

    track.addEventListener('touchmove', (event) => {
        if (!isSwiping) return;
        const currentX = event.touches[0].clientX;
        const delta = startX - currentX;
        if (Math.abs(delta) > 40) {
            if (delta > 0) {
                next();
            } else {
                prev();
            }
            isSwiping = false;
            setTimeout(() => startAutoAdvance(), RESTART_DELAY);
        }
    }, { passive: true });

    track.addEventListener('touchend', () => {
        isSwiping = false;
        setTimeout(() => startAutoAdvance(), RESTART_DELAY);
    });

    carouselWrapper.addEventListener('mouseenter', stopAutoAdvance);
    carouselWrapper.addEventListener('mouseleave', () => startAutoAdvance());

    goToSlide(0);
    startAutoAdvance();
}
