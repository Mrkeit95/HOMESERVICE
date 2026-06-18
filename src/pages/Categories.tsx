import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { HOME_CATEGORY_GROUPS } from '../config/homeCategories';
import { filterGroups, countCategories, type AudienceFilter } from '../lib/audience';
import CategoryGroups from '../components/CategoryGroups';
import { useT } from '../i18n/LanguageProvider';
import type { TKey } from '../i18n/translations';

const TABS: { key: AudienceFilter; tkey: TKey }[] = [
  { key: 'all', tkey: 'filter.all' },
  { key: 'her', tkey: 'home.forHer' },
  { key: 'him', tkey: 'home.forHim' },
  { key: 'everyone', tkey: 'cat.forEveryone' },
];

// Headline copy per audience landing.
const COPY: Partial<Record<AudienceFilter, { eyebrow: string; title: string; sub: string }>> = {
  her: {
    eyebrow: 'Curated for Her',
    title: 'Beauty, hair & wellness',
    sub: 'Everything from nails and lashes to massage and facials — the right pro to your door.',
  },
  him: {
    eyebrow: 'Curated for Him',
    title: 'Grooming, ink & recovery',
    sub: 'Barbers, tattoos, physio, training and more — booked to wherever you are.',
  },
};

export default function Categories() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useT();
  const initial = (params.get('for') as AudienceFilter) || 'all';
  const [filter, setFilter] = useState<AudienceFilter>(
    TABS.some((t) => t.key === initial) ? initial : 'all',
  );

  const groups = filterGroups(HOME_CATEGORY_GROUPS, filter);
  const total = countCategories(HOME_CATEGORY_GROUPS, filter);
  const copy = COPY[filter];

  const choose = (key: AudienceFilter) => {
    setFilter(key);
    if (key === 'all') params.delete('for');
    else params.set('for', key);
    setParams(params, { replace: true });
  };

  return (
    <div className="view active">
      <div className="back-link" onClick={() => navigate('/')}>
        {t('cat.backDiscover')}
      </div>

      <div className="section-head" style={{ marginTop: 8 }}>
        <div>
          {copy && (
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: 8,
                fontWeight: 500,
              }}
            >
              {copy.eyebrow}
            </div>
          )}
          <h2 className="section-title">{copy ? copy.title : t('cat.allCategories')}</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14, marginTop: 6, maxWidth: 560 }}>
            {copy ? copy.sub : `${total} ${t('cat.categoriesCount')}`}
          </p>
        </div>
      </div>

      <div className="filter-row">
        <span className="filter-label">{t('cat.show')}</span>
        {TABS.map((tab) => (
          <div
            key={tab.key}
            className={`chip${filter === tab.key ? ' active' : ''}`}
            onClick={() => choose(tab.key)}
          >
            {t(tab.tkey)}
          </div>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-faint)' }}>
          {total} {t('cat.categoriesCount')}
        </span>
      </div>

      <CategoryGroups groups={groups} />
    </div>
  );
}
