// Which service categories are live on the customer site. Owner toggles these
// in the admin; Discover/Categories only show enabled ones. Persisted locally
// (moves to a DB flag with the data migration).
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'doora.disabledServices.v1';

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

interface ServicesCtx {
  disabled: string[];
  isEnabled: (key: string) => boolean;
  toggle: (key: string) => void;
  setEnabled: (key: string, on: boolean) => void;
}

const Ctx = createContext<ServicesCtx | null>(null);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [disabled, setDisabled] = useState<string[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(disabled));
    } catch {
      /* ignore */
    }
  }, [disabled]);

  const setEnabled = (key: string, on: boolean) =>
    setDisabled((d) => (on ? d.filter((k) => k !== key) : d.includes(key) ? d : [...d, key]));

  return (
    <Ctx.Provider
      value={{
        disabled,
        isEnabled: (key) => !disabled.includes(key),
        toggle: (key) => setDisabled((d) => (d.includes(key) ? d.filter((k) => k !== key) : [...d, key])),
        setEnabled,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useServices(): ServicesCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useServices must be used within ServicesProvider');
  return ctx;
}
