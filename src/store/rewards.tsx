// Customer loyalty store — points + tier, persisted to localStorage.
// Points are earned per booking and redeemed for credits, discounts, or free
// services to keep customers on-platform.
import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';

interface RewardsState {
  points: number; // spendable balance
  lifetime: number; // lifetime points (drives tier)
  bookings: number;
  redeemed: string[];
}

const STORAGE_KEY = 'doora.rewards.v1';

const SEED: RewardsState = { points: 1850, lifetime: 3650, bookings: 12, redeemed: [] };

export interface Tier {
  name: string;
  min: number;
  perk: string;
  color: string;
}

export const TIERS: Tier[] = [
  { name: 'Bronze', min: 0, perk: 'Earn 1 point per Rp 1k spent', color: '#C77B3F' },
  { name: 'Silver', min: 1500, perk: '+5% bonus points · birthday treat', color: '#B8C0CC' },
  { name: 'Gold', min: 5000, perk: '+10% points · priority support', color: '#FFB454' },
  { name: 'Platinum', min: 12000, perk: '+15% points · free monthly service', color: '#E8E2D4' },
];

export function tierFor(lifetime: number): { current: Tier; next: Tier | null; progress: number } {
  let current = TIERS[0];
  for (const t of TIERS) if (lifetime >= t.min) current = t;
  const idx = TIERS.indexOf(current);
  const next = TIERS[idx + 1] ?? null;
  const progress = next ? (lifetime - current.min) / (next.min - current.min) : 1;
  return { current, next, progress: Math.min(1, Math.max(0, progress)) };
}

export interface Reward {
  id: string;
  title: string;
  sub: string;
  cost: number;
  icon: string;
  credit?: number; // if set, redeeming adds this wallet credit (Rp)
}

export const REWARDS: Reward[] = [
  { id: 'credit50', title: 'Rp 50.000 wallet credit', sub: 'Instant top-up to your wallet', cost: 500, icon: '💰', credit: 50_000 },
  { id: 'discount20', title: '20% off your next booking', sub: 'Auto-applied at checkout', cost: 800, icon: '🏷️' },
  { id: 'priority', title: '1 month priority booking', sub: 'Skip the wait-list', cost: 1200, icon: '⚡' },
  { id: 'credit150', title: 'Rp 150.000 wallet credit', sub: 'Instant top-up to your wallet', cost: 1400, icon: '💰', credit: 150_000 },
  { id: 'freemassage', title: 'Free 60-min massage', sub: 'Any massage provider', cost: 2500, icon: '💆' },
];

function load(): RewardsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as RewardsState;
  } catch {
    /* ignore */
  }
  return SEED;
}

type Action =
  | { type: 'earn'; points: number }
  | { type: 'redeem'; id: string; cost: number };

function reducer(state: RewardsState, action: Action): RewardsState {
  switch (action.type) {
    case 'earn':
      return { ...state, points: state.points + action.points, lifetime: state.lifetime + action.points, bookings: state.bookings + 1 };
    case 'redeem':
      if (state.points < action.cost) return state;
      return { ...state, points: state.points - action.cost, redeemed: [...state.redeemed, action.id] };
    default:
      return state;
  }
}

interface RewardsCtx {
  points: number;
  lifetime: number;
  bookings: number;
  redeemed: string[];
  earn: (points: number) => void;
  redeem: (id: string, cost: number) => boolean;
}

const Ctx = createContext<RewardsCtx | null>(null);

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const value: RewardsCtx = {
    points: state.points,
    lifetime: state.lifetime,
    bookings: state.bookings,
    redeemed: state.redeemed,
    earn: (points) => dispatch({ type: 'earn', points }),
    redeem: (id, cost) => {
      if (state.points < cost) return false;
      dispatch({ type: 'redeem', id, cost });
      return true;
    },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRewards(): RewardsCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useRewards must be used within RewardsProvider');
  return ctx;
}
