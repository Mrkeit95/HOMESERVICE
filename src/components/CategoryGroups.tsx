import { useNavigate } from 'react-router-dom';
import type { HomeCategoryGroup } from '../config/homeCategories';

// Renders grouped category cards. Used on Home and the Categories index.
export default function CategoryGroups({ groups }: { groups: HomeCategoryGroup[] }) {
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
      {groups.map((group) => (
        <div className="cat-group" key={group.title}>
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
      ))}
    </>
  );
}
