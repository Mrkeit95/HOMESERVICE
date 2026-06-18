// HTML-string renderers ported from the prototype's openProvider/renderMessages.
// They return trusted markup (self-authored) used via dangerouslySetInnerHTML.
// Inline onclick handlers are replaced with data-* hooks handled by wire().
import { CATS } from '../data/categories';
import { CAT_CONTEXT } from '../data/catContext';
import { THREADS } from '../data/threads';
import type { Thread } from '../data/types';
import { makeScene, makeAvatar } from '../utils/art';
import { photoFor } from '../lib/photos';

// Real themed photo layered over the generated SVG (SVG shows if the image
// fails). Used for the provider gallery + portfolio.
function photoScene(theme: string, variant: number, seed: string): string {
  return `<div style="position:absolute;inset:0">${makeScene(theme, variant, seed)}</div><img src="${photoFor(theme, seed)}" loading="lazy" onerror="this.style.display='none'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />`;
}

// Deterministic pseudo-random in [0,1) seeded by a string — keeps review
// counts / stats stable across re-renders (unlike Math.random).
function seeded(str: string): () => number {
  let s = 0;
  for (let i = 0; i < str.length; i++) s = ((s << 5) - s + str.charCodeAt(i)) | 0;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function renderProviderHTML(catKey: string, idx: number): string {
  const c = CATS[catKey] || CATS.massage;
  const p = c.providers[idx] || c.providers[0];
  const ctx = (CAT_CONTEXT[catKey] || CAT_CONTEXT.massage) as Record<string, any>;
  const teamCount = p.team.length;
  const rng = seeded(p.name + catKey);
  const reviewCount = Math.floor(180 + rng() * 600);

  return `
    <div class="pp-gallery">
      <div class="pp-gallery-item">
        ${photoScene(c.theme, 0, p.name + '-hero')}
        <div class="pp-gallery-label">${c.title} · ${ctx.portfolio[0]}</div>
      </div>
      <div class="pp-gallery-item">
        ${photoScene(c.theme, 1, p.name + '-g1')}
        <div class="pp-gallery-label">${ctx.portfolio[1]}</div>
      </div>
      <div class="pp-gallery-item">
        ${photoScene(c.theme, 2, p.name + '-g2')}
        <div class="pp-gallery-label">${ctx.portfolio[2]}</div>
      </div>
      <div class="pp-gallery-item">
        ${photoScene(c.theme, 3, p.name + '-g3')}
        <div class="pp-gallery-label">${ctx.portfolio[3]}</div>
      </div>
      <div class="pp-gallery-item">
        ${photoScene(c.theme, 0, p.name + '-g4')}
        <div class="pp-gallery-label">${ctx.portfolio[4]}</div>
        <div class="pp-gallery-more">+ ${ctx.portfolio.length - 4} more</div>
      </div>
    </div>

    <div class="pp-header">
      <div class="pp-header-info">
        <div class="pp-eyebrow"><span>${c.icon}</span> ${c.title} · ${c.eyebrow}</div>
        <h1 class="pp-name">${p.name}</h1>
        <p class="pp-tagline">${ctx.aboutTemplate(p, c).split('\n\n')[0].split('.')[0]}.</p>
        <div class="pp-meta">
          <div class="pp-meta-item"><span class="star">★</span> <strong>${p.rating}</strong> · ${reviewCount} reviews</div>
          ${p.meta.map((m) => `<div class="pp-meta-item">${m}</div>`).join('')}
          <div class="pp-meta-item">🌍 English, Indonesian</div>
        </div>
      </div>
      <div class="pp-header-actions">
        <div class="pp-icon-action" title="Save">♡</div>
        <div class="pp-icon-action" title="Share">↗</div>
      </div>
    </div>

    <div class="booking-layout">
      <div>
        <div class="pp-about">
          <h3>About ${p.name}</h3>
          ${ctx
            .aboutTemplate(p, c)
            .split('\n\n')
            .map((para: string) => `<p>${para}</p>`)
            .join('')}
          <div class="pp-quote">"${ctx.quote}"</div>
          <div class="pp-highlights">
            <div class="pp-highlight"><div class="pp-highlight-big">${p.rating}</div><div class="pp-highlight-label">Rating</div></div>
            <div class="pp-highlight"><div class="pp-highlight-big">${teamCount > 3 ? teamCount + '+' : teamCount}</div><div class="pp-highlight-label">${c.title === 'Tattoo' || c.title === 'Yoga' ? 'Artists' : 'Team'}</div></div>
            <div class="pp-highlight"><div class="pp-highlight-big">${p.stat}</div><div class="pp-highlight-label">${p.statLabel}</div></div>
            <div class="pp-highlight"><div class="pp-highlight-big">${reviewCount}</div><div class="pp-highlight-label">Reviews</div></div>
          </div>
        </div>

        <div class="pp-team">
          <div class="pp-team-head">
            <h3>Meet the team</h3>
            <div style="font-size: 13px; color: var(--text-faint);">${p.team.filter((t) => !t.startsWith('+')).length} ${c.title === 'Tattoo' ? 'artists' : 'professionals'} you can request</div>
          </div>
          <div class="pp-team-grid">
            ${p.team
              .filter((t) => !t.startsWith('+'))
              .slice(0, 3)
              .map((t, i) => {
                const bio = ctx.teamBios[i] || ctx.teamBios[0];
                const role = ctx.roleLabels[i] || ctx.roleLabels[0];
                const initFull =
                  ['Sara', 'Marcus', 'Indra', 'Lily', 'Daniel', 'Aria'][i] || 'Alex';
                const stats = [
                  ['📅 ' + (3 + i * 2) + ' yr exp', '⭐ ' + (4.85 + rng() * 0.13).toFixed(2)],
                  ['👥 ' + (180 + i * 90) + '+ clients', '⭐ ' + (4.85 + rng() * 0.13).toFixed(2)],
                  ['🏆 ' + ['Top rated', 'Senior', 'Featured'][i % 3], '⭐ ' + (4.85 + rng() * 0.13).toFixed(2)],
                ][i] || ['📅 5 yr', '⭐ 4.92'];
                return `
                <div class="pp-staff">
                  <div class="pp-staff-img">
                    ${makeAvatar(c.theme, p.name + initFull + i)}
                    ${i === 0 ? '<div class="pp-staff-fav">★ Most requested</div>' : ''}
                  </div>
                  <div class="pp-staff-body">
                    <div class="pp-staff-name">${initFull} ${t}.</div>
                    <div class="pp-staff-role">${role}</div>
                    <div class="pp-staff-bio">${bio[0]}</div>
                    <div class="pp-staff-tags">${bio[1].map((tag: string) => `<span class="pp-staff-tag">${tag}</span>`).join('')}</div>
                    <div class="pp-staff-stats">
                      <div class="pp-staff-stat">${stats[0]}</div>
                      <div class="pp-staff-stat">${stats[1]}</div>
                    </div>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
          ${teamCount > 3 ? `<button class="btn btn-ghost" style="margin-top: 16px; width: 100%;">See all ${teamCount}+ team members</button>` : ''}
        </div>

        <div class="pp-portfolio">
          <h3>${c.title === 'Tattoo' ? 'Artist portfolio' : c.title === 'Massage' || c.title === 'Physiotherapy' ? 'Studio & treatments' : 'Recent work'}</h3>
          <div class="pp-portfolio-sub">${c.title === 'Tattoo' ? 'A selection of recent pieces from our resident artists.' : c.title === 'Barbers' ? 'Cuts, shaves, and the mobile setup we bring to you.' : 'Browse our space, equipment, and recent client work.'}</div>
          <div class="pp-portfolio-tabs">
            ${ctx.portTabs.map((t: string, i: number) => `<div class="pp-port-tab ${i === 0 ? 'active' : ''}">${t}</div>`).join('')}
          </div>
          <div class="pp-port-grid">
            ${ctx.portfolio
              .map(
                (title: string, i: number) => `
              <div class="pp-port-item">
                ${photoScene(c.theme, i % 4, p.name + 'port' + i)}
                <div class="pp-port-label">${title}</div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <div class="services-list">
          <h3>Services & pricing</h3>
          ${[
            { name: c.subs[1] || 'Standard Session', desc: 'Most popular option. Suitable for most clients.', dur: '60 min', price: p.price },
            { name: c.subs[2] || 'Extended Session', desc: 'Longer session, more focused work.', dur: '90 min', price: 'Rp ' + (parseInt(p.price.replace(/[^0-9]/g, '')) + 150) + 'k' },
            { name: c.subs[3] || 'Premium Package', desc: 'Full premium experience with all extras.', dur: '120 min', price: 'Rp ' + (parseInt(p.price.replace(/[^0-9]/g, '')) + 350) + 'k' },
          ]
            .map(
              (s) => `
            <div class="service-item">
              <div class="service-info"><h4>${s.name}</h4><p>${s.desc}</p><div class="service-duration">⏱ ${s.dur}</div></div>
              <div style="display: flex; align-items: center; gap: 16px;"><div class="service-price">${s.price}</div><button class="service-add">+ Add</button></div>
            </div>
          `,
            )
            .join('')}
        </div>

        <div class="reviews-section">
          <h3>Reviews · ${p.rating} · ${reviewCount} reviews</h3>
          <div style="padding: 14px 0; border-bottom: 1px solid var(--line-soft); display:flex; gap:14px; align-items:flex-start;">
            <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;flex-shrink:0;">${makeAvatar(c.theme, 'jess' + p.name)}</div>
            <div><strong>Jess M.</strong> · 2 days ago · <span class="star">★★★★★</span><br><span style="color: var(--text-dim); font-size: 13px; line-height: 1.6; display: block; margin-top: 6px;">Best ${c.title.toLowerCase()} experience I've had in Bali. Arrived right on time with all their own gear. ${p.team[0]}. was excellent — professional and skilled.</span></div>
          </div>
          <div style="padding: 14px 0; border-bottom: 1px solid var(--line-soft); display:flex; gap:14px; align-items:flex-start;">
            <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;flex-shrink:0;">${makeAvatar(c.theme, 'marco' + p.name)}</div>
            <div><strong>Marco T.</strong> · 5 days ago · <span class="star">★★★★★</span><br><span style="color: var(--text-dim); font-size: 13px; line-height: 1.6; display: block; margin-top: 6px;">Felt like a 5-star experience without leaving my villa. Everything sterile and professional. Will book again.</span></div>
          </div>
          <div style="padding: 14px 0; display:flex; gap:14px; align-items:flex-start;">
            <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;flex-shrink:0;">${makeAvatar(c.theme, 'anya' + p.name)}</div>
            <div><strong>Anya K.</strong> · 1 week ago · <span class="star">★★★★★</span><br><span style="color: var(--text-dim); font-size: 13px; line-height: 1.6; display: block; margin-top: 6px;">Booked the team for a group session — they handled everyone like pros. Worth every rupiah.</span></div>
          </div>
          <button class="btn btn-ghost" style="margin-top: 14px; width: 100%;">Read all ${reviewCount} reviews</button>
        </div>
      </div>

      <div class="booking-side">
        <div class="booking-card">
          <h3>Book your slot</h3>

          <div style="background: var(--bg); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 13px; font-weight: 500; margin-bottom: 2px;">How many people?</div>
                <div style="font-size: 11px; color: var(--text-faint);" id="pax-hint">${c.theme === 'chef' ? 'For 2 guests' : c.theme === 'cleaning' ? '1-bed villa' : c.theme === 'ac' ? '1 AC unit' : c.theme === 'language' || c.theme === 'music' ? '1-on-1 lesson' : 'Just me'}</div>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <button data-pax="-1" data-pax-theme="${c.theme}" class="pax-btn" style="width: 32px; height: 32px; border-radius: 50%; background: var(--bg-card); border: 1px solid var(--line); color: var(--text); cursor: pointer; font-size: 16px;">−</button>
                <div id="pax-count" style="font-family: 'Fraunces', serif; font-size: 24px; font-weight: 500; min-width: 24px; text-align: center;">${c.theme === 'chef' ? '2' : '1'}</div>
                <button data-pax="1" data-pax-theme="${c.theme}" class="pax-btn" style="width: 32px; height: 32px; border-radius: 50%; background: var(--accent); border: none; color: white; cursor: pointer; font-size: 16px;">+</button>
              </div>
            </div>
            <div id="pax-note" style="display: none; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--line-soft); font-size: 11px; color: var(--text-dim); line-height: 1.5;"></div>
          </div>

          <div class="calendar">
            <div class="cal-head"><div class="cal-arrow">‹</div><div>May 2026</div><div class="cal-arrow">›</div></div>
            <div class="cal-grid">
              <div class="cal-day-label">M</div><div class="cal-day-label">T</div><div class="cal-day-label">W</div><div class="cal-day-label">T</div><div class="cal-day-label">F</div><div class="cal-day-label">S</div><div class="cal-day-label">S</div>
              <div class="cal-day faded">28</div><div class="cal-day faded">29</div><div class="cal-day faded">30</div><div class="cal-day">1</div><div class="cal-day">2</div><div class="cal-day">3</div><div class="cal-day">4</div>
              <div class="cal-day">5</div><div class="cal-day">6</div><div class="cal-day">7</div><div class="cal-day">8</div><div class="cal-day">9</div><div class="cal-day">10</div><div class="cal-day">11</div>
              <div class="cal-day">12</div><div class="cal-day">13</div><div class="cal-day">14</div><div class="cal-day">15</div><div class="cal-day">16</div><div class="cal-day">17</div><div class="cal-day">18</div>
              <div class="cal-day active">19</div><div class="cal-day">20</div><div class="cal-day">21</div><div class="cal-day unavailable">22</div><div class="cal-day">23</div><div class="cal-day">24</div><div class="cal-day">25</div>
              <div class="cal-day">26</div><div class="cal-day">27</div><div class="cal-day">28</div><div class="cal-day">29</div><div class="cal-day">30</div><div class="cal-day">31</div><div class="cal-day faded">1</div>
            </div>
          </div>
          <div style="font-size: 11px; color: var(--text-faint); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Available times</div>
          <div class="time-slots">
            <div class="time-slot">10:00</div><div class="time-slot">11:30</div><div class="time-slot unavailable">13:00</div><div class="time-slot active">14:30</div><div class="time-slot">16:00</div><div class="time-slot">17:30</div>
          </div>
          <div class="pay-methods">
            <div class="pay-label">Pay with</div>
            <div class="pay-option active"><div class="pay-radio"></div><div class="pay-icon">💰</div><div class="pay-detail"><div class="pay-name">Doora Wallet</div><div class="pay-meta">Balance: Rp 1.250.000 · Save 5%</div></div></div>
            <div class="pay-option"><div class="pay-radio"></div><div class="pay-icon">💳</div><div class="pay-detail"><div class="pay-name">Credit / Debit Card</div><div class="pay-meta">Visa ending •• 4291</div></div></div>
            <div class="pay-option"><div class="pay-radio"></div><div class="pay-icon">💵</div><div class="pay-detail"><div class="pay-name">Cash on arrival</div><div class="pay-meta">Pay therapist directly</div></div></div>
          </div>
          <div style="background: var(--bg); border-radius: var(--radius-sm); padding: 14px;" data-base-price="${parseInt(p.price.replace(/[^0-9.]/g, ''))}" data-base-unit="${p.price.includes('M') ? 'M' : 'k'}">
            <div class="summary-row"><span class="summary-label" id="sum-service-label">${c.subs[1] || 'Standard'} · 60 min × <span id="sum-pax">${c.theme === 'chef' ? '2' : '1'}</span></span><span id="sum-service">${p.price}</span></div>
            <div class="summary-row" id="sum-extra-row" style="display:none;"><span class="summary-label" id="sum-extra-label">Additional person fee</span><span id="sum-extra">Rp 0</span></div>
            <div class="summary-row"><span class="summary-label">Travel + service fee</span><span>Rp 35k</span></div>
            <div class="summary-row discount"><span style="color: var(--green);">Wallet discount (5%)</span><span id="sum-discount">– Rp 20k</span></div>
            <div class="summary-row total"><span>Total</span><span id="sum-total">${p.price}</span></div>
          </div>
          <button class="btn booking-cta" data-book="1">Confirm & pay with wallet →</button>
          <button class="btn btn-ghost" data-paycard="1" style="width: 100%; margin-top: 10px;">💳 Pay with card</button>
          <button class="btn btn-ghost" data-gift="1" style="width: 100%; margin-top: 10px;">🎁 Gift this service</button>
          <div style="text-align: center; font-size: 11px; color: var(--text-faint); margin-top: 12px;">Free cancellation up to 2 hours before</div>
        </div>
      </div>
    </div>
  `;
}

// ---- Messages ----

function getLastPreview(t: Thread): string {
  for (let i = t.messages.length - 1; i >= 0; i--) {
    const m = t.messages[i];
    if (m.kind === 'system') continue;
    const prefix = m.who === 'me' ? 'You: ' : '';
    return prefix + m.text.replace(/<[^>]+>/g, '');
  }
  return '';
}

export function renderActiveChatHTML(activeThread: string): string {
  const t = THREADS.find((x) => x.id === activeThread);
  if (!t)
    return `<div class="chat-empty"><div class="chat-empty-icon">💬</div><h3>Select a conversation</h3><p>Pick a chat to view messages with your provider.</p></div>`;

  t.unread = 0;
  t.messages.forEach((m) => {
    if (m.unread) m.unread = false;
  });

  return `
    <div class="chat-head">
      <div class="chat-head-avatar">${makeAvatar(t.providerTheme, t.providerAvatar)}${t.online ? '<div class="msg-thread-online"></div>' : ''}</div>
      <div class="chat-head-info">
        <div class="chat-head-name">${t.providerName} <span class="chat-head-verified">✓ Verified provider</span></div>
        <div class="chat-head-status">${t.online ? 'Active now · ' + t.role : t.role}</div>
      </div>
      <div class="chat-head-actions">
        <div class="chat-icon-btn" title="Voice call">📞</div>
        <div class="chat-icon-btn" title="Video call">📹</div>
        <div class="chat-icon-btn" title="More">⋯</div>
      </div>
    </div>

    <div class="chat-context">
      <div class="chat-context-icon">${t.booking.icon}</div>
      <div class="chat-context-info">
        <div class="chat-context-title">${t.booking.service}</div>
        <div class="chat-context-sub">${t.booking.when} · <span style="color: ${t.booking.status === 'Completed' ? 'var(--text-faint)' : 'var(--green)'};">${t.booking.status}</span></div>
      </div>
      <button class="chat-context-action">View booking →</button>
    </div>

    <div class="chat-messages" id="chat-messages">
      <div class="chat-day-divider">Today</div>
      ${t.messages
        .map((m) => {
          if (m.kind === 'system') {
            return `<div class="chat-system">${m.text}</div>`;
          }
          return `
          <div class="chat-msg ${m.who}">
            ${m.who === 'them' ? `<div class="chat-msg-avatar">${makeAvatar(t.providerTheme, t.providerAvatar + 'msg')}</div>` : ''}
            <div class="chat-msg-body">
              <div class="chat-bubble">${m.text}</div>
              <div class="chat-msg-meta">
                <span>${m.time}</span>
                ${m.who === 'me' ? (m.read ? '<span class="chat-read">✓✓ Read</span>' : '<span>✓ Sent</span>') : ''}
              </div>
            </div>
          </div>
        `;
        })
        .join('')}
    </div>

    <div class="chat-suggestions">
      ${t.suggestions.map((s) => `<div class="chat-suggestion" data-suggestion="${s.replace(/"/g, '&quot;')}">${s}</div>`).join('')}
    </div>

    <div class="chat-composer">
      <div class="chat-composer-row">
        <textarea class="chat-composer-input" id="chat-input" placeholder="Message ${t.providerName.split(' ')[0]}..." rows="1"></textarea>
        <div class="chat-composer-actions">
          <button class="chat-attach" title="Attach photo">📷</button>
          <button class="chat-attach" title="Send location">📍</button>
          <button class="chat-send" data-send="1">→</button>
        </div>
      </div>
      <div class="chat-composer-foot">
        <div class="chat-composer-tip">🔒 End-to-end encrypted</div>
        <div>Press Enter to send · Shift+Enter for new line</div>
      </div>
    </div>
  `;
}

export function renderMessagesHTML(activeThread: string): string {
  return `
    <div class="messages-layout">
      <aside class="msg-sidebar">
        <div class="msg-sidebar-head">
          <h2>Messages</h2>
          <div class="msg-search">
            <span>🔍</span>
            <input placeholder="Search providers..." />
          </div>
        </div>
        <div class="msg-filters">
          <div class="msg-filter active">All (${THREADS.length})</div>
          <div class="msg-filter">Unread (${THREADS.filter((t) => t.unread > 0).length})</div>
          <div class="msg-filter">Active bookings</div>
          <div class="msg-filter">Archived</div>
        </div>
        <div class="msg-list">
          ${THREADS.map(
            (t) => `
            <div class="msg-thread ${t.unread > 0 ? 'unread' : ''} ${t.id === activeThread ? 'active' : ''}" data-thread="${t.id}">
              <div class="msg-thread-avatar">
                ${makeAvatar(t.providerTheme, t.providerAvatar)}
                ${t.online ? '<div class="msg-thread-online"></div>' : ''}
              </div>
              <div class="msg-thread-info">
                <div class="msg-thread-top">
                  <div class="msg-thread-name">${t.providerName}</div>
                  <div class="msg-thread-time">${t.lastTime}</div>
                </div>
                <div class="msg-thread-sub">${t.role}</div>
                <div class="msg-thread-preview">
                  <div class="msg-thread-last">${getLastPreview(t)}</div>
                  ${t.unread > 0 ? `<div class="msg-thread-badge">${t.unread}</div>` : ''}
                </div>
              </div>
            </div>
          `,
          ).join('')}
        </div>
      </aside>

      <div class="chat-area" id="chat-area">
        ${renderActiveChatHTML(activeThread)}
      </div>
    </div>
  `;
}
