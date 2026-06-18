// Client-side auth (no backend) — persisted to localStorage. Real account
// creation/validation against a local accounts list, plus avatar. Real Google
// OAuth + confirmation emails require a backend (Supabase/Firebase) — see
// signInWithGoogle note below.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  type: 'customer' | 'business';
  avatar?: string; // data URL
  provider?: 'email' | 'google';
}
interface Account extends User {
  password: string;
}

const USER_KEY = 'doora.auth.user.v2';
const ACCTS_KEY = 'doora.auth.accounts.v2';

const SEED_USER: User = { name: 'Marcus Lane', email: 'marcus@gmail.com', type: 'customer', provider: 'email' };
const SEED_ACCT: Account = { ...SEED_USER, password: 'password' };

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw === 'null') return null;
    if (raw) return JSON.parse(raw) as User;
  } catch {
    /* ignore */
  }
  return SEED_USER;
}
function loadAccounts(): Account[] {
  try {
    const raw = localStorage.getItem(ACCTS_KEY);
    if (raw) return JSON.parse(raw) as Account[];
  } catch {
    /* ignore */
  }
  return [SEED_ACCT];
}

export type AuthResult = { ok: true } | { ok: false; error: string };

interface AuthCtx {
  user: User | null;
  signedIn: boolean;
  signUp: (input: { name: string; email: string; password: string; type: 'customer' | 'business' }) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  signInWithGoogle: (type: 'customer' | 'business') => void;
  signOut: () => void;
  setAvatar: (dataUrl: string) => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);
  const [accounts, setAccounts] = useState<Account[]>(loadAccounts);

  useEffect(() => {
    try {
      localStorage.setItem(USER_KEY, user ? JSON.stringify(user) : 'null');
    } catch {
      /* ignore */
    }
  }, [user]);
  useEffect(() => {
    try {
      localStorage.setItem(ACCTS_KEY, JSON.stringify(accounts));
    } catch {
      /* ignore */
    }
  }, [accounts]);

  const setAvatar = (avatar: string) => {
    setUser((u) => (u ? { ...u, avatar } : u));
    setAccounts((as) => as.map((a) => (user && a.email === user.email ? { ...a, avatar } : a)));
  };

  // Legacy-DOM hooks (settings page) → sign out / set avatar.
  useEffect(() => {
    const out = () => setUser(null);
    const av = (e: Event) => setAvatar((e as CustomEvent).detail);
    window.addEventListener('doora:logout', out);
    window.addEventListener('doora:avatar', av);
    return () => {
      window.removeEventListener('doora:logout', out);
      window.removeEventListener('doora:avatar', av);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signUp: AuthCtx['signUp'] = ({ name, email, password, type }) => {
    const e = email.trim().toLowerCase();
    if (accounts.some((a) => a.email.toLowerCase() === e)) {
      return { ok: false, error: 'An account with this email already exists. Try signing in.' };
    }
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    const acct: Account = { name: name.trim(), email: e, password, type, provider: 'email' };
    setAccounts((as) => [...as, acct]);
    // Account created but not signed in yet — the UI shows an email-verification
    // step, then calls login() to sign in (mirrors a real confirm-email flow).
    return { ok: true };
  };

  const login: AuthCtx['login'] = (email, password) => {
    const e = email.trim().toLowerCase();
    const acct = accounts.find((a) => a.email.toLowerCase() === e);
    if (!acct) return { ok: false, error: 'No account found for that email. Create one first.' };
    if (acct.password !== password) return { ok: false, error: 'Incorrect password. Try again.' };
    setUser({ name: acct.name, email: acct.email, type: acct.type, avatar: acct.avatar, provider: acct.provider });
    return { ok: true };
  };

  // NOTE: a real Google sign-in requires OAuth credentials + a backend
  // (Supabase/Firebase handle this). Here we create/sign-in a Google-style
  // account locally so the flow is usable end to end.
  const signInWithGoogle: AuthCtx['signInWithGoogle'] = (type) => {
    const email = 'you@gmail.com';
    let acct = accounts.find((a) => a.email === email);
    if (!acct) {
      acct = { name: 'Google User', email, password: '', type, provider: 'google' };
      setAccounts((as) => [...as, acct as Account]);
    }
    setUser({ name: acct.name, email, type: acct.type, avatar: acct.avatar, provider: 'google' });
  };

  return (
    <Ctx.Provider value={{ user, signedIn: !!user, signUp, login, signInWithGoogle, signOut: () => setUser(null), setAvatar }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
