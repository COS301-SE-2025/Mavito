// src/i18n.tsx (Corrected)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const getBasePath = () => '/';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'zu', 'af', 'st', 'xh'],
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${getBasePath()}locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'mavitoAppLng',
      caches: ['localStorage'],
    },
    react: {
      useSuspense: true,
    },
  })
  .then(() => {
    console.log('i18next has been initialized successfully.');
  })
  // FIX: Type the error as 'unknown' and perform a type check
  .catch((err: unknown) => {
    let errorMessage =
      'An unknown error occurred during i18next initialization.';
    if (err instanceof Error) {
      errorMessage = `Error initializing i18next: ${err.message}`;
    }
    console.error(errorMessage, err);
  });

export default i18n;
