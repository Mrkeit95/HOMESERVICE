import { useState } from 'react';

// Star-rating + comment modal shown after a completed booking.
export default function ReviewModal({
  providerName,
  onClose,
  onSubmit,
}: {
  providerName: string;
  onClose: () => void;
  onSubmit: (rating: number, text: string) => void;
}) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');

  return (
    <div className="modal-bg show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 460 }}>
        <div className="modal-close" onClick={onClose}>
          ✕
        </div>
        <h2>Rate your experience</h2>
        <p>How was your booking with {providerName}?</p>

        <div style={{ display: 'flex', gap: 8, margin: '18px 0 6px' }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
              style={{
                fontSize: 34,
                cursor: 'pointer',
                lineHeight: 1,
                color: (hover || rating) >= n ? 'var(--gold)' : 'var(--line)',
                transition: 'color 0.12s',
              }}
            >
              ★
            </span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 16 }}>
          {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][hover || rating]}
        </div>

        <textarea
          className="form-input"
          rows={4}
          placeholder="Share a few words about the service (optional)…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ resize: 'vertical', fontFamily: 'inherit', width: '100%' }}
        />

        <button
          className="btn modal-cta"
          style={{ marginTop: 16 }}
          onClick={() => onSubmit(rating, text.trim())}
        >
          Submit review →
        </button>
      </div>
    </div>
  );
}
