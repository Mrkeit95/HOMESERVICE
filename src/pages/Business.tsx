import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeAvatar } from '../utils/art';
import SvgArt from '../components/SvgArt';
import { formatRp, useWallet } from '../store/wallet';
import { useBusiness, type PhotoCat } from '../store/business';
import { showToast } from '../lib/toast';
import { BUSINESS, BIZ_BOOKINGS, BIZ_REVIEWS, type BizBooking } from '../data/business';

type Section = 'overview' | 'bookings' | 'calendar' | 'services' | 'photos' | 'earnings' | 'reviews' | 'rewards' | 'promote' | 'profile';

const NAV: { key: Section; icon: string; label: string }[] = [
  { key: 'overview', icon: '📊', label: 'Overview' },
  { key: 'bookings', icon: '📥', label: 'Bookings' },
  { key: 'calendar', icon: '🗓️', label: 'Calendar' },
  { key: 'services', icon: '✦', label: 'Services & Pricing' },
  { key: 'photos', icon: '🖼️', label: 'Photos' },
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
  const { profile } = useBusiness();
  const p = { ...BUSINESS.profile, name: profile.name, category: profile.category + ' · Wellness & Bodywork', location: profile.location };

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
          {section === 'services' && <Services />}
          {section === 'photos' && <Photos />}
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

function Services() {
  const { services, addService, updateService, removeService } = useBusiness();
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', duration: '60 min', price: '350000' });

  const startAdd = () => {
    setForm({ name: '', duration: '60 min', price: '350000' });
    setAdding(true);
    setEditing(null);
  };
  const saveNew = () => {
    if (!form.name.trim()) return;
    addService({ name: form.name.trim(), duration: form.duration, price: parseInt(form.price) || 0, active: true, booked: 0 });
    setAdding(false);
    showToast('Service added ✓');
  };

  return (
    <div className="settings-section active">
      <PanelHead title="Services & Pricing" sub="Add, edit, price, hide or remove what you offer." />
      {services.map((s) =>
        editing === s.id ? (
          <div className="setting-row" key={s.id} style={{ flexWrap: 'wrap', gap: 8 }}>
            <input className="form-input" defaultValue={s.name} style={{ flex: '2 1 160px' }} onChange={(e) => updateService(s.id, { name: e.target.value })} />
            <input className="form-input" defaultValue={s.duration} style={{ flex: '1 1 90px' }} onChange={(e) => updateService(s.id, { duration: e.target.value })} />
            <input className="form-input" type="number" defaultValue={s.price} style={{ flex: '1 1 110px' }} onChange={(e) => updateService(s.id, { price: parseInt(e.target.value) || 0 })} />
            <button className="btn" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => { setEditing(null); showToast('Service saved ✓'); }}>Done</button>
          </div>
        ) : (
          <div className="setting-row" key={s.id}>
            <div className="setting-row-info">
              <div className="setting-row-title">{s.name} · <span style={{ color: 'var(--text-faint)' }}>{s.duration}</span></div>
              <div className="setting-row-sub">{formatRp(s.price)} · {s.booked} booked this month</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => { setEditing(s.id); setAdding(false); }}>Edit</button>
              <button className="icon-btn danger" title="Remove" onClick={() => { removeService(s.id); showToast('Service removed'); }}>✕</button>
              <div className={`toggle${s.active ? ' on' : ''}`} onClick={() => { updateService(s.id, { active: !s.active }); showToast(s.active ? 'Service hidden' : 'Service live'); }} title={s.active ? 'Active' : 'Hidden'} />
            </div>
          </div>
        ),
      )}

      {adding ? (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: 16, marginTop: 14 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            <input className="form-input" placeholder="Service name" value={form.name} style={{ flex: '2 1 160px' }} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="form-input" placeholder="Duration" value={form.duration} style={{ flex: '1 1 90px' }} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            <input className="form-input" type="number" placeholder="Price (Rp)" value={form.price} style={{ flex: '1 1 110px' }} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" style={{ padding: '8px 16px', fontSize: 13 }} onClick={saveNew}>Add service</button>
            <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }} onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="btn" style={{ marginTop: 18 }} onClick={startAdd}>+ Add service</button>
      )}
    </div>
  );
}

const PHOTO_SECTIONS: { cat: PhotoCat; title: string; hint: string }[] = [
  { cat: 'cover', title: 'Cover photo', hint: 'The big banner at the top of your public profile. Use your best, brightest shot.' },
  { cat: 'space', title: 'Your space', hint: 'Reception, treatment rooms, your setup — help customers picture the experience.' },
  { cat: 'team', title: 'Your team', hint: 'Friendly faces build trust. Add a photo of each pro customers can request.' },
  { cat: 'work', title: 'Your work', hint: 'Before/afters, products, results — show the quality of what you deliver.' },
];

function Photos() {
  const navigate = useNavigate();
  const { photos, addPhoto, removePhoto, captionPhoto } = useBusiness();

  const pick = (cat: PhotoCat) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { addPhoto(String(reader.result), file.name.replace(/\.[^.]+$/, ''), cat); showToast('Photo added ✓'); };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="settings-section active">
      <PanelHead title="Photos" sub="Add photos by area below. Each appears on your public profile, where customers decide whether to book you." />

      {/* How it appears */}
      <div
        onClick={() => navigate('/provider/massage/0')}
        style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: '14px 16px', marginBottom: 24, cursor: 'pointer' }}
      >
        <span style={{ fontSize: 20 }}>👁️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>See how customers view your photos</div>
          <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>Cover banner + gallery on your public profile</div>
        </div>
        <span style={{ color: 'var(--text-dim)' }}>→</span>
      </div>

      {PHOTO_SECTIONS.map((sec) => {
        const items = photos.filter((p) => p.category === sec.cat);
        const isCover = sec.cat === 'cover';
        return (
          <div key={sec.cat} className="panel-section">
            <div className="panel-section-title">{sec.title} <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>· {items.length}</span></div>
            <div className="panel-section-sub">{sec.hint}</div>
            <div style={{ display: 'grid', gridTemplateColumns: isCover ? 'minmax(0, 1fr)' : 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12, marginTop: 12 }}>
              {items.map((ph) => (
                <div key={ph.id} style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: isCover ? 180 : 120 }}>
                    <img src={ph.url} alt={ph.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <button className="icon-btn danger" style={{ position: 'absolute', top: 8, right: 8 }} title="Remove" onClick={() => { removePhoto(ph.id); showToast('Photo removed'); }}>✕</button>
                  </div>
                  <input className="form-input" defaultValue={ph.caption} placeholder="Add a caption…" style={{ border: 'none', borderRadius: 0, fontSize: 12 }} onChange={(e) => captionPhoto(ph.id, e.target.value)} />
                </div>
              ))}
              {/* Cover allows one; others unlimited */}
              {(!isCover || items.length === 0) && (
                <label style={{ border: '2px dashed var(--line)', borderRadius: 'var(--radius-sm)', minHeight: isCover ? 180 : 150, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-dim)', gap: 6 }}>
                  <div style={{ fontSize: 26 }}>＋</div>
                  <div style={{ fontSize: 12 }}>Add {sec.title.toLowerCase()}</div>
                  <input type="file" accept="image/*" hidden onChange={pick(sec.cat)} />
                </label>
              )}
            </div>
          </div>
        );
      })}
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

interface BoostTier { name: string; price: number; desc: string; accent: string; featured: boolean; hours: number; }
const BOOST_TIERS: BoostTier[] = [
  { name: 'Spotlight', price: 150_000, desc: 'Featured at the top of your category', accent: 'var(--male)', featured: false, hours: 24 },
  { name: 'Top of Search', price: 350_000, desc: 'Rank #1 in search results', accent: 'var(--gold)', featured: true, hours: 48 },
  { name: 'Homepage Hero', price: 750_000, desc: 'Featured on the Discover homepage', accent: 'var(--accent)', featured: false, hours: 24 },
];
const BOOST_KEY = 'doora.boost.v1';
interface ActiveBoost { name: string; startedAt: number; endsAt: number; }
function loadBoost(): ActiveBoost | null {
  try {
    const b = JSON.parse(localStorage.getItem(BOOST_KEY) || 'null');
    return b && b.endsAt > Date.now() ? b : null;
  } catch {
    return null;
  }
}
function fmtCountdown(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return d > 0 ? `${d}d ${pad(h)}:${pad(m)}:${pad(ss)}` : `${pad(h)}:${pad(m)}:${pad(ss)}`;
}

function Promote() {
  const { balance, dispatch } = useWallet();
  const [active, setActive] = useState<ActiveBoost | null>(loadBoost);
  const [checkout, setCheckout] = useState<BoostTier | null>(null);
  const [now, setNow] = useState(() => Date.now());

  // Live 1s tick while a boost is running; auto-clear on expiry.
  useEffect(() => {
    if (!active) return;
    const iv = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(iv);
  }, [active]);
  useEffect(() => {
    if (active && active.endsAt <= now) {
      setActive(null);
      try { localStorage.removeItem(BOOST_KEY); } catch { /* ignore */ }
      showToast('Boost ended — promote again to stay on top');
    }
  }, [now, active]);

  const purchase = (tier: BoostTier, method: 'wallet' | 'card') => {
    if (method === 'wallet') {
      const total = tier.price + Math.round(tier.price * 0.05); // base + service fee
      dispatch({ type: 'spend', amount: total, title: `${tier.name} boost · ${tier.hours}h promotion`, icon: '🚀' });
    }
    const startedAt = Date.now();
    const boost: ActiveBoost = { name: tier.name, startedAt, endsAt: startedAt + tier.hours * 3600_000 };
    setActive(boost);
    setNow(startedAt);
    try { localStorage.setItem(BOOST_KEY, JSON.stringify(boost)); } catch { /* ignore */ }
    setCheckout(null);
    showToast(`${tier.name} boost is live 🚀`);
  };

  const remaining = active ? active.endsAt - now : 0;
  const total = active ? active.endsAt - active.startedAt : 1;
  const pct = active ? Math.max(0, Math.min(100, (remaining / total) * 100)) : 0;

  return (
    <div className="settings-section active">
      <PanelHead title="Promote & Ads" sub="Boost your visibility and land in front of more customers." />

      {/* Active boost banner with live countdown */}
      {active && (
        <div style={{ background: 'linear-gradient(135deg, #1A1310, #2A1F18 60%, #3F2A1F)', borderRadius: 'var(--radius)', padding: '22px 26px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 0 rgba(122,184,122,0.6)', animation: 'livePulse 1.8s infinite' }} /> Boost live
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500, color: '#fff' }}>{active.name} is promoting your listing</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>You're appearing above standard results right now.</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 34, fontWeight: 600, color: '#fff', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}>{fmtCountdown(remaining)}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>remaining</div>
            </div>
          </div>
          <div style={{ height: 6, borderRadius: 100, background: 'rgba(255,255,255,0.15)', marginTop: 16, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold), var(--accent))', transition: 'width 1s linear' }} />
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {BOOST_TIERS.map((t) => {
          const isActive = active?.name === t.name;
          return (
            <div key={t.name} style={{ background: 'var(--bg-soft)', border: `1px solid ${isActive ? 'var(--green)' : t.featured ? t.accent : 'var(--line)'}`, borderRadius: 'var(--radius-sm)', padding: 22, position: 'relative', opacity: active && !isActive ? 0.6 : 1 }}>
              {t.featured && !isActive && <div style={{ position: 'absolute', top: -10, left: 16, background: t.accent, color: '#2A1F0F', fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 100, letterSpacing: '0.1em' }}>BEST VALUE</div>}
              {isActive && <div style={{ position: 'absolute', top: -10, left: 16, background: 'var(--green)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 100, letterSpacing: '0.1em' }}>● LIVE</div>}
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12, minHeight: 32 }}>{t.desc} · {t.hours}h</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 500, marginBottom: 14 }}>{formatRp(t.price)}</div>
              {isActive ? (
                <button className="btn btn-ghost" style={{ width: '100%' }} disabled>Active · {fmtCountdown(remaining)}</button>
              ) : (
                <button className="btn" style={{ width: '100%' }} disabled={!!active} onClick={() => setCheckout(t)}>Boost now</button>
              )}
            </div>
          );
        })}
      </div>
      <div className="panel-section" style={{ marginTop: 24 }}>
        <div className="panel-section-title">Why promote?</div>
        <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">📈 3.4× more profile views on average</div><div className="setting-row-sub">Promoted listings appear above standard results.</div></div></div>
        <div className="setting-row"><div className="setting-row-info"><div className="setting-row-title">⚡ Fill last-minute slots</div><div className="setting-row-sub">Great for quiet days and new services.</div></div></div>
      </div>

      {checkout && (
        <BoostCheckout tier={checkout} balance={balance} onClose={() => setCheckout(null)} onPay={(m) => purchase(checkout, m)} />
      )}
    </div>
  );
}

function BoostCheckout({ tier, balance, onClose, onPay }: { tier: BoostTier; balance: number; onClose: () => void; onPay: (m: 'wallet' | 'card') => void }) {
  const fee = Math.round(tier.price * 0.05);
  const total = tier.price + fee;
  const canWallet = balance >= total;
  return (
    <div className="modal-bg show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-close" onClick={onClose}>✕</div>
        <div style={{ fontSize: 34, marginBottom: 8 }}>🚀</div>
        <h2 style={{ marginBottom: 4 }}>Checkout · {tier.name}</h2>
        <p style={{ marginTop: 0 }}>{tier.desc} for {tier.hours} hours.</p>

        <div style={{ margin: '18px 0', padding: '16px 18px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-dim)', marginBottom: 6 }}><span>{tier.name} boost · {tier.hours}h</span><span>{formatRp(tier.price)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-dim)', marginBottom: 6 }}><span>Service fee</span><span>{formatRp(fee)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 17, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--line)' }}><span>Total</span><span>{formatRp(total)}</span></div>
        </div>

        <button className="btn modal-cta" style={{ marginBottom: 10, opacity: canWallet ? 1 : 0.5 }} disabled={!canWallet} onClick={() => onPay('wallet')}>
          {canWallet ? `Pay ${formatRp(total)} with wallet →` : 'Insufficient wallet balance'}
        </button>
        <button className="btn btn-ghost modal-cta" onClick={() => onPay('card')}>Pay with card instead</button>
        <div style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', marginTop: 10 }}>Wallet balance: {formatRp(balance)} · boost starts immediately</div>
      </div>
    </div>
  );
}

function Profile() {
  const { profile, updateProfile } = useBusiness();
  return (
    <div className="settings-section active">
      <PanelHead title="Business Profile" sub="Edit how customers see your business — saved automatically." />
      <div className="form-grid">
        <div className="form-field full"><label className="form-label">Business name</label><input className="form-input" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} /></div>
        <div className="form-field"><label className="form-label">Category</label><input className="form-input" value={profile.category} onChange={(e) => updateProfile({ category: e.target.value })} /></div>
        <div className="form-field"><label className="form-label">Service area</label><input className="form-input" value={profile.location} onChange={(e) => updateProfile({ location: e.target.value })} /></div>
        <div className="form-field full"><label className="form-label">Tagline</label><input className="form-input" value={profile.tagline} onChange={(e) => updateProfile({ tagline: e.target.value })} /></div>
        <div className="form-field full"><label className="form-label">About</label><textarea className="form-input" rows={4} style={{ resize: 'vertical', fontFamily: 'inherit' }} value={profile.about} onChange={(e) => updateProfile({ about: e.target.value })} /></div>
        <div className="form-field"><label className="form-label">Team size</label><input className="form-input" value={profile.team} onChange={(e) => updateProfile({ team: e.target.value })} /></div>
        <div className="form-field"><label className="form-label">Languages</label><input className="form-input" value={profile.languages} onChange={(e) => updateProfile({ languages: e.target.value })} /></div>
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
