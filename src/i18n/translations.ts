// Translation dictionary. English + Bahasa Indonesia are fully translated for
// the key UI; other languages fall back to English until translated. Add a
// language by adding its code here and filling in the strings.
export const LANGUAGES: { code: string; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export type Lang = string;
export type TKey = keyof typeof EN;

const EN = {
  'nav.discover': 'Discover',
  'nav.categories': 'Categories',
  'nav.wallet': 'Wallet',
  'nav.messages': 'Messages',
  'nav.premium': 'Premium',
  'nav.account': 'Account',
  'nav.business': 'Business',
  'common.balance': 'Balance',
  'home.heroEyebrow': 'Home Services · On Demand',
  'home.heroTitle1': 'Open the door',
  'home.heroTitle2': 'to anything.',
  'home.heroSub': 'Massage, barbers, yoga, tattoos, physio — whatever you need, the right pro shows up where you are.',
  'home.searchPlaceholder': "Try 'barber' or 'deep tissue massage'...",
  'home.search': 'Search',
  'home.deals': 'Deals & promotions',
  'home.popular': 'Popular near you',
  'home.browseAll': 'Browse all categories',
  'home.seeAll': 'See all →',
  'home.viewAll': 'View all →',
  'home.filter': 'Filter',
  'home.forHer': 'Curated for Her',
  'home.forHim': 'Curated for Him',
  'home.exploreAll': 'Explore all →',
  'filter.all': 'All',
  'filter.everyone': 'Everyone',
  'filter.women': 'Women',
  'filter.men': 'Men',
} as const;

const ID: Partial<Record<TKey, string>> = {
  'nav.discover': 'Jelajah',
  'nav.categories': 'Kategori',
  'nav.wallet': 'Dompet',
  'nav.messages': 'Pesan',
  'nav.premium': 'Premium',
  'nav.account': 'Akun',
  'nav.business': 'Bisnis',
  'common.balance': 'Saldo',
  'home.heroEyebrow': 'Layanan Rumah · Sesuai Permintaan',
  'home.heroTitle1': 'Buka pintu',
  'home.heroTitle2': 'ke apa saja.',
  'home.heroSub': 'Pijat, tukang cukur, yoga, tato, fisio — apa pun yang Anda butuhkan, profesional yang tepat datang ke tempat Anda.',
  'home.searchPlaceholder': "Coba 'tukang cukur' atau 'pijat deep tissue'...",
  'home.search': 'Cari',
  'home.deals': 'Promo & penawaran',
  'home.popular': 'Populer di dekat Anda',
  'home.browseAll': 'Jelajahi semua kategori',
  'home.seeAll': 'Lihat semua →',
  'home.viewAll': 'Lihat semua →',
  'home.filter': 'Filter',
  'home.forHer': 'Untuk Dia (Wanita)',
  'home.forHim': 'Untuk Dia (Pria)',
  'home.exploreAll': 'Jelajahi semua →',
  'filter.all': 'Semua',
  'filter.everyone': 'Semua orang',
  'filter.women': 'Wanita',
  'filter.men': 'Pria',
};

export const TRANSLATIONS: Record<string, Partial<Record<TKey, string>>> = {
  en: EN,
  id: ID,
};

export function translate(lang: Lang, key: TKey): string {
  return TRANSLATIONS[lang]?.[key] ?? EN[key] ?? key;
}
