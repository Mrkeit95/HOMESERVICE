import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_CATEGORY_GROUPS } from '../config/homeCategories';
import { filterGroups, type AudienceFilter } from '../lib/audience';
import { resolveQuery } from '../lib/search';
import CategoryGroups from '../components/CategoryGroups';

const FILTERS: { label: string; value: AudienceFilter; dot?: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Everyone', value: 'everyone', dot: 'e' },
  { label: 'Women', value: 'women', dot: 'f' },
  { label: 'Men', value: 'men', dot: 'm' },
];

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<AudienceFilter>('all');

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const key = resolveQuery(query);
    if (key) navigate(`/category/${key}`);
    else navigate(`/categories`);
  };

  const groups = filterGroups(HOME_CATEGORY_GROUPS, filter);

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
            <form className="search-box" onSubmit={submitSearch}>
              <span style={{ color: 'var(--text-faint)' }}>🔍</span>
              <input
                placeholder="Try 'barber' or 'deep tissue massage'..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="search-btn" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="hero-side">
          <div className="side-card female" onClick={() => navigate('/categories?for=her')}>
            <div className="side-card-eyebrow">Curated for Her</div>
            <div className="side-card-title">
              Beauty,
              <br />
              hair & wellness.
            </div>
            <div className="side-card-count">Explore all →</div>
            <div className="side-card-icon">💅</div>
          </div>
          <div className="side-card male" onClick={() => navigate('/categories?for=him')}>
            <div className="side-card-eyebrow">Curated for Him</div>
            <div className="side-card-title">
              Grooming,
              <br />
              ink & recovery.
            </div>
            <div className="side-card-count">Explore all →</div>
            <div className="side-card-icon">✂️</div>
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="filter-row">
        <span className="filter-label">Filter</span>
        {FILTERS.map((f) => (
          <div
            key={f.value}
            className={`chip${filter === f.value ? ' active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.dot && <span className={`chip-dot ${f.dot}`}></span>} {f.label}
          </div>
        ))}
      </div>

      {/* Section head */}
      <div className="section-head">
        <h2 className="section-title">Browse all categories</h2>
        <div className="section-link" onClick={() => navigate('/categories')}>
          40+ categories →
        </div>
      </div>

      {/* Category groups (audience-filtered) */}
      <CategoryGroups groups={groups} />
    </div>
  );
}
