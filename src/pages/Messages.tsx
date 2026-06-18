import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useBookings, type Booking } from '../store/bookings';
import { useWallet } from '../store/wallet';
import { useRewards } from '../store/rewards';
import { CATS } from '../data/categories';
import { parsePrice } from '../lib/price';
import { showToast } from '../lib/toast';
import { makeAvatar } from '../utils/art';
import SvgArt from '../components/SvgArt';
import ReviewModal from '../components/ReviewModal';

const REPLIES = ['Got it 👍', 'Sounds good!', 'Will do, thanks for letting me know', 'Perfect, see you then ✨', 'Noted!'];

function lastPreview(b: Booking): string {
  for (let i = b.messages.length - 1; i >= 0; i--) {
    const m = b.messages[i];
    if (m.who === 'system') continue;
    const prefix = m.who === 'me' ? 'You: ' : '';
    if (m.image && !m.text) return prefix + '📷 Photo';
    return prefix + (m.text || '').replace(/<[^>]+>/g, '');
  }
  return '';
}

export default function Messages() {
  const { bookings, dispatch, createBooking } = useBookings();
  const { dispatch: walletDispatch } = useWallet();
  const { earn } = useRewards();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const wanted = params.get('b');
  const [activeId, setActiveId] = useState<string>(wanted || bookings[0]?.id);
  const [draft, setDraft] = useState('');
  const [reviewing, setReviewing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const msgsRef = useRef<HTMLDivElement>(null);

  const active = bookings.find((b) => b.id === activeId) || bookings[0];

  // If arriving with ?b=, focus that booking.
  useEffect(() => {
    if (wanted && bookings.some((b) => b.id === wanted)) setActiveId(wanted);
  }, [wanted, bookings]);

  // Mark read on open + keep scrolled to bottom.
  useEffect(() => {
    if (active) dispatch({ type: 'markRead', id: active.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);
  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [active?.messages.length]);

  const send = (text?: string, image?: string) => {
    if (!active || active.status !== 'active') return;
    if (!text && !image) return;
    dispatch({ type: 'send', id: active.id, text, image });
    setDraft('');
    const id = active.id;
    window.setTimeout(() => {
      const reply = REPLIES[Math.floor(((text?.length || 1) + Math.random() * REPLIES.length) % REPLIES.length)];
      dispatch({ type: 'reply', id, text: reply });
    }, 1400);
  };

  // One-tap repeat booking: clone a past booking into a fresh active one.
  const rebook = (b: Booking) => {
    const newId = createBooking({
      catKey: b.catKey,
      providerName: b.providerName,
      providerTheme: b.providerTheme,
      providerAvatar: b.providerAvatar,
      role: b.role,
      service: b.service,
      when: 'Today · soon',
      icon: b.icon,
      online: true,
      suggestions: b.suggestions.length ? b.suggestions : ['Running 5 minutes late', 'Door is open, come in', 'See you soon!'],
    });
    // Charge the wallet if we can resolve the provider's price.
    const provider = CATS[b.catKey]?.providers.find((p) => p.name === b.providerName);
    if (provider) {
      walletDispatch({ type: 'spend', amount: parsePrice(provider.price), title: `${b.providerName} · ${b.service}`, icon: b.icon });
      earn(Math.round(parsePrice(provider.price) / 1000));
    }
    showToast(`Re-booked ${b.providerName} 🔄`);
    setActiveId(newId);
    navigate(`/messages?b=${newId}`);
  };

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => send(undefined, String(reader.result));
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  if (!active) {
    return (
      <div className="view active">
        <div className="chat-empty" style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="chat-empty-icon" style={{ fontSize: 40 }}>💬</div>
          <h3>No conversations yet</h3>
          <p style={{ color: 'var(--text-dim)' }}>
            Book a provider and your chat with them appears here.
          </p>
        </div>
      </div>
    );
  }

  const locked = active.status !== 'active';

  return (
    <div className="view active">
      <div className="messages-layout">
        {/* Conversation list */}
        <aside className="msg-sidebar">
          <div className="msg-sidebar-head">
            <h2>Messages</h2>
            <div className="msg-search">
              <span>🔍</span>
              <input placeholder="Search providers..." />
            </div>
          </div>
          <div className="msg-filters">
            <div className="msg-filter active">All ({bookings.length})</div>
            <div className="msg-filter">
              Active ({bookings.filter((b) => b.status === 'active').length})
            </div>
            <div className="msg-filter">
              Completed ({bookings.filter((b) => b.status === 'completed').length})
            </div>
          </div>
          <div className="msg-list">
            {bookings.map((b) => (
              <div
                key={b.id}
                className={`msg-thread ${b.id === active.id ? 'active' : ''}`}
                onClick={() => setActiveId(b.id)}
              >
                <div className="msg-thread-avatar">
                  <SvgArt svg={makeAvatar(b.providerTheme, b.providerAvatar)} />
                  {b.online && b.status === 'active' && <div className="msg-thread-online"></div>}
                </div>
                <div className="msg-thread-info">
                  <div className="msg-thread-top">
                    <div className="msg-thread-name">{b.providerName}</div>
                    <div className="msg-thread-time">
                      {b.status === 'completed' ? 'Done' : b.status === 'cancelled' ? 'Cancelled' : ''}
                    </div>
                  </div>
                  <div className="msg-thread-sub">{b.role}</div>
                  <div className="msg-thread-preview">
                    <div className="msg-thread-last">{lastPreview(b)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Active chat */}
        <div className="chat-area">
          <div className="chat-head">
            <div className="chat-head-avatar">
              <SvgArt svg={makeAvatar(active.providerTheme, active.providerAvatar)} />
              {active.online && active.status === 'active' && <div className="msg-thread-online"></div>}
            </div>
            <div className="chat-head-info">
              <div className="chat-head-name">
                {active.providerName} <span className="chat-head-verified">✓ Verified provider</span>
              </div>
              <div className="chat-head-status">
                {active.status === 'active'
                  ? active.online
                    ? 'Active now · ' + active.role
                    : active.role
                  : active.status === 'completed'
                    ? 'Booking complete'
                    : 'Booking cancelled'}
              </div>
            </div>
            <div className="chat-head-actions">
              {/* Voice call only — video removed per product spec */}
              {active.status === 'active' && (
                <div className="chat-icon-btn" title="Voice call">📞</div>
              )}
              <div className="chat-icon-btn" title="More">⋯</div>
            </div>
          </div>

          <div className="chat-context">
            <div className="chat-context-icon">{active.icon}</div>
            <div className="chat-context-info">
              <div className="chat-context-title">{active.service}</div>
              <div className="chat-context-sub">
                {active.when} ·{' '}
                <span style={{ color: locked ? 'var(--text-faint)' : 'var(--green)' }}>
                  {active.status === 'active' ? 'Confirmed' : active.status === 'completed' ? 'Completed' : 'Cancelled'}
                </span>
              </div>
            </div>
            <button className="chat-context-action">View booking →</button>
          </div>

          <div className="chat-messages" ref={msgsRef}>
            <div className="chat-day-divider">Conversation</div>
            {active.messages.map((m) =>
              m.who === 'system' ? (
                <div className="chat-system" key={m.id} dangerouslySetInnerHTML={{ __html: m.text || '' }} />
              ) : (
                <div className={`chat-msg ${m.who}`} key={m.id}>
                  {m.who === 'them' && (
                    <div className="chat-msg-avatar">
                      <SvgArt svg={makeAvatar(active.providerTheme, active.providerAvatar + 'msg')} />
                    </div>
                  )}
                  <div className="chat-msg-body">
                    <div className="chat-bubble">
                      {m.image && (
                        <img
                          src={m.image}
                          alt="shared"
                          style={{ maxWidth: 220, borderRadius: 10, display: 'block', marginBottom: m.text ? 6 : 0 }}
                        />
                      )}
                      {m.text && <span dangerouslySetInnerHTML={{ __html: m.text }} />}
                    </div>
                    <div className="chat-msg-meta">
                      <span>{m.time}</span>
                      {m.who === 'me' && (m.read ? <span className="chat-read">✓✓ Read</span> : <span>✓ Sent</span>)}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Composer (active) OR locked/review state (completed) */}
          {active.status === 'active' ? (
            <>
              <div className="chat-suggestions">
                {active.suggestions.map((s) => (
                  <div className="chat-suggestion" key={s} onClick={() => send(s)}>
                    {s}
                  </div>
                ))}
              </div>
              <div className="chat-composer">
                <div className="chat-composer-row">
                  <textarea
                    className="chat-composer-input"
                    placeholder={`Message ${active.providerName.split(' ')[0]}...`}
                    rows={1}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        send(draft.trim());
                      }
                    }}
                  />
                  <div className="chat-composer-actions">
                    <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickImage} />
                    <button className="chat-attach" title="Attach photo" onClick={() => fileRef.current?.click()}>
                      📷
                    </button>
                    <button className="chat-attach" title="Send location">📍</button>
                    <button className="chat-send" onClick={() => send(draft.trim())}>
                      →
                    </button>
                  </div>
                </div>
                <div className="chat-composer-foot">
                  <div className="chat-composer-tip">🔒 End-to-end encrypted</div>
                  <div>Press Enter to send · Shift+Enter for new line</div>
                </div>
              </div>
            </>
          ) : (
            <div className="chat-locked">
              {active.review ? (
                <div className="chat-review-done">
                  <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 6 }}>
                    🔒 This booking is complete — messaging is closed.
                  </div>
                  <div style={{ color: 'var(--gold)', fontSize: 18, letterSpacing: 2 }}>
                    {'★'.repeat(active.review.rating)}
                    <span style={{ color: 'var(--line)' }}>{'★'.repeat(5 - active.review.rating)}</span>
                  </div>
                  {active.review.text && (
                    <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 6 }}>
                      “{active.review.text}”
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 4, marginBottom: 12 }}>
                    You reviewed this provider · {active.review.time}
                  </div>
                  <button className="btn" onClick={() => rebook(active)}>🔄 Book again</button>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 12 }}>
                    🔒 This booking is complete — messaging is closed. You can no longer reach out
                    to this provider.
                  </div>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button className="btn" onClick={() => rebook(active)}>🔄 Book again</button>
                    <button className="btn btn-ghost" onClick={() => setReviewing(true)}>★ Leave a review</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {reviewing && active && (
        <ReviewModal
          providerName={active.providerName}
          onClose={() => setReviewing(false)}
          onSubmit={(rating, text) => {
            dispatch({ type: 'review', id: active.id, rating, text });
            setReviewing(false);
          }}
        />
      )}
    </div>
  );
}
