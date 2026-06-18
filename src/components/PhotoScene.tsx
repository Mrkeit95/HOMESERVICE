import { useState } from 'react';
import { photoFor } from '../lib/photos';
import { makeScene } from '../utils/art';
import SvgArt from './SvgArt';

// A real themed photo for a provider scene, with the generated SVG art as a
// graceful fallback if the image fails to load.
export default function PhotoScene({
  theme,
  seed,
  variant = 0,
  w = 600,
  h = 400,
}: {
  theme: string;
  seed: string;
  variant?: number;
  w?: number;
  h?: number;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <SvgArt svg={makeScene(theme, variant, seed)} style={{ position: 'absolute', inset: 0 }} />;
  }
  return (
    <img
      src={photoFor(theme, seed, w, h)}
      alt={theme}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}
