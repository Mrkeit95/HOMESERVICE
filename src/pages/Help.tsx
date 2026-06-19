import { useMemo, useState } from 'react';
import { useGoBack } from '../lib/goBack';

type Topic = 'booking' | 'payments' | 'account' | 'providers' | 'safety' | 'rewards';

const TOPICS: { key: Topic; icon: string; label: string; sub: string }[] = [
  { key: 'booking', icon: '📅', label: 'Booking', sub: 'Schedule, cancel, reschedule' },
  { key: 'payments', icon: '💳', label: 'Payments & wallet', sub: 'Top-ups, cards, refunds' },
  { key: 'account', icon: '👤', label: 'Account', sub: 'Profile, login, privacy' },
  { key: 'providers', icon: '🧑‍🔧', label: 'For providers', sub: 'Join, verify, earnings' },
  { key: 'safety', icon: '🛡️', label: 'Trust & safety', sub: 'Security, verification' },
  { key: 'rewards', icon: '⭐', label: 'Rewards', sub: 'Points, tiers, perks' },
];

const FAQS: { q: string; a: string; topic: Topic }[] = [
  { topic: 'booking', q: 'How do I book a service?', a: 'Browse a category or search, open a provider, pick a date and time, then continue to checkout and pay with your wallet or card. You can chat with the provider once your booking is confirmed.' },
  { topic: 'booking', q: 'Can I cancel or reschedule?', a: 'Yes — free cancellation up to 2 hours before your booking (1 hour for Premium members). Manage it from your booking in Messages.' },
  { topic: 'booking', q: 'When can I message a provider?', a: 'Messaging unlocks once you have an active booking. When the service is completed the chat closes and you can leave a review.' },
  { topic: 'payments', q: 'How do I pay?', a: 'Pay from your Doora Wallet (top up first) or with a card at checkout. Wallet payments get one-tap checkout and you can apply offers or promo codes before you confirm.' },
  { topic: 'payments', q: 'How do offers and promo codes work?', a: 'At checkout, tap “Offers & promo codes” to see every available offer with its exact saving, or type a code. The discount is applied to your total instantly.' },
  { topic: 'payments', q: 'Is my payment secure?', a: 'Yes. Payments are encrypted and we never store full card numbers. Wallet balances are protected.' },
  { topic: 'account', q: 'How do I change my profile or photo?', a: 'Go to Account → Profile. Edit your details or upload a new photo — everything saves automatically to your account.' },
  { topic: 'account', q: 'I signed up with Google — how do I set a password?', a: 'Use “Forgot password” on the sign-in screen. We’ll email you a link to set a password you can use alongside Google sign-in.' },
  { topic: 'providers', q: 'How do I become a provider?', a: 'Tap “Become a provider”, choose solo freelancer or company, and complete ID + background verification. Most providers are approved within 1–2 days.' },
  { topic: 'providers', q: 'How and when do I get paid?', a: 'Earnings land in your provider wallet after each completed booking and can be withdrawn to your bank. Track everything under Business → Earnings.' },
  { topic: 'safety', q: 'How are providers verified?', a: 'Every provider completes government-ID + selfie verification and a background check before they can accept bookings. Verified providers show a ✓ badge.' },
  { topic: 'rewards', q: 'How do loyalty points work?', a: 'You earn 1 point per Rp 1k spent on every booking and can redeem them for wallet credit, discounts, or free services under Rewards.' },
  { topic: 'rewards', q: 'What do membership tiers give me?', a: 'As you book more you climb from Bronze to Platinum — unlocking bonus points, priority support, birthday treats and free monthly services.' },
];

export default function Help() {
  const goBack = useGoBack();
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<Topic | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter(
      (f) =>
        (!topic || f.topic === topic) &&
        (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)),
    );
  }, [query, topic]);

  return (
    <div className="view active">
      <div className="back-link" onClick={goBack}>← Back</div>

      {/* Hero with search */}
      <div className="help-hero">
        <div className="help-hero-eyebrow">Help center</div>
        <h1 className="help-hero-title">How can we help?</h1>
        <p className="help-hero-sub">Search our guides or browse a topic. Still stuck? Our team replies in minutes.</p>
        <div className="help-search">
          <span style={{ fontSize: 16 }}>🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for an answer…"
            autoFocus
          />
          {query && <span className="help-search-clear" onClick={() => setQuery('')}>✕</span>}
        </div>
      </div>

      {/* Topic tiles */}
      <div className="help-topics">
        {TOPICS.map((t) => (
          <div
            key={t.key}
            className={`help-topic${topic === t.key ? ' active' : ''}`}
            onClick={() => { setTopic(topic === t.key ? null : t.key); setOpen(null); }}
          >
            <div className="help-topic-icon">{t.icon}</div>
            <div>
              <div className="help-topic-label">{t.label}</div>
              <div className="help-topic-sub">{t.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ + contact in a two-column layout */}
      <div className="help-grid">
        <div>
          <div className="help-section-head">
            <h2 className="section-title" style={{ fontSize: 22 }}>
              {topic ? TOPICS.find((t) => t.key === topic)!.label : 'Popular questions'}
            </h2>
            {topic && <span className="help-clear" onClick={() => setTopic(null)}>Clear filter ✕</span>}
          </div>

          {results.length === 0 ? (
            <div className="help-empty">No answers match “{query}”. Try a different search or start a live chat.</div>
          ) : (
            results.map((f) => (
              <div key={f.q} className="help-faq">
                <div className="help-faq-q" onClick={() => setOpen(open === f.q ? null : f.q)}>
                  <span>{f.q}</span>
                  <span className="help-faq-toggle">{open === f.q ? '−' : '+'}</span>
                </div>
                {open === f.q && <p className="help-faq-a">{f.a}</p>}
              </div>
            ))
          )}
        </div>

        {/* Contact rail */}
        <aside className="help-contact">
          <div className="help-contact-card">
            <div className="help-contact-icon">💬</div>
            <div className="help-contact-title">Live chat</div>
            <div className="help-contact-sub">Avg. reply under 2 min · 24/7</div>
            <button className="btn modal-cta" onClick={() => window.dispatchEvent(new CustomEvent('doora:support'))}>Start live chat</button>
          </div>
          <div className="help-contact-card">
            <div className="help-contact-icon">📩</div>
            <div className="help-contact-title">Email us</div>
            <div className="help-contact-sub">hello@doora.app · replies within a day</div>
            <button className="btn btn-ghost modal-cta" onClick={() => (window.location.href = 'mailto:hello@doora.app')}>Send an email</button>
          </div>
          <div className="help-contact-card help-contact-status">
            <div><span className="help-status-dot" /> All systems operational</div>
            <div className="help-contact-sub" style={{ marginTop: 4 }}>Bookings, payments & messaging running normally.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
