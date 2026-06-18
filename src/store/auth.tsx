// Lightweight auth store (no backend) — persisted to localStorage. Seeds a
// signed-in demo user so the app works out of the box; logging out drops to
// the signup/login screen as a real user would experience.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  type: 'customer' | 'business';
}

const STORAGE_KEY = 'doora.auth.v1';
const SEED: User = { name: 'Marcus Lane', email: 'marcus@gmail.com', type: 'customer' };

function load(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'null') return null;
    if (raw) return JSON.parse(raw) as User;
  } catch {
    /* ignore */
  }
  return SEED; // first visit starts signed in
}

interface AuthCtx {
  user: User | null;
  signedIn: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, user ? JSON.stringify(user) : 'null');
    } catch {
      /* ignore */
    }
  }, [user]);

  // Allow non-React code (legacy settings "Log out") to sign out.
  useEffect(() => {
    const handler = () => setUser(null);
    window.addEventListener('doora:logout', handler);
    return () => window.removeEventListener('doora:logout', handler);
  }, []);

  return (
    <Ctx.Provider value={{ user, signedIn: !!user, signIn: setUser, signOut: () => setUser(null) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
