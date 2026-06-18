import { useNavigate } from 'react-router-dom';
import type { LegalDoc } from '../content/legal';

// Standalone, shareable legal page (Terms / Privacy) — App-Store ready.
export default function Legal({ doc }: { doc: LegalDoc }) {
  const navigate = useNavigate();
  return (
    <div className="view active">
      <div className="back-link" onClick={() => navigate(-1)}>← Back</div>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 8 }}>
          {doc.title}
        </h1>
        <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 24 }}>{doc.updated}</div>
        <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 32 }}>{doc.intro}</p>
        {doc.sections.map((s) => (
          <div key={s.heading} style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 500, marginBottom: 10 }}>
              {s.heading}
            </h2>
            {s.body.map((p, i) => (
              <p key={i} style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 10 }}>
                {p}
              </p>
            ))}
          </div>
        ))}
        <div style={{ fontSize: 12, color: 'var(--text-faint)', borderTop: '1px solid var(--line)', paddingTop: 18, marginTop: 8 }}>
          This document is a draft and should be reviewed by qualified legal counsel before launch.
        </div>
      </div>
    </div>
  );
}
