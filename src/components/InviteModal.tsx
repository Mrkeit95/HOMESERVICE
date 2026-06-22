import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { showToast } from '../lib/toast';

// Refer & earn flow. Opens on the global `doora:invite` event (fired by the
// "Invite friends" promo/ad). Gives the user a personal referral code + link
// and real share actions. Invites-sent count is tracked locally.
const INVITES_KEY = 'doora.invites.v1';

function codeFor(name?: string, email?: string): string {
  const base = (name || email || 'friend').split(/[ @]/)[0].replace(/[^a-zA-Z]/g, '').toUpperCase();
  return (base.slice(0, 8) || 'DOORA') + '50';
}

export default function InviteModal() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [invites, setInvites] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem(INVITES_KEY) || '0') || 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('doora:invite', onOpen);
    return () => window.removeEventListener('doora:invite', onOpen);
  }, []);

  if (!open) return null;

  const code = codeFor(user?.name, user?.email);
  const link = `${window.location.origin}/?ref=${code}`;
  const shareText = `Join me on Doora — book massage, barbers, yoga & more to your door in Bali. Use my code ${code} and we both get Rp 50k credit: ${link}`;

  const bumpInvites = () => {
    setInvites((n) => {
      const next = n + 1;
      try { localStorage.setItem(INVITES_KEY, String(next)); } catch { /* quota */ }
      return next;
    });
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied ✓`);
    } catch {
      showToast('Copy failed — long-press to copy');
    }
  };

  const nativeShare = async () => {
    // navigator.share isn't typed everywhere; guard at runtime.
    const nav = navigator as Navigator & { share?: (d: { title?: string; text?: string; url?: string }) => Promise<void> };
    if (nav.share) {
      try {
        await nav.share({ title: 'Join me on Doora', text: shareText, url: link });
        bumpInvites();
      } catch {
        /* user cancelled */
      }
    } else {
      copy(shareText, 'Invite');
      bumpInvites();
    }
  };

  const SHARE = [
    { label: 'WhatsApp', icon: '🟢', href: `https://wa.me/?text=${encodeURIComponent(shareText)}` },
    { label: 'Email', icon: '✉️', href: `mailto:?subject=${encodeURIComponent('Join me on Doora')}&body=${encodeURIComponent(shareText)}` },
    { label: 'Telegram', icon: '✈️', href: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareText)}` },
  ];

  return (
    <div className="modal-bg show" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="modal" style={{ maxWidth: 440 }}>
        <div className="modal-close" onClick={() => setOpen(false)}>✕</div>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🎁</div>
        <h2 style={{ marginBottom: 4 }}>Give Rp 50k, get Rp 50k</h2>
        <p style={{ marginTop: 0 }}>Invite a friend. When they make their first booking, you both get Rp 50k wallet credit.</p>

        {/* Referral code */}
        <div style={{ marginTop: 18 }}>
          <div className="form-label">Your referral code</div>
          <div
            onClick={() => copy(code, 'Code')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderRadius: 12, border: '1px dashed var(--accent)', background: 'rgba(255,90,31,0.06)', cursor: 'pointer' }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, letterSpacing: '0.08em' }} data-no-translate>{code}</span>
            <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>Copy</span>
          </div>
        </div>

        {/* Shareable link */}
        <div style={{ marginTop: 12 }}>
          <div className="form-label">Your invite link</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="form-input" readOnly value={link} style={{ flex: 1, fontSize: 12 }} onFocus={(e) => e.currentTarget.select()} data-no-translate />
            <button className="btn btn-ghost" style={{ flexShrink: 0 }} onClick={() => copy(link, 'Link')}>Copy</button>
          </div>
        </div>

        {/* Share actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          {SHARE.map((sct) => (
            <a
              key={sct.label}
              href={sct.href}
              target="_blank"
              rel="noreferrer"
              onClick={bumpInvites}
              style={{ flex: 1, textAlign: 'center', padding: '12px 8px', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--text)', textDecoration: 'none', fontSize: 12, fontWeight: 600 }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{sct.icon}</div>
              {sct.label}
            </a>
          ))}
        </div>
        <button className="btn modal-cta" style={{ marginTop: 10 }} onClick={nativeShare}>Share invite →</button>

        {/* How it works */}
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
          <div className="form-label" style={{ marginBottom: 10 }}>How it works</div>
          {[
            ['1', 'Share your code or link with a friend'],
            ['2', 'They sign up and make their first booking'],
            ['3', 'You both get Rp 50k wallet credit — instantly'],
          ].map(([n, t]) => (
            <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{n}</span>
              <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, textAlign: 'center', fontSize: 12, color: 'var(--text-faint)' }}>
          {invites > 0 ? `${invites} invite${invites > 1 ? 's' : ''} shared · Rp ${(invites * 50).toLocaleString('en-US')}k pending` : 'No invites shared yet'}
        </div>
      </div>
    </div>
  );
}
