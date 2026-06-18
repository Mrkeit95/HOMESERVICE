// Client-side wallet store — balance + transaction ledger, persisted to
// localStorage. Top-ups and booking spends flow through here so the balance
// shown in the nav chip and wallet page is real and consistent.
import { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from 'react';

export type TxType = 'spend' | 'topup' | 'bonus' | 'refund';

export interface Tx {
  id: string;
  type: TxType;
  title: string;
  meta: string;
  amount: number; // signed Rp (negative = spent)
  icon: string;
}

interface WalletState {
  balance: number;
  txs: Tx[];
}

const STORAGE_KEY = 'doora.wallet.v1';

function uid(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : 'tx-' + Math.floor(performance.now() * 1000).toString(36);
}

const SEED: WalletState = {
  balance: 1_250_000,
  txs: [
    { id: 's1', type: 'spend', title: 'Sora Wellness · Deep Tissue 90min', meta: 'Today · 14:30 · #DR-7421', amount: -490_000, icon: '💆' },
    { id: 's2', type: 'bonus', title: 'Top-up bonus (10%)', meta: '3 days ago · Auto-credited', amount: 250_000, icon: '🎁' },
    { id: 's3', type: 'topup', title: 'Wallet top-up · Visa •• 4291', meta: '3 days ago · 09:14', amount: 2_500_000, icon: '↑' },
    { id: 's4', type: 'spend', title: 'Cutmen Mobile · Cut + Hot Towel', meta: '5 days ago · 16:00', amount: -380_000, icon: '✂️' },
    { id: 's5', type: 'spend', title: 'Lily Lash Studio · Hybrid Full Set', meta: '1 week ago · 11:00', amount: -420_000, icon: '👁️' },
    { id: 's6', type: 'refund', title: 'Refund · Polish & Co. (cancelled)', meta: '1 week ago', amount: 280_000, icon: '↩' },
  ],
};

function load(): WalletState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as WalletState;
  } catch {
    /* ignore */
  }
  return SEED;
}

type Action =
  | { type: 'topup'; amount: number; bonus: number; method?: string }
  | { type: 'spend'; amount: number; title: string; icon: string; meta?: string }
  | { type: 'refund'; amount: number; title: string; icon: string };

function reducer(state: WalletState, action: Action): WalletState {
  switch (action.type) {
    case 'topup': {
      const txs: Tx[] = [
        { id: uid(), type: 'topup', title: `Wallet top-up · ${action.method || 'Card'}`, meta: 'Just now', amount: action.amount, icon: '↑' },
      ];
      if (action.bonus > 0)
        txs.unshift({ id: uid(), type: 'bonus', title: 'Top-up bonus', meta: 'Just now · Auto-credited', amount: action.bonus, icon: '🎁' });
      return { balance: state.balance + action.amount + action.bonus, txs: [...txs, ...state.txs] };
    }
    case 'spend':
      return {
        balance: state.balance - Math.abs(action.amount),
        txs: [
          { id: uid(), type: 'spend', title: action.title, meta: action.meta || 'Just now', amount: -Math.abs(action.amount), icon: action.icon },
          ...state.txs,
        ],
      };
    case 'refund':
      return {
        balance: state.balance + Math.abs(action.amount),
        txs: [{ id: uid(), type: 'refund', title: action.title, meta: 'Just now', amount: Math.abs(action.amount), icon: action.icon }, ...state.txs],
      };
    default:
      return state;
  }
}

export function formatRp(n: number): string {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

interface WalletCtx {
  balance: number;
  txs: Tx[];
  dispatch: React.Dispatch<Action>;
  topUpOpen: boolean;
  openTopUp: (preset?: number) => void;
  closeTopUp: () => void;
  presetAmount: number | null;
}

const Ctx = createContext<WalletCtx | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [presetAmount, setPresetAmount] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const openTopUp = (preset?: number) => {
    setPresetAmount(preset ?? null);
    setTopUpOpen(true);
  };
  const closeTopUp = () => setTopUpOpen(false);

  return (
    <Ctx.Provider
      value={{ balance: state.balance, txs: state.txs, dispatch, topUpOpen, openTopUp, closeTopUp, presetAmount }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useWallet(): WalletCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
