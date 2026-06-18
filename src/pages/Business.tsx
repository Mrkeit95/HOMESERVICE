import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeAvatar } from '../utils/art';
import SvgArt from '../components/SvgArt';
import { formatRp } from '../store/wallet';
import { showToast } from '../lib/toast';
import { BUSINESS, BIZ_BOOKINGS, BIZ_SERVICES, BIZ_REVIEWS, type BizBooking, type BizService } from '../data/business';

type Section = 'overview' | 'bookings' | 'calendar' | 'services' | 'earnings' | 'reviews' | 'rewards' | 'promote' | 'profile';

const NAV: { key: Section; icon: string; label: string }[] = [
  { key: 'overview', icon: '📊', label: 'Overview' },
  { key: 'bookings', icon: '📥', label: 'Bookings' },
  { key: 'calendar', icon: '🗓️', label: 'Calendar' },
  { key: 'services', icon: '✦', label: 'Services & Pricing' },
  { key: 'earnings', icon: '💰', label: 'Earnings' },
  { key: 'reviews', icon: '⭐', label: 'Reviews' },
  { key: 'rewards', icon: '🏆', label: 'Rewards & Perks' },
  { key: 'promote', icon: '🚀', label: 'Promote & Ads' },
  { key: 'profile', icon: '🏪', label: 'Business Profile' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Business() {
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>('overview');
  const [accepting, setAccepting] = useState(true);
  const [bookings, setBookings] = useState<BizBooking[]>(BIZ_BOOKINGS);
  const [services, setServices] = useState<BizService[]>(BIZ_SERVICES);
  const p = BUSINESS.profile;

  const setBookingStatus = (id: string, status: BizBooking['status'] | 'remove') => {
    setBookings((bs) =>
      status === 'remove' ? bs.filter((b) => b.id !== id) : bs.map((b) => (b.id === id ? { ...b, status } : b)),
    );
  };

  const requests = bookings.filter((b) => b.status === 'request');
  const upcoming = bookings.filter((b) => b.status === 'upcoming');
  const completed = bookings.filter((b) => b.status === 'completed');

  return (
    <div className="view active">
      {/* Header */}
      <div className="biz-head">
        <div className="biz-head-avatar">
          <SvgArt svg={makeAvatar(p.theme, p.name)} />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500 }}>{p.name}</div>
            <span className="biz-pill completed" title="Identity verified & background-checked">✓ Verified</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
            Solo freelancer · {p.category} · <span className="star">★</span> {p.rating} ({p.reviewCount}) · {p.location}
          </div>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-dim)' }}>
          <span>{accepting ? 'Accepting bookings' : 'Paused'}</span>
          <div
            className={`toggle${accepting ? ' on' : ''}`}
            onClick={() => {
              setAccepting((v) => !v);
              showToast(!accepting ? 'You are now accepting bookings' : 'Bookings paused');
            }}
          />
        </label>
        <button className="btn btn-ghost" onClick={() => navigate(`/provider/${p.theme}/0`)}>
          View public profile →
        </button>
      </div>

      <div className="settings-layout">
        {/* Sub-nav */}
        <aside className="settings-nav">
          {NAV.map((n) => (
            <div
              key={n.key}
              className={`settings-tab${section === n.key ? ' active' : ''}`}
              onClick={() => setSection(n.key)}
            >
              <span className="settings-tab-icon">{n.icon}</span> {n.label}
              {n.key === 'bookings' && requests.length > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--accent)', color: 'white', borderRadius: 100, fontSize: 10, fontWeight: 600, padding: '1px 7px' }}>
                  {requests.length}
                </span>
              )}
            </div>
          ))}
        </aside>

        <div className="settings-panel">
          {section === 'overview' && <Overview bookings={bookings} />}
          {section === 'bookings' && (
            <Bookings requests={requests} upcoming={upcoming} completed={completed} onAction={setBookingStatus} />
          )}
          {section === 'calendar' && <Calendar bookings={bookings} />}
          {section === 'services' && <Services services={services} setServices={setServices} />}
          {section === 'earnings' && <Earnings />}
          {section === 'reviews' && <Reviews />}
          {section === 'rewards' && <BizRewards />}
          {section === 'promote' && <Promote />}
          {section === 'profile' && <Profile />}
        </div>
      </div>
    </div>
  );
}

function PanelHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="settings-panel-head">
      <h2>{title}</h2>
      <p>{sub}</p>
    </div>
  );
}

function Overview({ bookings }: { bookings: BizBooking[] }) {
  const k = BUSINESS.kpis;
  const max = Math.max(...BUSINESS.weeklyEarnings);
  const today = bookings.filter((b) => b.when.startsWith('Today'));
  return (
    <div className="settings-section active">
      <PanelHead title="Overview" sub="Your business at a glance." />
      <div className="biz-kpis">
        <div className="biz-kpi">
          <div className="biz-kpi-label">Today</div>
          <div className="biz-kpi-value">{formatRp(k.todayEarnings)}</div>
          <div className="biz-kpi-delta up">{k.bookingsToday} bookings</div>
        </div>
        <div className="biz-kpi">
          <div className="biz-kpi-label">This month</div>
          <div className="biz-kpi-value">{formatRp(k.monthEarnings)}</div>
          <div className="biz-kpi-delta up">▲ {k.monthGrowthPct}% vs last</div>
        </div>
        <div className="biz-kpi">
          <div className="biz-kpi-label">Profile views</div>
          <div className="biz-kpi-value">{k.profileViews.toLocaleString()}</div>
          <div className="biz-kpi-delta up">▲ {k.viewsGrowthPct}% this week</div>
        </div>
        <div className="biz-kpi">
          <div className="biz-kpi-label">Repeat rate</div>
          <div className="biz-kpi-value">{BUSINESS.profile.repeatRate}</div>
          <div className="biz-kpi-delta up">{BUSINESS.profile.responseRate} response</div>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">Earnings this week</div>
        <div className="biz-chart">
          {BUSINESS.weeklyEarnings.map((v, i) => (
            <div key={i} className="biz-bar" style={{ height: `${(v / max) * 100}%` }} title={formatRp(v * 1000)}>
              <span className="biz-bar-label">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-section" style={{ marginTop: 28 }}>
        <div className="panel-section-title">Today's schedule</div>
        {today.length === 0 ? (
          <div style={{ color: 'var(--text-faint)', fontSize: 13, padding: '8px 0' }}>Nothing left today 🎉</div>
        ) : (
          today.map((b) => (
            <div className="setting-row" key={b.id}>
              <div className="setting-row-info">
                <div className="setting-row-title">{b.when.replace('Today · ', '')} · {b.service}</div>
                <div className="setting-row-sub">{b.customer} · {b.address}</div>
              </div>
              <span className={`biz-pill ${b.status}`}>{b.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function BookingCard({ b, onAction }: { b: BizBooking; onAction: (id: string, s: BizBooking['status'] | 'remove') => void }) {
  return (
    <div className="biz-booking">
      <div className="biz-booking-av">{b.initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <strong style={{ fontSize: 14 }}>{b.customer}</strong>
          <span className={`biz-pill ${b.status}`}>{b.status}</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{b.service} · {b.when}</div>
        <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>📍 {b.address}</div>
        {b.note && <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4, fontStyle: 'italic' }}>“{b.note}”</div>}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500, marginBottom: 8 }}>{formatRp(b.price)}</div>
        {b.status === 'request' && (
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => { onAction(b.id, 'remove'); showToast('Booking declined'); }}>Decline</button>
            <button className="btn" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => { onAction(b.id, 'upcoming'); showToast('Booking accepted ✓'); }}>Accept</button>
          </div>
        )}
        {b.status === 'upcoming' && (
          <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => { onAction(b.id, 'completed'); showToast('Marked complete'); }}>Mark complete</button>
        )}
      </div>
    </div>
  );
}

function Bookings({ requests, upcoming, completed, onAction }: { requests: BizBooking[]; upcoming: BizBooking[]; completed: BizBooking[]; onAction: (id: string, s: BizBooking['status'] | 'remove') => void }) {
  const [tab, setTab] = useState<'request' | 'upcoming' | 'completed'>('request');
  const lists = { request: requests, upcoming, completed };
  const list = lists[tab];
  return (
    <div className="settings-section active">
      <PanelHead title="Bookings" sub="Accept requests and manage your schedule." />
      <div className="msg-filters" style={{ marginBottom: 18 }}>
        <div className={`msg-filter${tab === 'request' ? ' active' : ''}`} onClick={() => setTab('request')}>Requests ({requests.length})</div>
        <div className={`msg-filter${tab === 'upcoming' ? ' active' : ''}`} onClick={() => setTab('upcoming')}>Upcoming ({upcoming.length})</div>
        <div className={`msg-filter${tab === 'completed' ? ' active' : ''}`} onClick={() => setTab('completed')}>Completed ({completed.length})</div>
      </div>
      {list.length === 0 ? (
        <div style={{ color: 'var(--text-faint)', fontSize: 13, padding: '20px 0' }}>Nothing here right now.</div>
      ) : (
        list.map((b) => <BookingCard key={b.id} b={b} onAction={onAction} />)
      )}
    </div>
  );
}

function Calendar({ bookings }: { bookings: BizBooking[] }) {
  const slots = ['09:00', '10:00', '11:30', '14:30', '16:00', '17:00'];
  const dayKey = (when: string) => {
    if (when.startsWith('Today')) return 4;
    if (when.startsWith('Tomorrow') || when.startsWith('Sat')) return 5;
    return 6;
  };
  return (
    <div className="settings-section active">
      <PanelHead title="Calendar" sub="Your week at a glance (demo week)." />
      <div style={{ display: 'grid', gridTemplateColumns: `64px repeat(7, 1fr)`, gap: 6, fontSize: 12 }}>
        <div></div>
        {DAYS.map((d) => (
          <div key={d} style={{ textAlign: 'center', color: 'var(--text-faint)', fontWeight: 500, paddingBottom: 6 }}>{d}</div>
        ))}
        {slots.map((s) => (
          <Row key={s} slot={s} bookings={bookings} dayKey={dayKey} />
        ))}
      </div>
    </div>
  );
}

function Row({ slot, bookings, dayKey }: { slot: string; bookings: BizBooking[]; dayKey: (w: string) => number }) {
  return (
    <>
      <div style={{ color: 'var(--text-faint)', padding: '10px 4px' }}>{slot}</div>
      {DAYS.map((_, di) => {
        const b = bookings.find((bk) => dayKey(bk.when) === di && bk.when.includes(slot));
        return (
          <div key={di} style={{ minHeight: 38, border: '1px solid var(--line-soft)', borderRadius: 8, background: b ? 'rgba(255,90,31,0.12)' : 'var(--bg-soft)', padding: 6, fontSize: 10, color: b ? 'var(--accent-soft)' : 'transparent' }}>
            {b ? b.service.split(' · ')[0] : '·'}
          </div>
        );
      })}
    </>
  );
}

function Services({ services, setServices }: { services: BizService[]; setServices: React.Dispatch<React.SetStateAction<BizService[]>> }) {
  const toggle = (id: string) => {
    setServices((ss) => ss.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
    showToast('Service updated');
  };
  return (
    <div className="settings-section active">
      <PanelHead title="Services & Pricing" sub="Manage what you offer and what it costs." />
      {services.map((s) => (
        <div className="setting-row" key={s.id}>
          <div className="setting-row-info">
            <div className="setting-row-title">{s.name} · <span style={{ color: 'var(--text-faint)' }}>{s.duration}</span></div>
            <div className="setting-row-sub">{formatRp(s.price)} · {s.booked} booked this month</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => showToast('Edit service (demo)')}>Edit</button>
            <div className={`toggle${s.active ? ' on' : ''}`} onClick={() => toggle(s.id)} title={s.active ? 'Active' : 'Hidden'} />
          </div>
        </div>
      ))}
      <button className="btn" style={{ marginTop: 18 }} onClick={() => showToast('Add a new service (demo)')}>+ Add service</button>
    </div>
  );
}

function Earnings() {
  const e = BUSINESS.earnings;
  const payouts: [string, string, number][] = [
    ['Payout · BCA •• 7781', '14 Jun', 22_400_000],
    ['Payout · BCA •• 7781', '7 Jun', 19_800_000],
    ['Payout · BCA •• 7781', '31 May', 24_200_000],
  ];
  return (
    <div className="settings-section active">
      <PanelHead title="Earnings" sub="Track income and payouts." />
      <div className="biz-kpis" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="biz-kpi">
          <div className="biz-kpi-label">Available to withdraw</div>
          <div className="biz-kpi-value" style={{ color: 'var(--green)' }}>{formatRp(e.available)}</div>
        </div>
        <div className="biz-kpi">
          <div className="biz-kpi-label">Pending</div>
          <div className="biz-kpi-value">{formatRp(e.pending)}</div>
          <div className="biz-kpi-delta">Clears after completion</div>
        </div>
        <div className="biz-kpi">
          <div className="biz-kpi-label">Next payout</div>
          <div className="biz-kpi-value" style={{ fontSize: 20 }}>{e.nextPayout}</div>
        </div>
      </div>
      <button className="btn btn-large" style={{ marginBottom: 28 }} onClick={() => showToast('Payout requested — arrives in 1–2 days')}>
        Withdraw {formatRp(e.available)} →
      </button>
      <div className="panel-section">
        <div className="panel-section-title">Recent payouts</div>
        {payouts.map(([t, d, a], i) => (
          <div className="tx-item" key={i}>
            <div className="tx-icon topup">↓</div>
            <div className="tx-info"><div className="tx-title">{t}</div><div className="tx-meta">{d}</div></div>
            <div className="tx-amount pos">{formatRp(a)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <div className="settings-section active">
      <PanelHead title="Reviews" sub={`${BUSINESS.profile.rating} average across ${BUSINESS.profile.reviewCount} reviews.`} />
      {BIZ_REVIEWS.map((r) => (
        <div className="panel-section" key={r.id} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="biz-booking-av" style={{ width: 38, height: 38 }}>{r.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <strong style={{ fontSize: 14 }}>{r.customer}</strong>
                <span style={{ color: 'var(--gold)', fontSize: 12 }}>{'★'.repeat(r.rating)}<span style={{ color: 'var(--line)' }}>{'★'.repeat(5 - r.rating)}</span></span>
                <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>· {r.when} · {r.service}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-dim)', margin: '6px 0', lineHeight: 1.5 }}>{r.text}</div>
              {r.reply ? (
                <div style={{ fontSize: 12, color: 'var(--text-dim)', background: 'var(--bg)', borderLeft: '2px solid var(--accent)', padding: '8px 12px', borderRadius: 6 }}>
                  <strong>You replied:</strong> {r.reply}
                </div>
              ) : (
                <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => showToast('Reply sent ✓')}>Reply</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BizRewards() {
  // Provider performance tiers — better tiers earn lower commission + perks.
  const completedTotal = 247;
  const tiers = [
    { name: 'Rising', min: 0, commission: '15%', perks: ['Standard listing', 'Email support'] },
    { name: 'Pro', min: 100, commission: '13%', perks: ['Lower 13% commission', 'Priority support', 'Pro badge'] },
    { name: 'Elite', min: 250, commission: '11%', perks: ['Lowest 11% commission', 'Free monthly boost', 'Elite badge', 'Featured eligibility'] },
  ];
  let current = tiers[0];
  for (const t of tiers) if (completedTotal >= t.min) current = t;
  const idx = tiers.indexOf(current);
  const next = tiers[idx + 1];
  const progress = next ? (completedTotal - current.min) / (next.min - current.min) : 1;

  return (
    <div className="settings-section active">
      <PanelHead title="Rewards & Perks" sub="Grow your business — better tiers mean lower fees and more visibility." />
      <div style={{ background: 'linear-gradient(135deg, rgba(255,180,84,0.12), var(--bg-soft) 60%)', border: '1px solid rgba(255,180,84,0.35)', borderRadius: 'var(--radius)', padding: 26, marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Current tier · {current.name}</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 500 }}>{current.commission} commission</div>
        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>{completedTotal} completed bookings all-time</div>
        {next && (
          <div style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-dim)', marginBottom: 6 }}>
              <span>{current.name}</span>
              <span>{next.min - completedTotal} bookings to {next.name} ({next.commission})</span>
            </div>
            <div style={{ height: 8, background: 'var(--bg)', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ width: `${progress * 100}%`, height: '100%', background: 'var(--gold)' }} />
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {tiers.map((t) => (
          <div key={t.name} style={{ background: 'var(--bg-soft)', border: `1px solid ${t.name === current.name ? 'var(--gold)' : 'var(--line)'}`, borderRadius: 'var(--radius-sm)', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <strong>{t.name}</strong>
              {t.name === current.name && <span style={{ fontSize: 10, color: 'var(--gold)' }}>YOU</span>}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 10 }}>{t.min}+ bookings · {t.commission} fee</div>
            {t.perks.map((perk) => (
              <div key={perk} style={{ fontSize: 12, color: 'var(--text-dim)', padding: '3px 0', display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--green)' }}>✓</span> {perk}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="panel-section" style={{ marginTop: 24 }}>
        <div className="panel-section-title">This month's incentive</div>
        <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">🎯 Complete 30 bookings → Rp 500k bonus</div><div className="setting-row-sub">Progress: 21 / 30 this month.</div></div><span className="biz-pill upcoming">70%</span></div>
        <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">⭐ Keep 4.9★ → free Spotlight boost</div><div className="setting-row-sub">Current rating: 4.94 — you qualify!</div></div><span className="biz-pill completed">Earned</span></div>
      </div>
    </div>
  );
}

function Promote() {
  const tiers = [
    { name: 'Spotlight', price: 150_000, desc: 'Featured in your category for 7 days', accent: 'var(--male)', featured: false },
    { name: 'Top of Search', price: 350_000, desc: 'Rank #1 in search results for 14 days', accent: 'var(--gold)', featured: true },
    { name: 'Homepage Hero', price: 750_000, desc: 'Featured on the Discover homepage for 7 days', accent: 'var(--accent)', featured: false },
  ];
  return (
    <div className="settings-section active">
      <PanelHead title="Promote & Ads" sub="Boost your visibility and land in front of more customers." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {tiers.map((t) => (
          <div key={t.name} style={{ background: 'var(--bg-soft)', border: `1px solid ${t.featured ? t.accent : 'var(--line)'}`, borderRadius: 'var(--radius-sm)', padding: 22, position: 'relative' }}>
            {t.featured && <div style={{ position: 'absolute', top: -10, left: 16, background: t.accent, color: '#2A1F0F', fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 100, letterSpacing: '0.1em' }}>BEST VALUE</div>}
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{t.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12, minHeight: 32 }}>{t.desc}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 500, marginBottom: 14 }}>{formatRp(t.price)}</div>
            <button className="btn" style={{ width: '100%' }} onClick={() => showToast(`${t.name} boost activated 🚀`)}>Boost now</button>
          </div>
        ))}
      </div>
      <div className="panel-section" style={{ marginTop: 24 }}>
        <div className="panel-section-title">Why promote?</div>
        <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">📈 3.4× more profile views on average</div><div className="setting-row-sub">Promoted listings appear above standard results.</div></div></div>
        <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">⚡ Fill last-minute slots</div><div className="setting-row-sub">Great for quiet days and new services.</div></div></div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="settings-section active">
      <PanelHead title="Business Profile" sub="How customers see your business." />
      <div className="form-grid">
        <div className="form-field full"><label className="form-label">Business name</label><input className="form-input" defaultValue={BUSINESS.profile.name} /></div>
        <div className="form-field"><label className="form-label">Category</label><input className="form-input" defaultValue="Massage" /></div>
        <div className="form-field"><label className="form-label">Service area</label><input className="form-input" defaultValue={BUSINESS.profile.location} /></div>
        <div className="form-field full"><label className="form-label">Tagline</label><input className="form-input" defaultValue={BUSINESS.profile.tagline} /></div>
        <div className="form-field full"><label className="form-label">About</label><textarea className="form-input" rows={4} style={{ resize: 'vertical', fontFamily: 'inherit' }} defaultValue="Authentic Balinese collective based in Canggu, delivering traditional and contemporary bodywork to your villa, hotel or home." /></div>
        <div className="form-field"><label className="form-label">Team size</label><input className="form-input" defaultValue={`${BUSINESS.profile.team} therapists`} /></div>
        <div className="form-field"><label className="form-label">Languages</label><input className="form-input" defaultValue="English, Indonesian" /></div>
      </div>
      <button className="btn btn-large" style={{ marginTop: 20 }} onClick={() => showToast('Profile saved ✓')}>Save changes</button>

      <div className="panel-section" style={{ marginTop: 28 }}>
        <div className="panel-section-title">Identity & verification (KYC)</div>
        <div className="panel-section-sub">Account type: <strong>Solo freelancer</strong>. All checks completed.</div>
        {[['Government ID (KTP)', 'Verified'], ['Face match / liveness', 'Verified'], ['Background check', 'Cleared'], ['Professional license', 'Verified'], ['Payout bank account', 'Verified']].map(([k, v]) => (
          <div className="setting-row" key={k}>
            <div className="setting-row-info"><div className="setting-row-title">{k}</div></div>
            <span className="biz-pill completed">✓ {v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
