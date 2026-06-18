// Lightweight query → category resolver for the home search bar.
// Matches against category key/title/sub-services/tags/provider names and
// returns ranked results. resolveQuery() picks the single best category.
import { CATS } from '../data/categories';
import { HOME_CATEGORY_GROUPS } from '../config/homeCategories';

export interface SearchHit {
  key: string;
  title: string;
  score: number;
}

// Friendly display name per category key, falling back to CATS title.
const NAME_BY_KEY: Record<string, string> = Object.fromEntries(
  HOME_CATEGORY_GROUPS.flatMap((g) => g.items.map((i) => [i.key, i.name])),
);

function categoryHaystack(key: string): string {
  const c = CATS[key];
  if (!c) return key;
  const tags = c.providers.flatMap((p) => [...p.tags, p.name]);
  return [key, c.title, c.eyebrow, ...c.subs, ...tags].join(' ').toLowerCase();
}

export function searchCategories(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];
  for (const key of Object.keys(CATS)) {
    const c = CATS[key];
    const title = NAME_BY_KEY[key] || c.title;
    let score = 0;
    if (key === q || c.title.toLowerCase() === q) score = 100;
    else if (key.startsWith(q) || c.title.toLowerCase().startsWith(q)) score = 80;
    else if (c.title.toLowerCase().includes(q) || (title || '').toLowerCase().includes(q)) score = 60;
    else if (c.subs.some((s) => s.toLowerCase().includes(q))) score = 40;
    else if (categoryHaystack(key).includes(q)) score = 20;
    if (score > 0) hits.push({ key, title, score });
  }
  return hits.sort((a, b) => b.score - a.score);
}

// Best category key for a query, or null if nothing matches.
export function resolveQuery(query: string): string | null {
  return searchCategories(query)[0]?.key ?? null;
}
