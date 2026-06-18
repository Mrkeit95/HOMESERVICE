import { useEffect, useRef, useState } from 'react';

interface Msg { who: 'me' | 'them'; text: string }

const AGENT_REPLIES = [
  "Thanks for reaching out! Can you tell me a bit more about the issue?",
  "Got it — I can help with that. One moment while I check your account.",
  "You can also manage that under Account → Settings. Anything else?",
  "Happy to help! Is there anything else I can do for you today?",
];

// In-app support chat (Help & Support → Live chat). Opens on the
// 'doora:support' event. Simulated agent — a real one needs a backend.
export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { who: 'them', text: "Hi! 👋 You're chatting with Doora Support. How can we help?" },
  ]);
  const [draft, setDraft] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('doora:support', onOpen);
    return () => window.removeEventListener('doora:support', onOpen);
  }, []);
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [msgs, open]);

  if (!open) return null;

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMsgs((m) => [...m, { who: 'me', text }]);
    setDraft('');
    window.setTimeout(() => {
      setMsgs((m) => [...m, { who: 'them', text: AGENT_REPLIES[(text.length + m.length) % AGENT_REPLIES.length] }]);
    }, 1100);
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, width: 360, maxWidth: 'calc(100vw - 32px)', height: 480, background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', zIndex: 500, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💬</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Doora Support</div>
          <div style={{ fontSize: 11, color: 'var(--green)' }}>● Online · replies in ~2 min</div>
        </div>
        <div style={{ cursor: 'pointer', color: 'var(--text-dim)', fontSize: 18 }} onClick={() => setOpen(false)}>✕</div>
      </div>
      <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ alignSelf: m.who === 'me' ? 'flex-end' : 'flex-start', maxWidth: '80%', background: m.who === 'me' ? 'var(--accent)' : 'var(--bg-card)', color: m.who === 'me' ? '#fff' : 'var(--text)', padding: '9px 13px', borderRadius: 14, fontSize: 13, lineHeight: 1.45 }}>
            {m.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid var(--line)' }}>
        <input
          className="form-input"
          placeholder="Type a message…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          style={{ flex: 1 }}
        />
        <button className="btn" onClick={send} style={{ padding: '0 16px' }}>→</button>
      </div>
    </div>
  );
}
