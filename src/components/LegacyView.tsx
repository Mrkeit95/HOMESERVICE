import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { wire } from '../legacy/wire';

// Mounts a trusted legacy HTML string and attaches the delegated wiring layer.
// `back` optionally renders a "← Back" link above the content.
export default function LegacyView({
  html,
  back,
}: {
  html: string;
  back?: { label: string; to: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = wire(ref.current, navigate);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return cleanup;
  }, [html, navigate]);

  return (
    <div className="view active">
      {back && (
        <div className="back-link" onClick={() => navigate(back.to)}>
          {back.label}
        </div>
      )}
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
