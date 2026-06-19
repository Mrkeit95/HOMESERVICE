// Serverless translation proxy. Translates a batch of English strings into the
// target language via Google's public translate endpoint (server-side avoids
// browser CORS). Results are edge-cached. No API key required.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const { q = [], target = 'en' } = req.body || {};
  if (target === 'en' || !Array.isArray(q) || q.length === 0) {
    return res.json({ translations: {} });
  }
  const out = {};
  await Promise.all(
    q.slice(0, 80).map(async (text) => {
      if (typeof text !== 'string' || !text.trim()) {
        out[text] = text;
        return;
      }
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(
          target,
        )}&dt=t&q=${encodeURIComponent(text)}`;
        const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const data = await r.json();
        out[text] = (data[0] || []).map((s) => s[0]).join('') || text;
      } catch {
        out[text] = text;
      }
    }),
  );
  res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate');
  return res.json({ translations: out });
}
