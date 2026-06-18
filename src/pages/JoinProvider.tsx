import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../lib/toast';

type AccountType = 'freelancer' | 'individual' | 'company';

const TYPES: { key: AccountType; icon: string; title: string; sub: string; kyc: string }[] = [
  { key: 'freelancer', icon: '🧑‍🔧', title: 'Solo freelancer', sub: 'You personally deliver services (therapist, barber, PT, tutor…).', kyc: 'Government ID + selfie + background check' },
  { key: 'individual', icon: '🙋', title: 'Casual / individual', sub: 'Occasional services, side income, no registered business.', kyc: 'Government ID + selfie + background check' },
  { key: 'company', icon: '🏢', title: 'Company / studio', sub: 'A registered business with a team of providers.', kyc: 'Business registration (NIB) + owner ID + team checks' },
];

const STEPS = ['Account type', 'About you', 'Identity & checks', 'Done'];

// Small upload field that just records a chosen file name (demo, no upload).
function Upload({ label, hint }: { label: string; hint?: string }) {
  const [name, setName] = useState<string | null>(null);
  return (
    <label className="setting-row" style={{ cursor: 'pointer' }}>
      <div className="setting-row-info">
        <div className="setting-row-title">{name ? `✓ ${label}` : label}</div>
        <div className="setting-row-sub">{name || hint || 'Tap to upload (JPG/PNG/PDF)'}</div>
      </div>
      <span className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }}>{name ? 'Replace' : 'Upload'}</span>
      <input type="file" accept="image/*,.pdf" hidden onChange={(e) => setName(e.target.files?.[0]?.name ?? null)} />
    </label>
  );
}

export default function JoinProvider() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [type, setType] = useState<AccountType | null>(null);
  const [idType, setIdType] = useState('ktp');
  const [consent, setConsent] = useState(false);

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="view active">
      <div className="back-link" onClick={() => (step === 0 ? navigate('/business') : back())}>← Back</div>

      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 500, marginBottom: 6 }}>
          Become a Doora provider
        </h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>
          Companies <em>and</em> solo freelancers welcome. Every provider is identity-verified and
          background-checked to keep customers safe.
        </p>

        {/* Stepper */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div style={{ height: 4, borderRadius: 100, background: i <= step ? 'var(--accent)' : 'var(--line)' }} />
              <div style={{ fontSize: 11, color: i <= step ? 'var(--text)' : 'var(--text-faint)', marginTop: 6 }}>{s}</div>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, marginBottom: 14 }}>How will you offer services?</h3>
            {TYPES.map((t) => (
              <div
                key={t.key}
                onClick={() => setType(t.key)}
                style={{ display: 'flex', gap: 14, padding: 18, marginBottom: 12, borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'var(--bg-soft)', border: `1px solid ${type === t.key ? 'var(--accent)' : 'var(--line)'}` }}
              >
                <div style={{ fontSize: 28 }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{t.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 6 }}>{t.sub}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>🔐 Verification: {t.kyc}</div>
                </div>
                <div style={{ alignSelf: 'center', color: type === t.key ? 'var(--accent)' : 'var(--line)' }}>{type === t.key ? '●' : '○'}</div>
              </div>
            ))}
            <button className="btn btn-large" style={{ marginTop: 12, opacity: type ? 1 : 0.5 }} disabled={!type} onClick={next}>Continue →</button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, marginBottom: 14 }}>Tell us about you</h3>
            <div className="form-grid">
              <div className="form-field full"><label className="form-label">{type === 'company' ? 'Business name' : 'Full name (as on ID)'}</label><input className="form-input" placeholder={type === 'company' ? 'Sora Wellness Co.' : 'e.g. Sara Made'} /></div>
              <div className="form-field"><label className="form-label">Service category</label><input className="form-input" placeholder="Massage, Barber, Yoga…" /></div>
              <div className="form-field"><label className="form-label">Service area</label><input className="form-input" placeholder="Canggu, Bali" /></div>
              <div className="form-field"><label className="form-label">Phone</label><input className="form-input" placeholder="+62…" /></div>
              <div className="form-field"><label className="form-label">Email</label><input className="form-input" placeholder="you@email.com" /></div>
              {type === 'company' && (
                <div className="form-field full"><label className="form-label">Business registration (NIB / NPWP)</label><input className="form-input" placeholder="Registration number" /></div>
              )}
            </div>
            <button className="btn btn-large" style={{ marginTop: 18 }} onClick={next}>Continue →</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, marginBottom: 4 }}>Identity & background checks</h3>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 16 }}>
              Required for everyone — solo or company. Your documents are encrypted and only used for verification.
            </p>

            <div className="panel-section">
              <div className="panel-section-title">Government ID</div>
              <div className="form-field" style={{ marginBottom: 10 }}>
                <select className="form-select" value={idType} onChange={(e) => setIdType(e.target.value)}>
                  <option value="ktp">KTP (Indonesian ID)</option>
                  <option value="passport">Passport</option>
                  <option value="kitas">KITAS / KITAP</option>
                </select>
              </div>
              <Upload label={idType === 'passport' ? 'Passport photo page' : 'ID — front'} />
              {idType !== 'passport' && <Upload label="ID — back" />}
              <Upload label="Selfie holding your ID" hint="For liveness / face match" />
            </div>

            <div className="panel-section">
              <div className="panel-section-title">Background check</div>
              <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 10 }}>
                We run a criminal-record and sanctions screening via our verification partner. This is
                mandatory because providers enter customers' homes.
              </p>
              <label className="setting-row" style={{ cursor: 'pointer' }}>
                <div className="setting-row-info">
                  <div className="setting-row-title">I consent to a background check</div>
                  <div className="setting-row-sub">Authorise Doora & its partner to screen my records.</div>
                </div>
                <div className={`toggle${consent ? ' on' : ''}`} onClick={() => setConsent((v) => !v)} />
              </label>
            </div>

            <div className="panel-section">
              <div className="panel-section-title">Professional credentials <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>(if licensed)</span></div>
              <Upload label="Certification / license" hint="e.g. physio licence, food-handling cert" />
            </div>

            <div className="panel-section">
              <div className="panel-section-title">Payout account</div>
              <Upload label="Bank account proof" hint="For receiving earnings" />
            </div>

            <button
              className="btn btn-large"
              style={{ marginTop: 12, opacity: consent ? 1 : 0.5 }}
              disabled={!consent}
              onClick={() => { next(); showToast('Application submitted for review'); }}
            >
              Submit for verification →
            </button>
            {!consent && <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8 }}>Background-check consent is required to continue.</div>}
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔎</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, marginBottom: 10 }}>Verification in progress</h2>
            <p style={{ color: 'var(--text-dim)', maxWidth: 460, margin: '0 auto 22px' }}>
              Thanks! We're verifying your ID and running your background check. Most providers are
              approved within <strong>1–2 business days</strong>. You'll get a notification when you're live.
            </p>
            <div style={{ maxWidth: 420, margin: '0 auto', textAlign: 'left' }}>
              {[['Identity document', 'Received'], ['Face match / liveness', 'Received'], ['Background check', 'In progress'], ['Payout account', 'Received']].map(([k, v]) => (
                <div className="setting-row" key={k}>
                  <div className="setting-row-info"><div className="setting-row-title">{k}</div></div>
                  <span className={`biz-pill ${v === 'In progress' ? 'request' : 'completed'}`}>{v}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-large" style={{ marginTop: 24 }} onClick={() => navigate('/business')}>Go to dashboard →</button>
          </div>
        )}
      </div>
    </div>
  );
}
