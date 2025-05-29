    import i18n from 'i18next';
    import { initReactI18next } from 'react-i18next';
    import en from './translation/en.json';  // English translations
    import fr from './translation/fr.json';  // French translations

    i18n.use(initReactI18next).init({
      resources: {
        en: { translation: en },
        fr: { translation: fr },
      },
      lng: 'en', // Default language
      fallbackLng: 'en', // Fallback language if the chosen language is not available
      interpolation: {
        escapeValue: false,
      },
    });

    export default i18n;