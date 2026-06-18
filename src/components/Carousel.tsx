import { useRef, type ReactNode } from 'react';

// Horizontal scroll carousel with arrow controls (Grab/Gojek-style).
export default function Carousel({
  title,
  link,
  onLink,
  children,
}: {
  title?: string;
  link?: string;
  onLink?: () => void;
  children: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    track.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };
  return (
    <div className="carousel">
      {(title || link) && (
        <div className="carousel-head">
          {title && <h2 className="carousel-title">{title}</h2>}
          <div className="carousel-nav">
            {link && (
              <span
                className="section-link"
                style={{ alignSelf: 'center', marginRight: 6 }}
                onClick={onLink}
              >
                {link}
              </span>
            )}
            <div className="carousel-arrow" onClick={() => scroll(-1)}>‹</div>
            <div className="carousel-arrow" onClick={() => scroll(1)}>›</div>
          </div>
        </div>
      )}
      <div className="carousel-track" ref={track}>
        {children}
      </div>
    </div>
  );
}
