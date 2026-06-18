// Auth store. Uses real Supabase Auth when configured (real signup +
// confirmation emails + Google OAuth); falls back to a local localStorage
// implementation otherwise so the app always runs.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User as SupaUser } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface User {
  name: string;
  email: string;
  type: 'customer' | 'business';
  avatar?: string;
  provider?: 'email' | 'google';
}
interface Account extends User {
  password: string;
}

export type AuthResult = { ok: true; needsConfirm?: boolean } | { ok: false; error: string };

interface AuthCtx {
  user: User | null;
  signedIn: boolean;
  ready: boolean;
  backend: 'supabase' | 'local';
  signUp: (input: { name: string; email: string; password: string; type: 'customer' | 'business' }) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: (type: 'customer' | 'business') => Promise<AuthResult>;
  signOut: () => void;
  setAvatar: (dataUrl: string) => void;
}

const Ctx = createContext<AuthCtx | null>(null);

function toUser(u: SupaUser): User {
  const m = (u.user_metadata || {}) as Record<string, string>;
  return {
    name: m.name || u.email?.split('@')[0] || 'User',
    email: u.email || '',
    type: m.type === 'business' ? 'business' : 'customer',
    avatar: m.avatar,
    provider: u.app_metadata?.provider === 'google' ? 'google' : 'email',
  };
}

// ---- Local fallback persistence ----
const USER_KEY = 'doora.auth.user.v2';
const ACCTS_KEY = 'doora.auth.accounts.v2';
const SEED_ACCT: Account = { name: 'Marcus Lane', email: 'marcus@gmail.com', type: 'customer', provider: 'email', password: 'password' };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>(() => {
    if (isSupabaseConfigured) return [];
    try {
      const raw = localStorage.getItem(ACCTS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return [SEED_ACCT];
  });

  // ---- Bootstrap session ----
  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data }) => {
        setUser(data.session ? toUser(data.session.user) : null);
        setReady(true);
      });
      const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
        setUser(session ? toUser(session.user) : null);
      });
      return () => sub.subscription.unsubscribe();
    }
    // local
    try {
      const raw = localStorage.getItem(USER_KEY);
      setUser(raw && raw !== 'null' ? JSON.parse(raw) : raw === 'null' ? null : { name: 'Marcus Lane', email: 'marcus@gmail.com', type: 'customer', provider: 'email' });
    } catch {
      setUser(null);
    }
    setReady(true);
  }, []);

  // Persist local state
  useEffect(() => {
    if (isSupabaseConfigured || !ready) return;
    try {
      localStorage.setItem(USER_KEY, user ? JSON.stringify(user) : 'null');
    } catch {
      /* ignore */
    }
  }, [user, ready]);
  useEffect(() => {
    if (isSupabaseConfigured) return;
    try {
      localStorage.setItem(ACCTS_KEY, JSON.stringify(accounts));
    } catch {
      /* ignore */
    }
  }, [accounts]);

  const setAvatar = (avatar: string) => {
    if (supabase) {
      supabase.auth.updateUser({ data: { avatar } });
      setUser((u) => (u ? { ...u, avatar } : u));
      return;
    }
    setUser((u) => (u ? { ...u, avatar } : u));
    setAccounts((as) => as.map((a) => (user && a.email === user.email ? { ...a, avatar } : a)));
  };

  // Legacy-DOM hooks (settings page) → sign out / set avatar.
  useEffect(() => {
    const out = () => signOut();
    const av = (e: Event) => setAvatar((e as CustomEvent).detail);
    window.addEventListener('doora:logout', out);
    window.addEventListener('doora:avatar', av);
    return () => {
      window.removeEventListener('doora:logout', out);
      window.removeEventListener('doora:avatar', av);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signUp: AuthCtx['signUp'] = async ({ name, email, password, type }) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { name: name.trim(), type }, emailRedirectTo: window.location.origin },
      });
      if (error) return { ok: false, error: error.message };
      // No session means email confirmation is required.
      return { ok: true, needsConfirm: !data.session };
    }
    const e = email.trim().toLowerCase();
    if (accounts.some((a) => a.email.toLowerCase() === e)) return { ok: false, error: 'An account with this email already exists. Try signing in.' };
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    setAccounts((as) => [...as, { name: name.trim(), email: e, password, type, provider: 'email' }]);
    return { ok: true, needsConfirm: true };
  };

  const login: AuthCtx['login'] = async (email, password) => {
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    }
    const e = email.trim().toLowerCase();
    const acct = accounts.find((a) => a.email.toLowerCase() === e);
    if (!acct) return { ok: false, error: 'No account found for that email. Create one first.' };
    if (acct.password !== password) return { ok: false, error: 'Incorrect password. Try again.' };
    setUser({ name: acct.name, email: acct.email, type: acct.type, avatar: acct.avatar, provider: acct.provider });
    return { ok: true };
  };

  const signInWithGoogle: AuthCtx['signInWithGoogle'] = async (type) => {
    if (supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin, queryParams: { prompt: 'select_account' } },
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true }; // browser redirects to Google
    }
    setUser({ name: 'Google User', email: 'you@gmail.com', type, provider: 'google' });
    return { ok: true };
  };

  const signOut = () => {
    if (supabase) supabase.auth.signOut();
    setUser(null);
  };

  return (
    <Ctx.Provider
      value={{ user, signedIn: !!user, ready, backend: isSupabaseConfigured ? 'supabase' : 'local', signUp, login, signInWithGoogle, signOut, setAvatar }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
