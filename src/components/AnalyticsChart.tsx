import { useEffect, useRef, useState } from 'react';
import type { Bucket, Metric } from '../data/analytics';

// Interactive SVG analytics chart — area + line with gradient fill, gridlines,
// hover tooltip, and clickable points that drill into a bucket.
export default function AnalyticsChart({
  buckets,
  metric,
  color = 'var(--accent)',
  format,
  onSelect,
  height = 280,
}: {
  buckets: Bucket[];
  metric: Metric;
  color?: string;
  format: (n: number) => string;
  onSelect?: (b: Bucket) => void;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(800);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const padL = 56, padR = 12, padT = 16, padB = 28;
  const innerW = Math.max(10, w - padL - padR);
  const innerH = height - padT - padB;
  const vals = buckets.map((b) => b[metric]);
  const max = Math.max(1, ...vals);
  const n = buckets.length;
  const x = (i: number) => padL + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const y = (v: number) => padT + innerH - (v / max) * innerH;

  const pts = buckets.map((b, i) => [x(i), y(b[metric])] as const);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${x(n - 1).toFixed(1)},${(padT + innerH).toFixed(1)} L${x(0).toFixed(1)},${(padT + innerH).toFixed(1)} Z`;

  // y gridlines (4)
  const grid = [0, 0.25, 0.5, 0.75, 1].map((f) => ({ v: max * f, yy: padT + innerH - f * innerH }));
  // x labels — show ~6 evenly spaced
  const labelStep = Math.max(1, Math.ceil(n / 6));

  const onMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    const px = e.clientX - rect.left;
    const i = Math.round(((px - padL) / innerW) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  const gid = `grad-${metric}`;
  const hb = hover != null ? buckets[hover] : null;

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <svg width={w} height={height} style={{ display: 'block' }} onMouseLeave={() => setHover(null)} onMouseMove={onMove} onClick={() => hb && onSelect?.(hb)}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.35" />
            <stop offset="1" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {grid.map((g, i) => (
          <g key={i}>
            <line x1={padL} y1={g.yy} x2={w - padR} y2={g.yy} stroke="var(--line-soft)" strokeWidth="1" />
            <text x={padL - 8} y={g.yy + 4} textAnchor="end" fontSize="10" fill="var(--text-faint)">{format(g.v)}</text>
          </g>
        ))}
        {buckets.map((b, i) => i % labelStep === 0 && (
          <text key={i} x={x(i)} y={height - 8} textAnchor="middle" fontSize="10" fill="var(--text-faint)">{b.label}</text>
        ))}
        <path d={area} fill={`url(#${gid})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {hover != null && (
          <g>
            <line x1={x(hover)} y1={padT} x2={x(hover)} y2={padT + innerH} stroke={color} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            <circle cx={x(hover)} cy={y(buckets[hover][metric])} r="5" fill={color} stroke="var(--bg)" strokeWidth="2" />
          </g>
        )}
        {/* clickable cursor hint */}
        <rect x={padL} y={padT} width={innerW} height={innerH} fill="transparent" style={{ cursor: 'pointer' }} />
      </svg>
      {hb && hover != null && (
        <div style={{ position: 'absolute', left: Math.min(w - 150, Math.max(0, x(hover) - 70)), top: 4, background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: 10, padding: '8px 12px', pointerEvents: 'none', boxShadow: 'var(--shadow)', minWidth: 120 }}>
          <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 2 }}>{hb.label}</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500 }}>{format(hb[metric])}</div>
          <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 2 }}>click to drill in →</div>
        </div>
      )}
    </div>
  );
}
