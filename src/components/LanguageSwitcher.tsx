import { useEffect, useRef, useState } from 'react';
import { useT } from '../i18n/LanguageProvider';
import { LANGUAGES } from '../i18n/translations';

// Globe dropdown to switch language (manual override of auto-detected locale).
export default function LanguageSwitcher() {
  const { lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div className="notif-wrap" ref={wrap}>
      <div className="notif-btn" onClick={() => setOpen((v) => !v)} title="Language" style={{ fontSize: 14 }}>
        {current.flag}
      </div>
      {open && (
        <div className="notif-panel" style={{ width: 220 }} data-no-translate>
          {LANGUAGES.map((l) => (
            <div
              key={l.code}
              className={`notif-item${l.code === lang ? ' unread' : ''}`}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
            >
              <div className="notif-icon" style={{ background: 'transparent', fontSize: 20 }}>{l.flag}</div>
              <div style={{ flex: 1, fontSize: 13, alignSelf: 'center' }}>{l.label}</div>
              {l.code === lang && <span style={{ color: 'var(--accent)', alignSelf: 'center' }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
