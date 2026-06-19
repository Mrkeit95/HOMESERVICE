// Promo codes / offers a customer can apply at checkout (Grab/Gojek-style).
// Kept in sync with the marketing copy on the Home promo cards.
export interface Offer {
  code: string;
  label: string; // short headline shown in the offers list
  desc: string; // one-line terms
  kind: 'pct' | 'flat'; // percentage off vs flat Rp off
  value: number; // pct (0–100) or flat amount in Rp
  cap?: number; // max discount in Rp (for pct offers)
  min?: number; // minimum order value in Rp
}

export const OFFERS: Offer[] = [
  { code: 'WELCOME30', label: '30% off your first booking', desc: 'Up to Rp 150k off any service.', kind: 'pct', value: 30, cap: 150000 },
  { code: 'HAPPY20', label: 'Happy Hour · 20% off massage', desc: '20% off, bookings 2–5pm.', kind: 'pct', value: 20, cap: 100000 },
  { code: 'FRIEND50', label: 'Referral · Rp 50k off', desc: 'Flat Rp 50k off any booking.', kind: 'flat', value: 50000 },
  { code: 'WEEKEND15', label: 'Weekend treat · 15% off', desc: '15% off, min spend Rp 100k.', kind: 'pct', value: 15, cap: 80000, min: 100000 },
  { code: 'DOORA10', label: 'Members · 10% off', desc: '10% off, no minimum.', kind: 'pct', value: 10, cap: 60000 },
];

export function findOffer(code: string): Offer | undefined {
  const c = code.trim().toUpperCase();
  return OFFERS.find((o) => o.code === c);
}

// Returns the discount (Rp) an offer yields on a given order, capped & floored.
export function discountFor(offer: Offer, price: number): number {
  if (offer.min && price < offer.min) return 0;
  const raw = offer.kind === 'pct' ? Math.round((price * offer.value) / 100) : offer.value;
  const capped = offer.cap ? Math.min(raw, offer.cap) : raw;
  return Math.max(0, Math.min(capped, price)); // never exceed the price
}

// Validity message for a code against a price (for inline feedback).
export function offerError(offer: Offer, price: number): string | null {
  if (offer.min && price < offer.min) return `Min spend ${Math.round(offer.min / 1000)}k for this code.`;
  return null;
}
