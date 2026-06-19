import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { isAdmin } from '../config/admin';
import { formatRp } from '../store/wallet';
import { makeAvatar } from '../utils/art';
import SvgArt from '../components/SvgArt';
import {
  ADMIN_STATS, ADMIN_CATEGORIES, TOP_PROVIDERS, ADMIN_TX, MONTHLY_REVENUE, MONTHS,
  COMMISSION_RATE, TOTAL_CATEGORIES, type AdminTx,
} from '../data/admin';

type Section = 'overview' | 'transactions' | 'providers' | 'categories' | 'users';

const NAV: { key: Section; icon: string; label: string }[] = [
  { key: 'overview', icon: '📈', label: 'Overview' },
  { key: 'transactions', icon: '💸', label: 'Transactions' },
  { key: 'providers', icon: '🧑‍🔧', label: 'Providers' },
  { key: 'categories', icon: '🗂️', label: 'Categories' },
  { key: 'users', icon: '👥', label: 'Users' },
];

const fmtCompact = (n: number) => (n >= 1_000_000_000 ? `Rp ${(n / 1_000_000_000).toFixed(2)}B` : n >= 1_000_000 ? `Rp ${(n / 1_000_000).toFixed(0)}M` : formatRp(n));

const statusPill = (s: AdminTx['status']) =>
  s === 'completed' ? 'completed' : s === 'refunded' ? 'request' : 'upcoming';

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [section, setSection] = useState<Section>('overview');
  const [txFilter, setTxFilter] = useState<'all' | AdminTx['status']>('all');

  if (!isAdmin(user?.email)) {
    return (
      <div className="view active" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
        <h2 className="section-title" style={{ marginBottom: 8 }}>Admin access only</h2>
        <p style={{ color: 'var(--text-dim)' }}>This area is restricted to platform administrators.</p>
        <button className="btn" style={{ marginTop: 16 }} onClick={() => navigate('/')}>Back to app →</button>
      </div>
    );
  }

  const s = ADMIN_STATS;
  const maxRev = Math.max(...MONTHLY_REVENUE);
  const shownTx = txFilter === 'all' ? ADMIN_TX : ADMIN_TX.filter((t) => t.status === txFilter);

  return (
    <div className="view active">
      {/* Header */}
      <div className="biz-head">
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, var(--accent), var(--accent-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📊</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500 }}>Admin Console</div>
            <span className="biz-pill request">Owner</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Platform-wide control & analytics</div>
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>Live data after Supabase migration</span>
      </div>

      <div className="settings-layout">
        <aside className="settings-nav">
          {NAV.map((n) => (
            <div key={n.key} className={`settings-tab${section === n.key ? ' active' : ''}`} onClick={() => setSection(n.key)}>
              <span className="settings-tab-icon">{n.icon}</span> {n.label}
            </div>
          ))}
        </aside>

        <div className="settings-panel">
          {section === 'overview' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Overview</h2><p>Everything across the platform at a glance.</p></div>
              <div className="biz-kpis">
                <div className="biz-kpi"><div className="biz-kpi-label">Revenue (commission)</div><div className="biz-kpi-value">{fmtCompact(s.revenue)}</div><div className="biz-kpi-delta up">{Math.round(COMMISSION_RATE * 100)}% of GMV</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">Gross booking value</div><div className="biz-kpi-value">{fmtCompact(s.gmv)}</div><div className="biz-kpi-delta up">▲ {s.bookingsGrowthPct}%</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">Total bookings</div><div className="biz-kpi-value">{s.bookings.toLocaleString()}</div><div className="biz-kpi-delta up">{s.bookingsThisMonth.toLocaleString()} this month</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">Active users</div><div className="biz-kpi-value">{s.activeUsers.toLocaleString()}</div><div className="biz-kpi-delta up">of {s.users.toLocaleString()} total</div></div>
              </div>
              <div className="biz-kpis" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="biz-kpi"><div className="biz-kpi-label">Providers</div><div className="biz-kpi-value">{s.providers.toLocaleString()}</div><div className="biz-kpi-delta">{s.pendingProviders} pending approval</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">Premium members</div><div className="biz-kpi-value">{s.premiumMembers.toLocaleString()}</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">Pending payouts</div><div className="biz-kpi-value">{fmtCompact(s.payoutsPending)}</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">New users / week</div><div className="biz-kpi-value">+{s.newUsersThisWeek}</div><div className="biz-kpi-delta up">▲ {s.usersGrowthPct}%</div></div>
              </div>

              <div className="panel-section">
                <div className="panel-section-title">Commission revenue (last 8 months)</div>
                <div className="biz-chart">
                  {MONTHLY_REVENUE.map((v, i) => (
                    <div key={i} className="biz-bar" style={{ height: `${(v / maxRev) * 100}%` }} title={`Rp ${v}M`}><span className="biz-bar-label">{MONTHS[i]}</span></div>
                  ))}
                </div>
              </div>

              <div className="panel-section" style={{ marginTop: 28 }}>
                <div className="panel-section-title">Recent transactions</div>
                {ADMIN_TX.slice(0, 5).map((t) => (
                  <div className="tx-item" key={t.id}>
                    <div className="tx-icon spend">↕</div>
                    <div className="tx-info"><div className="tx-title">{t.provider} · {t.service}</div><div className="tx-meta">{t.user} · {t.when} · {t.id}</div></div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 600 }}>{formatRp(t.amount)}</div>
                      <div style={{ fontSize: 11, color: 'var(--green)' }}>+{formatRp(Math.round(t.amount * COMMISSION_RATE))} comm.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'transactions' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Transactions</h2><p>Every booking and payment across the platform.</p></div>
              <div className="msg-filters" style={{ marginBottom: 16 }}>
                {(['all', 'completed', 'upcoming', 'refunded'] as const).map((f) => (
                  <div key={f} className={`msg-filter${txFilter === f ? ' active' : ''}`} style={{ textTransform: 'capitalize' }} onClick={() => setTxFilter(f)}>{f}</div>
                ))}
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ color: 'var(--text-faint)', textAlign: 'left' }}>
                      {['Ref', 'Customer', 'Provider', 'Amount', 'Commission', 'When', 'Status'].map((h) => (
                        <th key={h} style={{ padding: '10px 12px', borderBottom: '1px solid var(--line)', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shownTx.map((t, i) => (
                      <tr key={t.id} style={{ background: i % 2 ? 'var(--bg)' : undefined }}>
                        <td style={{ padding: '10px 12px', color: 'var(--text-faint)' }}>{t.id}</td>
                        <td style={{ padding: '10px 12px' }}>{t.user}</td>
                        <td style={{ padding: '10px 12px' }}>{t.provider}</td>
                        <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{formatRp(t.amount)}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--green)', whiteSpace: 'nowrap' }}>+{formatRp(Math.round(t.amount * COMMISSION_RATE))}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{t.when}</td>
                        <td style={{ padding: '10px 12px' }}><span className={`biz-pill ${statusPill(t.status)}`}>{t.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === 'providers' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Providers</h2><p>{s.providers.toLocaleString()} providers across {TOTAL_CATEGORIES} categories · {s.pendingProviders} pending approval.</p></div>
              {TOP_PROVIDERS.map((p) => (
                <div className="biz-booking" key={p.name}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}><SvgArt svg={makeAvatar(p.theme, p.name)} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <strong style={{ fontSize: 14 }}>{p.name}</strong>
                      <span className={`biz-pill ${p.status === 'active' ? 'completed' : 'request'}`}>{p.status}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{p.category} · <span className="star">★</span> {p.rating} · {p.bookings} bookings</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 500 }}>{fmtCompact(p.revenue)}</div>
                    <div style={{ fontSize: 11, color: 'var(--green)' }}>+{fmtCompact(Math.round(p.revenue * COMMISSION_RATE))} comm.</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {section === 'categories' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Categories</h2><p>{TOTAL_CATEGORIES} categories · {s.providers.toLocaleString()} total providers.</p></div>
              {ADMIN_CATEGORIES.map((c) => {
                const pct = Math.round((c.providers / s.providers) * 100);
                return (
                  <div className="setting-row" key={c.key}>
                    <div style={{ fontSize: 22, width: 32 }}>{c.icon}</div>
                    <div className="setting-row-info" style={{ flex: 1 }}>
                      <div className="setting-row-title">{c.title}</div>
                      <div style={{ height: 6, background: 'var(--bg)', borderRadius: 100, overflow: 'hidden', marginTop: 6, maxWidth: 320 }}>
                        <div style={{ width: `${Math.max(4, pct * 4)}%`, height: '100%', background: 'var(--accent)' }} />
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 13 }}>
                      <div style={{ fontWeight: 600 }}>{c.providers}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>providers</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {section === 'users' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Users</h2><p>Customer base and growth.</p></div>
              <div className="biz-kpis" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="biz-kpi"><div className="biz-kpi-label">Total users</div><div className="biz-kpi-value">{s.users.toLocaleString()}</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">Active (30d)</div><div className="biz-kpi-value">{s.activeUsers.toLocaleString()}</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">New this week</div><div className="biz-kpi-value">+{s.newUsersThisWeek}</div><div className="biz-kpi-delta up">▲ {s.usersGrowthPct}%</div></div>
              </div>
              <div className="panel-section">
                <div className="panel-section-title">Recent signups</div>
                {ADMIN_TX.slice(0, 6).map((t, i) => (
                  <div className="setting-row" key={i}>
                    <div className="biz-booking-av" style={{ width: 36, height: 36 }}>{t.user.charAt(0)}</div>
                    <div className="setting-row-info"><div className="setting-row-title">{t.user}</div><div className="setting-row-sub">Joined {['just now', '2h ago', '5h ago', 'yesterday', '2 days ago', '3 days ago'][i]} · {i % 3 === 0 ? 'Premium' : 'Free'}</div></div>
                    <span className="biz-pill completed">active</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 16 }}>
                ℹ️ Cross-user figures are representative until the Supabase data migration — then these become live counts from the database.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
