import { useState } from 'react';
import { preset, FIRST_DAY, LAST_DAY } from '../data/analytics';

export interface Range { from: string; to: string }

const PRESETS: { id: string; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: '7D' },
  { id: '30d', label: '30D' },
  { id: '90d', label: '90D' },
  { id: 'mtd', label: 'MTD' },
  { id: 'qtd', label: 'QTD' },
  { id: 'ytd', label: 'YTD' },
  { id: '12m', label: '12M' },
  { id: 'all', label: 'All' },
];

export default function DateRangePicker({ value, active, onChange }: { value: Range; active: string; onChange: (r: Range, presetId: string) => void }) {
  const [custom, setCustom] = useState(false);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
      <div className="msg-filters" style={{ flexWrap: 'wrap' }}>
        {PRESETS.map((p) => (
          <div key={p.id} className={`msg-filter${active === p.id && !custom ? ' active' : ''}`} onClick={() => { setCustom(false); onChange(preset(p.id), p.id); }}>
            {p.label}
          </div>
        ))}
        <div className={`msg-filter${custom ? ' active' : ''}`} onClick={() => setCustom((c) => !c)}>📅 Custom</div>
      </div>
      {custom && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <input type="date" className="form-input" style={{ width: 150, padding: '6px 8px' }} value={value.from} min={FIRST_DAY} max={value.to}
            onChange={(e) => onChange({ from: e.target.value, to: value.to }, 'custom')} />
          <span style={{ color: 'var(--text-faint)' }}>→</span>
          <input type="date" className="form-input" style={{ width: 150, padding: '6px 8px' }} value={value.to} min={value.from} max={LAST_DAY}
            onChange={(e) => onChange({ from: value.from, to: e.target.value }, 'custom')} />
        </div>
      )}
    </div>
  );
}
