import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { translate, EN_FALLBACK, LANGUAGES, type Lang, type TKey } from './translations';

const STORAGE_KEY = 'doora.lang.v1';
const CACHE_KEY = 'doora.tcache.v1';

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

// Persisted auto-translation cache: { [lang]: { [english]: translated } }.
type Cache = Record<string, Record<string, string>>;
function loadCache(): Cache {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string; // keyed UI strings
  tx: (english: string) => string; // arbitrary English → auto-translated
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);
  const cacheRef = useRef<Cache>(loadCache());
  const [, force] = useState(0); // bump to re-render when translations arrive
  const pending = useRef<Set<string>>(new Set());
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const handler = (e: Event) => setLangState((e as CustomEvent).detail);
    window.addEventListener('doora:setlang', handler);
    return () => window.removeEventListener('doora:setlang', handler);
  }, []);

  // Batch + fetch any English strings missing a translation for `lang`.
  const flush = () => {
    const q = [...pending.current];
    pending.current.clear();
    if (!q.length) return;
    const target = lang;
    fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, target }),
    })
      .then((r) => r.json())
      .then((data: { translations: Record<string, string> }) => {
        const map = (cacheRef.current[target] ||= {});
        let changed = false;
        for (const [en, tr] of Object.entries(data.translations || {})) {
          if (tr && tr !== map[en]) {
            map[en] = tr;
            changed = true;
          }
        }
        if (changed) {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheRef.current));
          } catch {
            /* ignore quota */
          }
          force((n) => n + 1);
        }
      })
      .catch(() => {});
  };

  // Auto-translate arbitrary English text (cached). Returns English while the
  // translation is being fetched, then re-renders with the translated value.
  const tx = (english: string): string => {
    if (lang === 'en' || !english || !english.trim()) return english;
    const cached = cacheRef.current[lang]?.[english];
    if (cached) return cached;
    if (!pending.current.has(english)) {
      pending.current.add(english);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(flush, 180);
    }
    return english;
  };

  const value: LangCtx = {
    lang,
    setLang: setLangState,
    // Use the static translation if we have one; otherwise auto-translate the
    // English fallback so every language is covered.
    t: (key) => {
      const stat = translate(lang, key);
      const en = EN_FALLBACK[key];
      return stat !== en ? stat : tx(en);
    },
    tx,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useT(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useT must be used within LanguageProvider');
  return ctx;
}
