import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATS } from '../data/categories';
import ProviderCard from '../components/ProviderCard';

export default function Category() {
  const { key = 'massage' } = useParams();
  const navigate = useNavigate();
  const c = CATS[key] || CATS.massage;
  const [activeSub, setActiveSub] = useState(0);

  return (
    <div className="view active" id="view-category">
      <div className="back-link" onClick={() => navigate('/')}>
        ← Back to discover
      </div>

      <div className={`cat-hero ch-${c.theme}`}>
        <div className="cat-hero-icon">{c.icon}</div>
        <div className="cat-hero-eyebrow">{c.eyebrow}</div>
        <h1 className="cat-hero-title">{c.title}</h1>
        <p className="cat-hero-sub">{c.sub}</p>
        <div className="cat-hero-stats">
          <div>
            <div className="cat-stat-big">{c.count}</div>
            <div className="cat-stat-label">Providers</div>
          </div>
          <div>
            <div className="cat-stat-big">{c.providers.length}</div>
            <div className="cat-stat-label">Near you</div>
          </div>
          <div>
            <div className="cat-stat-big">⚡ Live</div>
            <div className="cat-stat-label">Available now</div>
          </div>
        </div>
      </div>

      <div className="subservices-bar">
        {c.subs.map((s, i) => (
          <div
            key={s}
            className={`subservice ${i === activeSub ? 'active' : ''}`}
            onClick={() => setActiveSub(i)}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="cat-layout">
        <aside className="sidebar-filters">
          <div className="filter-group">
            <div className="filter-group-title">Price Range (Rp)</div>
            <div className="price-range">
              <input type="text" className="price-input" defaultValue="100k" />
              <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>–</span>
              <input type="text" className="price-input" defaultValue="2M" />
            </div>
          </div>
          <div className="filter-group">
            <div className="filter-group-title">Availability</div>
            <label className="filter-check">
              <input type="checkbox" defaultChecked /> Available now{' '}
              <span className="filter-check-count">{Math.ceil(c.providers.length * 0.6)}</span>
            </label>
            <label className="filter-check">
              <input type="checkbox" /> Today{' '}
              <span className="filter-check-count">{c.providers.length}</span>
            </label>
            <label className="filter-check">
              <input type="checkbox" /> This week{' '}
              <span className="filter-check-count">{c.providers.length + 8}</span>
            </label>
          </div>
          <div className="filter-group">
            <div className="filter-group-title">Rating</div>
            <label className="filter-check">
              <input type="checkbox" defaultChecked /> <span className="star">★★★★★</span> 4.9+
            </label>
            <label className="filter-check">
              <input type="checkbox" /> <span className="star">★★★★</span>☆ 4.5+
            </label>
          </div>
          <div className="filter-group">
            <div className="filter-group-title">Distance</div>
            <label className="filter-check">
              <input type="radio" name="d" defaultChecked /> Under 2 km
            </label>
            <label className="filter-check">
              <input type="radio" name="d" /> Under 5 km
            </label>
            <label className="filter-check">
              <input type="radio" name="d" /> Any distance
            </label>
          </div>
          <div className="filter-group">
            <div className="filter-group-title">Provider Gender</div>
            <label className="filter-check">
              <input type="radio" name="g" defaultChecked /> Any
            </label>
            <label className="filter-check">
              <input type="radio" name="g" /> Female only
            </label>
            <label className="filter-check">
              <input type="radio" name="g" /> Male only
            </label>
          </div>
          <div className="filter-group">
            <div className="filter-group-title">Languages</div>
            <label className="filter-check">
              <input type="checkbox" defaultChecked /> English
            </label>
            <label className="filter-check">
              <input type="checkbox" /> Indonesian
            </label>
            <label className="filter-check">
              <input type="checkbox" /> Mandarin
            </label>
            <label className="filter-check">
              <input type="checkbox" /> Russian
            </label>
          </div>
        </aside>

        <div>
          <div className="results-head">
            <div style={{ fontSize: 14, color: 'var(--text-dim)' }}>
              Showing <strong style={{ color: 'var(--text)' }}>{c.providers.length}</strong>{' '}
              {c.title.toLowerCase()} providers near you
            </div>
            <select className="sort-select">
              <option>Sort: Top rated</option>
              <option>Nearest first</option>
              <option>Price: low to high</option>
              <option>Most booked</option>
            </select>
          </div>
          <div className="provider-grid">
            {c.providers.map((p, idx) => (
              <ProviderCard
                key={p.name}
                provider={p}
                catKey={key}
                theme={c.theme}
                index={idx}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button className="btn btn-ghost btn-large">Load more providers</button>
          </div>
        </div>
      </div>
    </div>
  );
}
