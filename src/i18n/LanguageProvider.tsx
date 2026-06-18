import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translate, LANGUAGES, type Lang, type TKey } from './translations';

const STORAGE_KEY = 'doora.lang.v1';

// Auto-detect from the browser locale on first visit, mapping to a supported
// language; default English.
function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
  } catch {
    /* ignore */
  }
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return LANGUAGES.some((l) => l.code === nav) ? nav : 'en';
}

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  // Allow non-React code (legacy settings <select>) to change language.
  useEffect(() => {
    const handler = (e: Event) => setLangState((e as CustomEvent).detail);
    window.addEventListener('doora:setlang', handler);
    return () => window.removeEventListener('doora:setlang', handler);
  }, []);

  const value: LangCtx = {
    lang,
    setLang: setLangState,
    t: (key) => translate(lang, key),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useT(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useT must be used within LanguageProvider');
  return ctx;
}
