import { useState } from 'react';
import { useAuth } from '../store/auth';
import { BRAND } from '../config/brand';
import { showToast } from '../lib/toast';

type Mode = 'signup' | 'login';

export default function Auth() {
  const { signUp, login, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<Mode>('signup');
  const [type, setType] = useState<'customer' | 'business'>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null); // email-sent screen

  const valid = email.trim() && password.trim() && (mode === 'login' || name.trim());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!valid) return;
    if (mode === 'signup') {
      const res = signUp({ name, email, password, type });
      if (!res.ok) return setError(res.error);
      setVerifyEmail(email.trim());
      showToast('Confirmation email sent 📧');
    } else {
      const res = login(email, password);
      if (!res.ok) return setError(res.error);
    }
  };

  // ---- Email-verification step (after signup) ----
  if (verifyEmail) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ maxWidth: 420, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>📧</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 500, marginBottom: 10 }}>Check your inbox</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
            We sent a confirmation link to <strong style={{ color: 'var(--text)' }}>{verifyEmail}</strong>.
            Confirm your email to activate your account.
          </p>
          <button className="btn btn-large" style={{ width: '100%', marginBottom: 10 }} onClick={() => login(email, password)}>
            I've confirmed — continue →
          </button>
          <button className="btn btn-ghost" style={{ width: '100%' }} onClick={() => showToast('Confirmation email resent 📧')}>
            Resend email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-grid">
      {/* Animated brand side */}
      <div className="auth-brand">
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />
        <div className="auth-blob auth-blob-3" />
        <div className="auth-brand-inner">
          <div className="logo-wrap" style={{ cursor: 'default' }}>
            <div className="auth-logo-mark"></div>
            <div className="logo-text" style={{ color: '#fff', fontSize: 22 }}>{BRAND.name.toLowerCase()}</div>
          </div>
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 500, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 18 }}>
              Open the door<br /><em style={{ fontStyle: 'italic', fontWeight: 400 }}>to anything.</em>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, maxWidth: 380, lineHeight: 1.5 }}>
              Massage, barbers, yoga, tattoos, physio — the right pro, booked to wherever you are in Bali.
            </p>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{BRAND.tagline}</div>
        </div>
      </div>

      {/* Form side */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <form onSubmit={submit} style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 500, marginBottom: 6 }}>
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 22 }}>
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

          {/* Google */}
          <button type="button" className="btn btn-ghost" style={{ width: '100%', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }} onClick={() => signInWithGoogle(type)}>
            <span style={{ fontSize: 16 }}>🇬</span> Continue with Google
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 16px' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>

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
          <div className="form-field" style={{ marginBottom: 8 }}>
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
          </div>

          {error && <div style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 12 }}>⚠ {error}</div>}

          <button className="btn btn-large" type="submit" style={{ width: '100%', marginTop: 8, opacity: valid ? 1 : 0.5 }} disabled={!valid}>
            {mode === 'signup' ? 'Create account →' : 'Sign in →'}
          </button>

          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-dim)', marginTop: 18 }}>
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }} onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}>
              {mode === 'signup' ? 'Sign in' : 'Sign up'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
