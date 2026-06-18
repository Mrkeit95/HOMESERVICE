import { useEffect, useState } from 'react';
import { useWallet, formatRp } from '../store/wallet';
import TestPaymentModal from './TestPaymentModal';

const QUICK = [500_000, 1_000_000, 2_500_000, 5_000_000];

// Bonus tiers mirror the prototype: 5% from 1M, 10% from 2.5M, 15% from 5M.
export function bonusFor(amount: number): number {
  if (amount >= 5_000_000) return Math.round(amount * 0.15);
  if (amount >= 2_500_000) return Math.round(amount * 0.1);
  if (amount >= 1_000_000) return Math.round(amount * 0.05);
  return 0;
}

// Global top-up modal, driven by the wallet store (open state + dispatch).
export default function TopupModal() {
  const { topUpOpen, closeTopUp, presetAmount, dispatch } = useWallet();
  const [amount, setAmount] = useState(2_500_000);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (topUpOpen) setAmount(presetAmount ?? 2_500_000);
  }, [topUpOpen, presetAmount]);

  if (!topUpOpen) return null;
  const bonus = bonusFor(amount);

  const confirm = () => setPaying(true);

  if (paying) {
    return (
      <TestPaymentModal
        amount={amount}
        title={`Wallet top-up${bonus > 0 ? ` (+${formatRp(bonus)} bonus)` : ''}`}
        onClose={() => setPaying(false)}
        onSuccess={() => {
          dispatch({ type: 'topup', amount, bonus, method: 'Visa •• 4242' });
          setPaying(false);
          closeTopUp();
        }}
      />
    );
  }

  return (
    <div className="modal-bg show" onClick={(e) => e.target === e.currentTarget && closeTopUp()}>
      <div className="modal">
        <div className="modal-close" onClick={closeTopUp}>✕</div>
        <h2>Top up your wallet</h2>
        <p>Add balance to skip checkout next time — earn bonus credits on bigger top-ups.</p>
        <div className="topup-input-wrap">
          <div className="topup-input-label">Amount in IDR</div>
          <input
            className="topup-input"
            value={formatRp(amount)}
            onChange={(e) => setAmount(parseInt(e.target.value.replace(/[^0-9]/g, '') || '0'))}
          />
          <div
            style={{
              fontSize: 12,
              color: bonus > 0 ? 'var(--green)' : 'var(--text-faint)',
              marginTop: 8,
            }}
          >
            {bonus > 0 ? (
              <>
                🎁 You'll get <strong>{formatRp(bonus)} bonus</strong> (
                {Math.round((bonus / amount) * 100)}%)
              </>
            ) : (
              'Top up Rp 1.000.000 or more to earn bonus credit'
            )}
          </div>
        </div>
        <div className="quick-amounts">
          {QUICK.map((q) => (
            <div
              key={q}
              className={`quick-amount${amount === q ? ' active' : ''}`}
              onClick={() => setAmount(q)}
            >
              {q >= 1_000_000 ? `Rp ${q / 1_000_000}M` : `Rp ${q / 1000}k`}
            </div>
          ))}
        </div>
        <button className="btn modal-cta" onClick={confirm}>
          Top up {formatRp(amount)} →
        </button>
      </div>
    </div>
  );
}
