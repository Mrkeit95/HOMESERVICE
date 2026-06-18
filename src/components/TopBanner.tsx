import { NavLink, useNavigate } from 'react-router-dom';
import { BRAND } from '../config/brand';
import { useWallet, formatRp } from '../store/wallet';
import Notifications from './Notifications';

const NAV = [
  { to: '/', label: 'Discover', end: true },
  { to: '/categories', label: 'Categories' },
  { to: '/wallet', label: 'Wallet' },
  { to: '/messages', label: 'Messages', badge: '2' },
  { to: '/premium', label: '✦ Premium', premium: true },
  { to: '/settings', label: 'Account' },
  { to: '/business', label: 'Business' },
];

export default function TopBanner() {
  const navigate = useNavigate();
  const { balance } = useWallet();
  return (
    <div className="top-banner">
      <div className="logo-wrap" onClick={() => navigate('/')}>
        <div className="logo-mark"></div>
        <div className="logo-text">
          {BRAND.name.toLowerCase()}
          <span style={{ color: 'var(--accent)' }}>{BRAND.dot}</span>
        </div>
      </div>

      <div className="nav-pills">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) => `nav-pill${isActive ? ' active' : ''}`}
            style={
              n.premium
                ? {
                    background:
                      'linear-gradient(135deg, rgba(255,180,84,0.15), rgba(255,90,31,0.15))',
                    color: 'var(--gold)',
                  }
                : undefined
            }
          >
            {n.label}
            {n.badge && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 16,
                  height: 16,
                  padding: '0 4px',
                  background: 'var(--accent)',
                  color: 'white',
                  borderRadius: 100,
                  fontSize: 10,
                  fontWeight: 600,
                  marginLeft: 4,
                }}
              >
                {n.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      <div className="top-right">
        <div className="wallet-chip" onClick={() => navigate('/wallet')}>
          <span>💰</span>
          <div>
            <div className="wallet-label">Balance</div>
            <div className="wallet-amount">{formatRp(balance)}</div>
          </div>
        </div>
        <div className="location-chip">📍 {BRAND.location}</div>
        <Notifications />
        <div className="avatar-btn" onClick={() => navigate('/settings')}>
          M
        </div>
      </div>
    </div>
  );
}
