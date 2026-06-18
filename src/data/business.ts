// Mock data for the Business (provider) side — the logged-in provider's own
// business. Stands in for what will become a dedicated business account mode.

export interface BizBooking {
  id: string;
  customer: string;
  initials: string;
  service: string;
  when: string;
  price: number;
  status: 'request' | 'upcoming' | 'completed';
  address: string;
  note?: string;
}

export interface BizService {
  id: string;
  name: string;
  duration: string;
  price: number;
  active: boolean;
  booked: number; // times booked this month
}

export interface BizReview {
  id: string;
  customer: string;
  initials: string;
  rating: number;
  text: string;
  when: string;
  service: string;
  reply?: string;
}

export const BUSINESS = {
  profile: {
    name: 'Sora Wellness Co.',
    theme: 'massage',
    category: 'Massage · Wellness & Bodywork',
    tagline: 'Authentic Balinese & deep-tissue bodywork, brought to your villa.',
    rating: 4.94,
    reviewCount: 487,
    memberSince: 'Member since 2021',
    location: 'Canggu, Bali',
    team: 8,
    responseRate: '98%',
    repeatRate: '64%',
  },
  kpis: {
    todayEarnings: 1_470_000,
    monthEarnings: 28_600_000,
    monthGrowthPct: 18,
    bookingsToday: 4,
    bookingsWeek: 21,
    profileViews: 1_284,
    viewsGrowthPct: 9,
  },
  // Simple weekly earnings (Mon–Sun) for the mini chart, in thousands of Rp.
  weeklyEarnings: [2200, 3100, 1800, 2600, 3400, 4200, 3000],
  earnings: {
    available: 6_250_000,
    pending: 1_960_000,
    nextPayout: 'Fri, 20 Jun',
    lastMonth: 24_200_000,
  },
} as const;

export const BIZ_BOOKINGS: BizBooking[] = [
  { id: 'b1', customer: 'Marcus Lane', initials: 'M', service: 'Deep Tissue · 90 min', when: 'Today · 14:30', price: 490_000, status: 'request', address: 'Villa Berawa No. 14, Canggu', note: 'Tight shoulders from surfing — prefers deep pressure.' },
  { id: 'b2', customer: 'Élise Dubois', initials: 'É', service: 'Balinese · 60 min', when: 'Today · 17:00', price: 350_000, status: 'request', address: 'The Chillhouse, Canggu' },
  { id: 'b3', customer: 'Kenji Tanaka', initials: 'K', service: 'Couples · 90 min', when: 'Tomorrow · 10:00', price: 700_000, status: 'upcoming', address: 'Villa Uma, Pererenan', note: 'Anniversary — please bring extra candles.' },
  { id: 'b4', customer: 'Sofia Rossi', initials: 'S', service: 'Aromatherapy · 75 min', when: 'Tomorrow · 16:00', price: 420_000, status: 'upcoming', address: 'Como Uma, Canggu' },
  { id: 'b5', customer: 'James Park', initials: 'J', service: 'Sports Recovery · 60 min', when: 'Sat · 09:00', price: 380_000, status: 'upcoming', address: 'Finns Beach Club area' },
  { id: 'b6', customer: 'Amara Okafor', initials: 'A', service: 'Deep Tissue · 60 min', when: 'Yesterday · 15:00', price: 350_000, status: 'completed', address: 'Villa Tomar, Canggu' },
  { id: 'b7', customer: 'Liam Murphy', initials: 'L', service: 'Hot Stone · 90 min', when: '2 days ago · 11:00', price: 520_000, status: 'completed', address: 'Desa Potato Head' },
];

export const BIZ_SERVICES: BizService[] = [
  { id: 's1', name: 'Balinese Massage', duration: '60 min', price: 350_000, active: true, booked: 42 },
  { id: 's2', name: 'Deep Tissue Recovery', duration: '90 min', price: 490_000, active: true, booked: 38 },
  { id: 's3', name: 'Aromatherapy', duration: '75 min', price: 420_000, active: true, booked: 21 },
  { id: 's4', name: 'Hot Stone Therapy', duration: '90 min', price: 520_000, active: true, booked: 17 },
  { id: 's5', name: 'Couples Massage', duration: '90 min', price: 700_000, active: true, booked: 14 },
  { id: 's6', name: 'Four Hands Massage', duration: '60 min', price: 650_000, active: false, booked: 0 },
];

export const BIZ_REVIEWS: BizReview[] = [
  { id: 'r1', customer: 'Amara Okafor', initials: 'A', rating: 5, text: 'Sara was incredible — best deep tissue I\'ve had in Bali. Arrived early and totally professional.', when: '1 day ago', service: 'Deep Tissue · 60 min', reply: 'Thank you Amara! Sara loved working with you 🌿' },
  { id: 'r2', customer: 'Liam Murphy', initials: 'L', rating: 5, text: 'The hot stone session melted a week of desk-hunch away. Will book weekly.', when: '2 days ago', service: 'Hot Stone · 90 min' },
  { id: 'r3', customer: 'Nina Schmidt', initials: 'N', rating: 4, text: 'Lovely massage, slightly late arriving but they messaged ahead so no issue.', when: '4 days ago', service: 'Balinese · 60 min' },
  { id: 'r4', customer: 'Tomás Vidal', initials: 'T', rating: 5, text: 'Couples session for our anniversary was perfect. Highly recommend.', when: '1 week ago', service: 'Couples · 90 min', reply: 'So glad we could be part of your celebration! 💕' },
];
