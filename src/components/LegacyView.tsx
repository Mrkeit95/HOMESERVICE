import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { wire } from '../legacy/wire';
import { useGoBack } from '../lib/goBack';

// Mounts a trusted legacy HTML string and attaches the delegated wiring layer.
// `back` optionally renders a "← Back" link above the content.
export default function LegacyView({
  html,
  back,
  onBook,
  onGift,
  onPayCard,
}: {
  html: string;
  back?: { label: string; to: string };
  onBook?: () => void;
  onGift?: () => void;
  onPayCard?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const goBack = useGoBack(back?.to);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const cleanup = wire(el, navigate);
    // The booking CTA (data-book) is handled by the host page so it can create
    // a booking in the store; intercept before the generic wiring.
    const onBookClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-gift]')) {
        e.stopPropagation();
        onGift?.();
      } else if (t.closest('[data-paycard]')) {
        e.stopPropagation();
        onPayCard?.();
      } else if (t.closest('[data-book]')) {
        e.stopPropagation();
        onBook?.();
      }
    };
    el.addEventListener('click', onBookClick, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      cleanup();
      el.removeEventListener('click', onBookClick, true);
    };
  }, [html, navigate, onBook, onGift, onPayCard]);

  return (
    <div className="view active">
      {back && (
        <div className="back-link" onClick={goBack}>
          {back.label}
        </div>
      )}
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
