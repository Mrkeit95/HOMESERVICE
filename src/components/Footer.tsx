import { Link } from 'react-router-dom';
import { BRAND } from '../config/brand';

// Global footer with legal + help links (App-Store visibility for ToS/Privacy).
export default function Footer() {
  return (
    <div
      style={{
        marginTop: 64,
        paddingTop: 24,
        borderTop: '1px solid var(--line)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 18,
        alignItems: 'center',
        fontSize: 12,
        color: 'var(--text-faint)',
      }}
    >
      <span>
        {BRAND.name} · home services, on demand · {BRAND.location}
      </span>
      <span style={{ marginLeft: 'auto', display: 'flex', gap: 18 }}>
        <Link to="/terms" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          Terms
        </Link>
        <Link to="/privacy" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          Privacy
        </Link>
        <Link to="/join-provider" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          Become a provider
        </Link>
        <Link to="/settings" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          Help
        </Link>
      </span>
    </div>
  );
}
