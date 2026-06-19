import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { isAdmin } from '../config/admin';
import { formatRp } from '../store/wallet';
import { makeAvatar } from '../utils/art';
import SvgArt from '../components/SvgArt';
import { showToast } from '../lib/toast';
import {
  ADMIN_STATS, ADMIN_CATEGORIES, TOP_PROVIDERS, ADMIN_TX, ADMIN_USERS,
  PROVIDER_APPLICATIONS, MONTHLY_REVENUE, MONTHS, COMMISSION_RATE, TOTAL_CATEGORIES,
  type AdminTx, type ProviderApplication, type AdminUser,
} from '../data/admin';

type Section = 'overview' | 'approvals' | 'transactions' | 'providers' | 'categories' | 'users' | 'settings';

const NAV: { key: Section; icon: string; label: string }[] = [
  { key: 'overview', icon: '📈', label: 'Overview' },
  { key: 'approvals', icon: '✅', label: 'Approvals' },
  { key: 'transactions', icon: '💸', label: 'Transactions' },
  { key: 'providers', icon: '🧑‍🔧', label: 'Providers' },
  { key: 'categories', icon: '🗂️', label: 'Categories' },
  { key: 'users', icon: '👥', label: 'Users' },
  { key: 'settings', icon: '⚙️', label: 'Settings' },
];

const fmtCompact = (n: number) => (n >= 1_000_000_000 ? `Rp ${(n / 1_000_000_000).toFixed(2)}B` : n >= 1_000_000 ? `Rp ${(n / 1_000_000).toFixed(0)}M` : formatRp(n));
const txPill = (s: AdminTx['status']) => (s === 'completed' ? 'completed' : s === 'refunded' ? 'request' : 'upcoming');

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="msg-search" style={{ maxWidth: 320, marginBottom: 14 }}>
      <span>🔍</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13, borderBottom: '1px solid var(--line-soft)' }}>
      <span style={{ color: 'var(--text-dim)' }}>{label}</span>
      <span style={{ color: 'var(--text)', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [section, setSection] = useState<Section>('overview');

  // mutable state
  const [apps, setApps] = useState<ProviderApplication[]>(PROVIDER_APPLICATIONS);
  const [appFilter, setAppFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [txFilter, setTxFilter] = useState<'all' | AdminTx['status']>('all');
  const [txSearch, setTxSearch] = useState('');
  const [provSearch, setProvSearch] = useState('');
  const [provStatus, setProvStatus] = useState<'all' | 'active' | 'paused'>('all');
  const [userSearch, setUserSearch] = useState('');
  const [userType, setUserType] = useState<'all' | 'Customer' | 'Business'>('all');
  const [range, setRange] = useState<'Today' | '7d' | '30d' | 'All'>('30d');
  const [settings, setSettings] = useState({ commission: 15, autoApprove: false, requireBg: true, maintenance: false });
  const [detail, setDetail] = useState<{ kind: 'tx' | 'provider' | 'user' | 'app'; data: AdminTx | typeof TOP_PROVIDERS[number] | AdminUser | ProviderApplication } | null>(null);

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
  const pendingCount = apps.filter((a) => a.status === 'pending').length;

  const decide = (id: string, status: 'approved' | 'rejected') => {
    setApps((xs) => xs.map((a) => (a.id === id ? { ...a, status } : a)));
    setDetail(null);
    showToast(status === 'approved' ? 'Provider approved ✓ — now live' : 'Application rejected');
  };

  const shownTx = useMemo(() => ADMIN_TX.filter((t) => (txFilter === 'all' || t.status === txFilter) && (t.user + t.provider + t.id).toLowerCase().includes(txSearch.toLowerCase())), [txFilter, txSearch]);
  const shownProv = useMemo(() => TOP_PROVIDERS.filter((p) => (provStatus === 'all' || p.status === provStatus) && (p.name + p.category).toLowerCase().includes(provSearch.toLowerCase())), [provStatus, provSearch]);
  const shownUsers = useMemo(() => ADMIN_USERS.filter((u) => (userType === 'all' || u.type === userType) && (u.name + u.email).toLowerCase().includes(userSearch.toLowerCase())), [userType, userSearch]);
  const shownApps = apps.filter((a) => a.status === appFilter);

  return (
    <div className="view active">
      <div className="biz-head">
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, var(--accent), var(--accent-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📊</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500 }}>Admin Console</div>
            <span className="biz-pill request">Owner</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Platform-wide control & analytics</div>
        </div>
        <div className="msg-search" style={{ maxWidth: 240 }}><span>🔍</span><input placeholder="Search anything…" onChange={(e) => { setTxSearch(e.target.value); setProvSearch(e.target.value); setUserSearch(e.target.value); }} /></div>
      </div>

      <div className="settings-layout">
        <aside className="settings-nav">
          {NAV.map((n) => (
            <div key={n.key} className={`settings-tab${section === n.key ? ' active' : ''}`} onClick={() => setSection(n.key)}>
              <span className="settings-tab-icon">{n.icon}</span> {n.label}
              {n.key === 'approvals' && pendingCount > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--accent)', color: '#fff', borderRadius: 100, fontSize: 10, fontWeight: 600, padding: '1px 7px' }}>{pendingCount}</span>
              )}
            </div>
          ))}
        </aside>

        <div className="settings-panel">
          {/* OVERVIEW */}
          {section === 'overview' && (
            <div className="settings-section active">
              <div className="settings-panel-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div><h2>Overview</h2><p>Everything across the platform at a glance.</p></div>
                <div className="msg-filters">{(['Today', '7d', '30d', 'All'] as const).map((r) => <div key={r} className={`msg-filter${range === r ? ' active' : ''}`} onClick={() => setRange(r)}>{r}</div>)}</div>
              </div>
              {pendingCount > 0 && (
                <div onClick={() => setSection('approvals')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,180,84,0.1)', border: '1px solid rgba(255,180,84,0.35)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 18, cursor: 'pointer' }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <div style={{ flex: 1, fontSize: 13 }}><strong>{pendingCount} provider application{pendingCount > 1 ? 's' : ''}</strong> waiting for approval</div>
                  <span style={{ color: 'var(--gold)' }}>Review →</span>
                </div>
              )}
              <div className="biz-kpis">
                {[
                  ['Revenue (commission)', fmtCompact(s.revenue), `${Math.round(COMMISSION_RATE * 100)}% of GMV`, 'transactions'],
                  ['Gross booking value', fmtCompact(s.gmv), `▲ ${s.bookingsGrowthPct}%`, 'transactions'],
                  ['Total bookings', s.bookings.toLocaleString(), `${s.bookingsThisMonth.toLocaleString()} this month`, 'transactions'],
                  ['Active users', s.activeUsers.toLocaleString(), `of ${s.users.toLocaleString()} total`, 'users'],
                ].map(([label, value, delta, go]) => (
                  <div key={label as string} className="biz-kpi" style={{ cursor: 'pointer' }} onClick={() => setSection(go as Section)}>
                    <div className="biz-kpi-label">{label}</div><div className="biz-kpi-value">{value}</div><div className="biz-kpi-delta up">{delta}</div>
                  </div>
                ))}
              </div>
              <div className="biz-kpis">
                <div className="biz-kpi" style={{ cursor: 'pointer' }} onClick={() => setSection('providers')}><div className="biz-kpi-label">Providers</div><div className="biz-kpi-value">{s.providers.toLocaleString()}</div><div className="biz-kpi-delta">{s.pendingProviders} pending</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">Premium members</div><div className="biz-kpi-value">{s.premiumMembers.toLocaleString()}</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">Pending payouts</div><div className="biz-kpi-value">{fmtCompact(s.payoutsPending)}</div></div>
                <div className="biz-kpi"><div className="biz-kpi-label">New users / week</div><div className="biz-kpi-value">+{s.newUsersThisWeek}</div><div className="biz-kpi-delta up">▲ {s.usersGrowthPct}%</div></div>
              </div>
              <div className="panel-section">
                <div className="panel-section-title">Commission revenue (last 8 months)</div>
                <div className="biz-chart">{MONTHLY_REVENUE.map((v, i) => <div key={i} className="biz-bar" style={{ height: `${(v / maxRev) * 100}%` }} title={`Rp ${v}M`}><span className="biz-bar-label">{MONTHS[i]}</span></div>)}</div>
              </div>
              <div className="panel-section" style={{ marginTop: 28 }}>
                <div className="panel-section-title">Recent transactions</div>
                {ADMIN_TX.slice(0, 5).map((t) => (
                  <div className="tx-item" key={t.id} style={{ cursor: 'pointer' }} onClick={() => setDetail({ kind: 'tx', data: t })}>
                    <div className="tx-icon spend">↕</div>
                    <div className="tx-info"><div className="tx-title">{t.provider} · {t.service}</div><div className="tx-meta">{t.user} · {t.when}</div></div>
                    <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 600 }}>{formatRp(t.amount)}</div><div style={{ fontSize: 11, color: 'var(--green)' }}>+{formatRp(Math.round(t.amount * COMMISSION_RATE))}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* APPROVALS */}
          {section === 'approvals' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Business Approvals</h2><p>Review and approve providers applying to join the platform.</p></div>
              <div className="msg-filters" style={{ marginBottom: 16 }}>{(['pending', 'approved', 'rejected'] as const).map((f) => <div key={f} className={`msg-filter${appFilter === f ? ' active' : ''}`} style={{ textTransform: 'capitalize' }} onClick={() => setAppFilter(f)}>{f} ({apps.filter((a) => a.status === f).length})</div>)}</div>
              {shownApps.length === 0 ? <div style={{ color: 'var(--text-faint)', padding: '24px 0' }}>Nothing here.</div> : shownApps.map((a) => (
                <div className="biz-booking" key={a.id}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}><SvgArt svg={makeAvatar(a.theme, a.name)} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><strong style={{ fontSize: 14 }}>{a.name}</strong><span className="biz-pill upcoming">{a.type}</span></div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{a.category} · {a.location} · {a.submitted}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                      <span className={`biz-pill ${a.idVerified ? 'completed' : 'request'}`}>{a.idVerified ? '✓ ID' : 'ID pending'}</span>
                      <span className={`biz-pill ${a.backgroundCheck === 'cleared' ? 'completed' : a.backgroundCheck === 'flagged' ? 'request' : 'upcoming'}`}>BG: {a.backgroundCheck.replace('_', ' ')}</span>
                      {a.license && <span className="biz-pill completed">✓ License</span>}
                    </div>
                  </div>
                  {a.status === 'pending' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button className="btn" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => decide(a.id, 'approved')}>Approve</button>
                      <button className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => decide(a.id, 'rejected')}>Reject</button>
                      <span style={{ fontSize: 11, color: 'var(--accent)', cursor: 'pointer', textAlign: 'center' }} onClick={() => setDetail({ kind: 'app', data: a })}>Details</span>
                    </div>
                  ) : (
                    <span className={`biz-pill ${a.status === 'approved' ? 'completed' : 'request'}`}>{a.status}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TRANSACTIONS */}
          {section === 'transactions' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Transactions</h2><p>Every booking and payment across the platform. Click a row for details.</p></div>
              <SearchBar value={txSearch} onChange={setTxSearch} placeholder="Search customer, provider, ref…" />
              <div className="msg-filters" style={{ marginBottom: 16 }}>{(['all', 'completed', 'upcoming', 'refunded'] as const).map((f) => <div key={f} className={`msg-filter${txFilter === f ? ' active' : ''}`} style={{ textTransform: 'capitalize' }} onClick={() => setTxFilter(f)}>{f}</div>)}</div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ color: 'var(--text-faint)', textAlign: 'left' }}>{['Ref', 'Customer', 'Provider', 'Amount', 'Commission', 'Status'].map((h) => <th key={h} style={{ padding: '10px 12px', borderBottom: '1px solid var(--line)', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {shownTx.map((t, i) => (
                      <tr key={t.id} style={{ background: i % 2 ? 'var(--bg)' : undefined, cursor: 'pointer' }} onClick={() => setDetail({ kind: 'tx', data: t })}>
                        <td style={{ padding: '10px 12px', color: 'var(--text-faint)' }}>{t.id}</td>
                        <td style={{ padding: '10px 12px' }}>{t.user}</td>
                        <td style={{ padding: '10px 12px' }}>{t.provider}</td>
                        <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{formatRp(t.amount)}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--green)', whiteSpace: 'nowrap' }}>+{formatRp(Math.round(t.amount * COMMISSION_RATE))}</td>
                        <td style={{ padding: '10px 12px' }}><span className={`biz-pill ${txPill(t.status)}`}>{t.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {shownTx.length === 0 && <div style={{ color: 'var(--text-faint)', padding: '24px 0' }}>No matching transactions.</div>}
              </div>
            </div>
          )}

          {/* PROVIDERS */}
          {section === 'providers' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Providers</h2><p>{s.providers.toLocaleString()} providers across {TOTAL_CATEGORIES} categories. Click for details.</p></div>
              <SearchBar value={provSearch} onChange={setProvSearch} placeholder="Search providers…" />
              <div className="msg-filters" style={{ marginBottom: 16 }}>{(['all', 'active', 'paused'] as const).map((f) => <div key={f} className={`msg-filter${provStatus === f ? ' active' : ''}`} style={{ textTransform: 'capitalize' }} onClick={() => setProvStatus(f)}>{f}</div>)}</div>
              {shownProv.map((p) => (
                <div className="biz-booking" key={p.name} style={{ cursor: 'pointer' }} onClick={() => setDetail({ kind: 'provider', data: p })}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}><SvgArt svg={makeAvatar(p.theme, p.name)} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><strong style={{ fontSize: 14 }}>{p.name}</strong><span className={`biz-pill ${p.status === 'active' ? 'completed' : 'request'}`}>{p.status}</span></div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{p.category} · <span className="star">★</span> {p.rating} · {p.bookings} bookings</div>
                  </div>
                  <div style={{ textAlign: 'right' }}><div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 500 }}>{fmtCompact(p.revenue)}</div><div style={{ fontSize: 11, color: 'var(--green)' }}>+{fmtCompact(Math.round(p.revenue * COMMISSION_RATE))}</div></div>
                </div>
              ))}
            </div>
          )}

          {/* CATEGORIES */}
          {section === 'categories' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Categories</h2><p>{TOTAL_CATEGORIES} categories · {s.providers.toLocaleString()} providers.</p></div>
              {ADMIN_CATEGORIES.map((c) => {
                const pct = Math.round((c.providers / s.providers) * 100);
                return (
                  <div className="setting-row" key={c.key}>
                    <div style={{ fontSize: 22, width: 32 }}>{c.icon}</div>
                    <div className="setting-row-info" style={{ flex: 1 }}>
                      <div className="setting-row-title">{c.title}</div>
                      <div style={{ height: 6, background: 'var(--bg)', borderRadius: 100, overflow: 'hidden', marginTop: 6, maxWidth: 320 }}><div style={{ width: `${Math.max(4, pct * 4)}%`, height: '100%', background: 'var(--accent)' }} /></div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 13 }}><div style={{ fontWeight: 600 }}>{c.providers}</div><div style={{ fontSize: 11, color: 'var(--text-faint)' }}>providers</div></div>
                  </div>
                );
              })}
            </div>
          )}

          {/* USERS */}
          {section === 'users' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Users</h2><p>{s.users.toLocaleString()} total · {s.activeUsers.toLocaleString()} active. Click for details.</p></div>
              <SearchBar value={userSearch} onChange={setUserSearch} placeholder="Search name or email…" />
              <div className="msg-filters" style={{ marginBottom: 16 }}>{(['all', 'Customer', 'Business'] as const).map((f) => <div key={f} className={`msg-filter${userType === f ? ' active' : ''}`} onClick={() => setUserType(f)}>{f}</div>)}</div>
              {shownUsers.map((u) => (
                <div className="setting-row" key={u.id} style={{ cursor: 'pointer' }} onClick={() => setDetail({ kind: 'user', data: u })}>
                  <div className="biz-booking-av" style={{ width: 36, height: 36 }}>{u.name.charAt(0)}</div>
                  <div className="setting-row-info" style={{ flex: 1 }}><div className="setting-row-title">{u.name} <span className="biz-pill upcoming" style={{ marginLeft: 4 }}>{u.tier}</span></div><div className="setting-row-sub">{u.email} · {u.type} · joined {u.joined}</div></div>
                  <div style={{ textAlign: 'right', fontSize: 12 }}><div>{u.bookings} bookings</div><div style={{ color: 'var(--text-faint)' }}>{u.spend ? formatRp(u.spend) : '—'}</div></div>
                  <span className={`biz-pill ${u.status === 'active' ? 'completed' : 'request'}`} style={{ marginLeft: 10 }}>{u.status}</span>
                </div>
              ))}
            </div>
          )}

          {/* SETTINGS */}
          {section === 'settings' && (
            <div className="settings-section active">
              <div className="settings-panel-head"><h2>Platform Settings</h2><p>Control how the marketplace runs.</p></div>
              <div className="panel-section">
                <div className="panel-section-title">Commission & payouts</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">Commission rate</div><div className="setting-row-sub">Platform cut of each booking.</div></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><input type="range" min={5} max={30} value={settings.commission} onChange={(e) => setSettings({ ...settings, commission: +e.target.value })} /><strong style={{ width: 40 }}>{settings.commission}%</strong></div>
                </div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">Payout schedule</div></div><select className="form-select" style={{ width: 'auto' }}><option>Weekly (Fridays)</option><option>Daily</option><option>Bi-weekly</option></select></div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">Minimum payout</div></div><input className="form-input" style={{ width: 140 }} defaultValue="Rp 100.000" /></div>
              </div>
              <div className="panel-section">
                <div className="panel-section-title">Provider onboarding</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">Auto-approve verified providers</div><div className="setting-row-sub">Skip manual review once KYC passes.</div></div><div className={`toggle${settings.autoApprove ? ' on' : ''}`} onClick={() => setSettings({ ...settings, autoApprove: !settings.autoApprove })} /></div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">Require background check</div><div className="setting-row-sub">Mandatory before going live.</div></div><div className={`toggle${settings.requireBg ? ' on' : ''}`} onClick={() => setSettings({ ...settings, requireBg: !settings.requireBg })} /></div>
              </div>
              <div className="panel-section">
                <div className="panel-section-title">Platform</div>
                <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title" style={{ color: settings.maintenance ? 'var(--accent)' : undefined }}>Maintenance mode</div><div className="setting-row-sub">Temporarily pause new bookings.</div></div><div className={`toggle${settings.maintenance ? ' on' : ''}`} onClick={() => setSettings({ ...settings, maintenance: !settings.maintenance })} /></div>
              </div>
              <button className="btn btn-large" style={{ marginTop: 18 }} onClick={() => showToast('Platform settings saved ✓')}>Save settings</button>
            </div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      {detail && (
        <div className="modal-bg show" onClick={(e) => e.target === e.currentTarget && setDetail(null)}>
          <div className="modal" style={{ maxWidth: 460 }}>
            <div className="modal-close" onClick={() => setDetail(null)}>✕</div>
            {detail.kind === 'tx' && (() => { const t = detail.data as AdminTx; return (<>
              <h2>Transaction {t.id}</h2>
              <div style={{ marginTop: 14 }}>
                <Row label="Customer" value={t.user} /><Row label="Provider" value={t.provider} /><Row label="Service" value={t.service} />
                <Row label="Amount" value={formatRp(t.amount)} /><Row label="Commission (15%)" value={<span style={{ color: 'var(--green)' }}>{formatRp(Math.round(t.amount * COMMISSION_RATE))}</span>} />
                <Row label="When" value={t.when} /><Row label="Status" value={<span className={`biz-pill ${txPill(t.status)}`}>{t.status}</span>} />
              </div>
              {t.status !== 'refunded' && <button className="btn btn-ghost" style={{ width: '100%', marginTop: 16 }} onClick={() => { setDetail(null); showToast('Refund issued'); }}>Issue refund</button>}
            </>); })()}
            {detail.kind === 'provider' && (() => { const p = detail.data as typeof TOP_PROVIDERS[number]; return (<>
              <h2>{p.name}</h2>
              <div style={{ marginTop: 14 }}><Row label="Category" value={p.category} /><Row label="Rating" value={`★ ${p.rating}`} /><Row label="Bookings" value={p.bookings.toLocaleString()} /><Row label="Revenue" value={fmtCompact(p.revenue)} /><Row label="Commission earned" value={<span style={{ color: 'var(--green)' }}>{fmtCompact(Math.round(p.revenue * COMMISSION_RATE))}</span>} /><Row label="Status" value={p.status} /></div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn" style={{ flex: 1 }} onClick={() => { setDetail(null); showToast('Provider featured 🚀'); }}>Feature</button>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => { setDetail(null); showToast('Provider suspended'); }}>Suspend</button>
              </div>
            </>); })()}
            {detail.kind === 'user' && (() => { const u = detail.data as AdminUser; return (<>
              <h2>{u.name}</h2>
              <div style={{ marginTop: 14 }}><Row label="Email" value={u.email} /><Row label="Type" value={u.type} /><Row label="Tier" value={u.tier} /><Row label="Joined" value={u.joined} /><Row label="Bookings" value={u.bookings.toLocaleString()} /><Row label="Lifetime spend" value={u.spend ? formatRp(u.spend) : '—'} /><Row label="Status" value={u.status} /></div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => { setDetail(null); showToast('Message sent to user'); }}>Message</button>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => { setDetail(null); showToast(u.status === 'active' ? 'User suspended' : 'User reactivated'); }}>{u.status === 'active' ? 'Suspend' : 'Reactivate'}</button>
              </div>
            </>); })()}
            {detail.kind === 'app' && (() => { const a = detail.data as ProviderApplication; return (<>
              <h2>{a.name}</h2>
              <div style={{ marginTop: 14 }}><Row label="Account type" value={a.type} /><Row label="Category" value={a.category} /><Row label="Location" value={a.location} /><Row label="Submitted" value={a.submitted} /><Row label="Government ID" value={a.idVerified ? '✓ Verified' : 'Pending'} /><Row label="Background check" value={a.backgroundCheck.replace('_', ' ')} /><Row label="License" value={a.license ? '✓ Provided' : '—'} /></div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn" style={{ flex: 1 }} onClick={() => decide(a.id, 'approved')}>Approve</button>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => decide(a.id, 'rejected')}>Reject</button>
              </div>
            </>); })()}
          </div>
        </div>
      )}
    </div>
  );
}
