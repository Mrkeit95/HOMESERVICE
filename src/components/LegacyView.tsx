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

  // Hold the host callbacks in refs so the wiring effect doesn't re-run (and
  // re-inject / scroll-to-top / reset in-DOM state) every time they change
  // identity — e.g. when the host re-renders after adding a service to the cart.
  const cbRef = useRef({ onBook, onGift, onPayCard });
  cbRef.current = { onBook, onGift, onPayCard };

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
        cbRef.current.onGift?.();
      } else if (t.closest('[data-paycard]')) {
        e.stopPropagation();
        cbRef.current.onPayCard?.();
      } else if (t.closest('[data-book]')) {
        e.stopPropagation();
        cbRef.current.onBook?.();
      }
    };
    el.addEventListener('click', onBookClick, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      cleanup();
      el.removeEventListener('click', onBookClick, true);
    };
  }, [html, navigate]);

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
