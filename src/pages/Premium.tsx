import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '../i18n/LanguageProvider';
import { showToast } from '../lib/toast';

interface Feature {
  text: string;
  bold?: boolean;
}
interface Plan {
  name: string;
  mark?: string;
  sub: string;
  monthly: number | null; // null/0 = free
  annual: number;
  accent: string;
  featured?: boolean;
  cta: string;
  ctaStyle: React.CSSProperties;
  note?: string;
  savings?: string;
  features: Feature[];
}

const PLANS: Plan[] = [
  {
    name: 'Free',
    sub: 'For the occasional booking',
    monthly: 0,
    annual: 0,
    accent: 'var(--green)',
    cta: 'Your current plan',
    ctaStyle: {},
    note: 'Forever',
    features: [
      { text: 'Browse all providers' },
      { text: 'Standard booking' },
      { text: '5% off when paying with wallet' },
      { text: 'Email support' },
      { text: 'Up to 5 bookings/month' },
    ],
  },
  {
    name: 'Plus',
    mark: '✦',
    sub: 'For the regular booker',
    monthly: 199,
    annual: 159,
    accent: 'var(--gold)',
    featured: true,
    cta: 'Start free trial',
    ctaStyle: { background: 'var(--gold)', color: '#2A1F0F' },
    note: 'First 7 days free',
    savings: 'Billed Rp 1.9M annually · Save Rp 480k/yr',
    features: [
      { text: 'Everything in Free, plus:', bold: true },
      { text: '<strong style="color: var(--gold);">15% off</strong> every booking' },
      { text: '<strong>Priority booking</strong> — skip wait-lists' },
      { text: '<strong>Free cancellation</strong> up to 1 hour before' },
      { text: '<strong>Unlimited bookings</strong> per month' },
      { text: 'Premium-only providers (top 10%)' },
      { text: '24/7 priority chat support' },
      { text: 'Birthday bonus: Rp 250k wallet credit' },
    ],
  },
  {
    name: 'Elite',
    mark: '✦✦',
    sub: 'For the wellness obsessed',
    monthly: 599,
    annual: 479,
    accent: '#C77B3F',
    cta: 'Upgrade to Elite',
    ctaStyle: { background: '#C77B3F', color: 'white' },
    note: 'By invitation, also',
    savings: 'Billed Rp 5.7M annually · Save Rp 1.4M/yr',
    features: [
      { text: 'Everything in Plus, plus:', bold: true },
      { text: '<strong style="color: #C77B3F;">25% off</strong> every booking' },
      { text: '<strong>4 free sessions</strong>/month (any category)' },
      { text: '<strong>Dedicated concierge</strong> (WhatsApp)' },
      { text: '<strong>Same-day priority</strong> within 2 hours' },
      { text: 'Access to celebrity / featured providers' },
      { text: 'Free travel within Bali (no fees)' },
      { text: 'Quarterly wellness assessment (free)' },
      { text: 'Exclusive events & workshops' },
    ],
  },
];

const COMPARE: [string, string, string, string][] = [
  ['Booking discount', '—', '15% off', '25% off'],
  ['Free sessions/month', '—', '—', '4 free sessions'],
  ['Cancellation window', '2 hours', '1 hour', 'Anytime'],
  ['Bookings per month', '5', 'Unlimited', 'Unlimited'],
  ['Support', 'Email', '24/7 chat', 'WhatsApp concierge'],
  ['Premium providers (top 10%)', '—', '✓', '✓'],
  ['Celebrity / featured providers', '—', '—', '✓'],
  ['Travel fees', 'Standard', 'Standard', 'Free in Bali'],
  ['Same-day priority', '—', '—', '✓'],
  ['Birthday gift', '—', 'Rp 250k credit', 'Rp 1M credit + gift'],
  ['Wellness assessment', '—', '—', 'Quarterly (free)'],
];

const FAQS: [string, string][] = [
  ['Can I cancel anytime?', 'Yes. Cancel from your settings — no cancellation fees, no questions asked. You keep Premium until the end of the billing period.'],
  ['How does the free trial work?', "Start your 7-day free trial of Plus. We'll remind you 2 days before billing. Cancel any time during the trial and you're not charged."],
  ['Is Elite invitation-only?', 'You can upgrade directly, but we also send invitations to our most active members with priority benefits.'],
  ['Does the 15% off stack with wallet discount?', "Yes. Premium's 15% applies first, then the 5% wallet discount on top — up to 20% total per booking."],
  ['What if I cancel mid-month?', 'You keep Premium benefits until the end of the current billing period. No refund for unused days, but no early-cancellation fee.'],
  ['Can I share my account?', 'Plus is single-user. Elite includes 1 free guest add-on. Doora Family launches soon — join the wait-list.'],
];

export default function Premium() {
  const [cycle, setCycle] = useState<'monthly' | 'annual'>('monthly');
  const navigate = useNavigate();
  const { t } = useT();

  const price = (p: Plan) =>
    !p.monthly ? 'Rp 0' : `Rp ${cycle === 'annual' ? p.annual : p.monthly}k`;

  return (
    <div className="view active">
      <div className="back-link" onClick={() => navigate('/')}>← Back to discover</div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1A1310 0%, #2A1F18 50%, #3F2A1F 100%)', borderRadius: 'var(--radius)', padding: '60px 50px', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 450, height: 450, background: 'radial-gradient(circle, rgba(255,180,84,0.18), transparent 70%)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'linear-gradient(135deg, rgba(255,180,84,0.2), rgba(255,90,31,0.15))', border: '1px solid rgba(255,180,84,0.3)', borderRadius: 100, fontSize: 11, color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 22 }}>✦ Doora Premium</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 64, fontWeight: 500, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 18 }}>
            Bali, on <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 400 }}>your terms.</em>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 32, maxWidth: 560 }}>
            Premium members skip queues, save 15% on every booking, and get exclusive access to top-tier providers. From Rp 199k/month.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="btn btn-large" style={{ background: 'var(--gold)', color: '#2A1F0F' }} onClick={() => showToast('7-day free trial started ✦')}>Start 7-day free trial →</button>
            <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>No commitment · Cancel anytime</div>
          </div>
        </div>
      </div>

      {/* Billing-cycle toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-soft)', border: '1px solid var(--line)', padding: 4, borderRadius: 100 }}>
          {(['monthly', 'annual'] as const).map((c) => (
            <div
              key={c}
              onClick={() => setCycle(c)}
              style={{
                padding: '8px 22px',
                borderRadius: 100,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                background: cycle === c ? 'var(--text)' : 'transparent',
                color: cycle === c ? 'var(--bg)' : 'var(--text-dim)',
              }}
            >
              {c === 'monthly' ? t('premium.monthly') : t('premium.annual')}
              {c === 'annual' && (
                <span style={{ fontSize: 10, padding: '2px 6px', background: 'rgba(122,184,122,0.2)', color: 'var(--green)', borderRadius: 100, marginLeft: 6 }}>
                  SAVE 20%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginBottom: 48 }}>
        {PLANS.map((p) => (
          <div
            key={p.name}
            style={{
              background: p.featured
                ? 'linear-gradient(180deg, rgba(255,180,84,0.06), var(--bg-soft) 30%)'
                : p.name === 'Elite'
                  ? 'linear-gradient(180deg, rgba(199,123,63,0.08), var(--bg-soft) 30%)'
                  : 'var(--bg-soft)',
              border: p.featured ? '2px solid var(--gold)' : `1px solid ${p.name === 'Elite' ? '#C77B3F' : 'var(--line)'}`,
              borderRadius: 'var(--radius)',
              padding: 32,
              position: 'relative',
            }}
          >
            {p.featured && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#2A1F0F', padding: '5px 14px', borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: '0.15em' }}>
                MOST POPULAR
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500 }}>{p.name}</div>
              {p.mark && <span style={{ color: p.accent }}>{p.mark}</span>}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-faint)', marginBottom: 22 }}>{p.sub}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 4 }}>
              {price(p)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 4 }}>
              {p.monthly ? (cycle === 'annual' ? 'per month, billed annually' : 'per month') : 'Forever'}
            </div>
            {p.savings && cycle === 'annual' && (
              <div style={{ fontSize: 11, color: 'var(--green)', marginBottom: 22 }}>{p.savings}</div>
            )}
            {p.note && cycle !== 'annual' && (
              <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 22 }}>{p.note}</div>
            )}
            <button
              className={p.featured || p.name === 'Elite' ? 'btn btn-large' : 'btn btn-ghost'}
              style={{ width: '100%', marginBottom: 24, ...p.ctaStyle }}
              onClick={() => showToast(p.monthly ? `${p.name} — trial started ✦` : 'You are on the Free plan')}
            >
              {p.cta}
            </button>
            <div style={{ paddingTop: 20, borderTop: '1px solid var(--line-soft)' }}>
              {p.features.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 10,
                    padding: '8px 0',
                    fontSize: 13,
                    color: f.bold ? 'var(--text)' : 'var(--text-dim)',
                    fontWeight: f.bold ? 500 : undefined,
                  }}
                >
                  <span style={{ color: p.accent, flexShrink: 0 }}>{f.bold ? '' : '✓'}</span>
                  <span dangerouslySetInnerHTML={{ __html: f.text }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 32, marginBottom: 36 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 500, marginBottom: 8 }}>{t('premium.compare')}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 24 }}>See exactly what you get at each tier.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '14px 12px', fontSize: 12, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid var(--line)', fontWeight: 500 }}>Feature</th>
              <th style={{ textAlign: 'center', padding: '14px 12px', fontSize: 13, fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Free</th>
              <th style={{ textAlign: 'center', padding: '14px 12px', fontSize: 13, fontWeight: 500, color: 'var(--gold)', borderBottom: '1px solid var(--gold)' }}>✦ Plus</th>
              <th style={{ textAlign: 'center', padding: '14px 12px', fontSize: 13, fontWeight: 500, color: '#C77B3F', borderBottom: '1px solid #C77B3F' }}>✦✦ Elite</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map(([feature, free, plus, elite], i) => (
              <tr key={feature} style={{ background: i % 2 === 0 ? 'var(--bg)' : undefined }}>
                <td style={{ padding: '14px 12px', fontSize: 13, color: 'var(--text-dim)' }}>{feature}</td>
                <td style={{ textAlign: 'center', padding: '14px 12px', fontSize: 13, color: free === '—' ? 'var(--text-faint)' : 'var(--text)' }}>{free}</td>
                <td style={{ textAlign: 'center', padding: '14px 12px', fontSize: 13, color: plus === '—' ? 'var(--text-faint)' : 'var(--text)' }}>
                  {plus === '✓' ? <span style={{ color: 'var(--gold)' }}>✓</span> : plus}
                </td>
                <td style={{ textAlign: 'center', padding: '14px 12px', fontSize: 13, color: elite === '—' ? 'var(--text-faint)' : 'var(--text)' }}>
                  {elite === '✓' ? <span style={{ color: '#C77B3F' }}>✓</span> : elite}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQs */}
      <div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 500, marginBottom: 22 }}>{t('premium.faq')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {FAQS.map(([q, a]) => (
            <div key={q} style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: 22 }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{q}</div>
              <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>{a}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 48, padding: 36, background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 500, marginBottom: 10 }}>Ready to upgrade?</h3>
        <p style={{ fontSize: 14, color: 'var(--text-dim)', marginBottom: 22 }}>Start your 7-day free trial of Plus today. No credit card needed.</p>
        <button className="btn btn-large" style={{ background: 'var(--gold)', color: '#2A1F0F' }} onClick={() => showToast('7-day free trial started ✦')}>Start free trial →</button>
      </div>
    </div>
  );
}
