import { useState } from 'react';
import { formatRp } from '../store/wallet';

export interface GiftDetails {
  recipient: string;
  contact: string;
  message: string;
  deliver: 'now' | 'scheduled';
  date?: string;
}

// Gift-a-service flow (Grab-style): send a booking credit to someone else.
export default function GiftModal({
  providerName,
  service,
  price,
  onClose,
  onSend,
}: {
  providerName: string;
  service: string;
  price: number;
  onClose: () => void;
  onSend: (d: GiftDetails) => void;
}) {
  const [recipient, setRecipient] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [deliver, setDeliver] = useState<'now' | 'scheduled'>('now');
  const [date, setDate] = useState('');

  const valid = recipient.trim() && contact.trim();

  return (
    <div className="modal-bg show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 480 }}>
        <div className="modal-close" onClick={onClose}>✕</div>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🎁</div>
        <h2>Gift this service</h2>
        <p>Send <strong style={{ color: 'var(--text)' }}>{service}</strong> with {providerName} to someone special. They book their own time.</p>

        <div className="form-grid" style={{ marginTop: 18 }}>
          <div className="form-field full">
            <label className="form-label">Recipient name</label>
            <input className="form-input" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Alex" />
          </div>
          <div className="form-field full">
            <label className="form-label">Their email or phone</label>
            <input className="form-input" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="alex@email.com / +62…" />
          </div>
          <div className="form-field full">
            <label className="form-label">Personal message <span style={{ color: 'var(--text-faint)' }}>(optional)</span></label>
            <textarea className="form-input" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit' }} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enjoy, you deserve it! 💆" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, margin: '4px 0 18px' }}>
          {(['now', 'scheduled'] as const).map((d) => (
            <div
              key={d}
              className={`chip${deliver === d ? ' active' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setDeliver(d)}
            >
              {d === 'now' ? 'Send now' : 'Schedule delivery'}
            </div>
          ))}
        </div>
        {deliver === 'scheduled' && (
          <input type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} style={{ marginBottom: 18 }} />
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--line-soft)', marginBottom: 14 }}>
          <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>Gift value</span>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18 }}>{formatRp(price)}</span>
        </div>

        <button
          className="btn modal-cta"
          disabled={!valid}
          style={{ opacity: valid ? 1 : 0.5, cursor: valid ? 'pointer' : 'not-allowed' }}
          onClick={() => valid && onSend({ recipient, contact, message, deliver, date })}
        >
          Send gift · {formatRp(price)} →
        </button>
      </div>
    </div>
  );
}
