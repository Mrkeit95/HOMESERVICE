import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Live provider tracking on a real (OpenStreetMap) map — no API key needed.
// The provider marker animates along a route toward the customer with an ETA.
const CUSTOMER: [number, number] = [-8.6595, 115.137]; // Berawa, Canggu
// A few waypoints from the provider's start to the customer.
const ROUTE: [number, number][] = [
  [-8.6705, 115.1485],
  [-8.668, 115.146],
  [-8.665, 115.143],
  [-8.6625, 115.14],
  [-8.661, 115.1385],
  CUSTOMER,
];

const pinIcon = (emoji: string, bg: string) =>
  L.divIcon({
    className: '',
    html: `<div style="width:36px;height:36px;border-radius:50% 50% 50% 0;background:${bg};transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.4);border:2px solid #fff"><span style="transform:rotate(45deg);font-size:16px">${emoji}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 34],
  });

export default function TrackingMap({ providerName }: { providerName: string }) {
  const mapEl = useRef<HTMLDivElement>(null);
  const [etaMin, setEtaMin] = useState(8);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    if (!mapEl.current) return;
    const map = L.map(mapEl.current, { zoomControl: false, attributionControl: false }).setView(
      [-8.664, 115.143],
      14,
    );
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    L.marker(CUSTOMER, { icon: pinIcon('🏠', '#FF5A1F') }).addTo(map).bindPopup('Your location');
    L.polyline(ROUTE, { color: '#FF5A1F', weight: 3, opacity: 0.6, dashArray: '6 8' }).addTo(map);
    const provider = L.marker(ROUTE[0], { icon: pinIcon('🚗', '#1A1815') }).addTo(map);

    map.fitBounds(L.latLngBounds(ROUTE).pad(0.3));

    // Animate the provider along the route.
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      if (i < ROUTE.length) {
        provider.setLatLng(ROUTE[i]);
        setEtaMin(Math.max(1, Math.round(8 * (1 - i / (ROUTE.length - 1)))));
      } else {
        setArrived(true);
        setEtaMin(0);
        window.clearInterval(timer);
      }
    }, 2000);

    return () => {
      window.clearInterval(timer);
      map.remove();
    };
  }, []);

  return (
    <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)' }}>
      <div ref={mapEl} style={{ height: 360, width: '100%', background: 'var(--bg-soft)' }} />
      <div style={{ padding: '16px 20px', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 600 }}>
            {arrived ? `${providerName.split(' ')[0]} has arrived 🎉` : `${providerName.split(' ')[0]} is on the way`}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
            {arrived ? 'Meet them at your door' : `Estimated arrival in ${etaMin} min`}
          </div>
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: arrived ? 'var(--green)' : 'var(--accent)' }}>
          {arrived ? '✓' : `${etaMin}m`}
        </div>
      </div>
    </div>
  );
}
