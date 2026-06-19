// Customer profile store — editable account info, persisted to localStorage.
// (Will move to a Supabase `profiles` row when we migrate data.)
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface Profile {
  firstName: string;
  lastName: string;
  displayName: string;
  phone: string;
  dob: string;
  gender: string;
  bio: string;
}

const STORAGE_KEY = 'doora.profile.v1';

const DEFAULT: Profile = {
  firstName: '',
  lastName: '',
  displayName: '',
  phone: '',
  dob: '',
  gender: 'Prefer not to say',
  bio: '',
};

function load(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT;
}

interface ProfileCtx {
  profile: Profile;
  update: (patch: Partial<Profile>) => void;
  save: () => void;
}

const Ctx = createContext<ProfileCtx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(load);

  // Persist on every change so edits never get lost.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* ignore */
    }
  }, [profile]);

  const update = (patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch }));
  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* ignore */
    }
  };

  return <Ctx.Provider value={{ profile, update, save }}>{children}</Ctx.Provider>;
}

export function useProfile(): ProfileCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
