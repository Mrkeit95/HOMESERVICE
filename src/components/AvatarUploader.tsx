import { useEffect, useRef } from 'react';
import { useAuth } from '../store/auth';
import { showToast } from '../lib/toast';

// Repaint the legacy settings DOM (rendered via dangerouslySetInnerHTML) so the
// avatar shows immediately there too.
function paintLegacy(url: string) {
  const big = document.getElementById('profilePhotoBig');
  if (big) {
    if (url) {
      big.style.backgroundImage = `url(${url})`;
      big.style.backgroundSize = 'cover';
      big.style.backgroundPosition = 'center';
      big.style.color = 'transparent';
    } else {
      big.style.backgroundImage = '';
      big.style.color = '';
    }
  }
}

// Global avatar picker — listens for events from the legacy settings buttons.
export default function AvatarUploader() {
  const { setAvatar } = useAuth();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const pick = () => ref.current?.click();
    const remove = () => { setAvatar(''); paintLegacy(''); showToast('Photo removed'); };
    window.addEventListener('doora:avatar-pick', pick);
    window.addEventListener('doora:avatar-remove', remove);
    return () => {
      window.removeEventListener('doora:avatar-pick', pick);
      window.removeEventListener('doora:avatar-remove', remove);
    };
  }, [setAvatar]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const apply = (url: string) => { setAvatar(url); paintLegacy(url); showToast('Photo updated ✓'); };
      // Downscale to a 256px square thumbnail so it reliably persists in
      // localStorage + DB instead of a multi-MB original that silently fails.
      const img = new Image();
      img.onload = () => {
        const SIZE = 256;
        const canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d');
        if (!ctx) return apply(String(r.result));
        const scale = Math.max(SIZE / img.width, SIZE / img.height); // cover
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
        apply(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => apply(String(r.result));
      img.src = String(r.result);
    };
    r.readAsDataURL(f);
    e.target.value = '';
  };

  return <input ref={ref} type="file" accept="image/*" hidden onChange={onFile} />;
}
