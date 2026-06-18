import { useEffect, useRef } from 'react';
import modalHtml from '../legacy/html/topup-modal.html?raw';

// Global top-up modal — opened from anywhere via openTopup() in wire.ts, which
// toggles the #topupModal element by id. Self-wires close / backdrop / quick
// amount selection.
export default function TopupModal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const modal = root.querySelector<HTMLElement>('#topupModal');
    if (!modal) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === 'topupModal' || target.closest('[data-close="topup"]')) {
        modal.classList.remove('show');
        return;
      }
      const amount = target.closest<HTMLElement>('[data-amount]');
      if (amount) {
        const str = amount.dataset.amountStr || '';
        const input = modal.querySelector<HTMLInputElement>('#topupAmount');
        if (input) input.value = str;
        const cta = modal.querySelector('.modal-cta');
        if (cta) cta.textContent = `Top up ${str} →`;
        modal.querySelectorAll('.quick-amount').forEach((q) => q.classList.remove('active'));
        amount.classList.add('active');
      }
    };
    modal.addEventListener('click', onClick);
    return () => modal.removeEventListener('click', onClick);
  }, []);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: modalHtml }} />;
}
