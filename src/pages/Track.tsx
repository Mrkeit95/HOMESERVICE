import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBookings } from '../store/bookings';
import TrackingMap from '../components/TrackingMap';

export default function Track() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { bookings } = useBookings();
  const b = bookings.find((x) => x.id === params.get('b')) || bookings.find((x) => x.status === 'active');

  if (!b) {
    return (
      <div className="view active" style={{ padding: '60px 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-dim)' }}>No active booking to track.</p>
        <button className="btn" style={{ marginTop: 14 }} onClick={() => navigate('/')}>Browse services →</button>
      </div>
    );
  }

  return (
    <div className="view active">
      <div className="back-link" onClick={() => navigate(`/messages?b=${b.id}`)}>← Back to chat</div>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 500 }}>Live tracking</h1>
          <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
            {b.service} · {b.providerName}
          </div>
        </div>
        <TrackingMap providerName={b.providerName} />
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button className="btn" onClick={() => navigate(`/messages?b=${b.id}`)}>Message provider</button>
          <button className="btn btn-ghost">Call provider</button>
        </div>
      </div>
    </div>
  );
}
