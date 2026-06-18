import { useEffect, useState } from 'react';

// Auto-cycling "live activity" ticker for a Grab/Gojek-style buzz of bookings.
const FEED = [
  { icon: '💆', text: 'Marcus booked Deep Tissue in Canggu', time: 'just now' },
  { icon: '✂️', text: '3 people booked barbers near you', time: '2 min ago' },
  { icon: '💅', text: 'Élise booked a gel mani in Berawa', time: '4 min ago' },
  { icon: '🧘', text: 'Sunrise yoga filling up in Pererenan', time: '6 min ago' },
  { icon: '🍳', text: 'Chef Tomasso booked for a villa dinner', time: '8 min ago' },
  { icon: '🎨', text: 'New tattoo slots opened in Seminyak', time: '11 min ago' },
  { icon: '💆', text: '12 massages booked in the last hour nearby', time: '14 min ago' },
  { icon: '⚡', text: 'Happy Hour deal — 20% off until 5pm', time: 'live' },
];

export default function LiveActivity() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % FEED.length), 3200);
    return () => window.clearInterval(id);
  }, []);
  const item = FEED[i];
  return (
    <div className="live-bar">
      <span className="live-dot" />
      <span className="live-label">Live</span>
      <div className="live-feed">
        {/* key forces the slide animation to replay on change */}
        <div className="live-item" key={i}>
          <span>{item.icon}</span>
          <span>{item.text}</span>
          <span className="live-time">· {item.time}</span>
        </div>
      </div>
    </div>
  );
}
