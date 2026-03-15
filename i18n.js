// Sistema di internazionalizzazione
let translations = {};
let currentLanguage = localStorage.getItem('selectedLanguage') || 'ita';

// Esponi globalmente per usarli in altri script
window.translations = translations;
window.currentLanguage = currentLanguage;

// Carica le traduzioni
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        window.translations = translations;
        return translations;
    } catch (error) {
        console.error('Errore caricamento traduzioni:', error);
        return null;
    }
}

// Applica le traduzioni alla pagina
function applyTranslations(lang) {
    if (!translations[lang]) {
        console.error('Lingua non trovata:', lang);
        return;
    }

    const t = translations[lang];

    // Traduci elementi con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        // Solo se non siamo in italiano, sovrascrivi se esiste la traduzione
        if (lang !== 'ita') {
            const translation = getNestedTranslation(t, key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        }
    });

    // Traduci elementi con data-i18n-html (per contenuti HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        // Solo se non siamo in italiano, sovrascrivi se esiste la traduzione
        if (lang !== 'ita') {
            const translation = getNestedTranslation(t, key);
            if (translation) {
                element.innerHTML = translation;
            }
        }
    });

    // Aggiorna l'attributo lang del documento
    document.documentElement.lang = lang === 'cz' ? 'cs' : lang;
}

// Ottieni traduzione da chiave nidificata (es. "header.title")
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Cambia lingua
function changeLanguage(lang) {
    currentLanguage = lang;
    window.currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    applyTranslations(lang);
    
    // Aggiorna il selettore se presente
    const selector = document.getElementById('language-select');
    if (selector) {
        selector.value = lang;
    }
}

// Inizializza il sistema di traduzione
async function initI18n() {
    await loadTranslations();
    
    // Applica lingua salvata
    applyTranslations(currentLanguage);
    
    // Setup selettore lingua
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
}

// Inizializza quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}
