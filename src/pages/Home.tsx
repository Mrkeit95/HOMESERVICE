import { useNavigate } from 'react-router-dom';
import { HOME_CATEGORY_GROUPS } from '../config/homeCategories';

const FILTERS = [
  { label: 'All', active: true },
  { label: 'Everyone', dot: 'e' },
  { label: 'Women', dot: 'f' },
  { label: 'Men', dot: 'm' },
  { label: 'Available now' },
  { label: 'Top rated' },
  { label: 'Near me' },
];

export default function Home() {
  const navigate = useNavigate();
  const go = (key: string) => navigate(`/category/${key}`);

  return (
    <div className="view active" id="view-home">
      {/* Hero */}
      <div className="hero">
        <div className="hero-main">
          <div>
            <div className="hero-eyebrow">Home Services · On Demand</div>
            <h1 className="hero-title">
              Open the door
              <br />
              <em>to anything.</em>
            </h1>
          </div>
          <div>
            <p className="hero-sub">
              Massage, barbers, yoga, tattoos, physio — whatever you need, the right pro
              shows up where you are.
            </p>
            <div className="search-box">
              <span style={{ color: 'var(--text-faint)' }}>🔍</span>
              <input placeholder="Try 'deep tissue massage tonight'..." />
              <button className="search-btn">Search</button>
            </div>
          </div>
        </div>
        <div className="hero-side">
          <div className="side-card female" onClick={() => go('nails')}>
            <div className="side-card-eyebrow">Curated for Her</div>
            <div className="side-card-title">
              Beauty,
              <br />
              hair & wellness.
            </div>
            <div className="side-card-count">18 categories</div>
            <div className="side-card-icon">💅</div>
          </div>
          <div className="side-card male" onClick={() => go('barber')}>
            <div className="side-card-eyebrow">Curated for Him</div>
            <div className="side-card-title">
              Grooming,
              <br />
              ink & recovery.
            </div>
            <div className="side-card-count">14 categories</div>
            <div className="side-card-icon">✂️</div>
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="filter-row">
        <span className="filter-label">Filter</span>
        {FILTERS.map((f) => (
          <div key={f.label} className={`chip${f.active ? ' active' : ''}`}>
            {f.dot && <span className={`chip-dot ${f.dot}`}></span>} {f.label}
          </div>
        ))}
      </div>

      {/* Section head */}
      <div className="section-head">
        <h2 className="section-title">Browse all categories</h2>
        <div className="section-link">40+ categories →</div>
      </div>

      {/* Category groups */}
      {HOME_CATEGORY_GROUPS.map((group) => (
        <div className="cat-group" key={group.title}>
          <div className="cat-group-head">
            <h3 className="cat-group-title">{group.title}</h3>
            <div className="cat-group-line"></div>
            <span className="cat-group-count">{group.countLabel}</span>
          </div>
          <div className="category-grid">
            {group.items.map((c) => (
              <div className="cat-card" key={c.key} onClick={() => go(c.key)}>
                <span className={`cat-badge ${c.badge}`}></span>
                <div className="cat-icon">{c.icon}</div>
                <div className="cat-name">{c.name}</div>
                <div className="cat-count">{c.count}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
