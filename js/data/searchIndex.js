// Search Index - Contains all searchable content across the website
export const searchIndex = [
    // Produkte
    {
        title: 'Alino',
        description: 'Unsere einfache ALL-IN-ONE Assistenz Lösung für Werkstätten, Bildungseinrichtungen und Unternehmen',
        url: 'produkte/alino.html',
        category: 'Produkte',
        keywords: ['assistenz', 'software', 'all-in-one', 'inklusion', 'werkstatt', 'bildung', 'tablet', 'touchscreen']
    },
    {
        title: 'AlinoPlanner',
        description: 'Speziell für strukturierte Tagespläne entwickelt',
        url: 'produkte/alinoplanner.html',
        category: 'Produkte',
        keywords: ['planer', 'tagesplan', 'struktur', 'organisation', 'zeitplan']
    },
    {
        title: 'Xtend Platform',
        description: 'Unsere Modulare Lösung für komplexe Anwendungsfälle',
        url: 'produkte/xtendplatform.html',
        category: 'Produkte',
        keywords: ['modular', 'platform', 'komplex', 'enterprise', 'skalierbar']
    },
    {
        title: 'Individuelle Software',
        description: 'Wir unterstützen Sie mit individuellen Assistenz-Lösungen',
        url: 'produkte/individuellesoftware.html',
        category: 'Produkte',
        keywords: ['individuell', 'custom', 'maßgeschneidert', 'entwicklung', 'beratung']
    },

    // Service & Support
    {
        title: 'Technischer Support',
        description: 'Wir helfen Ihnen schnell, wenn es darauf ankommt',
        url: 'service-support/technischer-support.html',
        category: 'Service & Support',
        keywords: ['support', 'hilfe', 'technisch', 'problem', 'fehler', 'bug', 'ticket']
    },
    {
        title: 'Produkt-Schulungen',
        description: 'Wir vermitteln Ihnen das nötige Know-How schnell & kompakt',
        url: 'service-support/produkt-schulungen.html',
        category: 'Service & Support',
        keywords: ['schulung', 'training', 'workshop', 'lernen', 'weiterbildung', 'seminar']
    },
    {
        title: 'Anwendungsbeitrag',
        description: 'Wir finden Lösungen, die zu Ihnen passen',
        url: 'service-support/anwendungsbeitrag.html',
        category: 'Service & Support',
        keywords: ['beratung', 'consulting', 'lösung', 'anwendung', 'implementation']
    },
    {
        title: 'Video Tutorials',
        description: 'Einfache Schritt-für-Schritt Anleitungen',
        url: 'service-support/video-tutorials.html',
        category: 'Service & Support',
        keywords: ['video', 'tutorial', 'anleitung', 'schritt', 'erklärung', 'howto']
    },
    {
        title: 'Processberatung',
        description: 'Wir helfen Ihnen ihre Abläufe zu optimieren',
        url: 'service-support/processberatung.html',
        category: 'Service & Support',
        keywords: ['prozess', 'optimierung', 'workflow', 'ablauf', 'effizienz', 'lean']
    },
    {
        title: 'Integrationberatung',
        description: 'Wir unterstützen Sie bei einer nahtlosen Integration in bestehende Strukturen',
        url: 'service-support/integrationberatung.html',
        category: 'Service & Support',
        keywords: ['integration', 'einbindung', 'schnittstelle', 'api', 'system']
    },

    // Wissen
    {
        title: 'Blog',
        description: 'Lassen Sie sich von unseren Ideen und Beispielen inspirieren',
        url: 'wissen/blog.html',
        category: 'Wissen',
        keywords: ['blog', 'artikel', 'news', 'neuigkeiten', 'insights', 'praxis']
    },
    {
        title: 'Fallbeispiele',
        description: 'So nutzen Werkstätten und Unternehmen unsere Lösungen',
        url: 'wissen/blog-post-1.html',
        category: 'Wissen',
        keywords: ['fallbeispiel', 'case study', 'erfolg', 'praxis', 'referenz', 'kunde']
    },
    {
        title: 'Forschung',
        description: 'Wir forschen aktiv an neuen Lösungen für Assistenz',
        url: 'wissen/forschung.html',
        category: 'Wissen',
        keywords: ['forschung', 'research', 'innovation', 'entwicklung', 'wissenschaft', 'studie']
    },
    {
        title: 'Whitepaper',
        description: 'Wir denken Forschung praxisnah, damit aus Erkenntnissen Assistenz wird',
        url: 'wissen/whitepaper.html',
        category: 'Wissen',
        keywords: ['whitepaper', 'paper', 'publikation', 'pdf', 'download', 'wissen']
    },
    {
        title: 'Schulungen & Beratung',
        description: 'Lernen Sie Arbeit einfacher, inklusiver und nachhaltiger zu gestalten',
        url: 'service-support/produkt-schulungen.html',
        category: 'Wissen',
        keywords: ['schulung', 'beratung', 'inklusion', 'lean', 'gamification', 'workshop']
    },

    // Kontakt
    {
        title: 'Kontakt',
        description: 'Wir unterstützen Sie gerne. Nehmen Sie Kontakt auf.',
        url: 'kontakt/kontakt-anfragen.html',
        category: 'Kontakt',
        keywords: ['kontakt', 'anfrage', 'email', 'telefon', 'formular', 'nachricht']
    },
    {
        title: 'Über uns',
        description: 'einfache Assistenz für alle – damit Arbeit verständlicher, flexibler und inklusiver wird',
        url: 'kontakt/ueber-uns.html',
        category: 'Kontakt',
        keywords: ['über uns', 'team', 'unternehmen', 'mission', 'vision', 'werte']
    },
    {
        title: 'Karriere',
        description: 'Sie möchten Teil des Teams werden?',
        url: 'kontakt/ueber-uns.html#offene-stellen',
        category: 'Kontakt',
        keywords: ['karriere', 'jobs', 'stellen', 'praktikum', 'werkstudent', 'bachelor', 'master', 'bewerbung']
    },
    {
        title: 'Demo vereinbaren',
        description: 'Vereinbaren Sie eine persönliche Demo unserer Assistenz-Lösungen',
        url: 'kontakt/kontakt-anfragen.html?demo=true',
        category: 'Kontakt',
        keywords: ['demo', 'termin', 'vorstellung', 'präsentation', 'live']
    }
];

/**
 * Search function that returns matching results
 * @param {string} query - Search query
 * @returns {Array} - Array of matching results sorted by relevance
 */
export function search(query) {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results = [];

    searchIndex.forEach(item => {
        let score = 0;

        // Exact title match (highest priority)
        if (item.title.toLowerCase() === searchTerm) {
            score += 100;
        }
        // Title starts with search term
        else if (item.title.toLowerCase().startsWith(searchTerm)) {
            score += 50;
        }
        // Title contains search term
        else if (item.title.toLowerCase().includes(searchTerm)) {
            score += 30;
        }

        // Description contains search term
        if (item.description.toLowerCase().includes(searchTerm)) {
            score += 20;
        }

        // Keywords match
        item.keywords.forEach(keyword => {
            if (keyword.includes(searchTerm)) {
                score += 10;
            }
            if (keyword === searchTerm) {
                score += 25;
            }
        });

        if (score > 0) {
            results.push({
                ...item,
                score
            });
        }
    });

    // Sort by score (highest first)
    return results.sort((a, b) => b.score - a.score);
}
