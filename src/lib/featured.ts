// Picks a spread of standout providers across categories for the
// "Popular near you" carousel on Home.
import { CATS } from '../data/categories';

export interface FeaturedProvider {
  catKey: string;
  index: number;
  theme: string;
  name: string;
  rating: number;
  price: string;
  badge: string;
  deco: string;
}

const PICKS: [string, number][] = [
  ['massage', 1],
  ['barber', 1],
  ['yoga', 0],
  ['tattoo', 0],
  ['nails', 0],
  ['chef', 0],
  ['physio', 1],
];

export const FEATURED: FeaturedProvider[] = PICKS.map(([catKey, index]) => {
  const c = CATS[catKey];
  const p = c.providers[index];
  return {
    catKey,
    index,
    theme: c.theme,
    name: p.name,
    rating: p.rating,
    price: p.price,
    badge: p.badge,
    deco: p.deco,
  };
});
