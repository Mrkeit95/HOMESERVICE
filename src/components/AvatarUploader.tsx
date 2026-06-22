import { useEffect, useRef } from 'react';
import { useAuth } from '../store/auth';
import { showToast } from '../lib/toast';
import { fileToThumbnail } from '../lib/image';

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

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    e.target.value = '';
    const url = await fileToThumbnail(f);
    if (url) { setAvatar(url); paintLegacy(url); showToast('Photo updated ✓'); }
  };

  return <input ref={ref} type="file" accept="image/*" hidden onChange={onFile} />;
}
