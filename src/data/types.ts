// Domain types for Doora catalog + messaging data.
// Permissive by design — these mirror the prototype's mock shapes and will
// tighten once the Supabase schema lands.

export interface Provider {
  name: string;
  pat: string;
  deco: string;
  badge: string;
  badgeType?: 'hot' | 'green' | string;
  rating: number;
  meta: string[];
  tags: string[];
  price: string;
  sub: string;
  team: string[];
  stat: string;
  statLabel: string;
}

export interface Category {
  icon: string;
  theme: string;
  count: number;
  eyebrow: string;
  title: string;
  sub: string;
  subs: string[];
  providers: Provider[];
}

export type CategoryMap = Record<string, Category>;

export interface CategoryContext {
  aboutTemplate?: (p: Provider, c: Record<string, unknown>) => string;
  [key: string]: unknown;
}

export type CatContext = Record<string, CategoryContext>;

export interface ChatMessage {
  kind?: 'system';
  who?: 'me' | 'them';
  text: string;
  time?: string;
  read?: boolean;
  unread?: boolean;
}

export interface Thread {
  id: string;
  providerName: string;
  providerTheme: string;
  providerAvatar: string;
  role: string;
  lastTime: string;
  unread: number;
  online: boolean;
  booking: { service: string; when: string; status: string; icon: string };
  messages: ChatMessage[];
  suggestions: string[];
}
