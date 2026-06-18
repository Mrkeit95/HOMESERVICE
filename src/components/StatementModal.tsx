import { useWallet, formatRp } from '../store/wallet';

// Full wallet statement: every transaction + in/out totals.
export default function StatementModal({ onClose }: { onClose: () => void }) {
  const { txs, balance } = useWallet();
  const inflow = txs.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const outflow = txs.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="modal-bg show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 560 }}>
        <div className="modal-close" onClick={onClose}>✕</div>
        <h2>Wallet statement</h2>
        <p>Your full transaction history.</p>

        <div style={{ display: 'flex', gap: 12, margin: '18px 0' }}>
          {[
            { label: 'Current balance', value: formatRp(balance), color: 'var(--text)' },
            { label: 'Total in', value: '+ ' + formatRp(inflow), color: 'var(--green)' },
            { label: 'Total out', value: '– ' + formatRp(outflow), color: 'var(--accent-soft)' },
          ].map((s) => (
            <div
              key={s.label}
              style={{ flex: 1, background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: 14 }}
            >
              <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 500, color: s.color }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ maxHeight: 320, overflowY: 'auto', margin: '0 -8px', padding: '0 8px' }}>
          {txs.map((t) => (
            <div className="tx-item" key={t.id}>
              <div className={`tx-icon ${t.type}`}>{t.icon}</div>
              <div className="tx-info">
                <div className="tx-title">{t.title}</div>
                <div className="tx-meta">{t.meta}</div>
              </div>
              <div className={`tx-amount ${t.amount < 0 ? 'neg' : 'pos'}`}>
                {t.amount < 0 ? '– ' : '+ '}
                {formatRp(Math.abs(t.amount))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
