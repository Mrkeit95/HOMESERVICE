import { useRewards, tierFor, TIERS, REWARDS } from '../store/rewards';
import { useWallet } from '../store/wallet';
import { showToast } from '../lib/toast';
import { useT } from '../i18n/LanguageProvider';
import { useGoBack } from '../lib/goBack';

export default function Rewards() {
  const goBack = useGoBack();
  const { points, lifetime, bookings, redeemed, redeem } = useRewards();
  const { dispatch: walletDispatch } = useWallet();
  const { t } = useT();
  const { current, next, progress } = tierFor(lifetime);

  const onRedeem = (id: string, cost: number, credit?: number, title?: string) => {
    if (redeemed.includes(id)) {
      showToast('Already redeemed');
      return;
    }
    if (!redeem(id, cost)) {
      showToast('Not enough points yet');
      return;
    }
    if (credit) {
      walletDispatch({ type: 'topup', amount: credit, bonus: 0, method: 'Rewards' });
    }
    showToast(`Redeemed: ${title} 🎉`);
  };

  return (
    <div className="view active">
      <div className="back-link" onClick={goBack}>← Back</div>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${current.color}33, var(--bg-soft) 60%)`, border: `1px solid ${current.color}66`, borderRadius: 'var(--radius)', padding: 32, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: current.color, marginBottom: 8 }}>
              {current.name} {t('rewards.member')}
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 500, lineHeight: 1 }}>
              {points.toLocaleString()} <span style={{ fontSize: 20, color: 'var(--text-dim)' }}>{t('rewards.points')}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 6 }}>
              {bookings} bookings · {lifetime.toLocaleString()} lifetime points
            </div>
          </div>
          <div style={{ fontSize: 44 }}>🏆</div>
        </div>
        {next ? (
          <div style={{ marginTop: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-dim)', marginBottom: 6 }}>
              <span>{current.name}</span>
              <span>{(next.min - lifetime).toLocaleString()} pts to {next.name}</span>
            </div>
            <div style={{ height: 8, background: 'var(--bg)', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ width: `${progress * 100}%`, height: '100%', background: current.color }} />
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 18, fontSize: 13, color: current.color }}>You've reached the top tier 🎉</div>
        )}
      </div>

      {/* Redeemable rewards */}
      <div className="section-head"><h2 className="section-title">{t('rewards.redeemTitle')}</h2></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14, marginBottom: 32 }}>
        {REWARDS.map((r) => {
          const done = redeemed.includes(r.id);
          const afford = points >= r.cost;
          return (
            <div key={r.id} style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: 20, opacity: done ? 0.55 : 1 }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{r.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{r.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 14, minHeight: 32 }}>{r.sub}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 16 }}>{r.cost.toLocaleString()} pts</span>
                <button
                  className={afford && !done ? 'btn' : 'btn btn-ghost'}
                  style={{ padding: '6px 14px', fontSize: 12, opacity: afford || done ? 1 : 0.5 }}
                  onClick={() => onRedeem(r.id, r.cost, r.credit, r.title)}
                >
                  {done ? 'Redeemed' : afford ? 'Redeem' : 'Locked'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tiers */}
      <div className="section-head"><h2 className="section-title">{t('rewards.tiers')}</h2></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {TIERS.map((t) => (
          <div key={t.name} style={{ background: 'var(--bg-soft)', border: `1px solid ${t.name === current.name ? t.color : 'var(--line)'}`, borderRadius: 'var(--radius-sm)', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: t.color }} />
              <strong>{t.name}</strong>
              {t.name === current.name && <span style={{ fontSize: 10, color: t.color }}>YOU</span>}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 6 }}>{t.min.toLocaleString()}+ lifetime pts</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{t.perk}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
