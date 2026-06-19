// Deterministic analytics engine: generates ~2 years of daily platform data,
// then aggregates it by any date range + granularity. This is what powers the
// admin's date filters, charts, and period-over-period comparisons. Numbers are
// representative until the Supabase data migration, after which the same shape
// is filled from real queries.
import { COMMISSION_RATE } from './admin';

export interface DayPoint {
  date: string; // YYYY-MM-DD
  ts: number;
  bookings: number;
  gmv: number;
  revenue: number;
  newUsers: number;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 86_400_000;
const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);
const START = new Date(TODAY.getTime() - 729 * DAY);

function fmt(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Build the full daily series once.
export const DAILY: DayPoint[] = (() => {
  const out: DayPoint[] = [];
  const total = 730;
  for (let i = 0; i < total; i++) {
    const date = new Date(START.getTime() + i * DAY);
    const rnd = mulberry32(i + 1);
    const growth = 60 + (i / total) * 280; // bookings/day trend 60 → 340
    const dow = date.getDay();
    const weekend = dow === 5 || dow === 6 ? 1.28 : dow === 0 ? 1.1 : 1; // Fri/Sat busy
    const month = date.getMonth();
    const season = month === 6 || month === 7 || month === 11 ? 1.18 : month === 0 || month === 1 ? 0.9 : 1; // peak Jul/Aug/Dec
    const noise = 0.82 + rnd() * 0.36;
    const bookings = Math.round(growth * weekend * season * noise);
    const aov = 320_000 + rnd() * 160_000; // avg order value
    const gmv = Math.round(bookings * aov);
    const revenue = Math.round(gmv * COMMISSION_RATE);
    const newUsers = Math.round((22 + (i / total) * 70) * (0.8 + rnd() * 0.5) * weekend);
    out.push({ date: fmt(date), ts: date.getTime(), bookings, gmv, revenue, newUsers });
  }
  return out;
})();

export const FIRST_DAY = DAILY[0].date;
export const LAST_DAY = DAILY[DAILY.length - 1].date;

export type Metric = 'revenue' | 'gmv' | 'bookings' | 'newUsers';
export type Granularity = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface Bucket {
  label: string;
  key: string;
  from: string;
  to: string;
  revenue: number;
  gmv: number;
  bookings: number;
  newUsers: number;
}

export function pointsInRange(from: string, to: string): DayPoint[] {
  return DAILY.filter((d) => d.date >= from && d.date <= to);
}

export function summarize(points: DayPoint[]) {
  return points.reduce(
    (a, d) => ({ revenue: a.revenue + d.revenue, gmv: a.gmv + d.gmv, bookings: a.bookings + d.bookings, newUsers: a.newUsers + d.newUsers }),
    { revenue: 0, gmv: 0, bookings: 0, newUsers: 0 },
  );
}

// The equal-length period immediately before [from,to], for % comparisons.
export function previousRange(from: string, to: string): { from: string; to: string } {
  const f = new Date(from + 'T00:00:00').getTime();
  const t = new Date(to + 'T00:00:00').getTime();
  const len = t - f + DAY;
  return { from: fmt(new Date(f - len)), to: fmt(new Date(f - DAY)) };
}

export function autoGranularity(from: string, to: string): Granularity {
  const days = (new Date(to).getTime() - new Date(from).getTime()) / DAY + 1;
  if (days <= 31) return 'day';
  if (days <= 120) return 'week';
  if (days <= 800) return 'month';
  return 'quarter';
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function bucketize(points: DayPoint[], g: Granularity): Bucket[] {
  const map = new Map<string, Bucket>();
  for (const d of points) {
    const dt = new Date(d.date + 'T00:00:00');
    let key: string, label: string;
    if (g === 'day') {
      key = d.date;
      label = `${dt.getDate()} ${MONTHS[dt.getMonth()]}`;
    } else if (g === 'week') {
      const onejan = new Date(dt.getFullYear(), 0, 1);
      const wk = Math.ceil(((dt.getTime() - onejan.getTime()) / DAY + onejan.getDay() + 1) / 7);
      key = `${dt.getFullYear()}-W${wk}`;
      label = `W${wk}`;
    } else if (g === 'month') {
      key = `${dt.getFullYear()}-${dt.getMonth()}`;
      label = `${MONTHS[dt.getMonth()]} ${String(dt.getFullYear()).slice(2)}`;
    } else if (g === 'quarter') {
      const q = Math.floor(dt.getMonth() / 3) + 1;
      key = `${dt.getFullYear()}-Q${q}`;
      label = `Q${q} ${String(dt.getFullYear()).slice(2)}`;
    } else {
      key = `${dt.getFullYear()}`;
      label = `${dt.getFullYear()}`;
    }
    const b = map.get(key) || { label, key, from: d.date, to: d.date, revenue: 0, gmv: 0, bookings: 0, newUsers: 0 };
    b.revenue += d.revenue; b.gmv += d.gmv; b.bookings += d.bookings; b.newUsers += d.newUsers;
    b.to = d.date;
    map.set(key, b);
  }
  return [...map.values()];
}

// Revenue split by category (deterministic weights derived from catalog size).
export function revenueByCategory(totalRevenue: number, cats: { key: string; title: string; icon: string; providers: number }[]) {
  const totalProv = cats.reduce((s, c) => s + c.providers, 0);
  return cats
    .map((c) => ({ ...c, revenue: Math.round((c.providers / totalProv) * totalRevenue) }))
    .sort((a, b) => b.revenue - a.revenue);
}

// Preset → [from,to].
export function preset(id: string): { from: string; to: string } {
  const t = TODAY;
  const mk = (d: Date) => fmt(d);
  switch (id) {
    case 'today': return { from: mk(t), to: mk(t) };
    case 'yesterday': { const y = new Date(t.getTime() - DAY); return { from: mk(y), to: mk(y) }; }
    case '7d': return { from: mk(new Date(t.getTime() - 6 * DAY)), to: mk(t) };
    case '30d': return { from: mk(new Date(t.getTime() - 29 * DAY)), to: mk(t) };
    case '90d': return { from: mk(new Date(t.getTime() - 89 * DAY)), to: mk(t) };
    case 'mtd': return { from: mk(new Date(t.getFullYear(), t.getMonth(), 1)), to: mk(t) };
    case 'qtd': return { from: mk(new Date(t.getFullYear(), Math.floor(t.getMonth() / 3) * 3, 1)), to: mk(t) };
    case 'ytd': return { from: mk(new Date(t.getFullYear(), 0, 1)), to: mk(t) };
    case '12m': return { from: mk(new Date(t.getTime() - 364 * DAY)), to: mk(t) };
    case 'all': return { from: FIRST_DAY, to: LAST_DAY };
    default: return { from: mk(new Date(t.getTime() - 29 * DAY)), to: mk(t) };
  }
}
