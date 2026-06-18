// Client-side bookings store (no backend yet) — persisted to localStorage.
// Models the Gojek/Grab rule: a chat exists only because you booked a provider;
// when the booking completes the chat locks and a review can be left.
import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import { THREADS } from '../data/threads';

export type BookingStatus = 'active' | 'completed' | 'cancelled';

export interface ChatMsg {
  id: string;
  who: 'me' | 'them' | 'system';
  text?: string;
  image?: string; // data URL for sent photos
  time: string;
  read?: boolean;
}

export interface Review {
  rating: number; // 1–5
  text: string;
  time: string;
}

export interface Booking {
  id: string;
  catKey: string;
  providerName: string;
  providerTheme: string;
  providerAvatar: string;
  role: string;
  service: string;
  when: string;
  icon: string;
  status: BookingStatus;
  online: boolean;
  messages: ChatMsg[];
  suggestions: string[];
  review?: Review;
}

const STORAGE_KEY = 'doora.bookings.v1';

function uid(): string {
  // crypto.randomUUID is available in modern browsers; fall back if not.
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : 'id-' + Math.floor(performance.now() * 1000).toString(36);
}

function nowTime(): string {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

// Map a seed THREAD's booking.status string onto our lifecycle.
function seedStatus(status: string): BookingStatus {
  if (status === 'Completed') return 'completed';
  if (status === 'Cancelled') return 'cancelled';
  return 'active';
}

// Build the initial bookings from the demo THREADS data.
function seedBookings(): Booking[] {
  return THREADS.map((t) => ({
    id: t.id,
    catKey: t.providerTheme,
    providerName: t.providerName,
    providerTheme: t.providerTheme,
    providerAvatar: t.providerAvatar,
    role: t.role,
    service: t.booking.service,
    when: t.booking.when,
    icon: t.booking.icon,
    status: seedStatus(t.booking.status),
    online: t.online,
    messages: t.messages.map((m) => ({
      id: uid(),
      who: m.kind === 'system' ? 'system' : (m.who as 'me' | 'them'),
      text: m.text,
      time: m.time || '',
      read: m.read,
    })),
    suggestions: t.suggestions,
  }));
}

function load(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Booking[];
  } catch {
    /* ignore corrupt storage */
  }
  return seedBookings();
}

type Action =
  | { type: 'create'; booking: Booking }
  | { type: 'send'; id: string; text?: string; image?: string }
  | { type: 'reply'; id: string; text: string }
  | { type: 'markRead'; id: string }
  | { type: 'complete'; id: string }
  | { type: 'review'; id: string; rating: number; text: string };

function reducer(state: Booking[], action: Action): Booking[] {
  switch (action.type) {
    case 'create':
      return [action.booking, ...state];
    case 'send':
      return state.map((b) =>
        b.id === action.id
          ? {
              ...b,
              messages: [
                ...b.messages,
                { id: uid(), who: 'me', text: action.text, image: action.image, time: nowTime(), read: false },
              ],
            }
          : b,
      );
    case 'reply':
      return state.map((b) =>
        b.id === action.id
          ? {
              ...b,
              messages: [
                ...b.messages.map((m) => (m.who === 'me' ? { ...m, read: true } : m)),
                { id: uid(), who: 'them', text: action.text, time: nowTime() },
              ],
            }
          : b,
      );
    case 'markRead':
      return state.map((b) =>
        b.id === action.id ? { ...b, messages: b.messages.map((m) => ({ ...m, read: true })) } : b,
      );
    case 'complete':
      return state.map((b) => (b.id === action.id ? { ...b, status: 'completed' } : b));
    case 'review':
      return state.map((b) =>
        b.id === action.id
          ? { ...b, review: { rating: action.rating, text: action.text, time: 'Just now' } }
          : b,
      );
    default:
      return state;
  }
}

interface BookingsCtx {
  bookings: Booking[];
  dispatch: React.Dispatch<Action>;
  createBooking: (input: Omit<Booking, 'id' | 'messages' | 'status' | 'review'> & {
    firstMessage?: string;
  }) => string;
}

const Ctx = createContext<BookingsCtx | null>(null);

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookings, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      /* ignore quota errors */
    }
  }, [bookings]);

  const createBooking: BookingsCtx['createBooking'] = (input) => {
    const id = uid();
    const intro: ChatMsg = {
      id: uid(),
      who: 'system',
      text: `Booking confirmed for <strong>${input.when}</strong>. ${input.service}`,
      time: nowTime(),
    };
    const greeting: ChatMsg = {
      id: uid(),
      who: 'them',
      text: `Hi! 👋 Thanks for booking ${input.service}. I'll be in touch shortly to confirm the details. Anything I should know before I arrive?`,
      time: nowTime(),
    };
    dispatch({
      type: 'create',
      booking: { ...input, id, status: 'active', messages: [intro, greeting] },
    });
    return id;
  };

  return <Ctx.Provider value={{ bookings, dispatch, createBooking }}>{children}</Ctx.Provider>;
}

export function useBookings(): BookingsCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useBookings must be used within BookingsProvider');
  return ctx;
}
