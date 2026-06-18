import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LegacyView from '../components/LegacyView';
import { renderProviderHTML } from '../legacy/render';
import { CATS } from '../data/categories';
import { useBookings } from '../store/bookings';

export default function Provider() {
  const { cat = 'massage', idx = '0' } = useParams();
  const navigate = useNavigate();
  const { createBooking } = useBookings();
  const html = useMemo(() => renderProviderHTML(cat, parseInt(idx)), [cat, idx]);

  const c = CATS[cat];
  const back = c
    ? { label: '← Back to results', to: `/category/${cat}` }
    : { label: '← Back to discover', to: '/' };

  // Confirm & pay → create a booking (which unlocks the chat) and open it.
  const onBook = () => {
    const category = CATS[cat] || CATS.massage;
    const p = category.providers[parseInt(idx)] || category.providers[0];
    const id = createBooking({
      catKey: cat,
      providerName: p.name,
      providerTheme: category.theme,
      providerAvatar: p.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12),
      role: 'Provider · ' + p.name.split(' ')[0],
      service: `${category.subs[1] || category.title} · 60 min`,
      when: 'Today · 14:30',
      icon: category.icon,
      online: true,
      suggestions: ['Running 5 minutes late', 'Door is open, come in', 'See you soon!'],
    });
    navigate(`/messages?b=${id}`);
  };

  return <LegacyView html={html} back={back} onBook={onBook} />;
}
