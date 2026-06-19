import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet, formatRp, type TxType, type Tx } from '../store/wallet';
import { useRewards, tierFor } from '../store/rewards';
import { bonusFor } from '../components/TopupModal';
import StatementModal from '../components/StatementModal';
import { CATS } from '../data/categories';
import { useT } from '../i18n/LanguageProvider';

// Resolve a transaction title (e.g. "Sora Wellness · Deep Tissue") back to a
// provider so the user can re-book from the activity list.
function findProvider(title: string): { catKey: string; idx: number } | null {
  const name = title.split(' · ')[0].trim().toLowerCase();
  for (const catKey of Object.keys(CATS)) {
    const idx = CATS[catKey].providers.findIndex(
      (p) => p.name.toLowerCase().includes(name) || name.includes(p.name.toLowerCase()),
    );
    if (idx >= 0) return { catKey, idx };
  }
  return null;
}

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
  const { points, lifetime } = useRewards();
  const { t, tx } = useT();
  const rewardTier = tierFor(lifetime).current;
  const [tab, setTab] = useState<'all' | TxType>('all');
  const [statement, setStatement] = useState(false);
  const [detail, setDetail] = useState<Tx | null>(null);
  const provFromDetail = detail ? findProvider(detail.title) : null;

  const shown = tab === 'all' ? txs : txs.filter((t) => t.type === tab);
  const txIconClass = (t: TxType) =>
    t === 'spend' ? 'spend' : t === 'bonus' ? 'bonus' : t === 'refund' ? 'refund' : 'topup';

  return (
    <div className="view active" id="view-wallet">
      <div className="wallet-hero">
        <div className="wallet-hero-grid">
          <div>
            <div className="wallet-balance-label">{t('wallet.availableBalance')}</div>
            <div className="wallet-balance-big">{formatRp(balance)}</div>
            <div className="wallet-balance-currency">
              ≈ ${Math.round(balance / 16000)} USD · {tx('Updated just now')}
            </div>
            <div className="wallet-actions">
              <button className="wallet-btn" onClick={() => openTopUp()}>
                {t('wallet.topUp')}
              </button>
              <button className="wallet-btn ghost" onClick={() => setStatement(true)}>
                {t('wallet.statement')}
              </button>
            </div>
          </div>
          <div className="wallet-perks">
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 500, marginBottom: 14 }}>
              {t('wallet.perks')}
            </div>
            <div className="perk-row"><div className="perk-icon">⚡</div><div>{tx('5% off every booking paid with wallet')}</div></div>
            <div className="perk-row"><div className="perk-icon">🎁</div><div>{tx('Up to 15% bonus on big top-ups')}</div></div>
            <div className="perk-row"><div className="perk-icon">⚡</div><div>{tx('One-tap checkout — no card needed')}</div></div>
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
              {tx('Save more on every booking with Plus.')}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>
              {tx('Members get 15% off, priority booking, and free cancellation.')}{' '}
              <strong style={{ color: 'var(--gold)' }}>Rp 199k/month.</strong> {tx('First 7 days free.')}
            </p>
          </div>
          <button className="btn btn-large" style={{ background: 'var(--gold)', color: '#2A1F0F', flexShrink: 0 }}>
            {tx('Try free')} →
          </button>
        </div>
      </div>

      {/* Rewards card */}
      <div
        onClick={() => navigate('/rewards')}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, background: `linear-gradient(135deg, ${rewardTier.color}22, var(--bg-soft) 60%)`, border: `1px solid ${rewardTier.color}55`, borderRadius: 'var(--radius)', padding: '22px 28px', marginBottom: 32, cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 30 }}>🏆</div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: rewardTier.color, marginBottom: 4 }}>
              {t('wallet.rewards')} · {rewardTier.name}
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500 }}>
              {points.toLocaleString()} {t('rewards.points')}
            </div>
          </div>
        </div>
        <button className="btn btn-ghost">{t('wallet.redeemRewards')}</button>
      </div>

      {/* Top up & earn bonus */}
      <div className="section-head"><h2 className="section-title">{t('wallet.topUpEarn')}</h2></div>
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
                {bonus === 0 ? tx('No bonus') : `+ ${formatRp(bonus)} ${tx('bonus')} (${Math.round((bonus / amt) * 100)}%)`}
              </div>
              <div className="topup-total">{tx('You get')} {formatRp(amt + bonus)}</div>
            </div>
          );
        })}
      </div>

      {/* Activity */}
      <div className="transactions">
        <div className="tx-head">
          <h3>{t('wallet.activity')}</h3>
          <div className="tx-tabs">
            {TX_TABS.map((t) => (
              <div
                key={t.key}
                className={`tx-tab${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {tx(t.label)}
              </div>
            ))}
          </div>
        </div>
        {shown.length === 0 ? (
          <div style={{ padding: '30px 0', color: 'var(--text-faint)', textAlign: 'center', fontSize: 14 }}>
            {tx('No activity yet.')}
          </div>
        ) : (
          shown.map((t) => (
            <div className="tx-item" key={t.id} style={{ cursor: 'pointer' }} onClick={() => setDetail(t)}>
              <div className={`tx-icon ${txIconClass(t.type)}`}>{t.icon}</div>
              <div className="tx-info">
                <div className="tx-title">{t.title}</div>
                <div className="tx-meta">{t.meta} · {tx('tap for details')}</div>
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

      {/* Transaction detail */}
      {detail && (
        <div className="modal-bg show" onClick={(e) => e.target === e.currentTarget && setDetail(null)}>
          <div className="modal" style={{ maxWidth: 420 }}>
            <div className="modal-close" onClick={() => setDetail(null)}>✕</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div className={`tx-icon ${txIconClass(detail.type)}`} style={{ width: 48, height: 48, fontSize: 22 }}>{detail.icon}</div>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 500 }}>{detail.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-faint)', textTransform: 'capitalize' }}>{detail.type}</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: 14 }}>
              {[
                ['Amount', `${detail.amount < 0 ? '– ' : '+ '}${formatRp(Math.abs(detail.amount))}`],
                ['When', detail.meta],
                ['Reference', '#' + detail.id.slice(0, 8).toUpperCase()],
                ['Status', 'Completed'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-dim)' }}>{k}</span>
                  <span style={{ color: 'var(--text)' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              {provFromDetail && (
                <button className="btn" style={{ flex: 1 }} onClick={() => navigate(`/provider/${provFromDetail.catKey}/${provFromDetail.idx}`)}>
                  🔄 Book again
                </button>
              )}
              <button className="btn btn-ghost" style={{ flex: provFromDetail ? '0 0 auto' : 1 }} onClick={() => setDetail(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
