import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, run: boolean, dur = 1300) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, dur]);
  return v;
}

const STATS: { value: number; suffix: string; label: string; fmt?: (n: number) => string }[] = [
  { value: 1331, suffix: '+', label: 'Verified pros' },
  { value: 33, suffix: '', label: 'Categories' },
  { value: 494, suffix: '', label: 'Avg rating', fmt: (n) => (n / 100).toFixed(2) + '★' },
  { value: 18934, suffix: '', label: 'Bookings', fmt: (n) => n.toLocaleString() },
];

export default function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e[0].isIntersecting && (setRun(true), io.disconnect()), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="stat-band">
      {STATS.map((s) => (
        <Stat key={s.label} {...s} run={run} />
      ))}
    </div>
  );
}

function Stat({ value, suffix, label, fmt, run }: { value: number; suffix: string; label: string; fmt?: (n: number) => string; run: boolean }) {
  const v = useCountUp(value, run);
  return (
    <div className="stat-item">
      <div className="stat-value">{fmt ? fmt(v) : v.toLocaleString() + suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
