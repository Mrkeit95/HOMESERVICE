import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Provider } from '../data/types';
import { makeScene } from '../utils/art';
import SvgArt from './SvgArt';

export default function ProviderCard({
  provider,
  catKey,
  theme,
  index,
}: {
  provider: Provider;
  catKey: string;
  theme: string;
  index: number;
}) {
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();
  const p = provider;

  return (
    <div className="provider-card" onClick={() => navigate(`/provider/${catKey}/${index}`)}>
      <div className="provider-img">
        <div style={{ position: 'absolute', inset: 0 }}>
          <SvgArt svg={makeScene(theme, index % 4, p.name + 'cover')} />
        </div>
        <div className={`provider-badge ${p.badgeType || ''}`}>{p.badge}</div>
        <div
          className="provider-fav"
          style={{ color: fav ? '#FF5A1F' : 'white' }}
          onClick={(e) => {
            e.stopPropagation();
            setFav((v) => !v);
          }}
        >
          {fav ? '♥' : '♡'}
        </div>
        <div className="provider-deco">{p.deco}</div>
        <div className="provider-avatars">
          {p.team.map((t, i) => (
            <div
              key={i}
              className={`pa-dot ${t.startsWith('+') ? 'pa-more' : ''}`}
              style={{
                background: `linear-gradient(135deg, hsl(${i * 60 + 20}, 45%, 50%), hsl(${
                  i * 60 + 50
                }, 45%, 35%))`,
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div className="provider-stat">
          <div className="provider-stat-big">{p.stat}</div>
          <div className="provider-stat-label">{p.statLabel}</div>
        </div>
      </div>
      <div className="provider-body">
        <div className="provider-head">
          <div>
            <div className="provider-name">{p.name}</div>
            <div className="provider-meta">
              {p.meta.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          </div>
          <div className="provider-rating">
            <span className="star">★</span> {p.rating}
          </div>
        </div>
        <div className="provider-tags">
          {p.tags.map((t, i) => (
            <span className="provider-tag" key={i}>
              {t}
            </span>
          ))}
        </div>
        <div className="provider-foot">
          <div>
            <div className="provider-price">{p.price}</div>
            <span className="provider-price-sub">{p.sub}</span>
          </div>
          <button className="btn" onClick={(e) => e.stopPropagation()}>
            Book now
          </button>
        </div>
      </div>
    </div>
  );
}
