// Turn an uploaded image File into a small square thumbnail data-URL so it
// reliably persists (localStorage quota + DB) instead of a multi-MB original
// that silently overflows storage. Falls back to the raw data-URL if the
// browser can't decode/canvas the image.
export function fileToThumbnail(file: File, size = 256, quality = 0.85): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const raw = String(reader.result);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(raw);
        const scale = Math.max(size / img.width, size / img.height); // cover
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
        try {
          resolve(canvas.toDataURL('image/jpeg', quality));
        } catch {
          resolve(raw);
        }
      };
      img.onerror = () => resolve(raw);
      img.src = raw;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}
