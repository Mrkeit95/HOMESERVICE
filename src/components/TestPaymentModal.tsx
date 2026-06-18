import { useState } from 'react';
import { formatRp } from '../store/wallet';

// Sandbox test-payment modal (no real charges, no backend). Accepts test cards
// so the full pay flow can be exercised end-to-end:
//   4242 4242 4242 4242 → success
//   4000 0000 0000 0002 → declined
// Any other 16-digit number with a future expiry + 3-digit CVC also succeeds.
const TEST_CARDS = [
  { label: 'Success', number: '4242 4242 4242 4242' },
  { label: 'Declined', number: '4000 0000 0000 0002' },
];

export default function TestPaymentModal({
  amount,
  title,
  onSuccess,
  onClose,
}: {
  amount: number;
  title: string;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'declined'>('idle');

  const digits = number.replace(/\D/g, '');
  const valid = digits.length === 16 && /^\d\d\/\d\d$/.test(expiry) && cvc.length === 3;

  const pay = () => {
    if (!valid) return;
    setStatus('processing');
    window.setTimeout(() => {
      if (digits === '4000000000000002') {
        setStatus('declined');
      } else {
        onSuccess();
      }
    }, 1200);
  };

  const fmtNumber = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const fmtExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <div className="modal-bg show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 440 }}>
        <div className="modal-close" onClick={onClose}>✕</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--gold)', background: 'rgba(255,180,84,0.15)', border: '1px solid rgba(255,180,84,0.3)', padding: '4px 10px', borderRadius: 100, marginBottom: 14 }}>
          🧪 TEST MODE
        </div>
        <h2>Pay {formatRp(amount)}</h2>
        <p>{title}</p>

        <div style={{ margin: '18px 0' }}>
          <label className="form-label">Card number</label>
          <input className="form-input" inputMode="numeric" placeholder="4242 4242 4242 4242" value={number} onChange={(e) => setNumber(fmtNumber(e.target.value))} />
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Expiry</label>
              <input className="form-input" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(fmtExpiry(e.target.value))} />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">CVC</label>
              <input className="form-input" inputMode="numeric" placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))} />
            </div>
          </div>
        </div>

        {status === 'declined' && (
          <div style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 12 }}>
            ✕ Your card was declined. Try the success test card.
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {TEST_CARDS.map((c) => (
            <button
              key={c.number}
              className="chip"
              style={{ cursor: 'pointer', fontSize: 11 }}
              onClick={() => {
                setNumber(c.number);
                setExpiry('12/28');
                setCvc('123');
                setStatus('idle');
              }}
            >
              Use {c.label.toLowerCase()} card
            </button>
          ))}
        </div>

        <button
          className="btn modal-cta"
          disabled={!valid || status === 'processing'}
          style={{ opacity: valid && status !== 'processing' ? 1 : 0.5 }}
          onClick={pay}
        >
          {status === 'processing' ? 'Processing…' : `Pay ${formatRp(amount)} →`}
        </button>
        <div style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', marginTop: 10 }}>
          🔒 Sandbox — no real money moves. Use the test cards above.
        </div>
      </div>
    </div>
  );
}
