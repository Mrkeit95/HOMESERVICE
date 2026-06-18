import { useNavigate } from 'react-router-dom';
import type { HomeCategoryGroup } from '../config/homeCategories';
import { INLINE_ADS } from '../data/promos';

// Renders grouped category cards. Used on Home and the Categories index.
// When `ads` is true, an ad banner is interleaved after every 2nd group.
export default function CategoryGroups({
  groups,
  ads = false,
}: {
  groups: HomeCategoryGroup[];
  ads?: boolean;
}) {
  const navigate = useNavigate();
  if (groups.length === 0) {
    return (
      <div style={{ padding: '40px 0', color: 'var(--text-dim)', textAlign: 'center' }}>
        No categories match this filter.
      </div>
    );
  }
  return (
    <>
      {groups.map((group, gi) => (
        <div key={group.title}>
        <div className="cat-group">
          <div className="cat-group-head">
            <h3 className="cat-group-title">{group.title}</h3>
            <div className="cat-group-line"></div>
            <span className="cat-group-count">{group.items.length} categories</span>
          </div>
          <div className="category-grid">
            {group.items.map((c) => (
              <div
                className="cat-card"
                key={c.key}
                onClick={() => navigate(`/category/${c.key}`)}
              >
                <span className={`cat-badge ${c.badge}`}></span>
                <div className="cat-icon">{c.icon}</div>
                <div className="cat-name">{c.name}</div>
                <div className="cat-count">{c.count}</div>
              </div>
            ))}
          </div>
        </div>
        {ads && gi % 2 === 1 && (() => {
          const ad = INLINE_ADS[Math.floor(gi / 2) % INLINE_ADS.length];
          return (
            <div className="inline-ad" style={{ background: ad.gradient, color: ad.color }} onClick={() => navigate(ad.to)}>
              <div>
                <div className="inline-ad-tag">{ad.tag}</div>
                <div className="inline-ad-title">{ad.title}</div>
                <div className="inline-ad-sub">{ad.sub}</div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>{ad.cta}</div>
            </div>
          );
        })()}
        </div>
      ))}
    </>
  );
}
