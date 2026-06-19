import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { BRAND } from '../config/brand';

// Landed here from the password-reset email link. Supabase has set a recovery
// session from the URL, so updateUser({ password }) just works.
export default function ResetPassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (password !== confirm) return setError('Passwords don’t match.');
    setBusy(true);
    const res = await updatePassword(password);
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setDone(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div className="logo-wrap" style={{ cursor: 'default', justifyContent: 'center', marginBottom: 24 }}>
          <div className="logo-mark"></div>
          <div className="logo-text">{BRAND.name.toLowerCase()}</div>
        </div>

        {done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>✅</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 500, marginBottom: 8 }}>Password set</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: 22 }}>You can now sign in with your email and new password.</p>
            <button className="btn btn-large" style={{ width: '100%' }} onClick={() => navigate('/')}>Continue →</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 500, marginBottom: 6 }}>Set a new password</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 22 }}>Choose a password for your account.</p>
            <div className="form-field" style={{ marginBottom: 12 }}>
              <label className="form-label">New password</label>
              <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
            </div>
            <div className="form-field" style={{ marginBottom: 12 }}>
              <label className="form-label">Confirm password</label>
              <input className="form-input" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password" />
            </div>
            {error && <div style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 12 }}>⚠ {error}</div>}
            <button className="btn btn-large" type="submit" style={{ width: '100%', opacity: busy ? 0.5 : 1 }} disabled={busy}>
              {busy ? 'Saving…' : 'Save password →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
