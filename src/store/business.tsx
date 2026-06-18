// Editable, persisted business (provider) state — profile, services, and a
// photo gallery (shop / team / work). Seeds from the static demo data.
import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import { BUSINESS, BIZ_SERVICES } from '../data/business';
import { photoFor } from '../lib/photos';

export interface BizProfile {
  name: string;
  category: string;
  location: string;
  tagline: string;
  about: string;
  team: string;
  languages: string;
}
export interface BizServiceItem {
  id: string;
  name: string;
  duration: string;
  price: number;
  active: boolean;
  booked: number;
}
export interface BizPhoto {
  id: string;
  url: string;
  caption: string;
}

interface BizState {
  profile: BizProfile;
  services: BizServiceItem[];
  photos: BizPhoto[];
}

const STORAGE_KEY = 'doora.business.v1';

function uid(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : 'b-' + Math.floor(performance.now() * 1000).toString(36);
}

const SEED: BizState = {
  profile: {
    name: BUSINESS.profile.name,
    category: 'Massage',
    location: BUSINESS.profile.location,
    tagline: BUSINESS.profile.tagline,
    about:
      'Authentic Balinese collective based in Canggu, delivering traditional and contemporary bodywork to your villa, hotel or home.',
    team: `${BUSINESS.profile.team} therapists`,
    languages: 'English, Indonesian',
  },
  services: BIZ_SERVICES.map((s) => ({ ...s })),
  photos: [
    { id: 'ph1', url: photoFor('massage', 'shopfront', 400, 300), caption: 'Reception' },
    { id: 'ph2', url: photoFor('massage', 'treatroom', 400, 300), caption: 'Treatment room' },
    { id: 'ph3', url: photoFor('massage', 'ourteam', 400, 300), caption: 'Our team' },
    { id: 'ph4', url: photoFor('massage', 'products', 400, 300), caption: 'Organic oils' },
  ],
};

function load(): BizState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as BizState;
  } catch {
    /* ignore */
  }
  return SEED;
}

type Action =
  | { type: 'profile'; patch: Partial<BizProfile> }
  | { type: 'addService'; service: BizServiceItem }
  | { type: 'updateService'; id: string; patch: Partial<BizServiceItem> }
  | { type: 'removeService'; id: string }
  | { type: 'addPhoto'; photo: BizPhoto }
  | { type: 'removePhoto'; id: string }
  | { type: 'captionPhoto'; id: string; caption: string };

function reducer(state: BizState, a: Action): BizState {
  switch (a.type) {
    case 'profile':
      return { ...state, profile: { ...state.profile, ...a.patch } };
    case 'addService':
      return { ...state, services: [...state.services, a.service] };
    case 'updateService':
      return { ...state, services: state.services.map((s) => (s.id === a.id ? { ...s, ...a.patch } : s)) };
    case 'removeService':
      return { ...state, services: state.services.filter((s) => s.id !== a.id) };
    case 'addPhoto':
      return { ...state, photos: [...state.photos, a.photo] };
    case 'removePhoto':
      return { ...state, photos: state.photos.filter((p) => p.id !== a.id) };
    case 'captionPhoto':
      return { ...state, photos: state.photos.map((p) => (p.id === a.id ? { ...p, caption: a.caption } : p)) };
    default:
      return state;
  }
}

interface BizCtx {
  profile: BizProfile;
  services: BizServiceItem[];
  photos: BizPhoto[];
  updateProfile: (patch: Partial<BizProfile>) => void;
  addService: (s: Omit<BizServiceItem, 'id'>) => void;
  updateService: (id: string, patch: Partial<BizServiceItem>) => void;
  removeService: (id: string) => void;
  addPhoto: (url: string, caption: string) => void;
  removePhoto: (id: string) => void;
  captionPhoto: (id: string, caption: string) => void;
}

const Ctx = createContext<BizCtx | null>(null);

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  return (
    <Ctx.Provider
      value={{
        profile: state.profile,
        services: state.services,
        photos: state.photos,
        updateProfile: (patch) => dispatch({ type: 'profile', patch }),
        addService: (s) => dispatch({ type: 'addService', service: { ...s, id: uid() } }),
        updateService: (id, patch) => dispatch({ type: 'updateService', id, patch }),
        removeService: (id) => dispatch({ type: 'removeService', id }),
        addPhoto: (url, caption) => dispatch({ type: 'addPhoto', photo: { id: uid(), url, caption } }),
        removePhoto: (id) => dispatch({ type: 'removePhoto', id }),
        captionPhoto: (id, caption) => dispatch({ type: 'captionPhoto', id, caption }),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useBusiness(): BizCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useBusiness must be used within BusinessProvider');
  return ctx;
}
