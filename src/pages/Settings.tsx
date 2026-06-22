import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../store/profile';
import { useAuth } from '../store/auth';
import { useT } from '../i18n/LanguageProvider';
import { LANGUAGES } from '../i18n/translations';
import { showToast } from '../lib/toast';
import { fileToThumbnail } from '../lib/image';

type Section = 'profile' | 'security' | 'preferences' | 'notifications' | 'payments' | 'addresses' | 'privacy' | 'support';

const NAV: { key: Section; icon: string; label: string }[] = [
  { key: 'profile', icon: '👤', label: 'Profile' },
  { key: 'security', icon: '🔐', label: 'Security' },
  { key: 'preferences', icon: '⚙️', label: 'Preferences' },
  { key: 'notifications', icon: '🔔', label: 'Notifications' },
  { key: 'payments', icon: '💳', label: 'Payment Methods' },
  { key: 'addresses', icon: '📍', label: 'Saved Addresses' },
  { key: 'privacy', icon: '🛡️', label: 'Privacy & Data' },
  { key: 'support', icon: '💬', label: 'Help & Support' },
];

// Persisted on/off prefs (toggles).
const PREFS_KEY = 'doora.settings.prefs.v1';
function loadPrefs(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
  } catch {
    return {};
  }
}

// Persisted payment cards + addresses (real add/remove, localStorage-backed).
interface Card { id: string; brand: string; last4: string; exp: string; }
interface Address { id: string; label: string; detail: string; }
const CARDS_KEY = 'doora.cards.v1';
const ADDR_KEY = 'doora.addresses.v1';
const SEED_CARDS: Card[] = [{ id: 'c1', brand: 'Visa', last4: '4291', exp: '09/27' }];
const SEED_ADDR: Address[] = [{ id: 'a1', label: 'Home', detail: 'Villa Berawa No. 14, Canggu' }];
function loadList<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : seed;
  } catch {
    return seed;
  }
}
function cardBrand(d: string): string {
  return d[0] === '4' ? 'Visa' : d[0] === '5' ? 'Mastercard' : d[0] === '3' ? 'Amex' : 'Card';
}

export default function Settings() {
  const navigate = useNavigate();
  const { profile, update, save } = useProfile();
  const { user, signOut, setAvatar } = useAuth();
  const { lang, setLang } = useT();
  const [section, setSection] = useState<Section>('profile');
  const [prefs, setPrefs] = useState<Record<string, boolean>>(loadPrefs);
  const fileRef = useRef<HTMLInputElement>(null);

  // Payment cards + addresses (persisted).
  const [cards, setCards] = useState<Card[]>(() => loadList(CARDS_KEY, SEED_CARDS));
  const [addresses, setAddresses] = useState<Address[]>(() => loadList(ADDR_KEY, SEED_ADDR));
  const [addingCard, setAddingCard] = useState(false);
  const [cardForm, setCardForm] = useState({ number: '', exp: '', cvc: '' });
  const [addingAddr, setAddingAddr] = useState(false);
  const [addrForm, setAddrForm] = useState({ label: '', detail: '' });
  useEffect(() => { try { localStorage.setItem(CARDS_KEY, JSON.stringify(cards)); } catch { /* quota */ } }, [cards]);
  useEffect(() => { try { localStorage.setItem(ADDR_KEY, JSON.stringify(addresses)); } catch { /* quota */ } }, [addresses]);

  const addCard = () => {
    const digits = cardForm.number.replace(/\D/g, '');
    if (digits.length < 12 || !/^\d\d\/\d\d$/.test(cardForm.exp) || cardForm.cvc.length < 3) { showToast('Enter card number, MM/YY and CVC'); return; }
    setCards((c) => [...c, { id: 'c' + Date.now(), brand: cardBrand(digits), last4: digits.slice(-4), exp: cardForm.exp }]);
    setCardForm({ number: '', exp: '', cvc: '' });
    setAddingCard(false);
    showToast('Card added ✓');
  };
  const addAddress = () => {
    if (!addrForm.label.trim() || !addrForm.detail.trim()) { showToast('Enter a label + address'); return; }
    setAddresses((a) => [...a, { id: 'a' + Date.now(), label: addrForm.label.trim(), detail: addrForm.detail.trim() }]);
    setAddrForm({ label: '', detail: '' });
    setAddingAddr(false);
    showToast('Address added ✓');
  };

  // Seed name from the signed-in account the first time.
  useEffect(() => {
    if (user && !profile.firstName && !profile.lastName) {
      const [first, ...rest] = (user.name || '').split(' ');
      update({ firstName: first || '', lastName: rest.join(' '), displayName: user.name || '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const toggle = (key: string, defaultOn = false) => {
    const on = prefs[key] ?? defaultOn;
    return (
      <div className={`toggle${on ? ' on' : ''}`} onClick={() => setPrefs((p) => ({ ...p, [key]: !on }))} />
    );
  };

  const onAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    e.target.value = '';
    const url = await fileToThumbnail(f);
    if (url) { setAvatar(url); showToast('Photo updated ✓'); }
  };

  const initial = (profile.displayName || user?.name || 'U').trim().charAt(0).toUpperCase();

  return (
    <div className="view active">
      <div className="settings-layout">
        {/* Sidebar */}
        <aside className="settings-nav">
          <div className="settings-user">
            <div
              className="settings-avatar-sm"
              style={user?.avatar ? { backgroundImage: `url(${user.avatar})`, backgroundSize: 'cover', color: 'transparent' } : undefined}
            >
              {initial}
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="settings-user-name">{profile.displayName || user?.name || 'Your account'}</div>
              <div className="settings-user-email">{user?.email}</div>
            </div>
          </div>
          {NAV.map((n) => (
            <div key={n.key} className={`settings-tab${section === n.key ? ' active' : ''}`} onClick={() => setSection(n.key)}>
              <span className="settings-tab-icon">{n.icon}</span> {n.label}
            </div>
          ))}
          <div className="settings-tab-divider" />
          <div className="settings-tab settings-logout" onClick={signOut}>
            <span className="settings-tab-icon">↪</span> Log out
          </div>
        </aside>

        {/* Panel */}
        <div className="settings-panel">
          {section === 'profile' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Profile</h2><p>Manage how you appear and how providers can reach you. Saved automatically.</p></div>
              <div className="profile-photo-row">
                <div
                  className="profile-photo-big"
                  style={user?.avatar ? { backgroundImage: `url(${user.avatar})`, backgroundSize: 'cover', color: 'transparent' } : undefined}
                >
                  {initial}
                  <div className="profile-photo-edit" onClick={() => fileRef.current?.click()}>📷</div>
                </div>
                <div className="profile-photo-info">
                  <h4>{profile.displayName || user?.name}</h4>
                  <p>JPG, PNG or GIF · Max 5MB · Square crop recommended</p>
                  <div className="profile-photo-actions">
                    <button className="btn" onClick={() => fileRef.current?.click()}>Upload new photo</button>
                    <button className="btn btn-ghost" onClick={() => { setAvatar(''); showToast('Photo removed'); }}>Remove</button>
                    <input ref={fileRef} type="file" accept="image/*" hidden onChange={onAvatar} />
                  </div>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-field"><label className="form-label">First name</label><input className="form-input" value={profile.firstName} onChange={(e) => update({ firstName: e.target.value })} /></div>
                <div className="form-field"><label className="form-label">Last name</label><input className="form-input" value={profile.lastName} onChange={(e) => update({ lastName: e.target.value })} /></div>
                <div className="form-field full"><label className="form-label">Display name <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>(shown on reviews)</span></label><input className="form-input" value={profile.displayName} onChange={(e) => update({ displayName: e.target.value })} /></div>
                <div className="form-field"><label className="form-label">Email <span className="verified-badge">✓ Verified</span></label><input className="form-input" value={user?.email || ''} disabled style={{ opacity: 0.7 }} /></div>
                <div className="form-field"><label className="form-label">Phone</label><input className="form-input" value={profile.phone} onChange={(e) => update({ phone: e.target.value })} placeholder="+62 …" /></div>
                <div className="form-field"><label className="form-label">Date of birth</label><input className="form-input" type="date" value={profile.dob} onChange={(e) => update({ dob: e.target.value })} /></div>
                <div className="form-field"><label className="form-label">Gender</label><select className="form-select" value={profile.gender} onChange={(e) => update({ gender: e.target.value })}><option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option></select></div>
                <div className="form-field full"><label className="form-label">Bio</label><textarea className="form-input" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit' }} value={profile.bio} onChange={(e) => update({ bio: e.target.value })} placeholder="Tell providers a bit about yourself…" /></div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button className="btn btn-large" onClick={async () => { await save(); showToast('Profile saved ✓'); }}>Save changes</button>
              </div>
            </div>
          )}

          {section === 'security' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Security</h2><p>Keep your account safe.</p></div>
              <div className="panel-section">
                <div className="panel-section-title">Password</div>
                <div className="form-grid">
                  <div className="form-field"><label className="form-label">New password</label><input className="form-input" type="password" placeholder="At least 6 characters" /></div>
                  <div className="form-field"><label className="form-label">Confirm new password</label><input className="form-input" type="password" placeholder="Repeat new password" /></div>
                </div>
                <button className="btn" style={{ marginTop: 8 }} onClick={() => showToast('Password updated ✓')}>Update password</button>
              </div>
              <div className="panel-section">
                <div className="panel-section-title">Two-factor authentication</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">📱 SMS authentication</div><div className="setting-row-sub">6-digit code via SMS on a new device.</div></div>{toggle('2fa_sms', true)}</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">👆 Biometric login</div><div className="setting-row-sub">Face ID / fingerprint on this device.</div></div>{toggle('2fa_bio', true)}</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">💾 Backup codes</div><div className="setting-row-sub">8 codes remaining.</div></div><button className="btn btn-ghost" onClick={() => showToast('Backup codes revealed')}>View codes</button></div>
              </div>
            </div>
          )}

          {section === 'preferences' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Preferences</h2><p>Language, region, and appearance.</p></div>
              <div className="panel-section">
                <div className="panel-section-title">Language & Region</div>
                <div className="form-grid">
                  <div className="form-field"><label className="form-label">Language</label>
                    <select className="form-select" value={lang} onChange={(e) => { setLang(e.target.value); showToast('Language updated'); }}>
                      {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
                    </select>
                  </div>
                  <div className="form-field"><label className="form-label">Currency</label><select className="form-select"><option>IDR — Rupiah (Rp)</option><option>USD — Dollar ($)</option><option>EUR — Euro (€)</option></select></div>
                </div>
              </div>
              <div className="panel-section">
                <div className="panel-section-title">Appearance</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">🌙 Dark mode</div><div className="setting-row-sub">Reduce eye strain in low light.</div></div>{toggle('dark', true)}</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">🅰️ Larger text</div><div className="setting-row-sub">Increase font size for easier reading.</div></div>{toggle('largeText')}</div>
              </div>
            </div>
          )}

          {section === 'notifications' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Notifications</h2><p>Choose what you hear about.</p></div>
              <div className="panel-section">
                <div className="panel-section-title">Booking updates</div>
                {[['Booking confirmed', 'notif_confirmed', true], ['Reminder before appointment', 'notif_reminder', true], ['Provider en route', 'notif_enroute', true], ['Cancellations & changes', 'notif_cancel', true]].map(([t, k, d]) => (
                  <div className="setting-row" key={k as string}><div className="setting-row-info"><div className="setting-row-title">{t as string}</div></div>{toggle(k as string, d as boolean)}</div>
                ))}
              </div>
              <div className="panel-section">
                <div className="panel-section-title">Promotions & offers</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">Deals & promotions</div><div className="setting-row-sub">Discounts and offers near you.</div></div>{toggle('notif_promos', true)}</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">Email newsletter</div></div>{toggle('notif_email')}</div>
              </div>
            </div>
          )}

          {section === 'payments' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Payment Methods</h2><p>Manage your cards and wallet.</p></div>
              {cards.map((card, i) => (
                <div className="setting-row" key={card.id}>
                  <div className="setting-row-info">
                    <div className="setting-row-title">💳 {card.brand} •••• {card.last4}</div>
                    <div className="setting-row-sub">Expires {card.exp}{i === 0 ? ' · Default' : ''}</div>
                  </div>
                  <button className="icon-btn danger" onClick={() => { setCards((c) => c.filter((x) => x.id !== card.id)); showToast('Card removed'); }}>✕</button>
                </div>
              ))}
              <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">💰 Doora Wallet</div><div className="setting-row-sub">Top up under Wallet</div></div><button className="btn btn-ghost" onClick={() => navigate('/wallet')}>Open →</button></div>
              {addingCard ? (
                <div style={{ marginTop: 16, padding: 18, background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)' }}>
                  <label className="form-label">Card number</label>
                  <input className="form-input" inputMode="numeric" placeholder="4242 4242 4242 4242" value={cardForm.number}
                    onChange={(e) => setCardForm((f) => ({ ...f, number: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim() }))} />
                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <div style={{ flex: 1 }}>
                      <label className="form-label">Expiry</label>
                      <input className="form-input" placeholder="MM/YY" value={cardForm.exp}
                        onChange={(e) => { const d = e.target.value.replace(/\D/g, '').slice(0, 4); setCardForm((f) => ({ ...f, exp: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d })); }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="form-label">CVC</label>
                      <input className="form-input" inputMode="numeric" placeholder="123" value={cardForm.cvc}
                        onChange={(e) => setCardForm((f) => ({ ...f, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn" onClick={addCard}>Save card</button>
                    <button className="btn btn-ghost" onClick={() => { setAddingCard(false); setCardForm({ number: '', exp: '', cvc: '' }); }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button className="btn" style={{ marginTop: 16 }} onClick={() => setAddingCard(true)}>+ Add payment method</button>
              )}
            </div>
          )}

          {section === 'addresses' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Saved Addresses</h2><p>Where providers come to you.</p></div>
              {addresses.map((addr) => (
                <div className="setting-row" key={addr.id}>
                  <div className="setting-row-info">
                    <div className="setting-row-title">📍 {addr.label}</div>
                    <div className="setting-row-sub">{addr.detail}</div>
                  </div>
                  <button className="icon-btn danger" onClick={() => { setAddresses((a) => a.filter((x) => x.id !== addr.id)); showToast('Address removed'); }}>✕</button>
                </div>
              ))}
              {addingAddr ? (
                <div style={{ marginTop: 16, padding: 18, background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)' }}>
                  <label className="form-label">Label</label>
                  <input className="form-input" placeholder="Home, Office, Villa…" value={addrForm.label} onChange={(e) => setAddrForm((f) => ({ ...f, label: e.target.value }))} />
                  <label className="form-label" style={{ marginTop: 10, display: 'block' }}>Address</label>
                  <input className="form-input" placeholder="Street, area, city" value={addrForm.detail} onChange={(e) => setAddrForm((f) => ({ ...f, detail: e.target.value }))} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn" onClick={addAddress}>Save address</button>
                    <button className="btn btn-ghost" onClick={() => { setAddingAddr(false); setAddrForm({ label: '', detail: '' }); }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <button className="btn" style={{ marginTop: 16 }} onClick={() => setAddingAddr(true)}>+ Add address</button>
              )}
            </div>
          )}

          {section === 'privacy' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Privacy & Data</h2><p>Control your data.</p></div>
              <div className="panel-section">
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">Share usage data</div><div className="setting-row-sub">Helps improve the app.</div></div>{toggle('priv_usage', true)}</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">Personalised ads</div></div>{toggle('priv_ads')}</div>
              </div>
              <div className="panel-section">
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">Download my data</div></div><button className="btn btn-ghost" onClick={() => showToast('We’ll email your data export')}>Request</button></div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title" style={{ color: 'var(--accent)' }}>Delete account</div></div><button className="btn btn-danger" onClick={() => showToast('Contact support to delete your account')}>Delete</button></div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 13 }}>
                <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => navigate('/terms')}>Terms of Service</span>
                <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => navigate('/privacy')}>Privacy Policy</span>
              </div>
            </div>
          )}

          {section === 'support' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Help & Support</h2><p>Get help or contact us.</p></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
                {[
                  { icon: '💬', title: 'Live chat', sub: 'Avg response: 2 mins · 24/7', act: () => window.dispatchEvent(new CustomEvent('doora:support')) },
                  { icon: '📚', title: 'Help center', sub: 'FAQs and guides', act: () => navigate('/help') },
                  { icon: '📩', title: 'Email us', sub: 'hello@doora.app', act: () => (window.location.href = 'mailto:hello@doora.app') },
                  { icon: '🚨', title: 'Report a safety issue', sub: 'Urgent: safety team', act: () => (window.location.href = 'mailto:safety@doora.app?subject=Safety%20report') },
                ].map((c) => (
                  <div key={c.title} onClick={c.act} style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: 22, cursor: 'pointer' }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 500, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>{c.sub}</div>
                  </div>
                ))}
              </div>
              <div className="panel-section">
                <div className="panel-section-title">About Doora</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">App version</div><div className="setting-row-sub">v 1.5.0 · Up to date</div></div></div>
                <div className="setting-row" style={{ cursor: 'pointer' }} onClick={() => navigate('/terms')}><div className="setting-row-info"><div className="setting-row-title">Terms of service</div></div><button className="icon-btn">→</button></div>
                <div className="setting-row" style={{ cursor: 'pointer' }} onClick={() => navigate('/privacy')}><div className="setting-row-info"><div className="setting-row-title">Privacy policy</div></div><button className="icon-btn">→</button></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
