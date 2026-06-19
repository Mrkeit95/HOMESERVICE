import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { HOME_CATEGORY_GROUPS } from '../config/homeCategories';
import { filterGroups, countCategories, type AudienceFilter } from '../lib/audience';
import CategoryGroups from '../components/CategoryGroups';
import { useT } from '../i18n/LanguageProvider';
import { useGoBack } from '../lib/goBack';
import type { TKey } from '../i18n/translations';

const TABS: { key: AudienceFilter; tkey: TKey }[] = [
  { key: 'all', tkey: 'filter.all' },
  { key: 'her', tkey: 'home.forHer' },
  { key: 'him', tkey: 'home.forHim' },
  { key: 'everyone', tkey: 'cat.forEveryone' },
];

const CURATED: Record<'her' | 'him', { eyebrow: string; title: string; sub: string; icon: string }> = {
  her: {
    eyebrow: 'Curated for Her',
    title: 'Beauty, hair & wellness',
    sub: 'Nails, lashes, brows, hair, facials, massage and more — the right pro, brought to your door.',
    icon: '💅',
  },
  him: {
    eyebrow: 'Curated for Him',
    title: 'Grooming, ink & recovery',
    sub: 'Barbers, tattoos, physio, training and recovery — booked to wherever you are.',
    icon: '✂️',
  },
};

export default function Categories() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const goBack = useGoBack();
  const { t } = useT();
  const [filter, setFilter] = useState<AudienceFilter>('all');
  const forParam = params.get('for');
  const audience: AudienceFilter = TABS.some((x) => x.key === forParam) ? (forParam as AudienceFilter) : 'all';

  // ---- Dedicated curated landing (Her / Him) ----
  if (audience === 'her' || audience === 'him') {
    const groups = filterGroups(HOME_CATEGORY_GROUPS, audience);
    const c = CURATED[audience];
    return (
      <div className="view active">
        <div className="back-link" onClick={goBack}>
          {t('cat.backDiscover')}
        </div>
        <div className={`curated curated-${audience}`}>
          <div className="curated-hero">
            <div className="curated-eyebrow">{c.eyebrow}</div>
            <h1 className="curated-title">{c.title}</h1>
            <p className="curated-sub">{c.sub}</p>
            <div className="curated-icon">{c.icon}</div>
          </div>
          <CategoryGroups groups={groups} />
        </div>
      </div>
    );
  }

  // ---- Plain all-categories index (reached via "40+ categories") ----
  const groups = filterGroups(HOME_CATEGORY_GROUPS, filter);
  const total = countCategories(HOME_CATEGORY_GROUPS, filter);

  const choose = (key: AudienceFilter) => {
    if (key === 'her' || key === 'him') {
      navigate(`/categories?for=${key}`);
      return;
    }
    setFilter(key);
    params.delete('for');
    setParams(params, { replace: true });
  };

  return (
    <div className="view active">
      <div className="back-link" onClick={() => navigate('/')}>
        {t('cat.backDiscover')}
      </div>

      <div className="section-head" style={{ marginTop: 8 }}>
        <div>
          <h2 className="section-title">{t('cat.allCategories')}</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 14, marginTop: 6, maxWidth: 560 }}>
            {total} {t('cat.categoriesCount')}
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
