import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LegacyView from '../components/LegacyView';
import GiftModal from '../components/GiftModal';
import TestPaymentModal from '../components/TestPaymentModal';
import { renderProviderHTML } from '../legacy/render';
import { CATS } from '../data/categories';
import { useBookings } from '../store/bookings';
import { useWallet } from '../store/wallet';
import { useRewards } from '../store/rewards';
import { showToast } from '../lib/toast';
import { parsePrice } from '../lib/price';

export default function Provider() {
  const { cat = 'massage', idx = '0' } = useParams();
  const navigate = useNavigate();
  const { createBooking } = useBookings();
  const { dispatch: walletDispatch } = useWallet();
  const { earn } = useRewards();
  const [gifting, setGifting] = useState(false);
  const [payingCard, setPayingCard] = useState(false);

  const category = CATS[cat] || CATS.massage;
  const provider = category.providers[parseInt(idx)] || category.providers[0];
  const service = `${category.subs[1] || category.title} · 60 min`;
  const html = useMemo(() => renderProviderHTML(cat, parseInt(idx)), [cat, idx]);

  const back = CATS[cat]
    ? { label: '← Back to results', to: `/category/${cat}` }
    : { label: '← Back to discover', to: '/' };

  const price = parsePrice(provider.price);

  // Create the booking (unlocks chat) and open it. `payWithWallet` controls
  // whether the wallet is debited (card payments are handled separately).
  const completeBooking = (payWithWallet: boolean) => {
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
    if (payWithWallet) {
      walletDispatch({
        type: 'spend',
        amount: price,
        title: `${provider.name} · ${category.subs[1] || category.title}`,
        icon: category.icon,
      });
    }
    // Earn loyalty points: 1 point per Rp 1k spent.
    earn(Math.round(price / 1000));
    navigate(`/messages?b=${id}`);
  };

  return (
    <>
      <LegacyView
        html={html}
        back={back}
        onBook={() => completeBooking(true)}
        onPayCard={() => setPayingCard(true)}
        onGift={() => setGifting(true)}
      />
      {payingCard && (
        <TestPaymentModal
          amount={price}
          title={`${service} · ${provider.name}`}
          onClose={() => setPayingCard(false)}
          onSuccess={() => {
            setPayingCard(false);
            showToast('Payment successful ✓');
            completeBooking(false);
          }}
        />
      )}
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
