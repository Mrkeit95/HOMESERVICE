import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_CATEGORY_GROUPS } from '../config/homeCategories';
import { filterGroups, type AudienceFilter } from '../lib/audience';
import { resolveQuery } from '../lib/search';
import CategoryGroups from '../components/CategoryGroups';
import Carousel from '../components/Carousel';
import SvgArt from '../components/SvgArt';
import { PROMOS } from '../data/promos';
import { FEATURED } from '../lib/featured';
import { makeScene } from '../utils/art';
import { useT } from '../i18n/LanguageProvider';
import type { TKey } from '../i18n/translations';

const FILTERS: { key: TKey; value: AudienceFilter; dot?: string }[] = [
  { key: 'filter.all', value: 'all' },
  { key: 'filter.everyone', value: 'everyone', dot: 'e' },
  { key: 'filter.women', value: 'women', dot: 'f' },
  { key: 'filter.men', value: 'men', dot: 'm' },
];

export default function Home() {
  const navigate = useNavigate();
  const { t } = useT();
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
            <div className="hero-eyebrow">{t('home.heroEyebrow')}</div>
            <h1 className="hero-title">
              {t('home.heroTitle1')}
              <br />
              <em>{t('home.heroTitle2')}</em>
            </h1>
          </div>
          <div>
            <p className="hero-sub">{t('home.heroSub')}</p>
            <form className="search-box" onSubmit={submitSearch}>
              <span style={{ color: 'var(--text-faint)' }}>🔍</span>
              <input
                placeholder={t('home.searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="search-btn" type="submit">
                {t('home.search')}
              </button>
            </form>
          </div>
        </div>
        <div className="hero-side">
          <div className="side-card female" onClick={() => navigate('/categories?for=her')}>
            <div className="side-card-eyebrow">{t('home.forHer')}</div>
            <div className="side-card-title">
              Beauty,
              <br />
              hair & wellness.
            </div>
            <div className="side-card-count">{t('home.exploreAll')}</div>
            <div className="side-card-icon">💅</div>
          </div>
          <div className="side-card male" onClick={() => navigate('/categories?for=him')}>
            <div className="side-card-eyebrow">{t('home.forHim')}</div>
            <div className="side-card-title">
              Grooming,
              <br />
              ink & recovery.
            </div>
            <div className="side-card-count">{t('home.exploreAll')}</div>
            <div className="side-card-icon">✂️</div>
          </div>
        </div>
      </div>

      {/* Promotions / deals carousel */}
      <Carousel title={t('home.deals')} link={t('home.seeAll')} onLink={() => navigate('/categories')}>
        {PROMOS.map((promo) => (
          <div
            key={promo.id}
            className="promo-card"
            style={{ background: promo.gradient, color: promo.color }}
            onClick={() => navigate(promo.to)}
          >
            <div>
              <div className="promo-tag">{promo.tag}</div>
              <div className="promo-title">{promo.title}</div>
              <div className="promo-sub">{promo.sub}</div>
            </div>
            <div>
              {promo.code && <span className="promo-code">CODE: {promo.code}</span>}
              <div className="promo-cta">{promo.cta}</div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Popular near you (featured providers) */}
      <Carousel title={t('home.popular')} link={t('home.viewAll')} onLink={() => navigate('/categories')}>
        {FEATURED.map((f) => (
          <div
            key={f.catKey + f.index}
            className="feat-card"
            onClick={() => navigate(`/provider/${f.catKey}/${f.index}`)}
          >
            <div className="feat-img">
              <SvgArt svg={makeScene(f.theme, f.index % 4, f.name + 'feat')} style={{ position: 'absolute', inset: 0 }} />
              <div className="feat-badge">{f.badge}</div>
            </div>
            <div className="feat-body">
              <div className="feat-name">{f.name}</div>
              <div className="feat-meta">
                <span>
                  <span className="star">★</span> {f.rating}
                </span>
                <span style={{ color: 'var(--text)', fontWeight: 600 }}>{f.price}</span>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Filter row */}
      <div className="filter-row">
        <span className="filter-label">{t('home.filter')}</span>
        {FILTERS.map((f) => (
          <div
            key={f.value}
            className={`chip${filter === f.value ? ' active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.dot && <span className={`chip-dot ${f.dot}`}></span>} {t(f.key)}
          </div>
        ))}
      </div>

      {/* Section head */}
      <div className="section-head">
        <h2 className="section-title">{t('home.browseAll')}</h2>
        <div className="section-link" onClick={() => navigate('/categories')}>
          40+ categories →
        </div>
      </div>

      {/* Category groups (audience-filtered) */}
      <CategoryGroups groups={groups} />
    </div>
  );
}
