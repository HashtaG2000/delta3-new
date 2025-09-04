// Whitepaper filtering and functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const whitepaperCards = document.querySelectorAll('.whitepaper-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards with animation
            whitepaperCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'alle' || category === filter) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, 150);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // PDF download functionality
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pdfUrl = this.getAttribute('href');
            const whitepaperTitle = this.closest('.whitepaper-card').querySelector('h3').textContent;
            
            // Create a temporary link to trigger download
            const downloadLink = document.createElement('a');
            downloadLink.href = pdfUrl;
            downloadLink.download = `${whitepaperTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
            downloadLink.style.display = 'none';
            
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Optional: Track download analytics
            console.log(`Whitepaper downloaded: ${whitepaperTitle}`);
        });
    });
    
    // Preview functionality
    const previewButtons = document.querySelectorAll('.preview-btn');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pdfUrl = this.getAttribute('href');
            
            // Open PDF in new tab for preview
            window.open(pdfUrl, '_blank');
        });
    });
    
    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitButton = this.querySelector('button');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Wird verarbeitet...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                alert(`Vielen Dank! Sie erhalten zukünftig Benachrichtigungen über neue Whitepaper an ${email}.`);
                
                // Reset form
                this.querySelector('input[type="email"]').value = '';
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add transition styles to cards for smooth filtering
    whitepaperCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});

// Translation functionality for whitepaper page
function translateWhitepaperPage(language) {
    const translations = {
        de: {
            'hero-title': 'Whitepaper',
            'hero-subtitle': 'Wir denken Forschung praxisnah, damit aus Erkenntnissen Assistenz wird',
            'filter-alle': 'Alle Whitepaper',
            'filter-forschung': 'Forschung',
            'filter-implementierung': 'Implementierung',
            'filter-best-practices': 'Best Practices',
            'filter-technologie': 'Technologie',
            'newsletter-title': 'Bleiben Sie informiert',
            'newsletter-subtitle': 'Erhalten Sie Benachrichtigungen über neue Whitepaper und Forschungsergebnisse',
            'newsletter-placeholder': 'Ihre E-Mail-Adresse',
            'newsletter-button': 'Anmelden',
            'download-button': 'PDF herunterladen',
            'preview-button': 'Vorschau'
        },
        en: {
            'hero-title': 'Whitepapers',
            'hero-subtitle': 'We approach research practically to turn insights into assistance',
            'filter-alle': 'All Whitepapers',
            'filter-forschung': 'Research',
            'filter-implementierung': 'Implementation',
            'filter-best-practices': 'Best Practices',
            'filter-technologie': 'Technology',
            'newsletter-title': 'Stay Informed',
            'newsletter-subtitle': 'Get notifications about new whitepapers and research results',
            'newsletter-placeholder': 'Your email address',
            'newsletter-button': 'Subscribe',
            'download-button': 'Download PDF',
            'preview-button': 'Preview'
        }
    };
    
    const lang = translations[language] || translations['de'];
    
    // Update text content
    Object.keys(lang).forEach(key => {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(element => {
            if (element.tagName === 'INPUT') {
                element.placeholder = lang[key];
            } else {
                element.textContent = lang[key];
            }
        });
    });
}

// Initialize translation if language switcher exists
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferred-language') || 'de';
    translateWhitepaperPage(savedLanguage);
    
    // Listen for language changes
    document.addEventListener('languageChanged', function(e) {
        translateWhitepaperPage(e.detail.language);
    });
});