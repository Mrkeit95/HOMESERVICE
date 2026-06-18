// The category browse grid on the home page, grouped by section.
// `badge` maps to the colored corner dot: e = everyone, f = women, m = men.
// `key` matches a key in CATS (src/data/categories.ts) where one exists.

export type AudienceBadge = 'e' | 'f' | 'm';

export interface HomeCategory {
  key: string;
  icon: string;
  name: string;
  count: string;
  badge: AudienceBadge;
}

export interface HomeCategoryGroup {
  title: string;
  countLabel: string;
  items: HomeCategory[];
}

export const HOME_CATEGORY_GROUPS: HomeCategoryGroup[] = [
  {
    title: 'Wellness & Bodywork',
    countLabel: '8 categories',
    items: [
      { key: 'massage', icon: '💆', name: 'Massage', count: '142 pros', badge: 'e' },
      { key: 'physio', icon: '🦴', name: 'Physio', count: '23 pros', badge: 'e' },
      { key: 'chiro', icon: '🧘', name: 'Chiro', count: '12 pros', badge: 'e' },
      { key: 'stretch', icon: '🤸', name: 'Stretching', count: '18 pros', badge: 'e' },
      { key: 'yoga', icon: '🧘‍♀️', name: 'Yoga', count: '47 pros', badge: 'e' },
      { key: 'pilates', icon: '🤍', name: 'Pilates', count: '22 pros', badge: 'e' },
      { key: 'meditation', icon: '🧠', name: 'Meditation', count: '17 pros', badge: 'e' },
      { key: 'pt', icon: '🏋️', name: 'PT', count: '34 pros', badge: 'e' },
    ],
  },
  {
    title: 'Hair & Grooming',
    countLabel: '3 categories',
    items: [
      { key: 'barber', icon: '✂️', name: 'Barber', count: '68 pros', badge: 'm' },
      { key: 'hair', icon: '💇‍♀️', name: 'Hair Styling', count: '76 pros', badge: 'f' },
      { key: 'waxing', icon: '🪷', name: 'Waxing', count: '41 pros', badge: 'f' },
    ],
  },
  {
    title: 'Beauty',
    countLabel: '6 categories',
    items: [
      { key: 'nails', icon: '💅', name: 'Nails', count: '94 pros', badge: 'f' },
      { key: 'lashes', icon: '👁️', name: 'Lashes', count: '52 pros', badge: 'f' },
      { key: 'brows', icon: '✨', name: 'Brows', count: '44 pros', badge: 'f' },
      { key: 'makeup', icon: '💄', name: 'Makeup', count: '38 pros', badge: 'f' },
      { key: 'facials', icon: '🧖', name: 'Facials', count: '61 pros', badge: 'e' },
      { key: 'skincare', icon: '🌟', name: 'Skincare', count: '27 pros', badge: 'e' },
    ],
  },
  {
    title: 'Body Art & Specialty',
    countLabel: '2 categories',
    items: [
      { key: 'tattoo', icon: '🎨', name: 'Tattoo', count: '31 pros', badge: 'e' },
      { key: 'piercing', icon: '💎', name: 'Piercing', count: '14 pros', badge: 'e' },
    ],
  },
  {
    title: 'Lessons & Learning',
    countLabel: '2 categories',
    items: [
      { key: 'language', icon: '🗣️', name: 'Language Lessons', count: '42 pros', badge: 'e' },
      { key: 'music', icon: '🎵', name: 'Music Lessons', count: '36 pros', badge: 'e' },
    ],
  },
  {
    title: 'Home & Lifestyle',
    countLabel: '2 categories',
    items: [
      { key: 'chef', icon: '🍳', name: 'Private Chef', count: '38 pros', badge: 'e' },
      { key: 'cleaning', icon: '🧹', name: 'Cleaning', count: '54 pros', badge: 'e' },
    ],
  },
  {
    title: 'Home Repairs',
    countLabel: '3 categories',
    items: [
      { key: 'ac', icon: '❄️', name: 'AC Repair', count: '28 pros', badge: 'e' },
      { key: 'electrical', icon: '⚡', name: 'Electrical', count: '19 pros', badge: 'e' },
      { key: 'plumbing', icon: '🔧', name: 'Plumbing', count: '22 pros', badge: 'e' },
    ],
  },
  {
    title: 'Health & Recovery',
    countLabel: '1 category',
    items: [
      { key: 'ivdrip', icon: '💉', name: 'IV Drips', count: '11 pros', badge: 'e' },
    ],
  },
  {
    title: 'Events & Celebrations',
    countLabel: '7 categories',
    items: [
      { key: 'photo', icon: '📸', name: 'Photography', count: '46 pros', badge: 'e' },
      { key: 'video', icon: '🎥', name: 'Videography', count: '28 pros', badge: 'e' },
      { key: 'florist', icon: '💐', name: 'Florists', count: '34 pros', badge: 'e' },
      { key: 'cakes', icon: '🎂', name: 'Cakes', count: '31 pros', badge: 'e' },
      { key: 'entertainment', icon: '🎭', name: 'Entertainment', count: '38 pros', badge: 'e' },
      { key: 'decorator', icon: '🎀', name: 'Decorators', count: '24 pros', badge: 'e' },
      { key: 'bridal', icon: '👰', name: 'Bridal Glam', count: '19 pros', badge: 'f' },
    ],
  },
];
