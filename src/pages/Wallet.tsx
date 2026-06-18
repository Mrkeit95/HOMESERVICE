import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet, formatRp, type TxType } from '../store/wallet';
import { bonusFor } from '../components/TopupModal';
import StatementModal from '../components/StatementModal';

const TX_TABS: { key: 'all' | TxType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'topup', label: 'Top-ups' },
  { key: 'spend', label: 'Spent' },
  { key: 'bonus', label: 'Bonuses' },
];

const TOPUP_TIERS = [500_000, 1_000_000, 2_500_000, 5_000_000];

export default function Wallet() {
  const navigate = useNavigate();
  const { balance, txs, openTopUp } = useWallet();
  const [tab, setTab] = useState<'all' | TxType>('all');
  const [statement, setStatement] = useState(false);

  const shown = tab === 'all' ? txs : txs.filter((t) => t.type === tab);
  const txIconClass = (t: TxType) =>
    t === 'spend' ? 'spend' : t === 'bonus' ? 'bonus' : t === 'refund' ? 'refund' : 'topup';

  return (
    <div className="view active" id="view-wallet">
      <div className="wallet-hero">
        <div className="wallet-hero-grid">
          <div>
            <div className="wallet-balance-label">Available balance</div>
            <div className="wallet-balance-big">{formatRp(balance)}</div>
            <div className="wallet-balance-currency">
              ≈ ${Math.round(balance / 16000)} USD · Updated just now
            </div>
            <div className="wallet-actions">
              <button className="wallet-btn" onClick={() => openTopUp()}>
                + Top up balance
              </button>
              <button className="wallet-btn ghost" onClick={() => setStatement(true)}>
                View statement
              </button>
            </div>
          </div>
          <div className="wallet-perks">
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 500, marginBottom: 14 }}>
              Wallet perks
            </div>
            <div className="perk-row"><div className="perk-icon">⚡</div><div><strong>5% off</strong> every booking paid with wallet</div></div>
            <div className="perk-row"><div className="perk-icon">🎁</div><div><strong>Up to 15% bonus</strong> on big top-ups</div></div>
            <div className="perk-row"><div className="perk-icon">⚡</div><div><strong>One-tap checkout</strong> — no card needed</div></div>
          </div>
        </div>
      </div>

      {/* Premium upsell */}
      <div
        onClick={() => navigate('/premium')}
        style={{
          background: 'linear-gradient(135deg, #1A1310, #2A1F18 60%, #3F2A1F)',
          border: '1px solid rgba(255,180,84,0.3)',
          borderRadius: 'var(--radius)',
          padding: '28px 32px',
          marginBottom: 32,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,180,84,0.15)', border: '1px solid rgba(255,180,84,0.3)', borderRadius: 100, fontSize: 10, color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 12 }}>
              ✦ Premium
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 500, marginBottom: 6 }}>
              Save more on every booking with Plus.
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>
              Members get 15% off, priority booking, and free cancellation. From{' '}
              <strong style={{ color: 'var(--gold)' }}>Rp 199k/month.</strong> First 7 days free.
            </p>
          </div>
          <button className="btn btn-large" style={{ background: 'var(--gold)', color: '#2A1F0F', flexShrink: 0 }}>
            Try free →
          </button>
        </div>
      </div>

      {/* Top up & earn bonus */}
      <div className="section-head"><h2 className="section-title">Top up & earn bonus</h2></div>
      <div className="topup-grid">
        {TOPUP_TIERS.map((amt) => {
          const bonus = bonusFor(amt);
          return (
            <div
              key={amt}
              className={`topup-card${amt === 2_500_000 ? ' featured' : ''}`}
              onClick={() => openTopUp(amt)}
            >
              <div className="topup-amount">{amt >= 1_000_000 ? `Rp ${amt / 1_000_000}M` : `Rp ${amt / 1000}k`}</div>
              <div className={`topup-bonus${bonus === 0 ? ' none' : ''}`}>
                {bonus === 0 ? 'No bonus' : `+ ${formatRp(bonus)} bonus (${Math.round((bonus / amt) * 100)}%)`}
              </div>
              <div className="topup-total">You get {formatRp(amt + bonus)}</div>
            </div>
          );
        })}
      </div>

      {/* Activity */}
      <div className="transactions">
        <div className="tx-head">
          <h3>Activity</h3>
          <div className="tx-tabs">
            {TX_TABS.map((t) => (
              <div
                key={t.key}
                className={`tx-tab${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </div>
            ))}
          </div>
        </div>
        {shown.length === 0 ? (
          <div style={{ padding: '30px 0', color: 'var(--text-faint)', textAlign: 'center', fontSize: 14 }}>
            No {tab === 'all' ? '' : tab} activity yet.
          </div>
        ) : (
          shown.map((t) => (
            <div className="tx-item" key={t.id}>
              <div className={`tx-icon ${txIconClass(t.type)}`}>{t.icon}</div>
              <div className="tx-info">
                <div className="tx-title">{t.title}</div>
                <div className="tx-meta">{t.meta}</div>
              </div>
              <div className={`tx-amount ${t.amount < 0 ? 'neg' : 'pos'}`}>
                {t.amount < 0 ? '– ' : '+ '}
                {formatRp(Math.abs(t.amount))}
              </div>
            </div>
          ))
        )}
      </div>

      {statement && <StatementModal onClose={() => setStatement(false)} />}
    </div>
  );
}
