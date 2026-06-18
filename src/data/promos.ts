// Customer-facing promos/deals and notification alerts (Grab/Gojek-style).

export interface Promo {
  id: string;
  tag: string;
  title: string;
  sub: string;
  cta: string;
  code?: string;
  gradient: string;
  color: string;
  to: string; // route to open
}

export const PROMOS: Promo[] = [
  {
    id: 'p1',
    tag: '★ New customer',
    title: '30% off your first booking',
    sub: 'On any service, up to Rp 150k off. Welcome to Doora.',
    cta: 'Claim offer →',
    code: 'WELCOME30',
    gradient: 'linear-gradient(135deg, #FF5A1F 0%, #B53212 100%)',
    color: '#fff',
    to: '/categories',
  },
  {
    id: 'p2',
    tag: '⚡ Flash deal · ends tonight',
    title: 'Happy Hour massage',
    sub: '20% off all massages booked between 2–5pm today.',
    cta: 'Book now →',
    code: 'HAPPY20',
    gradient: 'linear-gradient(135deg, #E8A0BF, #B5638A)',
    color: '#2A0F1C',
    to: '/category/massage',
  },
  {
    id: 'p3',
    tag: '✦ Premium perk',
    title: 'Free cancellation, always',
    sub: 'Plus members never pay a cancellation fee. 7 days free.',
    cta: 'Try Premium →',
    gradient: 'linear-gradient(135deg, #1A1310, #3F2A1F)',
    color: '#FFB454',
    to: '/premium',
  },
  {
    id: 'p4',
    tag: '🎁 Refer & earn',
    title: 'Give Rp 50k, get Rp 50k',
    sub: 'Invite a friend — you both get Rp 50k wallet credit.',
    cta: 'Invite friends →',
    code: 'FRIEND50',
    gradient: 'linear-gradient(135deg, #6EA8C9, #2E6A8F)',
    color: '#06212E',
    to: '/wallet',
  },
  {
    id: 'p5',
    tag: '🔥 Trending',
    title: 'Barber Week: 15% off',
    sub: 'Sharp fades and hot-towel shaves, all week long.',
    cta: 'Explore barbers →',
    code: 'FRESH15',
    gradient: 'linear-gradient(135deg, #C0A878, #6B5836)',
    color: '#221A0C',
    to: '/category/barber',
  },
];

export interface Notification {
  id: string;
  icon: string;
  title: string;
  sub: string;
  time: string;
  unread: boolean;
  to: string;
}

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', icon: '💆', title: 'Sara is en route', sub: 'Your Deep Tissue booking starts at 14:30. Track live.', time: '2m', unread: true, to: '/messages' },
  { id: 'n2', icon: '🎁', title: '30% off your first booking', sub: 'Use code WELCOME30 at checkout.', time: '1h', unread: true, to: '/categories' },
  { id: 'n3', icon: '⚡', title: 'Flash deal: Happy Hour massage', sub: '20% off massages booked 2–5pm today.', time: '3h', unread: false, to: '/category/massage' },
  { id: 'n4', icon: '✂️', title: 'Booking confirmed', sub: 'Cutmen Mobile · Tomorrow 10:00.', time: '5h', unread: false, to: '/messages' },
  { id: 'n5', icon: '⭐', title: 'How was your session?', sub: 'Leave a review for Lily Lash Studio.', time: '1d', unread: false, to: '/messages?b=t3' },
];
