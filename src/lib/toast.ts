// Minimal transient toast — no dependencies, no provider. Appends a styled
// element to <body> and removes it after a moment.
let timer: number | undefined;

export function showToast(message: string) {
  let el = document.getElementById('doora-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'doora-toast';
    el.className = 'doora-toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  // force reflow so the transition replays
  void el.offsetWidth;
  el.classList.add('show');
  window.clearTimeout(timer);
  timer = window.setTimeout(() => el?.classList.remove('show'), 2200);
}
