import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CATS } from '../data/categories';
import type { Provider } from '../data/types';
import ProviderCard from '../components/ProviderCard';
import { parsePrice } from '../lib/price';
import { showToast } from '../lib/toast';
import { useGoBack } from '../lib/goBack';

// Pull a distance in km out of a provider's meta (e.g. "📍 1.2 km").
function distanceKm(p: Provider): number {
  const m = p.meta.find((x) => x.includes('km'));
  return m ? parseFloat(m.replace(/[^0-9.]/g, '')) || 99 : 99;
}

type Sort = 'rated' | 'nearest' | 'price' | 'booked';

export default function Category() {
  const { key = 'massage' } = useParams();
  const goBack = useGoBack();
  const c = CATS[key] || CATS.massage;
  const [activeSub, setActiveSub] = useState(0);
  const [sort, setSort] = useState<Sort>('rated');
  const [availableNow, setAvailableNow] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [maxDist, setMaxDist] = useState(99);

  const shown = useMemo(() => {
    let list = c.providers.filter((p) => {
      if (availableNow && !/available/i.test(p.badge)) return false;
      if (topRated && p.rating < 4.9) return false;
      if (distanceKm(p) > maxDist) return false;
      return true;
    });
    const cmp: Record<Sort, (a: Provider, b: Provider) => number> = {
      rated: (a, b) => b.rating - a.rating,
      nearest: (a, b) => distanceKm(a) - distanceKm(b),
      price: (a, b) => parsePrice(a.price) - parsePrice(b.price),
      booked: (a, b) => b.rating - a.rating,
    };
    return [...list].sort(cmp[sort]);
  }, [c.providers, availableNow, topRated, maxDist, sort]);

  return (
    <div className="view active" id="view-category">
      <div className="back-link" onClick={goBack}>
        ← Back
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
              <input type="checkbox" checked={availableNow} onChange={(e) => setAvailableNow(e.target.checked)} /> Available now
            </label>
          </div>
          <div className="filter-group">
            <div className="filter-group-title">Rating</div>
            <label className="filter-check">
              <input type="checkbox" checked={topRated} onChange={(e) => setTopRated(e.target.checked)} /> <span className="star">★★★★★</span> 4.9+ only
            </label>
          </div>
          <div className="filter-group">
            <div className="filter-group-title">Distance</div>
            <label className="filter-check">
              <input type="radio" name="d" checked={maxDist === 2} onChange={() => setMaxDist(2)} /> Under 2 km
            </label>
            <label className="filter-check">
              <input type="radio" name="d" checked={maxDist === 5} onChange={() => setMaxDist(5)} /> Under 5 km
            </label>
            <label className="filter-check">
              <input type="radio" name="d" checked={maxDist === 99} onChange={() => setMaxDist(99)} /> Any distance
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
              Showing <strong style={{ color: 'var(--text)' }}>{shown.length}</strong>{' '}
              {c.title.toLowerCase()} providers near you
            </div>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="rated">Sort: Top rated</option>
              <option value="nearest">Nearest first</option>
              <option value="price">Price: low to high</option>
              <option value="booked">Most booked</option>
            </select>
          </div>
          {shown.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-dim)' }}>
              No providers match these filters.{' '}
              <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => { setAvailableNow(false); setTopRated(false); setMaxDist(99); }}>Clear filters</span>
            </div>
          ) : (
            <div className="provider-grid">
              {shown.map((p, idx) => (
                <ProviderCard
                  key={p.name}
                  provider={p}
                  catKey={key}
                  theme={c.theme}
                  index={c.providers.indexOf(p)}
                  sponsored={idx === 0}
                />
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button className="btn btn-ghost btn-large" onClick={() => showToast(`That's all ${shown.length} providers near you`)}>Load more providers</button>
          </div>
        </div>
      </div>
    </div>
  );
}
