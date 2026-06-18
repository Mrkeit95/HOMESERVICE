// One-off build helper: pull each static view's inner HTML out of the
// prototype and rewrite its inline onclick handlers into data-* attributes
// that our React wire() layer understands. Run: node scripts/extract-views.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = readFileSync('reference/prototype.html', 'utf8');
const lines = src.split('\n');

// Find the inner HTML of <div class="view" id="view-NAME"> ... </div> by
// tracking <div ...> / </div> depth from the opening tag.
function extractView(id) {
  const openIdx = lines.findIndex((l) => l.includes(`id="view-${id}"`));
  if (openIdx === -1) throw new Error(`view ${id} not found`);
  let depth = 0;
  const out = [];
  for (let i = openIdx; i < lines.length; i++) {
    const line = lines[i];
    const opens = (line.match(/<div\b/g) || []).length;
    const closes = (line.match(/<\/div>/g) || []).length;
    if (i === openIdx) {
      depth += opens - closes; // wrapper opens -> depth 1
      continue; // skip the wrapper line itself
    }
    depth += opens - closes;
    if (depth <= 0) break; // wrapper's own </div> reached; stop before pushing
    out.push(line);
  }
  return out.join('\n');
}

// Extract a top-level block by its opening tag substring (depth-aware on div).
function extractBlock(marker) {
  const openIdx = lines.findIndex((l) => l.includes(marker));
  if (openIdx === -1) throw new Error(`block ${marker} not found`);
  let depth = 0;
  const out = [];
  for (let i = openIdx; i < lines.length; i++) {
    const line = lines[i];
    out.push(line);
    depth += (line.match(/<div\b/g) || []).length;
    depth -= (line.match(/<\/div>/g) || []).length;
    if (i > openIdx && depth <= 0) break;
  }
  return out.join('\n');
}

// Rewrite inline onclick="..." into data-* hooks for our delegated wiring.
function transform(html) {
  return (
    html
      // switchView('name', ...) -> data-nav="name"
      .replace(/onclick="switchView\('([^']+)'[^"]*\)"/g, 'data-nav="$1"')
      // switchSettings('x', this) -> data-set="x"
      .replace(/onclick="switchSettings\('([^']+)'[^"]*\)"/g, 'data-set="$1"')
      // openTopup(amount) / openTopup() -> data-topup="amount"
      .replace(/onclick="openTopup\((\d*)\)"/g, 'data-topup="$1"')
      // closeTopup() -> data-close="topup"
      .replace(/onclick="closeTopup\(\)"/g, 'data-close="topup"')
      // setAmount(event, 500000, 'Rp 500.000') -> data-amount + data-amount-str
      .replace(
        /onclick="setAmount\(event,\s*(\d+),\s*'([^']+)'\)"/g,
        'data-amount="$1" data-amount-str="$2"',
      )
      // switchPlan(this, 'annual') -> data-plan="annual"
      .replace(/onclick="switchPlan\(this,\s*'([^']+)'\)"/g, 'data-plan="$1"')
      // openCategory('massage', ...) -> data-cat="massage"
      .replace(/onclick="openCategory\('([^']+)'[^"]*\)"/g, 'data-cat="$1"')
      // openProvider('massage', 0) -> data-prov-cat + data-prov-idx
      .replace(
        /onclick="openProvider\('([^']+)',\s*(\d+)\)"/g,
        'data-prov-cat="$1" data-prov-idx="$2"',
      )
      // any leftover onclick (defensive) -> stripped
      .replace(/\sonclick="[^"]*"/g, '')
  );
}

mkdirSync('src/legacy/html', { recursive: true });
for (const id of ['wallet', 'settings', 'premium', 'vendor']) {
  writeFileSync(`src/legacy/html/${id}.html`, transform(extractView(id)));
  console.log(`wrote src/legacy/html/${id}.html`);
}
writeFileSync('src/legacy/html/topup-modal.html', transform(extractBlock('id="topupModal"')));
console.log('wrote src/legacy/html/topup-modal.html');
