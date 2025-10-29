function initBlogFiltering() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const blogPosts = document.querySelectorAll('.blog-post-card');
    if (!filterTabs.length || !blogPosts.length) {
        return;
    }

    filterTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            filterTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            blogPosts.forEach((post) => {
                const shouldShow = category === 'all' || post.dataset.category === category;
                post.style.display = shouldShow ? 'block' : 'none';
                if (shouldShow) {
                    post.style.animation = 'fadeIn 0.5s ease-in-out';
                }
            });
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
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            alert('Vielen Dank für Ihre Anmeldung! Sie erhalten in Kürze eine Bestätigungsmail.');
            emailInput.value = '';
        }
    });
}

export function initBlogPage() {
    initBlogFiltering();
    initNewsletterForm();
}
