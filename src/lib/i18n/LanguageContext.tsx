"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { en } from './en';
import { zh } from './zh';
import { vi } from './vi';
import { useSession } from 'next-auth/react';

type Language = 'en' | 'zh' | 'vi';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isLoading: boolean;
}

const translations = {
  en,
  zh,
  vi,
};

// Cookie configuration
const LANGUAGE_COOKIE_NAME = 'preferred_language';
const COOKIE_OPTIONS = {
  expires: 365, // Cookie expires in 1 year
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [language, setLanguage] = useState<Language>('en');
  const [t, setT] = useState<Translations>(translations[language]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If session is loading, keep isLoading true
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    // After session check, proceed with language setup
    const savedLang = Cookies.get(LANGUAGE_COOKIE_NAME) as Language;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
      setT(translations[savedLang]);
    } else {
      const browserLang = navigator.language.split('-')[0] as Language;
      if (translations[browserLang]) {
        setLanguage(browserLang);
        setT(translations[browserLang]);
        Cookies.set(LANGUAGE_COOKIE_NAME, browserLang, COOKIE_OPTIONS);
      } else {
        setLanguage('en');
        setT(translations.en);
        Cookies.set(LANGUAGE_COOKIE_NAME, 'en', COOKIE_OPTIONS);
      }
    }
    setIsLoading(false);
  }, [status]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setT(translations[lang]);
    Cookies.set(LANGUAGE_COOKIE_NAME, lang, COOKIE_OPTIONS);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 