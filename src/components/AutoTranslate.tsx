import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useT } from '../i18n/LanguageProvider';

// Whole-page auto-translation. When a non-English language is active, this walks
// the rendered DOM, translates visible English text via the cached proxy, and
// re-applies on navigation / re-render. Reuses the same cache as tx(). It only
// touches text nodes (never inputs/values), stores each node's original English,
// and pauses the observer while writing so it never loops.
const CACHE_KEY = 'doora.tcache.v1';
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'INPUT', 'TEXTAREA', 'SELECT', 'svg', 'SVG']);
// Reject pure numbers / symbols / currency / short glyphs (nothing to translate).
const SKIPPABLE = /^[\s\d.,:%+\-—·•()$£€★✓✕✦→←#@/|❤♡＋–]*$/;

function loadCache(): Record<string, Record<string, string>> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

export default function AutoTranslate() {
  const { lang } = useT();
  const { pathname } = useLocation();
  const origMap = useRef(new WeakMap<Node, string>());
  const busy = useRef(false);

  useEffect(() => {
    if (lang === 'en') return;
    const root = document.body;
    let observer: MutationObserver | null = null;
    let timer: number | undefined;
    const cache = loadCache();
    const map = (cache[lang] ||= {});

    const run = async () => {
      if (busy.current) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
          const t = n.nodeValue || '';
          if (!t.trim() || SKIPPABLE.test(t)) return NodeFilter.FILTER_REJECT;
          const p = n.parentElement;
          if (!p || SKIP_TAGS.has(p.tagName) || p.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      const jobs: { node: Node; orig: string }[] = [];
      const need = new Set<string>();
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const cur = node.nodeValue || '';
        let orig = origMap.current.get(node);
        if (orig === undefined) {
          orig = cur; // first sighting → current text is the English original
          origMap.current.set(node, orig);
        } else if (cur !== orig && cur !== map[orig]) {
          orig = cur; // React replaced it with new English text in place
          origMap.current.set(node, orig);
        }
        if (cur === map[orig]) continue; // already translated
        jobs.push({ node, orig });
        if (!map[orig]) need.add(orig);
      }

      // Fetch missing translations (chunked).
      const list = [...need];
      for (let i = 0; i < list.length; i += 60) {
        const q = list.slice(i, i + 60);
        try {
          const r = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q, target: lang }) });
          const data = await r.json();
          for (const [en, tr] of Object.entries(data.translations || {})) if (tr) map[en] = tr as string;
        } catch {
          /* offline / dev — leave English */
        }
      }
      if (need.size) {
        cache[lang] = map;
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        } catch {
          /* quota */
        }
      }

      // Apply (observer paused so our writes don't retrigger).
      busy.current = true;
      observer?.disconnect();
      for (const { node, orig } of jobs) {
        const tr = map[orig];
        if (tr && node.nodeValue !== tr) node.nodeValue = tr;
      }
      observer?.observe(root, { childList: true, subtree: true, characterData: true });
      busy.current = false;
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(run, 250);
    };
    observer = new MutationObserver(() => { if (!busy.current) schedule(); });
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    schedule();

    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
    };
  }, [lang, pathname]);

  return null;
}
