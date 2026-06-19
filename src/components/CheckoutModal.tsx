import { useMemo, useState } from 'react';
import { formatRp, useWallet } from '../store/wallet';
import { OFFERS, findOffer, discountFor, offerError, type Offer } from '../data/offers';

// Grab/Gojek-style checkout. Shows the order, an "Offers & promo codes" drawer
// (pick a live offer or type a code), the discounted total, and the choice of
// paying with wallet balance or card.
export default function CheckoutModal({
  service,
  providerName,
  price,
  extras = [],
  icon,
  onClose,
  onConfirmWallet,
  onConfirmCard,
}: {
  service: string;
  providerName: string;
  price: number;
  extras?: { name: string; price: number }[];
  icon: string;
  onClose: () => void;
  onConfirmWallet: (amount: number, code?: string) => void;
  onConfirmCard: (amount: number, code?: string) => void;
}) {
  const { balance } = useWallet();
  const [offersOpen, setOffersOpen] = useState(false);
  const [applied, setApplied] = useState<Offer | null>(null);
  const [codeInput, setCodeInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const extrasTotal = extras.reduce((s, e) => s + e.price, 0);
  const orderTotal = price + extrasTotal; // base service + added extras
  const discount = useMemo(() => (applied ? discountFor(applied, orderTotal) : 0), [applied, orderTotal]);
  const total = orderTotal - discount;
  const canWallet = balance >= total;

  const apply = (offer: Offer) => {
    const err = offerError(offer, orderTotal);
    if (err) {
      setError(err);
      return;
    }
    setApplied(offer);
    setError(null);
    setOffersOpen(false);
  };

  const applyTyped = () => {
    const offer = findOffer(codeInput);
    if (!offer) {
      setError('That code isn’t valid. Try one of the offers above.');
      return;
    }
    apply(offer);
    setCodeInput('');
  };

  return (
    <div className="modal-bg show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 460 }}>
        <div className="modal-close" onClick={onClose}>✕</div>
        <h2 style={{ marginBottom: 4 }}>Checkout</h2>
        <p style={{ marginTop: 0 }}>Review your booking and apply any offers.</p>

        {/* Order summary */}
        <div className="checkout-line" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', borderBottom: extras.length ? '1px solid var(--line-soft)' : '1px solid var(--line)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg)', display: 'grid', placeItems: 'center', fontSize: 22, flexShrink: 0 }}>{icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{service}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{providerName}</div>
          </div>
          <div style={{ fontWeight: 600 }}>{formatRp(price)}</div>
        </div>
        {/* Added extra services (the cart) */}
        {extras.map((e, i) => (
          <div key={e.name + i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i === extras.length - 1 ? '1px solid var(--line)' : '1px solid var(--line-soft)' }}>
            <div style={{ width: 44, textAlign: 'center', fontSize: 14, color: 'var(--text-faint)', flexShrink: 0 }}>＋</div>
            <div style={{ flex: 1, minWidth: 0, fontSize: 13 }}>{e.name}<span style={{ color: 'var(--text-faint)', fontSize: 11 }}> · added</span></div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{formatRp(e.price)}</div>
          </div>
        ))}

        {/* Offers & promo codes (Grab-style) */}
        <button
          className="checkout-offers-row"
          onClick={() => { setOffersOpen((v) => !v); setError(null); }}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', background: 'none', border: 'none', borderBottom: '1px solid var(--line)', cursor: 'pointer', color: 'var(--text)', textAlign: 'left' }}
        >
          <span style={{ fontSize: 20 }}>🎟️</span>
          <span style={{ flex: 1 }}>
            <span style={{ fontWeight: 600, fontSize: 14, display: 'block' }}>
              {applied ? applied.label : 'Offers & promo codes'}
            </span>
            <span style={{ fontSize: 12, color: applied ? 'var(--green)' : 'var(--text-dim)' }}>
              {applied ? `Saving ${formatRp(discount)} · tap to change` : 'Tap to view available offers'}
            </span>
          </span>
          <span style={{ color: 'var(--text-faint)', transform: offersOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
        </button>

        {offersOpen && (
          <div style={{ padding: '14px 0', borderBottom: '1px solid var(--line)', animation: 'fadeIn 0.25s ease' }}>
            {/* Manual code entry */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <input
                className="form-input"
                placeholder="Enter promo code"
                value={codeInput}
                onChange={(e) => { setCodeInput(e.target.value.toUpperCase()); setError(null); }}
                onKeyDown={(e) => e.key === 'Enter' && applyTyped()}
                style={{ flex: 1, textTransform: 'uppercase' }}
                data-no-translate
              />
              <button className="btn btn-ghost" style={{ flexShrink: 0 }} onClick={applyTyped} disabled={!codeInput.trim()}>Apply</button>
            </div>
            {/* Available offers list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {OFFERS.map((o) => {
                const d = discountFor(o, orderTotal);
                const usable = d > 0;
                const isApplied = applied?.code === o.code;
                return (
                  <div
                    key={o.code}
                    onClick={() => usable && apply(o)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12,
                      border: `1px solid ${isApplied ? 'var(--accent)' : 'var(--line)'}`,
                      background: isApplied ? 'rgba(255,90,31,0.06)' : 'var(--bg)',
                      cursor: usable ? 'pointer' : 'not-allowed', opacity: usable ? 1 : 0.5,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{o.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{o.desc}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 3, fontFamily: 'monospace' }} data-no-translate>{o.code}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      {usable ? <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--green)' }}>−{formatRp(d)}</div> : <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>Not eligible</div>}
                      {isApplied && <div style={{ fontSize: 11, color: 'var(--accent)' }}>Applied ✓</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {error && <div style={{ fontSize: 12, color: 'var(--accent)', margin: '12px 0 0' }}>{error}</div>}

        {/* Totals */}
        <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-dim)' }}>
            <span>Subtotal{extras.length ? ` (${extras.length + 1} items)` : ''}</span><span>{formatRp(orderTotal)}</span>
          </div>
          {discount > 0 && applied && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--green)' }}>
              <span>Discount ({applied.code})</span><span>−{formatRp(discount)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 17, marginTop: 4 }}>
            <span>Total</span><span>{formatRp(total)}</span>
          </div>
        </div>

        {/* Payment actions */}
        <button
          className="btn modal-cta"
          style={{ marginBottom: 10, opacity: canWallet ? 1 : 0.5 }}
          disabled={!canWallet}
          onClick={() => onConfirmWallet(total, applied?.code)}
        >
          {canWallet ? `Pay ${formatRp(total)} with wallet →` : `Insufficient wallet balance`}
        </button>
        <button className="btn btn-ghost modal-cta" onClick={() => onConfirmCard(total, applied?.code)}>
          Pay with card instead
        </button>
        <div style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', marginTop: 10 }}>
          Wallet balance: {formatRp(balance)}
        </div>
      </div>
    </div>
  );
}
