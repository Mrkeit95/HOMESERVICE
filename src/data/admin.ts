// Platform-wide admin data. Provider/category figures are REAL (from the
// catalog); cross-user aggregates (revenue, users, bookings) are representative
// seed data until the Supabase data migration, after which they become live
// queries. Commission rate is the platform's cut of gross booking value.
import { CATS } from './categories';

export const COMMISSION_RATE = 0.15;

// ---- Real catalog-derived figures ----
export const ADMIN_CATEGORIES = Object.entries(CATS)
  .map(([key, c]) => ({ key, title: c.title, icon: c.icon, providers: c.count }))
  .sort((a, b) => b.providers - a.providers);

export const TOTAL_PROVIDERS = ADMIN_CATEGORIES.reduce((s, c) => s + c.providers, 0);
export const TOTAL_CATEGORIES = ADMIN_CATEGORIES.length;

// A few standout providers pulled from the real catalog, with derived stats.
export const TOP_PROVIDERS = (
  [
    ['massage', 1],
    ['barber', 1],
    ['nails', 0],
    ['yoga', 0],
    ['tattoo', 0],
    ['chef', 0],
    ['physio', 1],
    ['hair', 0],
  ] as [string, number][]
).map(([cat, idx], i) => {
  const c = CATS[cat];
  const p = c.providers[idx];
  const bookings = 540 - i * 47;
  const revenue = bookings * (200_000 + i * 40_000);
  return { name: p.name, category: c.title, theme: c.theme, rating: p.rating, bookings, revenue, status: i % 4 === 3 ? 'paused' : 'active' };
});

// ---- Representative platform aggregates (seed; live after migration) ----
const GMV = 4_280_000_000; // gross merchandise value (total booking value, Rp)

export const ADMIN_STATS = {
  gmv: GMV,
  revenue: Math.round(GMV * COMMISSION_RATE), // platform commission revenue
  bookings: 18_934,
  bookingsThisMonth: 2_140,
  bookingsGrowthPct: 14,
  users: 12_847,
  activeUsers: 4_213,
  newUsersThisWeek: 387,
  usersGrowthPct: 9,
  providers: TOTAL_PROVIDERS,
  pendingProviders: 23,
  payoutsPending: 312_000_000,
  premiumMembers: 1_842,
};

// Monthly revenue (commission), last 8 months, in millions Rp — trending up.
export const MONTHLY_REVENUE = [38, 44, 41, 52, 58, 61, 67, 74];
export const MONTHS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export interface AdminTx {
  id: string;
  user: string;
  provider: string;
  service: string;
  amount: number; // gross booking value
  when: string;
  status: 'completed' | 'upcoming' | 'refunded';
}

// ---- Provider applications awaiting approval (business onboarding queue) ----
export interface ProviderApplication {
  id: string;
  name: string;
  type: 'Solo freelancer' | 'Company';
  category: string;
  theme: string;
  location: string;
  submitted: string;
  idVerified: boolean;
  backgroundCheck: 'cleared' | 'in_progress' | 'flagged';
  license: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

export const PROVIDER_APPLICATIONS: ProviderApplication[] = [
  { id: 'AP-201', name: 'Aria Massage Therapy', type: 'Solo freelancer', category: 'Massage', theme: 'massage', location: 'Canggu', submitted: '2 hours ago', idVerified: true, backgroundCheck: 'cleared', license: true, status: 'pending' },
  { id: 'AP-202', name: 'FadeLab Barbers', type: 'Company', category: 'Barber', theme: 'barber', location: 'Seminyak', submitted: '5 hours ago', idVerified: true, backgroundCheck: 'cleared', license: false, status: 'pending' },
  { id: 'AP-203', name: 'Dewi Nails Home', type: 'Solo freelancer', category: 'Nails', theme: 'nails', location: 'Ubud', submitted: 'Yesterday', idVerified: true, backgroundCheck: 'in_progress', license: false, status: 'pending' },
  { id: 'AP-204', name: 'Bali Recovery Physio', type: 'Company', category: 'Physiotherapy', theme: 'physio', location: 'Canggu', submitted: 'Yesterday', idVerified: true, backgroundCheck: 'cleared', license: true, status: 'pending' },
  { id: 'AP-205', name: 'Ink & Co Tattoo', type: 'Solo freelancer', category: 'Tattoo', theme: 'tattoo', location: 'Kuta', submitted: '2 days ago', idVerified: false, backgroundCheck: 'in_progress', license: false, status: 'pending' },
  { id: 'AP-206', name: 'Zen Yoga Collective', type: 'Company', category: 'Yoga', theme: 'yoga', location: 'Ubud', submitted: '2 days ago', idVerified: true, backgroundCheck: 'flagged', license: true, status: 'pending' },
];

// ---- Users ----
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  joined: string;
  type: 'Customer' | 'Business';
  bookings: number;
  spend: number;
  status: 'active' | 'suspended';
  tier: 'Free' | 'Plus' | 'Elite';
}

export const ADMIN_USERS: AdminUser[] = [
  { id: 'U-8841', name: 'Marcus Lane', email: 'marcus@gmail.com', joined: 'Today', type: 'Customer', bookings: 12, spend: 4_280_000, status: 'active', tier: 'Plus' },
  { id: 'U-8840', name: 'Élise Dubois', email: 'elise@gmail.com', joined: '2h ago', type: 'Customer', bookings: 5, spend: 1_640_000, status: 'active', tier: 'Free' },
  { id: 'U-8839', name: 'Kenji Tanaka', email: 'kenji@gmail.com', joined: '5h ago', type: 'Customer', bookings: 8, spend: 3_120_000, status: 'active', tier: 'Elite' },
  { id: 'U-8838', name: 'Sora Wellness Co.', email: 'hello@sora.co', joined: 'Yesterday', type: 'Business', bookings: 487, spend: 0, status: 'active', tier: 'Free' },
  { id: 'U-8837', name: 'Sofia Rossi', email: 'sofia@gmail.com', joined: 'Yesterday', type: 'Customer', bookings: 3, spend: 980_000, status: 'active', tier: 'Free' },
  { id: 'U-8836', name: 'James Park', email: 'james@gmail.com', joined: '2 days ago', type: 'Customer', bookings: 21, spend: 7_450_000, status: 'active', tier: 'Plus' },
  { id: 'U-8835', name: 'Amara Okafor', email: 'amara@gmail.com', joined: '3 days ago', type: 'Customer', bookings: 6, spend: 2_100_000, status: 'suspended', tier: 'Free' },
];

export const ADMIN_TX: AdminTx[] = [
  { id: 'DR-9921', user: 'Marcus Lane', provider: 'Sora Wellness Co.', service: 'Deep Tissue · 90 min', amount: 490_000, when: 'Today · 14:32', status: 'completed' },
  { id: 'DR-9920', user: 'Élise Dubois', provider: 'Cutmen Mobile', service: 'Skin Fade + Hot Towel', amount: 180_000, when: 'Today · 13:10', status: 'upcoming' },
  { id: 'DR-9919', user: 'Kenji Tanaka', provider: 'The Remedy', service: 'Couples · 90 min', amount: 650_000, when: 'Today · 11:48', status: 'completed' },
  { id: 'DR-9918', user: 'Sofia Rossi', provider: 'Lily Lash Studio', service: 'Hybrid Full Set', amount: 420_000, when: 'Today · 10:22', status: 'completed' },
  { id: 'DR-9917', user: 'James Park', provider: 'Chef Tomasso', service: 'Romantic Dinner · 4 course', amount: 1_200_000, when: 'Yesterday · 19:00', status: 'completed' },
  { id: 'DR-9916', user: 'Amara Okafor', provider: 'Recover Bali', service: 'Sports Injury · 60 min', amount: 550_000, when: 'Yesterday · 16:30', status: 'completed' },
  { id: 'DR-9915', user: 'Liam Murphy', provider: 'Inkbound Studio', service: 'Fine line · half day', amount: 2_400_000, when: 'Yesterday · 12:00', status: 'upcoming' },
  { id: 'DR-9914', user: 'Nina Schmidt', provider: 'Sharp & Co.', service: 'Signature cut', amount: 250_000, when: '2 days ago · 15:15', status: 'refunded' },
  { id: 'DR-9913', user: 'Tomás Vidal', provider: 'Stretch Lab Bali', service: 'Assisted · 50 min', amount: 380_000, when: '2 days ago · 09:40', status: 'completed' },
  { id: 'DR-9912', user: 'Aria Putri', provider: 'Bliss Nails', service: 'Gel mani + pedi', amount: 320_000, when: '2 days ago · 11:00', status: 'completed' },
];
