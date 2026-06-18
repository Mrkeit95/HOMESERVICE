import type { Thread } from './types';

export const THREADS: Thread[] = [
  {
    id: 't1',
    providerName: 'Sora Wellness Co.',
    providerTheme: 'massage',
    providerAvatar: 'sora-wellness',
    role: 'Lead Therapist · Sara M.',
    lastTime: '2 min',
    unread: 1,
    online: true,
    booking: { service: 'Deep Tissue · 90 min', when: 'Today · 14:30', status: 'Confirmed', icon: '💆' },
    messages: [
      { kind: 'system', text: 'Booking confirmed for <strong>Today, 14:30</strong>. Deep Tissue · 90 min · Rp 490k' },
      { who: 'them', text: "Hi Marcus! 👋 I'm Sara, I'll be your therapist for today's session.", time: '13:42' },
      { who: 'them', text: "Just confirming — Villa Berawa No. 14, Canggu? And do you have a strong preference for pressure? Most people like medium-firm but I can go deeper if you prefer.", time: '13:42' },
      { who: 'me', text: "Yes that's right, green gate on Jl. Pantai Berawa. I'd love deep pressure if possible, my shoulders are really tight from surfing this week.", time: '13:51', read: true },
      { who: 'them', text: "Perfect, I'll bring my deep tissue oil and we'll focus on shoulders and upper back. I'm leaving the studio now, should be there in about 25 minutes 🚗", time: '14:02' },
      { kind: 'system', text: '<strong>Sara is en route.</strong> Live tracking available in your booking.' },
      { who: 'me', text: "Sounds great. The doorbell is on the right side of the gate. Thanks Sara!", time: '14:05', read: true },
      { who: 'them', text: "Got it! See you soon ✨", time: '14:28', unread: true }
    ],
    suggestions: ['Running 5 minutes late', 'Door is open, come in', 'Can you bring extra oil?']
  },
  {
    id: 't2',
    providerName: 'Cutmen Mobile',
    providerTheme: 'barber',
    providerAvatar: 'cutmen',
    role: 'Master Barber · Tom R.',
    lastTime: '1 hr',
    unread: 1,
    online: true,
    booking: { service: 'Skin Fade + Hot Towel', when: 'Tomorrow · 10:00', status: 'Confirmed', icon: '✂️' },
    messages: [
      { kind: 'system', text: 'Booking confirmed for <strong>Tomorrow, 10:00</strong>. Skin Fade + Hot Towel · Rp 180k' },
      { who: 'them', text: "Yo Marcus! 🙌 Tom here, locked in for tomorrow at 10. Quick q — what kind of fade you thinking? Mid, high, or skin fade all the way up?", time: '12:14' },
      { who: 'me', text: "Skin fade all the way, leave maybe 2-3cm on top. Last guy left it too long for me", time: '12:32', read: true },
      { who: 'them', text: "Got it. I'll bring my reference book in case you want to look at some styles too. Beard trim — keep the length or scissor it shorter?", time: '12:35' },
      { who: 'me', text: "Keep the length, just clean it up. Lines on the cheek and neck", time: '12:40', read: true },
      { who: 'them', text: "Sweet. I'll bring everything. See you in the morning ☕", time: '12:42', unread: true }
    ],
    suggestions: ['Can we push to 10:30?', 'Bring extra clippers?', 'Confirmed, see you tomorrow']
  },
  {
    id: 't3',
    providerName: 'Lily Lash Studio',
    providerTheme: 'lashes',
    providerAvatar: 'lily-lash',
    role: 'Lash Artist · Lily',
    lastTime: '3 hr',
    unread: 0,
    online: false,
    booking: { service: 'Hybrid Full Set', when: 'Past · 5 days ago', status: 'Completed', icon: '👁️' },
    messages: [
      { kind: 'system', text: 'Booking completed · Hybrid Full Set · Rp 420k' },
      { who: 'them', text: "Hi Marcus, hope you're loving the lashes! 💖 Just a reminder to come back in 2-3 weeks for a refill. Earlier refills mean less work and you keep the look fuller.", time: '5d ago' },
      { who: 'me', text: "Thanks Lily! They look amazing. Will DM to schedule the refill next week", time: '5d ago', read: true },
      { who: 'them', text: "Perfect, I have Tuesday and Thursday open next week. Let me know! 💫", time: '5d ago' }
    ],
    suggestions: ['Book Tuesday refill', 'Leave a review', 'Send pic of lashes']
  },
  {
    id: 't4',
    providerName: 'Chef Tomasso',
    providerTheme: 'chef',
    providerAvatar: 'tomasso',
    role: 'Head Chef · Tomasso',
    lastTime: 'Yesterday',
    unread: 0,
    online: false,
    booking: { service: 'Romantic Dinner · 4 course', when: 'Sat · 19:00', status: 'Confirmed', icon: '🍝' },
    messages: [
      { kind: 'system', text: 'Booking confirmed for <strong>Saturday, 19:00</strong>. 4-course dinner for 2 · Rp 3.6M' },
      { who: 'them', text: "Buonasera Marcus! Tomasso here. Looking forward to cooking for you and your partner on Saturday. 🍷", time: 'Yesterday 11:30' },
      { who: 'them', text: "Before I plan the menu — any allergies, dislikes, or things either of you don't eat? And a preference on the protein for the main? I have beautiful local snapper in mind, or I can do osso buco if you prefer red meat.", time: 'Yesterday 11:31' },
      { who: 'me', text: "Snapper sounds incredible. No allergies, but my partner doesn't eat shellfish. Otherwise we eat everything", time: 'Yesterday 18:42', read: true },
      { who: 'them', text: "Perfetto. I'll skip the langoustine on the antipasti and do a vitello tonnato instead. You'll love it. Final menu coming Friday morning. 👨‍🍳", time: 'Yesterday 18:50' }
    ],
    suggestions: ['Can you bring wine?', 'How long is setup?', "What time should we eat?"]
  },
  {
    id: 't5',
    providerName: 'Inkbound Studio',
    providerTheme: 'tattoo',
    providerAvatar: 'inkbound',
    role: 'Resident Artist · Indra',
    lastTime: '2 days',
    unread: 0,
    online: false,
    booking: { service: 'Consultation', when: 'Past · Last week', status: 'Quote sent', icon: '🎨' },
    messages: [
      { kind: 'system', text: 'Consultation completed · Quote provided' },
      { who: 'them', text: "Hey Marcus, great talking last week. Here's the rough sketch for the forearm piece based on what we discussed.", time: '2d ago' },
      { who: 'them', text: "I've quoted Rp 2.4M for the full piece, estimated 4-5 hours. We can split into 2 sessions if you want to break it up. Let me know what you think!", time: '2d ago' }
    ],
    suggestions: ['Book first session', 'Can you adjust the design?', 'Any availability next month?']
  },
  {
    id: 't6',
    providerName: 'Sparkle Bali',
    providerTheme: 'cleaning',
    providerAvatar: 'sparkle',
    role: 'Team Lead · Indah',
    lastTime: '4 days',
    unread: 0,
    online: false,
    booking: { service: 'Weekly Clean', when: 'Every Wednesday', status: 'Recurring', icon: '✨' },
    messages: [
      { kind: 'system', text: 'Recurring booking · Every Wednesday at 09:00' },
      { who: 'them', text: "Hi Marcus, all done for this week! 🧹✨ Took an extra 30 mins to clean inside the fridge — no charge.", time: '4d ago' },
      { who: 'me', text: "Wow thanks Indah, you guys are the best. See you next Wed!", time: '4d ago', read: true }
    ],
    suggestions: ['Skip next week', 'Add laundry service', 'Change time to 10am']
  }
];

