// Real, themed, keyless photos via LoremFlickr (deterministic per seed via the
// ?lock param). Used to make provider scenes look like real places instead of
// generated art. The SVG generator stays as a fallback if an image fails.
const KEYWORDS: Record<string, string> = {
  massage: 'massage,spa',
  barber: 'barbershop',
  physio: 'physiotherapy',
  chiro: 'chiropractic',
  yoga: 'yoga',
  tattoo: 'tattoo,studio',
  nails: 'manicure,nails',
  lashes: 'eyelashes,beauty',
  makeup: 'makeup',
  facials: 'facial,skincare',
  facial: 'facial,skincare',
  hair: 'hairsalon,hairstyle',
  pilates: 'pilates',
  stretch: 'stretching,fitness',
  pt: 'fitness,trainer',
  waxing: 'spa,beauty',
  brows: 'eyebrows,beauty',
  meditation: 'meditation',
  piercing: 'piercing,jewelry',
  bridal: 'bridal,makeup',
  skincare: 'skincare',
  chef: 'chef,food',
  cleaning: 'cleaning,home',
  language: 'books,study',
  music: 'music,guitar',
  ivdrip: 'clinic,medical',
  ac: 'airconditioner',
  electrical: 'electrician',
  plumbing: 'plumbing',
  photo: 'photographer,camera',
  video: 'videography,camera',
  florist: 'florist,flowers',
  cakes: 'cake,bakery',
  entertainment: 'party,dj',
  decorator: 'eventdecor,decoration',
};

function hash(str: string): number {
  let s = 0;
  for (let i = 0; i < str.length; i++) s = ((s << 5) - s + str.charCodeAt(i)) | 0;
  return Math.abs(s);
}

// Themed photo URL for a provider scene. seed keeps the image stable per card.
export function photoFor(theme: string, seed: string, w = 600, h = 400): string {
  const kw = KEYWORDS[theme] || 'wellness';
  const lock = (hash(seed) % 200) + 1;
  return `https://loremflickr.com/${w}/${h}/${kw}?lock=${lock}`;
}
