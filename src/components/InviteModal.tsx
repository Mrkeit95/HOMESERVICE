import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { showToast } from '../lib/toast';

// Refer & earn flow. Opens on the global `doora:invite` event (fired by the
// "Invite friends" promo/ad). Gives the user a personal referral code + link
// and real share actions. Invites-sent count is tracked locally.
const INVITES_KEY = 'doora.invites.v1';

// Brand icons (white glyph on a coloured tile).
function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.15-.198.297-.767.967-.94 1.165-.174.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01a1.1 1.1 0 0 0-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}
function TelegramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}

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
    { label: 'WhatsApp', color: '#25D366', icon: WhatsAppIcon, href: `https://wa.me/?text=${encodeURIComponent(shareText)}` },
    { label: 'Email', color: '#EA4335', icon: EmailIcon, href: `mailto:?subject=${encodeURIComponent('Join me on Doora')}&body=${encodeURIComponent(shareText)}` },
    { label: 'Telegram', color: '#2AABEE', icon: TelegramIcon, href: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareText)}` },
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
          {SHARE.map((sct) => {
            const Icon = sct.icon;
            return (
              <a
                key={sct.label}
                href={sct.href}
                target="_blank"
                rel="noreferrer"
                onClick={bumpInvites}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '14px 8px', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--text)', textDecoration: 'none', fontSize: 12, fontWeight: 600 }}
              >
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: sct.color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon />
                </span>
                {sct.label}
              </a>
            );
          })}
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
