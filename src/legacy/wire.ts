// Event-delegation layer that replaces the prototype's inline handlers.
// Call wire(container, navigate) after injecting legacy HTML; it returns a
// cleanup function. Cross-view clicks route through React Router; in-view
// interactions (tabs, toggles, calendar, chat, pax pricing) run locally.
import { renderActiveChatHTML } from './render';
import { THREADS } from '../data/threads';

type Navigate = (path: string) => void;

const NAV_PATH: Record<string, string> = {
  home: '/',
  messages: '/messages',
  premium: '/premium',
  wallet: '/wallet',
  settings: '/settings',
  vendor: '/business',
  category: '/category/massage',
};

// Single-select visual groups: clicking one activates it among its siblings.
const SINGLE_SELECT = [
  'chip',
  'cal-day',
  'time-slot',
  'pay-option',
  'tx-tab',
  'pp-port-tab',
  'msg-filter',
  'quick-amount',
  'subservice',
];

function activateAmong(el: HTMLElement, cls: string) {
  const parent = el.parentElement;
  if (!parent) return;
  parent.querySelectorAll(`.${cls}`).forEach((x) => x.classList.remove('active'));
  el.classList.add('active');
}

// ---- Top-up modal (lives at document level, outside the page container) ----
function openTopup(amount?: string) {
  const modal = document.getElementById('topupModal');
  if (!modal) return;
  modal.classList.add('show');
  if (amount) {
    const input = document.getElementById('topupAmount') as HTMLInputElement | null;
    if (input) input.value = 'Rp ' + Number(amount).toLocaleString('id-ID');
  }
}
function closeTopup() {
  document.getElementById('topupModal')?.classList.remove('show');
}

// ---- Premium plan monthly/annual toggle ----
function switchPlan(btn: HTMLElement, plan: string, root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.plan-toggle').forEach((t) => {
    t.classList.remove('active');
    t.style.background = 'transparent';
    t.style.color = 'var(--text-dim)';
  });
  btn.classList.add('active');
  btn.style.background = 'var(--text)';
  btn.style.color = 'var(--bg)';
  root.querySelectorAll<HTMLElement>('.plan-price').forEach((p) => {
    const v = plan === 'annual' ? p.dataset.annual : p.dataset.monthly;
    p.textContent = 'Rp ' + v + 'k';
  });
  root.querySelectorAll('.plan-cycle').forEach((c) => {
    c.textContent = plan === 'annual' ? 'per month, billed annually' : 'per month';
  });
  root.querySelectorAll<HTMLElement>('.plan-savings').forEach((s) => {
    s.style.display = plan === 'annual' ? 'block' : 'none';
  });
}

// ---- Booking party-size (pax) pricing, scoped to the container ----
function changePax(root: HTMLElement, delta: number, theme: string) {
  const countEl = root.querySelector('#pax-count');
  if (!countEl) return;
  const hintEl = root.querySelector('#pax-hint');
  const noteEl = root.querySelector<HTMLElement>('#pax-note');
  const sumPaxEl = root.querySelector('#sum-pax');
  const sumServiceEl = root.querySelector('#sum-service');
  const sumExtraRow = root.querySelector<HTMLElement>('#sum-extra-row');
  const sumExtraLabel = root.querySelector('#sum-extra-label');
  const sumDiscountEl = root.querySelector('#sum-discount');
  const sumTotalEl = root.querySelector('#sum-total');

  let current = parseInt(countEl.textContent || '1');
  const min = theme === 'chef' ? 2 : 1;
  const max = theme === 'cleaning' ? 8 : 12;
  current = Math.min(max, Math.max(min, current + delta));
  countEl.textContent = String(current);
  if (sumPaxEl) sumPaxEl.textContent = String(current);

  const hints: Record<string, string> = {
    massage: current === 1 ? 'Just me' : current === 2 ? 'Couples — 2 therapists, side-by-side' : `Group session — ${current} therapists`,
    barber: current === 1 ? 'Just me' : `${current} cuts back-to-back`,
    yoga: current === 1 ? 'Solo private session' : current === 2 ? 'Couples / partner yoga' : `Group class for ${current}`,
    pilates: current === 1 ? 'Solo private' : `Duet (or group) for ${current}`,
    hair: current === 1 ? 'Just me' : `${current} styling slots`,
    nails: current === 1 ? 'Just me' : `${current} mani-pedi sets`,
    makeup: current === 1 ? 'Just me' : `${current} faces`,
    facials: current === 1 ? 'Just me' : `${current} facials, side-by-side`,
    chef: `For ${current} guests`,
    cleaning: current === 1 ? 'Studio / 1-bed villa' : current === 2 ? '2-bed villa' : current <= 4 ? `${current}-bed villa` : `${current}-bed villa / large home`,
    tattoo: current === 1 ? 'Just me' : `${current} bookings (different artists)`,
    pt: current === 1 ? 'Solo session' : current === 2 ? 'Partner training' : `Small group of ${current}`,
    bridal: current === 1 ? 'Just the bride' : `Bride + ${current - 1} ${current - 1 === 1 ? 'bridesmaid' : 'bridesmaids / family'}`,
    language: current === 1 ? '1-on-1 lesson' : current === 2 ? 'Couples / 2-person lesson' : `Group lesson for ${current}`,
    music: current === 1 ? '1-on-1 lesson' : current === 2 ? 'Duo lesson' : `Group lesson for ${current}`,
    ivdrip: current === 1 ? 'Just me' : `Group session — ${current} drips, side-by-side`,
    ac: current === 1 ? '1 AC unit' : `${current} AC units`,
    electrical: current === 1 ? 'Single issue / one location' : `${current} jobs in one visit`,
    plumbing: current === 1 ? 'Single issue / one location' : `${current} jobs in one visit`,
  };
  if (hintEl) hintEl.textContent = hints[theme] || (current === 1 ? 'Just me' : `For ${current} people`);

  const summaryPanel = root.querySelector<HTMLElement>('[data-base-price]');
  if (!summaryPanel) return;
  const basePrice = parseInt(summaryPanel.dataset.basePrice || '0');
  const unit = summaryPanel.dataset.baseUnit;
  const baseRp = unit === 'M' ? basePrice * 1000 : basePrice;

  let mainCost: number;
  let extraLabel = '';
  let extraCost = 0;
  if (theme === 'chef' || theme === 'cleaning' || theme === 'ac' || theme === 'electrical' || theme === 'plumbing' || theme === 'tattoo') {
    mainCost = baseRp * current;
  } else if (theme === 'massage' || theme === 'facials' || theme === 'pilates' || theme === 'ivdrip') {
    mainCost = current === 1 ? baseRp : Math.round(baseRp * current * 0.9);
    if (current > 1) {
      extraLabel = 'Group rate (10% off per person)';
      extraCost = -1;
    }
  } else if (theme === 'language' || theme === 'music') {
    if (current === 1) mainCost = baseRp;
    else if (current === 2) mainCost = Math.round(baseRp * 1.5);
    else mainCost = Math.round(baseRp * (1 + (current - 1) * 0.4));
    if (current > 1) {
      extraLabel = 'Group lesson rate (split per student)';
      extraCost = -1;
    }
  } else {
    if (current === 1) mainCost = baseRp;
    else {
      mainCost = baseRp + Math.round(baseRp * 0.75 * (current - 1));
      extraLabel = `+ ${current - 1} more × 75% rate`;
    }
  }

  const formatRp = (v: number) =>
    v >= 1000 ? `Rp ${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}M` : `Rp ${v}k`;
  if (sumServiceEl) sumServiceEl.textContent = formatRp(mainCost);
  if (extraLabel && extraCost !== -1 && sumExtraRow) {
    sumExtraRow.style.display = 'flex';
    if (sumExtraLabel) sumExtraLabel.textContent = extraLabel;
  } else if (sumExtraRow) {
    sumExtraRow.style.display = 'none';
  }

  const subtotal = mainCost + 35;
  const discount = Math.round(subtotal * 0.05);
  if (sumDiscountEl) sumDiscountEl.textContent = `– ${formatRp(discount)}`;
  if (sumTotalEl) sumTotalEl.textContent = formatRp(subtotal - discount);

  if (noteEl) {
    if (current > 1) {
      noteEl.style.display = 'block';
      let note = '';
      if (theme === 'massage' || theme === 'facials' || theme === 'pilates') note = `${current} pros will arrive together. Sessions run simultaneously side-by-side.`;
      else if (theme === 'yoga' || theme === 'pt') note = `One instructor leads all ${current} of you in a shared session.`;
      else if (theme === 'chef') note = `Chef plans menu portions for ${current}. Dietary preferences for each guest captured in checkout.`;
      else if (theme === 'cleaning') note = `Crew scaled to villa size. Estimated time: ${2 + current} hours.`;
      else if (theme === 'tattoo') note = 'Multiple artists available — match each person to their preferred style at checkout.';
      else if (theme === 'language' || theme === 'music') note = 'Group rate: students split the lesson cost. Recommended for friends or family learning together.';
      else if (theme === 'ivdrip') note = `${current} nurses arrive together. Each person drips simultaneously in your villa.`;
      else if (theme === 'ac') note = `Tech will service all ${current} units in one visit. Estimated time: ${1 + current} hours.`;
      else if (theme === 'electrical' || theme === 'plumbing') note = 'Multiple jobs scheduled in the same visit. Discuss specifics with the tech via chat.';
      else note = `Pros will work through ${current} slots back-to-back at your location.`;
      noteEl.textContent = note;
    } else {
      noteEl.style.display = 'none';
    }
  }
}

// ---- Messages: thread switch + send + simulated reply (scoped to container) ----
function scrollChatBottom(root: HTMLElement) {
  setTimeout(() => {
    const msgs = root.querySelector('#chat-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }, 50);
}

function now(): string {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

interface MsgState {
  active: string;
}

function rerenderChat(root: HTMLElement, state: MsgState) {
  const area = root.querySelector('#chat-area');
  if (area) area.innerHTML = renderActiveChatHTML(state.active);
  scrollChatBottom(root);
}

function sendMessage(root: HTMLElement, state: MsgState) {
  const input = root.querySelector<HTMLTextAreaElement>('#chat-input');
  if (!input || !input.value.trim()) return;
  const text = input.value.trim();
  const t = THREADS.find((x) => x.id === state.active);
  if (!t) return;
  t.messages.push({ who: 'me', text, time: now(), read: false });
  rerenderChat(root, state);

  setTimeout(() => {
    const msgs = root.querySelector('#chat-messages');
    if (!msgs) return;
    const typing = document.createElement('div');
    typing.className = 'chat-msg them';
    typing.id = 'typing-indicator';
    typing.innerHTML =
      '<div class="chat-msg-avatar"></div><div class="chat-typing"><div class="chat-typing-dot"></div><div class="chat-typing-dot"></div><div class="chat-typing-dot"></div></div>';
    msgs.appendChild(typing);
    scrollChatBottom(root);
    setTimeout(() => {
      root.querySelector('#typing-indicator')?.remove();
      const replies = ['Got it 👍', 'Sounds good!', 'Will do, thanks for letting me know', 'Perfect, see you then ✨', 'Noted!'];
      const reply = replies[Math.floor((text.length + t.messages.length) % replies.length)];
      t.messages.push({ who: 'them', text: reply, time: now() });
      for (let i = t.messages.length - 2; i >= 0; i--) {
        if (t.messages[i].who === 'me') {
          t.messages[i].read = true;
          break;
        }
      }
      rerenderChat(root, state);
    }, 1400);
  }, 600);
}

export function wire(container: HTMLElement, navigate: Navigate): () => void {
  const msgState: MsgState = { active: THREADS[0]?.id };

  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Cross-view navigation
    const nav = target.closest<HTMLElement>('[data-nav]');
    if (nav) {
      const path = NAV_PATH[nav.dataset.nav || ''] || '/';
      navigate(path);
      return;
    }
    const cat = target.closest<HTMLElement>('[data-cat]');
    if (cat) {
      navigate(`/category/${cat.dataset.cat}`);
      return;
    }
    const prov = target.closest<HTMLElement>('[data-prov-cat]');
    if (prov) {
      navigate(`/provider/${prov.dataset.provCat}/${prov.dataset.provIdx}`);
      return;
    }

    // Modal
    const topup = target.closest<HTMLElement>('[data-topup]');
    if (topup) {
      openTopup(topup.dataset.topup || undefined);
      return;
    }
    if (target.closest('[data-close="topup"]')) {
      closeTopup();
      return;
    }
    const amount = target.closest<HTMLElement>('[data-amount]');
    if (amount) {
      const str = amount.dataset.amountStr || '';
      const input = document.getElementById('topupAmount') as HTMLInputElement | null;
      if (input) input.value = str;
      const cta = document.querySelector('.modal-cta');
      if (cta) cta.textContent = `Top up ${str} →`;
      activateAmong(amount, 'quick-amount');
      return;
    }

    // Settings left-nav tabs
    const setTab = target.closest<HTMLElement>('[data-set]');
    if (setTab) {
      const name = setTab.dataset.set;
      container.querySelectorAll('.settings-section').forEach((s) => s.classList.remove('active'));
      container.querySelector(`#set-${name}`)?.classList.add('active');
      container.querySelectorAll('.settings-tab').forEach((t) => t.classList.remove('active'));
      setTab.classList.add('active');
      return;
    }

    // Premium plan toggle
    const plan = target.closest<HTMLElement>('[data-plan]');
    if (plan) {
      switchPlan(plan, plan.dataset.plan || 'monthly', container);
      return;
    }

    // Booking pax
    const pax = target.closest<HTMLElement>('[data-pax]');
    if (pax) {
      changePax(container, parseInt(pax.dataset.pax || '0'), pax.dataset.paxTheme || 'massage');
      return;
    }

    // Messages: thread switch
    const thread = target.closest<HTMLElement>('[data-thread]');
    if (thread) {
      msgState.active = thread.dataset.thread || msgState.active;
      container.querySelector('.msg-list')?.querySelectorAll('.msg-thread').forEach((t) => {
        t.classList.toggle('active', (t as HTMLElement).dataset.thread === msgState.active);
        if ((t as HTMLElement).dataset.thread === msgState.active) {
          t.classList.remove('unread');
          t.querySelector('.msg-thread-badge')?.remove();
        }
      });
      rerenderChat(container, msgState);
      return;
    }
    // Messages: suggestion chip
    const sug = target.closest<HTMLElement>('[data-suggestion]');
    if (sug) {
      const input = container.querySelector<HTMLTextAreaElement>('#chat-input');
      if (input) {
        input.value = sug.dataset.suggestion || '';
        sendMessage(container, msgState);
      }
      return;
    }
    // Messages: send button
    if (target.closest('[data-send]')) {
      sendMessage(container, msgState);
      return;
    }

    // On/off toggles
    const toggle = target.closest('.toggle');
    if (toggle) {
      toggle.classList.toggle('on');
      return;
    }

    // Generic single-select visual groups
    for (const cls of SINGLE_SELECT) {
      const hit = target.closest<HTMLElement>(`.${cls}`);
      if (hit) {
        if (hit.classList.contains('unavailable') || hit.classList.contains('faded')) return;
        activateAmong(hit, cls);
        return;
      }
    }
  };

  const onKeydown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'chat-input' && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(container, msgState);
    }
  };

  const onInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.id === 'chat-input') {
      target.style.height = 'auto';
      target.style.height = Math.min(100, target.scrollHeight) + 'px';
    }
  };

  container.addEventListener('click', onClick);
  container.addEventListener('keydown', onKeydown);
  container.addEventListener('input', onInput);
  return () => {
    container.removeEventListener('click', onClick);
    container.removeEventListener('keydown', onKeydown);
    container.removeEventListener('input', onInput);
  };
}
