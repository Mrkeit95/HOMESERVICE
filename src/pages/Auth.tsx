import { useState } from 'react';
import { useAuth } from '../store/auth';
import { BRAND } from '../config/brand';

// Full-screen login / signup gate shown when signed out.
export default function Auth() {
  const { signIn } = useAuth();
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [type, setType] = useState<'customer' | 'business'>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const valid = email.trim() && password.trim() && (mode === 'login' || name.trim());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    signIn({
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      type,
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Brand side */}
      <div style={{ background: 'linear-gradient(150deg, #FF5A1F 0%, #B53212 70%, #1A1815 100%)', padding: '60px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="logo-wrap" style={{ cursor: 'default' }}>
          <div className="logo-mark"></div>
          <div className="logo-text" style={{ color: '#fff' }}>{BRAND.name.toLowerCase()}</div>
        </div>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 500, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 18 }}>
            Open the door<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>to anything.</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, maxWidth: 380, lineHeight: 1.5 }}>
            Massage, barbers, yoga, tattoos, physio — the right pro, booked to wherever you are in Bali.
          </p>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
          {BRAND.tagline} · {BRAND.location}
        </div>
      </div>

      {/* Form side */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <form onSubmit={submit} style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 500, marginBottom: 6 }}>
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 24 }}>
            {mode === 'signup' ? 'Join Doora in seconds.' : 'Sign in to continue.'}
          </p>

          {mode === 'signup' && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              {(['customer', 'business'] as const).map((tp) => (
                <div
                  key={tp}
                  onClick={() => setType(tp)}
                  style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13, fontWeight: 500, background: 'var(--bg-soft)', border: `1px solid ${type === tp ? 'var(--accent)' : 'var(--line)'}`, color: type === tp ? 'var(--text)' : 'var(--text-dim)' }}
                >
                  {tp === 'customer' ? '🙋 I need a service' : '🧑‍🔧 I’m a provider'}
                </div>
              ))}
            </div>
          )}

          {mode === 'signup' && (
            <div className="form-field" style={{ marginBottom: 12 }}>
              <label className="form-label">Full name</label>
              <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
          )}
          <div className="form-field" style={{ marginBottom: 12 }}>
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
          <div className="form-field" style={{ marginBottom: 18 }}>
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          <button className="btn btn-large" type="submit" style={{ width: '100%', opacity: valid ? 1 : 0.5 }} disabled={!valid}>
            {mode === 'signup' ? 'Create account →' : 'Sign in →'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>
          <button type="button" className="btn btn-ghost" style={{ width: '100%', marginBottom: 10 }} onClick={() => signIn({ name: 'Guest', email: 'guest@doora.app', type: 'customer' })}>
            Continue with Google
          </button>

          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-dim)', marginTop: 16 }}>
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }} onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
              {mode === 'signup' ? 'Sign in' : 'Sign up'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
