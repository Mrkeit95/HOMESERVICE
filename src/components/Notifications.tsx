import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATIONS } from '../data/promos';

// Bell + dropdown of deal alerts and booking updates.
export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(NOTIFICATIONS);
  const wrap = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const unread = items.filter((n) => n.unread).length;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const openItem = (to: string, id: string) => {
    setItems((xs) => xs.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    setOpen(false);
    navigate(to);
  };

  return (
    <div className="notif-wrap" ref={wrap}>
      <div className="notif-btn" onClick={() => setOpen((v) => !v)} title="Notifications">
        🔔
        {unread > 0 && <span className="notif-dot" />}
      </div>
      {open && (
        <div className="notif-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px 12px' }}>
            <strong style={{ fontSize: 14 }}>Notifications</strong>
            {unread > 0 && (
              <span
                style={{ fontSize: 12, color: 'var(--accent)', cursor: 'pointer' }}
                onClick={() => setItems((xs) => xs.map((n) => ({ ...n, unread: false })))}
              >
                Mark all read
              </span>
            )}
          </div>
          {items.map((n) => (
            <div key={n.id} className={`notif-item${n.unread ? ' unread' : ''}`} onClick={() => openItem(n.to, n.id)}>
              <div className="notif-icon">{n.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{n.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.4 }}>{n.sub}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-faint)', flexShrink: 0 }}>{n.time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
