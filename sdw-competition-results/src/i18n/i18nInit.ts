import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'locales/en.json';
import es from 'locales/es.json';
import fr from 'locales/fr.json';
import it from 'locales/it.json';
import zh from 'locales/zh.json';
// Initialize i18next only if it's not already initialized
export const initializeI18n = () => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources: {
        en: { translation: en },
        es: { translation: es },
        fr: { translation: fr },
        it: { translation: it },
        zh: { translation: zh },
      },
      lng: 'en', // default language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // React already escapes values
      },
    });
  }
};
