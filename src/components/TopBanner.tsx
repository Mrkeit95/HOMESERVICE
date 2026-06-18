import { NavLink, useNavigate } from 'react-router-dom';
import { BRAND } from '../config/brand';
import { useWallet, formatRp } from '../store/wallet';
import { useT } from '../i18n/LanguageProvider';
import type { TKey } from '../i18n/translations';
import Notifications from './Notifications';
import LanguageSwitcher from './LanguageSwitcher';

const NAV: { to: string; key: TKey; end?: boolean; badge?: string; premium?: boolean; prefix?: string }[] = [
  { to: '/', key: 'nav.discover', end: true },
  { to: '/wallet', key: 'nav.wallet' },
  { to: '/messages', key: 'nav.messages', badge: '2' },
  { to: '/premium', key: 'nav.premium', premium: true, prefix: '✦ ' },
  { to: '/settings', key: 'nav.account' },
  { to: '/business', key: 'nav.business' },
];

export default function TopBanner() {
  const navigate = useNavigate();
  const { balance } = useWallet();
  const { t } = useT();
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
            {n.prefix}
            {t(n.key)}
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
            <div className="wallet-label">{t('common.balance')}</div>
            <div className="wallet-amount">{formatRp(balance)}</div>
          </div>
        </div>
        <div className="location-chip">📍 {BRAND.location}</div>
        <LanguageSwitcher />
        <Notifications />
        <div className="avatar-btn" onClick={() => navigate('/settings')}>
          M
        </div>
      </div>
    </div>
  );
}
