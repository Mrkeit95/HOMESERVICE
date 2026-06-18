import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LegacyView from '../components/LegacyView';
import GiftModal from '../components/GiftModal';
import { renderProviderHTML } from '../legacy/render';
import { CATS } from '../data/categories';
import { useBookings } from '../store/bookings';
import { useWallet } from '../store/wallet';
import { showToast } from '../lib/toast';

// Parse a price label like "Rp 350k" / "Rp 1.2M" into a number of Rupiah.
function parsePrice(label: string): number {
  const num = parseFloat(label.replace(/[^0-9.]/g, '')) || 0;
  return label.includes('M') ? num * 1_000_000 : num * 1000;
}

export default function Provider() {
  const { cat = 'massage', idx = '0' } = useParams();
  const navigate = useNavigate();
  const { createBooking } = useBookings();
  const { dispatch: walletDispatch } = useWallet();
  const [gifting, setGifting] = useState(false);

  const category = CATS[cat] || CATS.massage;
  const provider = category.providers[parseInt(idx)] || category.providers[0];
  const service = `${category.subs[1] || category.title} · 60 min`;
  const html = useMemo(() => renderProviderHTML(cat, parseInt(idx)), [cat, idx]);

  const back = CATS[cat]
    ? { label: '← Back to results', to: `/category/${cat}` }
    : { label: '← Back to discover', to: '/' };

  // Confirm & pay → create a booking (which unlocks the chat) and open it.
  const onBook = () => {
    const id = createBooking({
      catKey: cat,
      providerName: provider.name,
      providerTheme: category.theme,
      providerAvatar: provider.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12),
      role: 'Provider · ' + provider.name.split(' ')[0],
      service,
      when: 'Today · 14:30',
      icon: category.icon,
      online: true,
      suggestions: ['Running 5 minutes late', 'Door is open, come in', 'See you soon!'],
    });
    walletDispatch({
      type: 'spend',
      amount: parsePrice(provider.price),
      title: `${provider.name} · ${category.subs[1] || category.title}`,
      icon: category.icon,
    });
    navigate(`/messages?b=${id}`);
  };

  return (
    <>
      <LegacyView html={html} back={back} onBook={onBook} onGift={() => setGifting(true)} />
      {gifting && (
        <GiftModal
          providerName={provider.name}
          service={service}
          price={parsePrice(provider.price)}
          onClose={() => setGifting(false)}
          onSend={(d) => {
            walletDispatch({
              type: 'spend',
              amount: parsePrice(provider.price),
              title: `Gift · ${service} for ${d.recipient}`,
              icon: '🎁',
            });
            setGifting(false);
            showToast(`Gift sent to ${d.recipient} 🎁`);
          }}
        />
      )}
    </>
  );
}
