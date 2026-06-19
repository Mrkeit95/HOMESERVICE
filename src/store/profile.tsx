// Customer profile store. Uses Supabase (per-user, server-side, multi-device)
// when configured; falls back to localStorage otherwise.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

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
const DEFAULT: Profile = { firstName: '', lastName: '', displayName: '', phone: '', dob: '', gender: 'Prefer not to say', bio: '' };

function loadLocal(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT;
}
function saveLocal(p: Profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

// Map a DB row → Profile.
function fromRow(d: Record<string, string | null>): Profile {
  return {
    firstName: d.first_name || '',
    lastName: d.last_name || '',
    displayName: d.display_name || d.name || '',
    phone: d.phone || '',
    dob: d.dob || '',
    gender: d.gender || 'Prefer not to say',
    bio: d.bio || '',
  };
}

interface ProfileCtx {
  profile: Profile;
  update: (patch: Partial<Profile>) => void;
  save: () => Promise<void>;
}

const Ctx = createContext<ProfileCtx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DEFAULT);

  // Load the profile for the signed-in user (or local fallback), and reload
  // whenever auth state changes (sign in / out / token refresh).
  useEffect(() => {
    const sb = supabase;
    if (!sb) {
      setProfile(loadLocal());
      return;
    }
    const load = async () => {
      const { data: auth } = await sb.auth.getUser();
      if (!auth.user) {
        setProfile(loadLocal());
        return;
      }
      const { data } = await sb.from('profiles').select('*').eq('id', auth.user.id).maybeSingle();
      setProfile(data ? fromRow(data) : DEFAULT);
    };
    load();
    const { data: sub } = sb.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') load();
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const update = (patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch }));

  const save = async () => {
    saveLocal(profile);
    const sb = supabase;
    if (!sb) return;
    const { data: auth } = await sb.auth.getUser();
    if (!auth.user) return;
    await sb.from('profiles').upsert({
      id: auth.user.id,
      email: auth.user.email,
      first_name: profile.firstName,
      last_name: profile.lastName,
      display_name: profile.displayName,
      phone: profile.phone,
      dob: profile.dob,
      gender: profile.gender,
      bio: profile.bio,
      updated_at: new Date().toISOString(),
    });
  };

  return <Ctx.Provider value={{ profile, update, save }}>{children}</Ctx.Provider>;
}

export function useProfile(): ProfileCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
