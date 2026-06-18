// Placeholder for views not yet ported from the prototype.
// These get built out next, one by one.
export default function Stub({ title }: { title: string }) {
  return (
    <div className="view active" style={{ padding: '80px 0', textAlign: 'center' }}>
      <h2 className="section-title" style={{ marginBottom: 12 }}>
        {title}
      </h2>
      <p style={{ color: 'var(--text-dim)' }}>
        This view is coming next — the Home screen is live, the rest are being ported
        from the prototype.
      </p>
    </div>
  );
}
