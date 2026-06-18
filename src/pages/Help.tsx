import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQS: { q: string; a: string }[] = [
  { q: 'How do I book a service?', a: 'Browse a category or search, open a provider, pick a date and time, then pay with your wallet or card. You can chat with the provider once your booking is confirmed.' },
  { q: 'How do I pay?', a: 'Pay from your Doora Wallet (top up first) or with a card at checkout. Wallet payments get 5% off and one-tap checkout.' },
  { q: 'Can I cancel or reschedule?', a: 'Yes — free cancellation up to 2 hours before your booking (1 hour for Premium members). Manage it from your booking in Messages.' },
  { q: 'When can I message a provider?', a: 'Messaging unlocks once you have an active booking. When the service is completed the chat closes and you can leave a review.' },
  { q: 'How do reviews work?', a: 'After a completed booking you can rate your provider and leave a comment. Your review helps other customers and the provider.' },
  { q: 'How do I become a provider?', a: 'Tap “Become a provider”, choose solo freelancer or company, and complete ID + background verification. Most providers are approved within 1–2 days.' },
  { q: 'Is my payment secure?', a: 'Yes. Payments are encrypted and we never store full card numbers. Wallet balances are protected.' },
  { q: 'How do loyalty points work?', a: 'You earn points on every booking and can redeem them for wallet credit, discounts, or free services under Rewards.' },
];

export default function Help() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="view active">
      <div className="back-link" onClick={() => navigate(-1)}>← Back</div>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 40, fontWeight: 500, marginBottom: 6 }}>Help center</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: 28 }}>Answers to common questions. Still stuck? Start a live chat from Account → Help & Support.</p>

        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
            <div
              onClick={() => setOpen(open === i ? null : i)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', cursor: 'pointer', gap: 16 }}
            >
              <span style={{ fontSize: 15, fontWeight: 500 }}>{f.q}</span>
              <span style={{ color: 'var(--text-faint)', flexShrink: 0 }}>{open === i ? '−' : '+'}</span>
            </div>
            {open === i && (
              <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, padding: '0 0 18px' }}>{f.a}</p>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => window.dispatchEvent(new CustomEvent('doora:support'))}>💬 Start live chat</button>
          <button className="btn btn-ghost" onClick={() => (window.location.href = 'mailto:hello@doora.app')}>📩 Email us</button>
        </div>
      </div>
    </div>
  );
}
