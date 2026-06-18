import type { CategoryMap } from './types';

export const CATS: CategoryMap = {
  massage: { icon:'💆', theme:'massage', count:142, eyebrow:'Wellness & Bodywork', title:'Massage',
    sub:'142 verified therapists ready to come to your villa, hotel or home. Traditional Balinese to deep tissue recovery.',
    subs:['All Massages','Balinese','Deep Tissue','Swedish','Aromatherapy','Hot Stone','Reflexology','Sports Recovery','Couples','Four Hands'],
    providers:[
      {name:'Sora Wellness Co.',pat:'pat-dots',deco:'💆',badge:'⚡ Available now',rating:4.94,meta:['📍 1.2 km','⏱ 60–120 min','👥 8 therapists'],tags:['Balinese','Deep tissue','Aromatherapy'],price:'Rp 350k',sub:'from / 60 min',team:['S','A','M','+5'],stat:'6 yr',statLabel:'experience'},
      {name:'The Remedy',pat:'pat-waves',deco:'🌸',badge:'🏆 Top 1% in Bali',badgeType:'hot',rating:4.98,meta:['📍 1.8 km','⏱ 60–180 min','👥 9 therapists'],tags:['Sports recovery','Lymphatic','Premium'],price:'Rp 650k',sub:'from / 60 min',team:['R','N','+7'],stat:'12 yr',statLabel:'in business'},
      {name:'Bali Bliss Mobile',pat:'pat-dots',deco:'🌿',badge:'⚡ Available now',rating:4.91,meta:['📍 2.1 km','⏱ 60–120 min','👥 15 therapists'],tags:['Couples','Four hands','Hot stone'],price:'Rp 280k',sub:'from / 60 min',team:['B','L','I','+12'],stat:'4.9k',statLabel:'sessions'},
      {name:'Moonlight Spa',pat:'pat-grid',deco:'🌙',badge:'💯 24/7 service',rating:4.87,meta:['📍 2.4 km','⏱ 60–90 min','👥 7 therapists'],tags:['Late night','Swedish','Reflexology'],price:'Rp 220k',sub:'from / 60 min',team:['M','S','+4'],stat:'24/7',statLabel:'available'},
      {name:'Sacred Touch',pat:'pat-waves',deco:'🪷',badge:'🌿 Eco-certified',badgeType:'green',rating:4.93,meta:['📍 3.0 km','⏱ 75–150 min','👥 8 therapists'],tags:['Organic oils','Prenatal','Holistic'],price:'Rp 420k',sub:'from / 75 min',team:['S','T','+6'],stat:'Eco',statLabel:'certified'},
      {name:'Hey Bali Massage',pat:'pat-dots',deco:'✨',badge:'⚡ Available in 1h',rating:4.85,meta:['📍 3.6 km','⏱ 60–120 min','👥 11 therapists'],tags:['Budget','Foot massage','Reiki'],price:'Rp 199k',sub:'from / 60 min',team:['H','B','+9'],stat:'3 yr',statLabel:'experience'}
    ]
  },
  barber: { icon:'✂️', theme:'barber', count:68, eyebrow:'Hair & Grooming', title:'Barbers',
    sub:'68 master barbers bringing sharp cuts, fades, hot towel shaves and beard sculpts to your door.',
    subs:['All Barbers','Skin Fade','Classic Cuts','Hot Towel Shave','Beard Sculpt','Kids Cuts','Hair Tattoo'],
    providers:[
      {name:'Cutmen Mobile',pat:'pat-lines',deco:'✂️',badge:'🔥 Booked 28× this week',badgeType:'hot',rating:4.89,meta:['📍 2.5 km','⏱ 30–75 min','👥 4 barbers'],tags:['Skin fade','Beard sculpting','Hot towel'],price:'Rp 180k',sub:'cut + hot shave',team:['T','M','J','+2'],stat:'4',statLabel:'master barbers'},
      {name:'Sharp & Co.',pat:'pat-grid',deco:'💈',badge:'🏆 Master barber',badgeType:'hot',rating:4.95,meta:['📍 1.4 km','⏱ 45–90 min','👥 3 barbers'],tags:['Classic cuts','Pomade','Straight razor'],price:'Rp 250k',sub:'signature cut',team:['R','D','+3'],stat:'15 yr',statLabel:'experience'},
      {name:'Bali Home Barber',pat:'pat-dots',deco:'🧔',badge:'⚡ Available today',rating:4.86,meta:['📍 3.1 km','⏱ 30–60 min','👥 6 barbers'],tags:['Modern','Beard trim','Kids cuts'],price:'Rp 150k',sub:'standard cut',team:['B','H','+4'],stat:'1.8k',statLabel:'cuts done'},
      {name:'The Gentleman Bali',pat:'pat-lines',deco:'🎩',badge:'✨ Old school style',rating:4.92,meta:['📍 2.8 km','⏱ 60–90 min','👥 4 barbers'],tags:['Pomade styles','Hot lather','Premium'],price:'Rp 320k',sub:'cut + shave + tonic',team:['G','M','+2'],stat:'Vintage',statLabel:'style'},
      {name:'Brodown Barbers',pat:'pat-grid',deco:'⚡',badge:'⚡ Available in 1h',rating:4.83,meta:['📍 4.0 km','⏱ 30–45 min','👥 5 barbers'],tags:['Fast cuts','Skin fade','Lineup'],price:'Rp 130k',sub:'quick cut',team:['B','+3'],stat:'30 min',statLabel:'avg cut'},
      {name:'Razr Studio',pat:'pat-dots',deco:'🪒',badge:'🎨 Hair art specialist',rating:4.88,meta:['📍 5.2 km','⏱ 60–120 min','👥 2 barbers'],tags:['Hair tattoo','Designs','Custom'],price:'Rp 280k',sub:'design cut',team:['R','Z','+1'],stat:'🎨',statLabel:'custom art'}
    ]
  },
  physio: { icon:'🦴', theme:'physio', count:23, eyebrow:'Wellness & Bodywork', title:'Physiotherapy',
    sub:'23 licensed physiotherapists for sports injury, post-surgery rehab, chronic pain and recovery — all at home.',
    subs:['All Physios','Sports Injury','Post-Surgery Rehab','Back & Neck','Dry Needling','Cupping','Manual Therapy'],
    providers:[
      {name:'Recover Bali',pat:'pat-grid',deco:'🦴',badge:'🏥 Licensed (BSc)',badgeType:'green',rating:4.92,meta:['📍 3.1 km','⏱ 60–90 min','🎓 BSc Physio'],tags:['Sports injury','Dry needling','Cupping'],price:'Rp 550k',sub:'per session',team:['R','J','+2'],stat:'BSc',statLabel:'qualified'},
      {name:'MotionLab',pat:'pat-lines',deco:'💪',badge:'🏆 15 yrs experience',badgeType:'hot',rating:4.96,meta:['📍 2.4 km','⏱ 60 min','🎓 MSc Physio'],tags:['Post-surgery','Manual therapy','Strength'],price:'Rp 680k',sub:'per session',team:['M','L','+1'],stat:'15 yr',statLabel:'experience'},
      {name:'Bali Sports Physio',pat:'pat-dots',deco:'🏃',badge:'🏄 Surfer-focused',rating:4.89,meta:['📍 1.9 km','⏱ 60–90 min','🎓 Sports cert.'],tags:['Surf injuries','Shoulders','Knees'],price:'Rp 450k',sub:'per session',team:['B','S','+3'],stat:'4',statLabel:'physios'},
      {name:'Align Therapy',pat:'pat-grid',deco:'🧬',badge:'⚡ Available today',rating:4.91,meta:['📍 4.2 km','⏱ 75–120 min'],tags:['Back pain','Posture','Pilates rehab'],price:'Rp 500k',sub:'per session',team:['A','T','+2'],stat:'500+',statLabel:'clients'},
      {name:'Restore Mobile Physio',pat:'pat-lines',deco:'🩺',badge:'🌍 English & Indo',rating:4.87,meta:['📍 5.0 km','⏱ 60–90 min'],tags:['Chronic pain','Neuro','Geriatric'],price:'Rp 420k',sub:'per session',team:['R','M','+1'],stat:'🌍',statLabel:'multilingual'},
      {name:'Apex Recovery',pat:'pat-dots',deco:'⚕️',badge:'🏥 Clinic-grade',badgeType:'green',rating:4.94,meta:['📍 6.1 km','⏱ 90 min'],tags:['Post-op','Premium','Personalized'],price:'Rp 750k',sub:'per session',team:['A','P','+2'],stat:'Pro',statLabel:'athletes'}
    ]
  },
  chiro: { icon:'🧘', theme:'chiro', count:12, eyebrow:'Wellness & Bodywork', title:'Chiropractic',
    sub:'12 certified chiropractors offering adjustments, spinal alignment and decompression therapy at your home.',
    subs:['All Chiros','Spinal Adjustment','Decompression','Posture','Sciatica Relief','Activator Method','Sports Chiro'],
    providers:[
      {name:'Align Chiropractic',pat:'pat-grid',deco:'🦴',badge:'🏆 Doctor of Chiro',badgeType:'hot',rating:4.97,meta:['📍 2.8 km','⏱ 45–60 min','🎓 DC certified'],tags:['Adjustment','Sciatica','Premium'],price:'Rp 850k',sub:'per session',team:['A','C','+1'],stat:'DC',statLabel:'qualified'},
      {name:'Bali Spine Studio',pat:'pat-lines',deco:'🌀',badge:'⚡ Available today',rating:4.91,meta:['📍 3.5 km','⏱ 60 min'],tags:['Decompression','Posture','Back pain'],price:'Rp 720k',sub:'per session',team:['B','S','+1'],stat:'2',statLabel:'chiros'},
      {name:'Reset Chiro',pat:'pat-dots',deco:'⚡',badge:'🌍 US-trained',rating:4.93,meta:['📍 4.7 km','⏱ 45 min'],tags:['Activator method','Gentle','Pregnancy-safe'],price:'Rp 680k',sub:'per session',team:['R','C','+1'],stat:'US',statLabel:'trained'},
      {name:'Spinal Health Bali',pat:'pat-grid',deco:'🩺',badge:'🏥 X-ray included',badgeType:'green',rating:4.88,meta:['📍 5.3 km','⏱ 60 min'],tags:['Sports chiro','Adjustment','X-ray'],price:'Rp 950k',sub:'first session',team:['S','+2'],stat:'X-ray',statLabel:'included'}
    ]
  },
  stretch: { icon:'🤸', theme:'stretch', count:18, eyebrow:'Wellness & Bodywork', title:'Stretching',
    sub:'18 mobility coaches and stretch therapists to improve flexibility, recovery and posture — guided one-on-one.',
    subs:['All Stretching','Assisted Stretching','Mobility Training','Pre-Workout','Recovery','Hip & Hamstring'],
    providers:[
      {name:'Stretch Lab Bali',pat:'pat-lines',deco:'🤸',badge:'🔥 Trending',badgeType:'hot',rating:4.94,meta:['📍 1.8 km','⏱ 50 min','👥 4 coaches'],tags:['Assisted','Recovery','Flexibility'],price:'Rp 380k',sub:'per session',team:['S','L','+3'],stat:'50 min',statLabel:'session'},
      {name:'Mobility Co.',pat:'pat-grid',deco:'🧘',badge:'⚡ Available today',rating:4.89,meta:['📍 2.4 km','⏱ 60 min'],tags:['Mobility','Athletes','Range'],price:'Rp 320k',sub:'per session',team:['M','C','+1'],stat:'2',statLabel:'coaches'},
      {name:'FlexFit Mobile',pat:'pat-dots',deco:'💪',badge:'🏃 Sports focus',rating:4.86,meta:['📍 3.1 km','⏱ 45 min'],tags:['Pre-workout','Post-workout','Tight muscles'],price:'Rp 280k',sub:'per session',team:['F','+2'],stat:'3',statLabel:'coaches'},
      {name:'Bend Bali',pat:'pat-grid',deco:'🤍',badge:'✨ Couples available',rating:4.88,meta:['📍 5.2 km','⏱ 45–90 min'],tags:['Couples','Beginners','Yoga-fusion'],price:'Rp 350k',sub:'per session',team:['B','+1'],stat:'Duo',statLabel:'available'}
    ]
  },
  yoga: { icon:'🧘‍♀️', theme:'yoga', count:47, eyebrow:'Wellness & Bodywork', title:'Yoga',
    sub:'47 certified yoga instructors for private sessions in your villa, garden or beachfront.',
    subs:['All Yoga','Vinyasa','Yin','Hatha','Ashtanga','Power Yoga','Restorative','Prenatal','Couples'],
    providers:[
      {name:'Flow with Maya',pat:'pat-dots',deco:'🧘‍♀️',badge:"🧘‍♀️ Bali's #1 teacher",badgeType:'hot',rating:4.96,meta:['📍 1.5 km','⏱ 60–90 min','🎓 RYT-500'],tags:['Vinyasa','Yin','Private'],price:'Rp 380k',sub:'75 min private',team:['M'],stat:'RYT-500',statLabel:'certified'},
      {name:'Sunrise Yoga Bali',pat:'pat-lines',deco:'🌅',badge:'🌅 Sunrise sessions',rating:4.93,meta:['📍 2.1 km','⏱ 60 min','👥 3 teachers'],tags:['Hatha','Beach','Beginner-friendly'],price:'Rp 320k',sub:'60 min private',team:['S','Y','+2'],stat:'5am',statLabel:'sessions'},
      {name:'Power Flow Studio',pat:'pat-grid',deco:'🔥',badge:'💪 Athletic',rating:4.89,meta:['📍 2.8 km','⏱ 60–75 min','👥 4 teachers'],tags:['Power','Vinyasa','Strength'],price:'Rp 350k',sub:'60 min private',team:['P','F','+3'],stat:'5',statLabel:'teachers'},
      {name:'Yin & Restore',pat:'pat-dots',deco:'🪷',badge:'🌿 Restorative',rating:4.95,meta:['📍 3.4 km','⏱ 75–90 min','👥 2 teachers'],tags:['Yin','Restorative','Meditation'],price:'Rp 400k',sub:'75 min private',team:['Y','R','+1'],stat:'90 min',statLabel:'sessions'},
      {name:'Couples Yoga Bali',pat:'pat-lines',deco:'🤍',badge:'✨ Couples only',rating:4.91,meta:['📍 4.2 km','⏱ 75 min'],tags:['Couples','Acro','Partner'],price:'Rp 600k',sub:'75 min for two',team:['C','Y','+1'],stat:'Duo',statLabel:'only'},
      {name:'Mom & Baby Yoga',pat:'pat-grid',deco:'🤰',badge:'🤰 Prenatal cert.',badgeType:'green',rating:4.94,meta:['📍 3.7 km','⏱ 60 min','🎓 Prenatal cert.'],tags:['Prenatal','Postnatal','Gentle'],price:'Rp 360k',sub:'60 min private',team:['M','+2'],stat:'Pre/Post',statLabel:'natal'}
    ]
  },
  pilates: { icon:'🤍', theme:'pilates', count:22, eyebrow:'Wellness & Bodywork', title:'Pilates',
    sub:'22 Pilates instructors bringing mat sessions, reformer-style work and core training to your home.',
    subs:['All Pilates','Mat Pilates','Reformer (portable)','Core Focus','Posture','Pre & Postnatal'],
    providers:[
      {name:'Pilates Bali',pat:'pat-grid',deco:'🤍',badge:'🏆 STOTT-certified',badgeType:'hot',rating:4.95,meta:['📍 2.0 km','⏱ 60 min','🎓 STOTT cert.'],tags:['Reformer','Core','STOTT'],price:'Rp 480k',sub:'60 min private',team:['P','B','+1'],stat:'STOTT',statLabel:'certified'},
      {name:'Core Studio Mobile',pat:'pat-lines',deco:'💪',badge:'⚡ Available today',rating:4.91,meta:['📍 2.6 km','⏱ 60 min'],tags:['Mat','Strength','Beginner'],price:'Rp 320k',sub:'60 min private',team:['C','S','+1'],stat:'🆕',statLabel:'beginner-friendly'},
      {name:'Reform Bali',pat:'pat-dots',deco:'🌀',badge:'🛠 Portable reformer',rating:4.94,meta:['📍 3.4 km','⏱ 75 min'],tags:['Reformer','Premium','Advanced'],price:'Rp 580k',sub:'75 min private',team:['R','+1'],stat:'Reformer',statLabel:'on-site'},
      {name:'Mama Pilates Bali',pat:'pat-dots',deco:'🤰',badge:'🤰 Pre & post natal',badgeType:'green',rating:4.92,meta:['📍 5.5 km','⏱ 50 min'],tags:['Prenatal','Postnatal','Diastasis recovery'],price:'Rp 420k',sub:'50 min private',team:['M','+1'],stat:'Pre/Post',statLabel:'natal'}
    ]
  },
  meditation: { icon:'🧠', theme:'meditation', count:17, eyebrow:'Wellness & Bodywork', title:'Meditation',
    sub:'17 guided meditation and mindfulness teachers offering private sessions for stress, sleep and focus.',
    subs:['All Meditation','Mindfulness','Breathwork','Sound Healing','Sleep Meditation','Vipassana'],
    providers:[
      {name:'Stillness Studio',pat:'pat-dots',deco:'🧠',badge:'🌿 Zen master',badgeType:'hot',rating:4.96,meta:['📍 2.5 km','⏱ 45–90 min','🎓 20 yrs practice'],tags:['Mindfulness','Sleep','Stress'],price:'Rp 420k',sub:'60 min session',team:['S','+1'],stat:'20 yr',statLabel:'practice'},
      {name:'Breath & Be',pat:'pat-waves',deco:'🌬️',badge:'🫁 Breathwork pro',rating:4.92,meta:['📍 3.1 km','⏱ 60 min'],tags:['Breathwork','Wim Hof','Energy'],price:'Rp 380k',sub:'60 min session',team:['B','+1'],stat:'Wim Hof',statLabel:'certified'},
      {name:'Sound Healing Bali',pat:'pat-grid',deco:'🔔',badge:'🎶 Sound bath',rating:4.94,meta:['📍 4.0 km','⏱ 75–120 min'],tags:['Singing bowls','Gong','Sound bath'],price:'Rp 580k',sub:'75 min session',team:['S','H','+1'],stat:'7',statLabel:'instruments'},
      {name:'Vipassana Mobile',pat:'pat-dots',deco:'🪷',badge:'🌿 Traditional',badgeType:'green',rating:4.89,meta:['📍 5.4 km','⏱ 90 min'],tags:['Vipassana','Silent','Traditional'],price:'Rp 350k',sub:'90 min session',team:['V'],stat:'10 yr',statLabel:'monastery'}
    ]
  },
  pt: { icon:'🏋️', theme:'pt', count:34, eyebrow:'Wellness & Bodywork', title:'Personal Training',
    sub:'34 certified trainers for at-home workouts. Strength, HIIT, mobility, fat loss — your villa becomes the gym.',
    subs:['All Trainers','Strength','HIIT','Fat Loss','Mobility','Pre/Post Natal','Sports-specific','Boxing'],
    providers:[
      {name:'Iron Bali PT',pat:'pat-grid',deco:'🏋️',badge:'💪 Strength specialist',badgeType:'hot',rating:4.94,meta:['📍 1.7 km','⏱ 60 min','🎓 NSCA cert.'],tags:['Strength','Powerlifting','Hypertrophy'],price:'Rp 480k',sub:'per session',team:['I','B','+1'],stat:'NSCA',statLabel:'certified'},
      {name:'HIIT Bali Mobile',pat:'pat-lines',deco:'🔥',badge:'🔥 Fat loss',rating:4.89,meta:['📍 2.4 km','⏱ 45 min'],tags:['HIIT','Fat loss','Conditioning'],price:'Rp 380k',sub:'per session',team:['H','B','+2'],stat:'45 min',statLabel:'burns'},
      {name:'Box Bali',pat:'pat-dots',deco:'🥊',badge:'🥊 Pro boxer',rating:4.92,meta:['📍 3.1 km','⏱ 60 min'],tags:['Boxing','Cardio','Pads'],price:'Rp 450k',sub:'per session',team:['B','B'],stat:'Pro',statLabel:'fighter'},
      {name:'Mom Strong',pat:'pat-grid',deco:'🤰',badge:'🤰 Pre/post natal',badgeType:'green',rating:4.95,meta:['📍 3.7 km','⏱ 50 min'],tags:['Prenatal','Postnatal','Diastasis-safe'],price:'Rp 420k',sub:'per session',team:['M','S','+1'],stat:'Pre/Post',statLabel:'natal'},
      {name:'Surf Strong Bali',pat:'pat-lines',deco:'🏄',badge:'🏄 Surfer training',rating:4.91,meta:['📍 4.3 km','⏱ 60 min'],tags:['Surf-specific','Mobility','Power'],price:'Rp 400k',sub:'per session',team:['S','S','+1'],stat:'🏄',statLabel:'surfers'},
      {name:'Lean Bali',pat:'pat-dots',deco:'⚡',badge:'⚡ Fat loss focus',rating:4.86,meta:['📍 5.0 km','⏱ 45–60 min'],tags:['Fat loss','Nutrition','Cardio'],price:'Rp 350k',sub:'per session',team:['L','B','+2'],stat:'12 wk',statLabel:'program'}
    ]
  },
  hair: { icon:'💇‍♀️', theme:'hair', count:76, eyebrow:'Hair & Grooming', title:'Hair Styling',
    sub:'76 hair stylists for cuts, blowouts, updos and event styling. Mobile setup with professional tools.',
    subs:['All Hair','Cuts','Blowout','Updo','Event Styling','Braids','Extensions','Treatments'],
    providers:[
      {name:'Studio Hair Bali',pat:'pat-dots',deco:'💇‍♀️',badge:'✨ Bridal specialist',badgeType:'hot',rating:4.95,meta:['📍 1.8 km','⏱ 60–120 min','👥 4 stylists'],tags:['Updo','Bridal','Event'],price:'Rp 480k',sub:'event styling',team:['S','H','+2'],stat:'300+',statLabel:'weddings'},
      {name:'Blowout Bar',pat:'pat-waves',deco:'💨',badge:'⚡ 45 min blowout',rating:4.91,meta:['📍 2.3 km','⏱ 45 min','👥 6 stylists'],tags:['Blowout','Quick','Glamour'],price:'Rp 280k',sub:'blowout',team:['B','B','+1'],stat:'45 min',statLabel:'glam'},
      {name:'Braid Bali',pat:'pat-grid',deco:'🌾',badge:'🎨 Braid artist',rating:4.93,meta:['📍 3.0 km','⏱ 90–240 min'],tags:['Braids','Cornrows','Bohemian'],price:'Rp 550k',sub:'braid set',team:['B'],stat:'4h',statLabel:'full braids'},
      {name:'Cut Studio',pat:'pat-dots',deco:'✂️',badge:'✂️ Cut specialist',rating:4.88,meta:['📍 3.6 km','⏱ 60–90 min','👥 3 stylists'],tags:['Cuts','Layers','Bobs'],price:'Rp 380k',sub:'haircut',team:['C','S','+1'],stat:'3',statLabel:'stylists'},
      {name:'Extensions Bali',pat:'pat-lines',deco:'💫',badge:'💎 Premium extensions',rating:4.89,meta:['📍 4.5 km','⏱ 180–300 min'],tags:['Tape-in','K-tip','Clip-in'],price:'Rp 1.8M',sub:'extension fitting',team:['E','B'],stat:'Premium',statLabel:'hair'},
      {name:'Updo Atelier',pat:'pat-grid',deco:'👑',badge:'👰 Event ready',badgeType:'hot',rating:4.94,meta:['📍 5.0 km','⏱ 90 min'],tags:['Updo','Bridal','Photoshoot'],price:'Rp 520k',sub:'updo styling',team:['U','A','+1'],stat:'90 min',statLabel:'updos'}
    ]
  },
  waxing: { icon:'🪷', theme:'waxing', count:41, eyebrow:'Hair & Grooming', title:'Waxing',
    sub:'41 wax specialists for full body, Brazilian, eyebrows and face waxing. Hygienic, mobile, discreet.',
    subs:['All Waxing','Brazilian','Bikini','Full Leg','Underarm','Face & Brows','Full Body','Sugar Waxing'],
    providers:[
      {name:'Smooth Bali',pat:'pat-dots',deco:'🪷',badge:'✨ Brazilian expert',badgeType:'hot',rating:4.93,meta:['📍 1.9 km','⏱ 30–90 min','👥 3 techs'],tags:['Brazilian','Hard wax','Hygienic'],price:'Rp 220k',sub:'Brazilian',team:['S','B','+2'],stat:'Hard wax',statLabel:'only'},
      {name:'Sugar & Strip',pat:'pat-waves',deco:'🌿',badge:'🌿 Sugar waxing',badgeType:'green',rating:4.91,meta:['📍 2.6 km','⏱ 45–75 min'],tags:['Sugar','Natural','Sensitive skin'],price:'Rp 280k',sub:'half leg',team:['S','S'],stat:'🌿',statLabel:'organic'},
      {name:'Wax Atelier',pat:'pat-grid',deco:'💫',badge:'💎 Premium service',rating:4.94,meta:['📍 3.2 km','⏱ 60–120 min'],tags:['Full body','Premium','Discreet'],price:'Rp 480k',sub:'full body',team:['W','A'],stat:'💎',statLabel:'luxury'},
      {name:'Full Body Bali',pat:'pat-dots',deco:'🌸',badge:'⚡ Available today',rating:4.87,meta:['📍 3.8 km','⏱ 30–60 min'],tags:['Full leg','Underarm','Quick'],price:'Rp 180k',sub:'full leg',team:['F','B','+1'],stat:'30 min',statLabel:'quick'}
    ]
  },
  nails: { icon:'💅', theme:'nails', count:94, eyebrow:'Beauty', title:'Nails',
    sub:'94 nail technicians delivering gel, acrylic, nail art and luxury mani-pedis in your villa, hotel or home.',
    subs:['All Nails','Gel Manicure','Acrylic','Nail Art','Pedicure','French Tips','Press-ons','Builder Gel'],
    providers:[
      {name:'Polish & Co.',pat:'pat-dots',deco:'💅',badge:'💅 Mobile salon',badgeType:'hot',rating:4.91,meta:['📍 1.7 km','⏱ 60–120 min','👥 6 techs'],tags:['Gel','Nail art','Acrylic'],price:'Rp 280k',sub:'mani + pedi',team:['P','C','+3'],stat:'6',statLabel:'technicians'},
      {name:'Lacquer Bali',pat:'pat-waves',deco:'✨',badge:'🎨 Custom art expert',rating:4.95,meta:['📍 2.3 km','⏱ 90–150 min','👥 4 techs'],tags:['Nail art','Premium','3D designs'],price:'Rp 450k',sub:'art set',team:['L','B','+2'],stat:'🎨',statLabel:'custom art'},
      {name:'Bling Bali Nails',pat:'pat-grid',deco:'💎',badge:'✨ Bling specialists',rating:4.88,meta:['📍 3.1 km','⏱ 90–180 min','👥 5 techs'],tags:['Rhinestones','Long acrylic','Bold'],price:'Rp 520k',sub:'glam set',team:['B','N','+4'],stat:'💎',statLabel:'crystals'},
      {name:'Clean & Classic',pat:'pat-dots',deco:'🌸',badge:'⚡ Available today',rating:4.93,meta:['📍 2.6 km','⏱ 75 min'],tags:['French','Natural','Minimal'],price:'Rp 240k',sub:'classic gel',team:['C','+2'],stat:'Minimal',statLabel:'style'},
      {name:'Press Play Studio',pat:'pat-lines',deco:'💖',badge:'🔥 Press-on expert',rating:4.86,meta:['📍 3.8 km','⏱ 45–60 min'],tags:['Press-on','Quick','Reusable'],price:'Rp 180k',sub:'press-on set',team:['P','S','+1'],stat:'45 min',statLabel:'fastest set'},
      {name:'Bali Nail Bar',pat:'pat-grid',deco:'🌺',badge:'💯 Most booked',badgeType:'hot',rating:4.90,meta:['📍 4.5 km','⏱ 60–120 min','👥 8 techs'],tags:['Gel','Acrylic','Builder gel'],price:'Rp 320k',sub:'gel full set',team:['B','N','+5'],stat:'8.2k',statLabel:'sets done'}
    ]
  },
  lashes: { icon:'👁️', theme:'lashes', count:52, eyebrow:'Beauty', title:'Lashes',
    sub:'52 lash artists for classic, hybrid, volume sets and lash lifts. Mobile setup, sterile equipment.',
    subs:['All Lashes','Classic Set','Hybrid','Volume','Mega Volume','Lash Lift','Refills','Removal'],
    providers:[
      {name:'Lily Lash Studio',pat:'pat-dots',deco:'👁️',badge:'✨ Top 5 in Canggu',badgeType:'hot',rating:4.97,meta:['📍 0.8 km','⏱ 90–180 min','👥 1 artist'],tags:['Volume','Hybrid','Lash lift'],price:'Rp 420k',sub:'full set',team:['L'],stat:'Solo',statLabel:'artist'},
      {name:'Lash Bar Bali',pat:'pat-waves',deco:'🌸',badge:'💯 Most booked',badgeType:'hot',rating:4.93,meta:['📍 1.6 km','⏱ 120 min','👥 5 artists'],tags:['Classic','Hybrid','Refills'],price:'Rp 380k',sub:'hybrid full set',team:['L','B','+2'],stat:'5',statLabel:'artists'},
      {name:'Mega Lash Co.',pat:'pat-grid',deco:'💫',badge:'🔥 Mega volume',rating:4.91,meta:['📍 2.4 km','⏱ 150–210 min','👥 3 artists'],tags:['Mega volume','Russian','Dramatic'],price:'Rp 580k',sub:'mega volume',team:['M','L','+1'],stat:'12D',statLabel:'fans'},
      {name:'Lift & Tint Bali',pat:'pat-dots',deco:'✨',badge:'🌿 Natural look',badgeType:'green',rating:4.94,meta:['📍 3.0 km','⏱ 60–90 min'],tags:['Lash lift','Tint','Brow combo'],price:'Rp 280k',sub:'lift + tint',team:['L','T'],stat:'6 wk',statLabel:'lasts'},
      {name:'Curl Lash Studio',pat:'pat-lines',deco:'🌹',badge:'⚡ Available today',rating:4.89,meta:['📍 3.6 km','⏱ 90–120 min'],tags:['Classic','Wispy','Natural'],price:'Rp 340k',sub:'classic full set',team:['C','L','+1'],stat:'Wispy',statLabel:'style'},
      {name:'Doll Eye Bali',pat:'pat-grid',deco:'💖',badge:'🎨 Cat-eye specialist',rating:4.87,meta:['📍 4.4 km','⏱ 120 min'],tags:['Cat eye','Doll eye','Mapping'],price:'Rp 400k',sub:'volume set',team:['D','+2'],stat:'👁️',statLabel:'mapping'}
    ]
  },
  brows: { icon:'✨', theme:'brows', count:44, eyebrow:'Beauty', title:'Brows',
    sub:'44 brow specialists for shaping, lamination, tinting and microblading consultations.',
    subs:['All Brows','Threading','Waxing','Lamination','Tinting','Henna Brows','Shaping','Microblading'],
    providers:[
      {name:'Brow Bar Bali',pat:'pat-dots',deco:'✨',badge:'🏆 Top brow artist',badgeType:'hot',rating:4.95,meta:['📍 1.6 km','⏱ 45–60 min'],tags:['Lamination','Shape','Tint'],price:'Rp 280k',sub:'lamination',team:['B','B','+1'],stat:'8 wk',statLabel:'lasts'},
      {name:'Threading Studio',pat:'pat-lines',deco:'🪡',badge:'🪡 Threading expert',rating:4.89,meta:['📍 2.4 km','⏱ 30 min'],tags:['Threading','Precision','Quick'],price:'Rp 120k',sub:'threading',team:['T','S','+1'],stat:'30 min',statLabel:'quick'},
      {name:'Henna Brow Bali',pat:'pat-grid',deco:'🌿',badge:'🌿 Natural look',badgeType:'green',rating:4.92,meta:['📍 3.1 km','⏱ 45 min'],tags:['Henna','Long-lasting','Natural'],price:'Rp 220k',sub:'henna tint',team:['H','B'],stat:'2 wk',statLabel:'tint stays'},
      {name:'Arch Atelier',pat:'pat-dots',deco:'💫',badge:'🎨 Custom shape',rating:4.94,meta:['📍 3.7 km','⏱ 60 min'],tags:['Shape','Map','Consultation'],price:'Rp 320k',sub:'shape + tint',team:['A','A','+1'],stat:'Custom',statLabel:'mapping'}
    ]
  },
  makeup: { icon:'💄', theme:'makeup', count:38, eyebrow:'Beauty', title:'Makeup',
    sub:'38 makeup artists for events, weddings, photoshoots and nights out. They come to you with their full kit.',
    subs:['All Makeup','Bridal','Event Glam','Natural / Bare','Photoshoot','Editorial','Lessons','Airbrush'],
    providers:[
      {name:'Glow by Tara',pat:'pat-dots',deco:'💄',badge:'👰 Bridal specialist',badgeType:'hot',rating:4.96,meta:['📍 1.9 km','⏱ 90–120 min','👥 1 artist'],tags:['Bridal','Natural glow','Long-lasting'],price:'Rp 850k',sub:'event glam',team:['T'],stat:'200+',statLabel:'brides'},
      {name:'Face Atelier',pat:'pat-waves',deco:'✨',badge:'📸 Photoshoot pro',rating:4.94,meta:['📍 2.5 km','⏱ 60–90 min','👥 2 artists'],tags:['Editorial','HD-ready','Airbrush'],price:'Rp 650k',sub:'event glam',team:['F','A','+1'],stat:'HD',statLabel:'ready'},
      {name:'Bali Bridal Glam',pat:'pat-grid',deco:'👰',badge:'👰 Wedding teams',badgeType:'hot',rating:4.92,meta:['📍 3.4 km','⏱ 120–180 min','👥 5 artists'],tags:['Bridal party','Trial included','Hair + makeup'],price:'Rp 1.2M',sub:'bridal full',team:['B','G','+3'],stat:'5',statLabel:'team size'},
      {name:'Bare & Beautiful',pat:'pat-dots',deco:'🌸',badge:'🌿 Natural look',badgeType:'green',rating:4.89,meta:['📍 4.1 km','⏱ 45–75 min'],tags:['Minimal','Skin-first','Daytime'],price:'Rp 380k',sub:'natural',team:['B','B','+1'],stat:'🌿',statLabel:'organic'},
      {name:'Night Out Studio',pat:'pat-lines',deco:'🌙',badge:'🔥 Smoky eye expert',rating:4.86,meta:['📍 4.8 km','⏱ 60–90 min'],tags:['Glam','Smoky','Night out'],price:'Rp 480k',sub:'evening glam',team:['N','O'],stat:'Glam',statLabel:'specialist'},
      {name:'Make It Bali',pat:'pat-grid',deco:'💋',badge:'🎓 Lessons available',rating:4.88,meta:['📍 5.6 km','⏱ 90–150 min'],tags:['Lessons','1-on-1','Personalized'],price:'Rp 550k',sub:'lesson',team:['M','I','+1'],stat:'1-on-1',statLabel:'teaching'}
    ]
  },
  facials: { icon:'🧖', theme:'facial', count:61, eyebrow:'Beauty', title:'Facials',
    sub:'61 skin therapists offering hydrating, anti-aging, acne and luxury facials at your home.',
    subs:['All Facials','Hydrating','Anti-Aging','Acne / Clearing','Brightening','LED Therapy','Gua Sha'],
    providers:[
      {name:'Glow Lab Bali',pat:'pat-dots',deco:'🧖',badge:'🌟 Top rated facial',badgeType:'hot',rating:4.96,meta:['📍 2.0 km','⏱ 75–90 min','🎓 ITEC cert.'],tags:['Hydrating','Anti-aging','LED'],price:'Rp 580k',sub:'signature facial',team:['G','L','+2'],stat:'ITEC',statLabel:'certified'},
      {name:'Clear Skin Bali',pat:'pat-waves',deco:'💧',badge:'🌿 Acne specialist',badgeType:'green',rating:4.92,meta:['📍 2.7 km','⏱ 60–75 min'],tags:['Acne','Extractions','Calming'],price:'Rp 420k',sub:'clearing facial',team:['C','S','+1'],stat:'Acne',statLabel:'specialist'},
      {name:'Luxe Skin Studio',pat:'pat-grid',deco:'✨',badge:'💎 Premium',rating:4.94,meta:['📍 3.4 km','⏱ 90–120 min'],tags:['Anti-aging','Microderm','Premium'],price:'Rp 820k',sub:'luxury facial',team:['L','S'],stat:'💎',statLabel:'luxury'},
      {name:'Gua Sha Goddess',pat:'pat-dots',deco:'🪷',badge:'🌿 TCM-inspired',rating:4.91,meta:['📍 4.0 km','⏱ 75 min'],tags:['Gua sha','Lymphatic','Sculpting'],price:'Rp 480k',sub:'sculpt facial',team:['G','S'],stat:'TCM',statLabel:'inspired'},
      {name:'Glow Up Mobile',pat:'pat-lines',deco:'🌸',badge:'⚡ Available today',rating:4.87,meta:['📍 5.1 km','⏱ 60 min'],tags:['Express','Brightening','Glow'],price:'Rp 320k',sub:'express facial',team:['G','U','+2'],stat:'60 min',statLabel:'express'},
      {name:'Skin Story',pat:'pat-grid',deco:'🌹',badge:'🩺 Cosmeceutical',rating:4.93,meta:['📍 5.8 km','⏱ 90 min'],tags:['Cosmeceutical','Results-driven','LED'],price:'Rp 680k',sub:'advanced facial',team:['S','S','+1'],stat:'Med-grade',statLabel:'products'}
    ]
  },
  skincare: { icon:'🌟', theme:'skincare', count:27, eyebrow:'Beauty', title:'Skincare',
    sub:'27 skincare consultants offering routines, peels, and personalized in-home treatment plans.',
    subs:['All Skincare','Routine Consultation','Chemical Peel','Skin Analysis','Anti-aging Plan','Acne Plan'],
    providers:[
      {name:'Skin Analyst Bali',pat:'pat-waves',deco:'🌟',badge:'🔬 AI skin analysis',badgeType:'hot',rating:4.93,meta:['📍 2.2 km','⏱ 90 min'],tags:['Analysis','Custom plan','Tech'],price:'Rp 480k',sub:'consultation',team:['S','A','+1'],stat:'AI',statLabel:'powered'},
      {name:'Peel Pros',pat:'pat-dots',deco:'💧',badge:'🩺 Medical-grade',rating:4.91,meta:['📍 3.4 km','⏱ 60 min'],tags:['Chemical peel','Glycolic','Renewal'],price:'Rp 680k',sub:'peel session',team:['P','+1'],stat:'Med',statLabel:'grade'},
      {name:'Routine Studio',pat:'pat-grid',deco:'✨',badge:'⚡ 1h consult',rating:4.89,meta:['📍 4.0 km','⏱ 60 min'],tags:['Routine','Products','Personalized'],price:'Rp 380k',sub:'consultation',team:['R','S'],stat:'Custom',statLabel:'plan'}
    ]
  },
  tattoo: { icon:'🎨', theme:'tattoo', count:31, eyebrow:'Body Art & Aesthetics', title:'Tattoo',
    sub:'31 tattoo artists across styles. In-studio or villa appointments. All equipment sterile and single-use.',
    subs:['All Tattoos','Fine Line','Blackwork','Traditional','Watercolor','Realism','Lettering','Cover-ups'],
    providers:[
      {name:'Inkbound Studio',pat:'pat-grid',deco:'🎨',badge:'🎨 Resident artist',badgeType:'hot',rating:4.88,meta:['📍 4.2 km','⏱ 60–360 min','👥 4 artists'],tags:['Fine line','Blackwork','Custom'],price:'Rp 1.2M',sub:'from / piece',team:['I','N','+2'],stat:'4',statLabel:'artists'},
      {name:'Linework Bali',pat:'pat-lines',deco:'🖊️',badge:'✨ Fine line expert',rating:4.94,meta:['📍 3.5 km','⏱ 60–240 min'],tags:['Fine line','Delicate','Minimal'],price:'Rp 900k',sub:'small piece',team:['L','B','+1'],stat:'Fine',statLabel:'line pro'},
      {name:'Sacred Ink',pat:'pat-dots',deco:'⚡',badge:'🌿 Sak Yant master',badgeType:'gold',rating:4.92,meta:['📍 5.0 km','⏱ 120–480 min'],tags:['Traditional','Hand-poked','Sak yant'],price:'Rp 1.5M',sub:'medium piece',team:['S','I'],stat:'Master',statLabel:'ajarn'},
      {name:'Blackwork Bali',pat:'pat-grid',deco:'🖤',badge:'🔥 Bold work',badgeType:'hot',rating:4.90,meta:['📍 6.2 km','⏱ 180–480 min'],tags:['Blackwork','Tribal','Geometric'],price:'Rp 1.8M',sub:'large piece',team:['B','W','+1'],stat:'Bold',statLabel:'designs'},
      {name:'Color Lab Bali',pat:'pat-lines',deco:'🌈',badge:'🎨 Watercolor pro',rating:4.85,meta:['📍 5.8 km','⏱ 240–480 min'],tags:['Watercolor','Realism','Color'],price:'Rp 2.2M',sub:'large piece',team:['C','L'],stat:'Color',statLabel:'specialist'},
      {name:'Script & Co.',pat:'pat-dots',deco:'✒️',badge:'⚡ Walk-ins ok',rating:4.87,meta:['📍 4.7 km','⏱ 60–120 min'],tags:['Lettering','Script','Symbols'],price:'Rp 700k',sub:'small lettering',team:['S','+1'],stat:'✒️',statLabel:'lettering'}
    ]
  },
  piercing: { icon:'💎', theme:'piercing', count:14, eyebrow:'Body Art & Aesthetics', title:'Piercing',
    sub:'14 licensed piercers offering ear curation, body piercings and premium jewelry. Sterile, mobile, professional.',
    subs:['All Piercings','Ear Curation','Cartilage','Septum','Body','Daith','Industrial'],
    providers:[
      {name:'Studio Pierce Bali',pat:'pat-dots',deco:'💎',badge:'🏆 Master piercer',badgeType:'hot',rating:4.94,meta:['📍 3.0 km','⏱ 30–60 min','🎓 APP cert.'],tags:['Ear curation','Cartilage','Premium'],price:'Rp 380k',sub:'piercing + jewelry',team:['S','P','+1'],stat:'APP',statLabel:'certified'},
      {name:'Curated Ears Bali',pat:'pat-grid',deco:'✨',badge:'🎨 Ear curation expert',rating:4.92,meta:['📍 4.2 km','⏱ 45–90 min'],tags:['Ear curation','Multiple','Styling'],price:'Rp 480k',sub:'curation',team:['C','E'],stat:'Curated',statLabel:'styling'},
      {name:'Body Jewelry Bali',pat:'pat-lines',deco:'💍',badge:'💎 14k gold jewelry',rating:4.89,meta:['📍 5.0 km','⏱ 30–60 min'],tags:['14k gold','Titanium','Implant-grade'],price:'Rp 580k',sub:'piercing + jewelry',team:['B','J'],stat:'14k',statLabel:'gold'},
      {name:'Hole Studio',pat:'pat-dots',deco:'⚡',badge:'⚡ Available today',rating:4.86,meta:['📍 6.0 km','⏱ 30 min'],tags:['Quick','Walk-in','Basic'],price:'Rp 220k',sub:'simple piercing',team:['H','+1'],stat:'30 min',statLabel:'quick'}
    ]
  },
  bridal: { icon:'👰', theme:'bridal', count:19, eyebrow:'Specialty & Events', title:'Bridal Glam',
    sub:'19 specialized bridal teams handling hair, makeup, and prep for your wedding day.',
    subs:['All Bridal','Hair + Makeup','Trial Session','Bridal Party','Engagement Shoot','Day-of Touch-ups'],
    providers:[
      {name:'The Bali Bride',pat:'pat-dots',deco:'👰',badge:'👰 500+ weddings',badgeType:'hot',rating:4.98,meta:['📍 2.5 km','⏱ 3–6 hr','👥 6 artists'],tags:['Hair + makeup','Bridal party','Trial'],price:'Rp 3.5M',sub:'bride package',team:['B','B','+5'],stat:'500+',statLabel:'brides'},
      {name:'Wedding Glow Co.',pat:'pat-waves',deco:'✨',badge:'🏆 Top-rated',badgeType:'hot',rating:4.96,meta:['📍 3.4 km','⏱ 3–5 hr','👥 5 artists'],tags:['Premium','Hair','Trial included'],price:'Rp 4.2M',sub:'bride package',team:['W','G','+3'],stat:'Trial',statLabel:'included'},
      {name:'Bali Bridal Glam',pat:'pat-grid',deco:'💐',badge:'👰 Wedding teams',rating:4.92,meta:['📍 4.0 km','⏱ 4–6 hr','👥 4 artists'],tags:['Whole party','Mum + bridesmaids','Day-of'],price:'Rp 2.8M',sub:'bride package',team:['B','+3'],stat:'6+ ppl',statLabel:'parties'},
      {name:'Day-of Studio',pat:'pat-lines',deco:'💄',badge:'⚡ Day-of touch-ups',rating:4.89,meta:['📍 5.2 km','⏱ 2–4 hr','👥 2 artists'],tags:['Touch-ups','Reception','Late night'],price:'Rp 1.5M',sub:'half day',team:['D','S'],stat:'On-site',statLabel:'all day'}
    ]
  },
  chef: { icon:'🍳', theme:'chef', count:38, eyebrow:'Home & Lifestyle', title:'Private Chef',
    sub:'38 professional private chefs cooking for you at home. Romantic dinners, family meals, dinner parties, meal prep — all in your villa kitchen.',
    subs:['All Chefs','Romantic Dinner','Dinner Party','Family Meal','Meal Prep','BBQ & Grill','Vegan / Plant-based','Indonesian','Italian','Asian Fusion','Pastry & Dessert'],
    providers:[
      {name:'Chef Tomasso',pat:'pat-lines',deco:'🍝',badge:'🏆 Michelin background',badgeType:'hot',rating:4.97,meta:['📍 2.4 km','⏱ 3–4 hr','👥 Solo'],tags:['Italian','Pasta','Romantic dinner'],price:'Rp 1.8M',sub:'/ couple · 4 course',team:['T'],stat:'12 yr',statLabel:'Michelin trained'},
      {name:'Villa Kitchen Bali',pat:'pat-dots',deco:'🍳',badge:'⚡ Available today',rating:4.92,meta:['📍 1.8 km','⏱ 3–5 hr','👥 2 chefs'],tags:['Asian Fusion','Tasting menu','Dinner party'],price:'Rp 850k',sub:'/ person · 5 course',team:['V','K','+1'],stat:'5 course',statLabel:'menu'},
      {name:'Plant Plate Bali',pat:'pat-grid',deco:'🥗',badge:'🌿 100% plant-based',badgeType:'green',rating:4.94,meta:['📍 3.1 km','⏱ 2–4 hr','👥 Solo + assistant'],tags:['Vegan','Raw','Plant-based'],price:'Rp 650k',sub:'/ person · 4 course',team:['P','P','+1'],stat:'🌿',statLabel:'fully plant-based'},
      {name:'BBQ Bali Crew',pat:'pat-waves',deco:'🔥',badge:'🔥 Pool parties',rating:4.89,meta:['📍 3.8 km','⏱ 4–6 hr','👥 3 crew'],tags:['BBQ','Grill','Group / parties'],price:'Rp 580k',sub:'/ person · full BBQ',team:['B','C','+2'],stat:'10–50',statLabel:'ppl parties'},
      {name:'Nusantara Kitchen',pat:'pat-dots',deco:'🍛',badge:'🇮🇩 Indonesian heritage',badgeType:'gold',rating:4.95,meta:['📍 2.7 km','⏱ 3–4 hr','👥 2 chefs'],tags:['Indonesian','Rijsttafel','Traditional'],price:'Rp 480k',sub:'/ person · rijsttafel',team:['N','K','+1'],stat:'12 dish',statLabel:'rijsttafel'},
      {name:'Pastry Pop-Up',pat:'pat-lines',deco:'🥐',badge:'🥐 Dessert specialist',rating:4.91,meta:['📍 4.4 km','⏱ 2–3 hr','👥 Solo'],tags:['Pastry','Cakes','Wedding cake'],price:'Rp 380k',sub:'/ person · dessert course',team:['P'],stat:'Patisserie',statLabel:'Paris trained'},
      {name:'Meal Prep Bali',pat:'pat-grid',deco:'🥡',badge:'📦 Weekly meal prep',badgeType:'green',rating:4.88,meta:['📍 5.1 km','⏱ 4–5 hr','👥 Solo'],tags:['Meal prep','Macros','5 days'],price:'Rp 1.2M',sub:'/ week · 15 meals',team:['M','P','+1'],stat:'15 meals',statLabel:'per week'},
      {name:'Sushi Bali Mobile',pat:'pat-dots',deco:'🍣',badge:'🍣 Omakase experience',rating:4.96,meta:['📍 3.9 km','⏱ 2–3 hr','👥 Solo + assistant'],tags:['Sushi','Omakase','Japanese'],price:'Rp 1.5M',sub:'/ person · 12 piece omakase',team:['S','B','+1'],stat:'Omakase',statLabel:'experience'}
    ]
  },
  cleaning: { icon:'🧹', theme:'cleaning', count:54, eyebrow:'Home & Lifestyle', title:'Cleaning',
    sub:'54 trained cleaners and housekeepers for one-time deep cleans, weekly upkeep, post-event cleanup, and villa turnovers.',
    subs:['All Cleaning','Standard Clean','Deep Clean','Move-In/Out','Post-Event','Weekly Upkeep','Villa Turnover','Eco-Friendly','Laundry & Ironing'],
    providers:[
      {name:'Sparkle Bali',pat:'pat-dots',deco:'✨',badge:'💯 Most booked',badgeType:'hot',rating:4.92,meta:['📍 1.9 km','⏱ 2–4 hr','👥 2 cleaners'],tags:['Standard clean','Weekly','Reliable'],price:'Rp 280k',sub:'/ 2 hr · 2-bed villa',team:['S','B','+4'],stat:'4.2k',statLabel:'cleans done'},
      {name:'Deep Clean Co.',pat:'pat-grid',deco:'🧽',badge:'🔥 Deep clean specialist',rating:4.95,meta:['📍 2.3 km','⏱ 4–6 hr','👥 3 cleaners'],tags:['Deep clean','Move-in/out','Detail'],price:'Rp 650k',sub:'/ deep clean · villa',team:['D','C','+2'],stat:'6 hr',statLabel:'avg deep'},
      {name:'Green Clean Bali',pat:'pat-waves',deco:'🌿',badge:'🌿 Eco-products only',badgeType:'green',rating:4.91,meta:['📍 3.0 km','⏱ 2–4 hr','👥 2 cleaners'],tags:['Eco-friendly','Non-toxic','Natural'],price:'Rp 380k',sub:'/ 2 hr · 2-bed villa',team:['G','C','+1'],stat:'🌿',statLabel:'certified eco'},
      {name:'Post-Event Crew',pat:'pat-lines',deco:'🎉',badge:'⚡ Same-day available',rating:4.87,meta:['📍 3.7 km','⏱ 3–6 hr','👥 4 crew'],tags:['Post-event','Parties','Same-day'],price:'Rp 580k',sub:'/ event cleanup',team:['P','E','+3'],stat:'Same day',statLabel:'turnaround'},
      {name:'Villa Turnover Bali',pat:'pat-dots',deco:'🏠',badge:'🏨 Airbnb specialist',badgeType:'hot',rating:4.93,meta:['📍 2.6 km','⏱ 2–3 hr','👥 3 cleaners'],tags:['Turnover','Linen','Airbnb'],price:'Rp 320k',sub:'/ turnover',team:['V','T','+2'],stat:'45 min',statLabel:'avg turnover'},
      {name:'Laundry & Iron Co.',pat:'pat-grid',deco:'👕',badge:'👕 Wash + iron + fold',rating:4.89,meta:['📍 4.1 km','⏱ 24 hr','👥 Pickup + dropoff'],tags:['Laundry','Ironing','Pickup'],price:'Rp 180k',sub:'/ kg · pickup + delivery',team:['L','I','+1'],stat:'24h',statLabel:'turnaround'}
    ]
  },
  language: { icon:'🗣️', theme:'language', count:42, eyebrow:'Lessons & Learning', title:'Language Lessons',
    sub:'42 certified language tutors offering private lessons in your home, garden, or favorite café. Beginner to fluent.',
    subs:['All Languages','Bahasa Indonesia','English (ESL)','Mandarin','Japanese','Korean','Spanish','French','German','Russian','Conversation only'],
    providers:[
      {name:'Bahasa with Ibu Sari',pat:'pat-lines',deco:'🇮🇩',badge:'🏆 15 yrs teaching',badgeType:'hot',rating:4.98,meta:['📍 2.1 km','⏱ 60–90 min','🎓 Linguistics MA'],tags:['Bahasa','Conversational','Beginner-friendly'],price:'Rp 280k',sub:'/ 60 min lesson',team:['S'],stat:'15 yr',statLabel:'teaching'},
      {name:'Mandarin Studio Bali',pat:'pat-grid',deco:'🇨🇳',badge:'🇨🇳 HSK certified',rating:4.94,meta:['📍 3.0 km','⏱ 60–90 min','👥 3 tutors'],tags:['Mandarin','HSK prep','Business'],price:'Rp 380k',sub:'/ 60 min lesson',team:['M','S','+1'],stat:'HSK 6',statLabel:'certified'},
      {name:'Japanese with Yuki',pat:'pat-dots',deco:'🇯🇵',badge:'🇯🇵 Native speaker',badgeType:'gold',rating:4.96,meta:['📍 2.5 km','⏱ 60 min','🎓 JLPT examiner'],tags:['Japanese','JLPT prep','Cultural'],price:'Rp 420k',sub:'/ 60 min lesson',team:['Y'],stat:'Native',statLabel:'+ JLPT examiner'},
      {name:'English Mastery Bali',pat:'pat-waves',deco:'🇬🇧',badge:'⚡ Available today',rating:4.91,meta:['📍 1.8 km','⏱ 60–90 min','👥 5 tutors'],tags:['IELTS','TOEFL','Business English'],price:'Rp 320k',sub:'/ 60 min lesson',team:['E','M','+2'],stat:'IELTS',statLabel:'specialists'},
      {name:'Spanish Salsa Studio',pat:'pat-lines',deco:'🇪🇸',badge:'💃 Cultural immersion',rating:4.89,meta:['📍 3.4 km','⏱ 60–90 min','🎓 DELE certified'],tags:['Spanish','Conversational','Cultural'],price:'Rp 340k',sub:'/ 60 min lesson',team:['S','S','+1'],stat:'DELE',statLabel:'certified'},
      {name:'Korean with Min',pat:'pat-grid',deco:'🇰🇷',badge:'🔥 K-pop fans love it',rating:4.93,meta:['📍 4.0 km','⏱ 60 min'],tags:['Korean','TOPIK prep','Pop culture'],price:'Rp 380k',sub:'/ 60 min lesson',team:['M'],stat:'TOPIK',statLabel:'certified'},
      {name:'Polyglot Bali',pat:'pat-dots',deco:'🌍',badge:'🌐 12 languages offered',badgeType:'green',rating:4.87,meta:['📍 3.8 km','⏱ 60–90 min','👥 12 tutors'],tags:['Multi-language','Group rates','Kids'],price:'Rp 300k',sub:'/ 60 min lesson',team:['P','B','+9'],stat:'12',statLabel:'languages'},
      {name:'Kids Language Club',pat:'pat-waves',deco:'🧒',badge:'👨‍👩‍👧 Family-friendly',rating:4.92,meta:['📍 4.5 km','⏱ 45 min','🎓 Kids cert.'],tags:['Kids 4-12','Playful','Bilingual'],price:'Rp 220k',sub:'/ 45 min lesson',team:['K','L','+2'],stat:'4-12',statLabel:'ages'}
    ]
  },
  music: { icon:'🎵', theme:'music', count:36, eyebrow:'Lessons & Learning', title:'Music Lessons',
    sub:'36 instrument teachers for guitar, piano, ukulele, drums, voice and more. Private lessons in your home.',
    subs:['All Instruments','Guitar','Piano','Ukulele','Drums','Voice / Vocal','Bass','Violin','Saxophone','DJ / Production','Music Theory'],
    providers:[
      {name:'Guitar Hero Bali',pat:'pat-lines',deco:'🎸',badge:'🎸 20 yrs teaching',badgeType:'hot',rating:4.96,meta:['📍 2.3 km','⏱ 45–60 min','🎓 Berklee alum'],tags:['Acoustic','Electric','All levels'],price:'Rp 350k',sub:'/ 45 min lesson',team:['G','H','+1'],stat:'Berklee',statLabel:'alumni'},
      {name:'Piano Studio Bali',pat:'pat-grid',deco:'🎹',badge:'🏆 Classical & jazz',rating:4.94,meta:['📍 3.1 km','⏱ 60 min','🎓 ABRSM examiner'],tags:['Classical','Jazz','Music theory'],price:'Rp 420k',sub:'/ 60 min lesson',team:['P','B','+2'],stat:'ABRSM',statLabel:'examiner'},
      {name:'Ukulele Sunshine',pat:'pat-dots',deco:'🪕',badge:'🌺 Beach lessons',rating:4.93,meta:['📍 1.9 km','⏱ 45 min'],tags:['Ukulele','Beginner','Fun'],price:'Rp 220k',sub:'/ 45 min lesson',team:['U','S','+1'],stat:'2 wk',statLabel:'to play songs'},
      {name:'Drum Beat Studio',pat:'pat-lines',deco:'🥁',badge:'⚡ Kit included',rating:4.89,meta:['📍 4.2 km','⏱ 60 min','👥 2 teachers'],tags:['Drums','Rock','Latin'],price:'Rp 380k',sub:'/ 60 min lesson',team:['D','B','+1'],stat:'Pro kit',statLabel:'included'},
      {name:'Vocal Coach Bali',pat:'pat-waves',deco:'🎤',badge:'🎶 Performance coach',badgeType:'hot',rating:4.95,meta:['📍 3.5 km','⏱ 60 min','🎓 Royal Conservatoire'],tags:['Voice','Pop','Performance'],price:'Rp 450k',sub:'/ 60 min lesson',team:['V','C','+1'],stat:'Royal',statLabel:'Conservatoire'},
      {name:'DJ Academy Bali',pat:'pat-grid',deco:'🎧',badge:'🔥 Production + DJ',rating:4.91,meta:['📍 5.0 km','⏱ 90 min','👥 3 teachers'],tags:['DJing','Ableton','Production'],price:'Rp 580k',sub:'/ 90 min lesson',team:['D','J','+2'],stat:'Ableton',statLabel:'certified'},
      {name:'Strings & Things',pat:'pat-dots',deco:'🎻',badge:'🎻 Violin + bass',rating:4.88,meta:['📍 6.1 km','⏱ 60 min','🎓 Conservatory'],tags:['Violin','Bass','Classical'],price:'Rp 480k',sub:'/ 60 min lesson',team:['S','T'],stat:'Conservatory',statLabel:'trained'},
      {name:'Music Theory Bali',pat:'pat-lines',deco:'🎼',badge:'📚 Theory specialist',badgeType:'green',rating:4.86,meta:['📍 4.8 km','⏱ 60 min'],tags:['Theory','ABRSM','Composition'],price:'Rp 320k',sub:'/ 60 min lesson',team:['M','T','+1'],stat:'ABRSM',statLabel:'all grades'}
    ]
  },
  ivdrip: { icon:'💉', theme:'ivdrip', count:11, eyebrow:'Wellness & Recovery', title:'IV Drips',
    sub:'11 medical providers delivering IV vitamin therapy at your villa. Hangover recovery, immunity, energy, beauty, hydration.',
    subs:['All IV Drips','Hangover Recovery','Immunity Boost','Energy / B12','Beauty / Glutathione','Hydration','Athletic Recovery','NAD+'],
    providers:[
      {name:'Bali IV Bar',pat:'pat-grid',deco:'💉',badge:'🏥 Doctor-supervised',badgeType:'hot',rating:4.95,meta:['📍 2.5 km','⏱ 45–60 min','🎓 MD on call'],tags:['Hangover','Immunity','Beauty'],price:'Rp 850k',sub:'/ drip session',team:['B','I','+2'],stat:'MD',statLabel:'on every call'},
      {name:'Reset IV Bali',pat:'pat-dots',deco:'⚡',badge:'🔥 Most popular',badgeType:'hot',rating:4.93,meta:['📍 1.9 km','⏱ 45 min','👥 3 nurses'],tags:['Hangover','Energy','Quick'],price:'Rp 680k',sub:'/ drip session',team:['R','I','+2'],stat:'45 min',statLabel:'avg session'},
      {name:'Glow IV Studio',pat:'pat-waves',deco:'✨',badge:'✨ Beauty drip specialist',rating:4.92,meta:['📍 3.4 km','⏱ 60 min','🎓 Aesthetic nurse'],tags:['Glutathione','Vitamin C','Beauty'],price:'Rp 1.2M',sub:'/ beauty drip',team:['G','I'],stat:'Beauty',statLabel:'specialist'},
      {name:'Athlete IV Recovery',pat:'pat-grid',deco:'💪',badge:'🏃 Sports recovery',rating:4.89,meta:['📍 4.1 km','⏱ 60 min','🎓 Sports med nurse'],tags:['Athletic','BCAA','Recovery'],price:'Rp 950k',sub:'/ recovery drip',team:['A','I','+1'],stat:'Athletes',statLabel:'preferred'},
      {name:'NAD+ Bali',pat:'pat-lines',deco:'🧬',badge:'🧬 NAD+ specialist',badgeType:'gold',rating:4.96,meta:['📍 5.0 km','⏱ 2–3 hr','🎓 MD-led'],tags:['NAD+','Anti-aging','Premium'],price:'Rp 3.2M',sub:'/ NAD+ session',team:['N','B','+1'],stat:'2–3 hr',statLabel:'NAD+ infusion'},
      {name:'Vita Drip Mobile',pat:'pat-dots',deco:'💧',badge:'⚡ 24/7 hangover',rating:4.87,meta:['📍 3.7 km','⏱ 45 min'],tags:['Hangover','24/7','Hydration'],price:'Rp 580k',sub:'/ drip session',team:['V','D','+2'],stat:'24/7',statLabel:'available'}
    ]
  },
  ac: { icon:'❄️', theme:'ac', count:28, eyebrow:'Home Services', title:'AC Repair & Service',
    sub:'28 certified AC technicians for cleaning, gas refills, repairs and new installations. Same-day service available.',
    subs:['All AC Services','Cleaning / Service','Gas Refill','Repair','New Installation','Diagnosis','Emergency','Commercial'],
    providers:[
      {name:'Cool Bali AC',pat:'pat-grid',deco:'❄️',badge:'⚡ Same-day service',badgeType:'hot',rating:4.92,meta:['📍 2.4 km','⏱ 1–3 hr','👥 4 techs'],tags:['Service','Gas refill','All brands'],price:'Rp 250k',sub:'/ AC unit service',team:['C','B','+2'],stat:'Same day',statLabel:'guaranteed'},
      {name:'ChillTech Bali',pat:'pat-lines',deco:'🔧',badge:'🏆 Daikin authorized',rating:4.94,meta:['📍 3.1 km','⏱ 1–4 hr','🎓 Daikin certified'],tags:['Daikin','LG','Panasonic'],price:'Rp 320k',sub:'/ AC unit service',team:['C','T','+1'],stat:'Daikin',statLabel:'authorized'},
      {name:'Frost Free Bali',pat:'pat-dots',deco:'🧊',badge:'⚡ Emergency 24/7',rating:4.89,meta:['📍 3.8 km','⏱ 1–2 hr','👥 6 techs'],tags:['Emergency','Repair','Diagnosis'],price:'Rp 380k',sub:'/ emergency call',team:['F','F','+3'],stat:'24/7',statLabel:'emergency'},
      {name:'Install Pro Bali',pat:'pat-waves',deco:'🛠️',badge:'🏠 Villa installs',badgeType:'green',rating:4.93,meta:['📍 4.5 km','⏱ 3–6 hr','👥 3 techs'],tags:['Installation','Villas','Mounting'],price:'Rp 1.5M',sub:'/ new install',team:['I','P','+1'],stat:'500+',statLabel:'installs'},
      {name:'AC Doctor Bali',pat:'pat-grid',deco:'🩺',badge:'🔍 Diagnostic specialist',rating:4.87,meta:['📍 4.0 km','⏱ 1 hr'],tags:['Diagnosis','Quotes','Honest'],price:'Rp 150k',sub:'/ diagnostic visit',team:['A','D','+1'],stat:'1 hr',statLabel:'diagnosis'}
    ]
  },
  electrical: { icon:'⚡', theme:'electrical', count:19, eyebrow:'Home Services', title:'Electrical',
    sub:'19 licensed electricians for repairs, installations, wiring, lighting and electrical safety inspections.',
    subs:['All Electrical','General Repair','Lighting Install','Wiring','Safety Inspection','Smart Home','Generator / Backup','Emergency'],
    providers:[
      {name:'Bali Electric Co.',pat:'pat-lines',deco:'⚡',badge:'🔌 Licensed master',badgeType:'hot',rating:4.94,meta:['📍 2.7 km','⏱ 1–3 hr','🎓 Licensed master'],tags:['Repairs','Wiring','Inspection'],price:'Rp 300k',sub:'/ service call',team:['B','E','+2'],stat:'Master',statLabel:'electrician'},
      {name:'Spark Bali',pat:'pat-grid',deco:'💡',badge:'💡 Lighting specialist',rating:4.91,meta:['📍 3.4 km','⏱ 2–4 hr','👥 3 electricians'],tags:['Lighting','LED','Design'],price:'Rp 450k',sub:'/ lighting install',team:['S','B','+1'],stat:'LED',statLabel:'specialist'},
      {name:'Wired Bali',pat:'pat-dots',deco:'🔌',badge:'🏠 Villa specialist',rating:4.89,meta:['📍 4.0 km','⏱ 2–6 hr'],tags:['Wiring','Villas','Renovation'],price:'Rp 580k',sub:'/ wiring job',team:['W','B','+2'],stat:'Villa',statLabel:'expert'},
      {name:'Safe Power Bali',pat:'pat-waves',deco:'🛡️',badge:'🛡️ Safety certified',badgeType:'green',rating:4.93,meta:['📍 3.8 km','⏱ 2–3 hr','🎓 Safety cert.'],tags:['Inspection','Safety','Compliance'],price:'Rp 380k',sub:'/ full inspection',team:['S','P','+1'],stat:'Safety',statLabel:'certified'},
      {name:'Smart Home Bali',pat:'pat-grid',deco:'🏡',badge:'🏡 Smart home installs',rating:4.95,meta:['📍 5.1 km','⏱ 3–8 hr'],tags:['Smart home','Hue','Sonos'],price:'Rp 850k',sub:'/ smart install',team:['S','H','+1'],stat:'Smart',statLabel:'specialist'},
      {name:'24h Spark',pat:'pat-lines',deco:'🚨',badge:'⚡ 24/7 emergency',rating:4.86,meta:['📍 4.4 km','⏱ 1 hr'],tags:['Emergency','24/7','Quick'],price:'Rp 480k',sub:'/ emergency call',team:['S','+2'],stat:'24/7',statLabel:'emergency'}
    ]
  },
  plumbing: { icon:'🔧', theme:'plumbing', count:22, eyebrow:'Home Services', title:'Plumbing',
    sub:'22 licensed plumbers for leaks, clogs, installations, water heaters and emergency callouts.',
    subs:['All Plumbing','Leak Repair','Clogged Drain','Toilet Repair','Water Heater','New Install','Pool Plumbing','Emergency'],
    providers:[
      {name:'Aqua Bali',pat:'pat-waves',deco:'🔧',badge:'⚡ Same-day callouts',badgeType:'hot',rating:4.93,meta:['📍 2.8 km','⏱ 1–3 hr','👥 4 plumbers'],tags:['Leaks','Clogs','Repairs'],price:'Rp 280k',sub:'/ service call',team:['A','B','+2'],stat:'Same day',statLabel:'guaranteed'},
      {name:'Pipe Pro Bali',pat:'pat-grid',deco:'🚿',badge:'🏆 Licensed master',rating:4.95,meta:['📍 3.2 km','⏱ 2–4 hr','🎓 Master plumber'],tags:['Master','Installation','Renovation'],price:'Rp 420k',sub:'/ service call',team:['P','P','+1'],stat:'Master',statLabel:'plumber'},
      {name:'Leak Hunter Bali',pat:'pat-dots',deco:'💧',badge:'🔍 Leak detection',rating:4.91,meta:['📍 3.6 km','⏱ 1–2 hr'],tags:['Leak detection','Tech','Non-invasive'],price:'Rp 380k',sub:'/ leak detection',team:['L','H','+2'],stat:'No-dig',statLabel:'detection'},
      {name:'Hot Water Co.',pat:'pat-lines',deco:'🚰',badge:'🚿 Water heater pro',rating:4.89,meta:['📍 4.1 km','⏱ 2–3 hr','👥 3 plumbers'],tags:['Water heater','Solar','Tankless'],price:'Rp 580k',sub:'/ heater install',team:['H','W','+1'],stat:'Solar',statLabel:'specialist'},
      {name:'Pool Plumb Bali',pat:'pat-waves',deco:'🏊',badge:'🏊 Pool specialist',badgeType:'green',rating:4.92,meta:['📍 5.0 km','⏱ 2–6 hr'],tags:['Pool','Filters','Pumps'],price:'Rp 750k',sub:'/ pool service',team:['P','P','+1'],stat:'Pool',statLabel:'specialist'},
      {name:'24h Flow',pat:'pat-grid',deco:'🚨',badge:'⚡ 24/7 emergency',rating:4.87,meta:['📍 3.9 km','⏱ 1 hr'],tags:['Emergency','24/7','Burst pipes'],price:'Rp 520k',sub:'/ emergency call',team:['F','+2'],stat:'24/7',statLabel:'emergency'}
    ]
  },
  photo: { icon:'📸', theme:'photo', count:46, eyebrow:'Events & Celebrations', title:'Photography',
    sub:'46 professional photographers for weddings, portraits, family shoots, parties, brand work and content creation.',
    subs:['All Photography','Weddings','Portrait / Family','Events / Parties','Couple / Engagement','Maternity','Newborn','Branding / Content','Lifestyle'],
    providers:[
      {name:'Bali Light Studios',pat:'pat-dots',deco:'📸',badge:'🏆 200+ weddings',badgeType:'hot',rating:4.97,meta:['📍 2.4 km','⏱ 4–10 hr','👥 2 photographers'],tags:['Weddings','Engagement','Premium'],price:'Rp 8.5M',sub:'wedding day package',team:['B','L','+1'],stat:'200+',statLabel:'weddings'},
      {name:'Frame Story Bali',pat:'pat-waves',deco:'🎞️',badge:'🎞️ Film + digital',rating:4.94,meta:['📍 1.8 km','⏱ 2–4 hr'],tags:['Couple','Portrait','Film'],price:'Rp 1.8M',sub:'portrait session',team:['F','S'],stat:'Film',statLabel:'specialist'},
      {name:'Sunset Shoot Co.',pat:'pat-grid',deco:'🌅',badge:'🌅 Golden hour pro',rating:4.92,meta:['📍 3.1 km','⏱ 1–2 hr','👥 3 photographers'],tags:['Lifestyle','Couples','Beach'],price:'Rp 1.2M',sub:'/ 90 min session',team:['S','S','+1'],stat:'Golden',statLabel:'hour expert'},
      {name:'Family Frames Bali',pat:'pat-dots',deco:'👨‍👩‍👧',badge:'👶 Newborn & family',badgeType:'green',rating:4.95,meta:['📍 2.7 km','⏱ 1–3 hr'],tags:['Family','Newborn','Maternity'],price:'Rp 1.5M',sub:'family session',team:['F','F'],stat:'Newborn',statLabel:'certified'},
      {name:'Event Snap Bali',pat:'pat-lines',deco:'🎉',badge:'⚡ Same-day delivery',rating:4.89,meta:['📍 3.4 km','⏱ 3–6 hr','👥 4 photographers'],tags:['Events','Parties','Corporate'],price:'Rp 2.4M',sub:'/ event coverage',team:['E','S','+2'],stat:'24h',statLabel:'turnaround'},
      {name:'Brand Vault Studio',pat:'pat-grid',deco:'📷',badge:'💼 Brand content',rating:4.91,meta:['📍 4.2 km','⏱ 4–8 hr','👥 2 + assistant'],tags:['Branding','Product','Content'],price:'Rp 3.8M',sub:'/ content day',team:['B','V','+1'],stat:'100+',statLabel:'brands shot'}
    ]
  },
  video: { icon:'🎥', theme:'video', count:28, eyebrow:'Events & Celebrations', title:'Videography',
    sub:'28 cinematographers for wedding films, brand videos, drone work, event reels and social content.',
    subs:['All Video','Wedding Film','Drone','Event Reels','Brand Films','Social Content','Music Video','Documentary'],
    providers:[
      {name:'Cinema Bali Co.',pat:'pat-waves',deco:'🎥',badge:'🎬 Award-winning',badgeType:'hot',rating:4.96,meta:['📍 2.6 km','⏱ 8–12 hr','👥 3 cinematographers'],tags:['Weddings','Cinematic','Premium'],price:'Rp 12M',sub:'wedding film',team:['C','B','+2'],stat:'Award',statLabel:'-winning'},
      {name:'Drone Bali Pro',pat:'pat-grid',deco:'🚁',badge:'🚁 Licensed drone',rating:4.93,meta:['📍 3.4 km','⏱ 2–6 hr','🎓 Drone licensed'],tags:['Drone','Aerial','4K'],price:'Rp 1.8M',sub:'/ drone session',team:['D','B','+1'],stat:'Mavic 3',statLabel:'Pro kit'},
      {name:'Reel Story Bali',pat:'pat-dots',deco:'🎞️',badge:'🔥 Social content pro',rating:4.91,meta:['📍 2.9 km','⏱ 3–6 hr','👥 2 videographers'],tags:['Reels','TikTok','Brand'],price:'Rp 2.2M',sub:'/ reel package',team:['R','S','+1'],stat:'5 reels',statLabel:'/ shoot'},
      {name:'Wedding Films Bali',pat:'pat-lines',deco:'💒',badge:'💍 Wedding specialist',rating:4.94,meta:['📍 3.7 km','⏱ 10–14 hr','👥 4 crew'],tags:['Weddings','Documentary','Same-day edit'],price:'Rp 15M',sub:'full wedding film',team:['W','F','+3'],stat:'Same-day',statLabel:'edit option'},
      {name:'Brand Motion Studio',pat:'pat-grid',deco:'🎬',badge:'💼 Brand films',rating:4.89,meta:['📍 4.5 km','⏱ 6–10 hr'],tags:['Branding','Corporate','Promo'],price:'Rp 5.5M',sub:'/ brand video',team:['B','M','+1'],stat:'Promo',statLabel:'specialist'}
    ]
  },
  florist: { icon:'💐', theme:'florist', count:34, eyebrow:'Events & Celebrations', title:'Florists',
    sub:'34 florists creating bouquets, wedding arrangements, event installations, and weekly home flower subscriptions.',
    subs:['All Florists','Bridal Bouquet','Wedding Arch','Event Install','Bouquet Delivery','Same-day','Subscription','Funeral'],
    providers:[
      {name:'Petal Bali',pat:'pat-dots',deco:'💐',badge:'🌸 Same-day delivery',badgeType:'hot',rating:4.95,meta:['📍 1.8 km','⏱ 2 hr','👥 4 florists'],tags:['Bouquets','Same-day','Custom'],price:'Rp 380k',sub:'/ signature bouquet',team:['P','B','+2'],stat:'2 hr',statLabel:'delivery'},
      {name:'Wedding Bloom Co.',pat:'pat-waves',deco:'🤍',badge:'👰 Wedding specialist',badgeType:'hot',rating:4.97,meta:['📍 2.6 km','⏱ 1 day setup','👥 6 florists'],tags:['Wedding','Arch','Aisle'],price:'Rp 8.5M',sub:'/ wedding florals',team:['W','B','+5'],stat:'150+',statLabel:'weddings'},
      {name:'Tropical Bali Flowers',pat:'pat-grid',deco:'🌺',badge:'🌴 Tropical specialist',badgeType:'green',rating:4.92,meta:['📍 3.2 km','⏱ 2 hr'],tags:['Frangipani','Orchid','Tropical'],price:'Rp 280k',sub:'/ bouquet',team:['T','B','+1'],stat:'Locally',statLabel:'sourced'},
      {name:'Bloom Subscription',pat:'pat-dots',deco:'🌹',badge:'📦 Weekly fresh blooms',rating:4.89,meta:['📍 3.8 km','⏱ Weekly','👥 Delivery'],tags:['Subscription','Weekly','Home'],price:'Rp 1.2M',sub:'/ month subscription',team:['B','S','+1'],stat:'4 / mo',statLabel:'deliveries'},
      {name:'Event Floral Studio',pat:'pat-lines',deco:'🌷',badge:'🎉 Event installs',rating:4.93,meta:['📍 4.0 km','⏱ 4–8 hr','👥 8 crew'],tags:['Events','Backdrops','Centerpieces'],price:'Rp 4.5M',sub:'/ event install',team:['E','F','+5'],stat:'Custom',statLabel:'installs'}
    ]
  },
  cakes: { icon:'🎂', theme:'cakes', count:31, eyebrow:'Events & Celebrations', title:'Cakes & Desserts',
    sub:'31 pastry artists for birthday cakes, wedding tiers, dessert tables, and custom celebration sweets.',
    subs:['All Cakes','Birthday Cake','Wedding Cake','Custom Cake','Dessert Table','Cupcakes','Kids Cakes','Vegan / GF'],
    providers:[
      {name:'Sweet Bali Cakes',pat:'pat-dots',deco:'🎂',badge:'🎂 Birthday specialist',badgeType:'hot',rating:4.95,meta:['📍 2.2 km','⏱ 48 hr lead','👥 3 bakers'],tags:['Birthday','Custom','Themes'],price:'Rp 580k',sub:'/ custom cake',team:['S','B','+2'],stat:'48 hr',statLabel:'made-to-order'},
      {name:'The Bridal Tier',pat:'pat-waves',deco:'💍',badge:'👰 Wedding cake pro',badgeType:'hot',rating:4.97,meta:['📍 3.0 km','⏱ 1 wk lead','👥 4 bakers'],tags:['Wedding','Tiered','Custom'],price:'Rp 3.5M',sub:'/ 3-tier wedding cake',team:['B','T','+2'],stat:'Custom',statLabel:'tiered cakes'},
      {name:'Sugar Studio Bali',pat:'pat-grid',deco:'🧁',badge:'🧁 Cupcakes & treats',rating:4.91,meta:['📍 2.7 km','⏱ 24 hr lead'],tags:['Cupcakes','Macarons','Cookies'],price:'Rp 420k',sub:'/ dozen cupcakes',team:['S','S','+1'],stat:'12 / box',statLabel:'minimum'},
      {name:'Dessert Table Bali',pat:'pat-lines',deco:'🍰',badge:'🎉 Event dessert tables',rating:4.93,meta:['📍 3.5 km','⏱ 1 wk lead','👥 5 crew'],tags:['Dessert table','Event','Display'],price:'Rp 4.8M',sub:'/ dessert table install',team:['D','T','+3'],stat:'30+ ppl',statLabel:'events'},
      {name:'Plant Sweet Co.',pat:'pat-dots',deco:'🌿',badge:'🌿 Vegan & GF',badgeType:'green',rating:4.89,meta:['📍 4.1 km','⏱ 48 hr lead'],tags:['Vegan','Gluten-free','Healthy'],price:'Rp 520k',sub:'/ vegan cake',team:['P','S','+1'],stat:'Vegan',statLabel:'+ GF'},
      {name:'Kids Party Cakes',pat:'pat-grid',deco:'🎈',badge:'🎉 Kids party themes',rating:4.92,meta:['📍 4.6 km','⏱ 72 hr lead'],tags:['Kids','Themed','Cartoon'],price:'Rp 480k',sub:'/ themed cake',team:['K','P','+1'],stat:'Themes',statLabel:'galore'}
    ]
  },
  entertainment: { icon:'🎭', theme:'entertainment', count:38, eyebrow:'Events & Celebrations', title:'Entertainment',
    sub:'38 performers and entertainers — clowns, magicians, face painters, fire dancers, DJs, live bands, kids entertainers.',
    subs:['All Entertainment','Clowns / Kids','Magicians','Face Painting','Fire Dancers','DJs','Live Bands','Balloon Artists','Acrobats','Karaoke Hire'],
    providers:[
      {name:'Bali Magic Show',pat:'pat-dots',deco:'🎩',badge:'🎩 Pro magician',badgeType:'hot',rating:4.95,meta:['📍 2.4 km','⏱ 60–90 min','👥 Solo + assistant'],tags:['Magic','Close-up','Stage show'],price:'Rp 1.5M',sub:'/ magic show',team:['B','M'],stat:'10 yr',statLabel:'pro magician'},
      {name:'Happy Clowns Bali',pat:'pat-waves',deco:'🤡',badge:'🎉 Kids parties',rating:4.92,meta:['📍 2.9 km','⏱ 90–120 min','👥 2 entertainers'],tags:['Clowns','Kids','Games'],price:'Rp 1.2M',sub:'/ kids party',team:['H','C','+1'],stat:'Kids',statLabel:'specialist'},
      {name:'Fire Dance Bali',pat:'pat-lines',deco:'🔥',badge:'🔥 Fire performance',badgeType:'hot',rating:4.96,meta:['📍 3.4 km','⏱ 30–45 min','👥 3 dancers'],tags:['Fire','Poi','Spectacle'],price:'Rp 2.8M',sub:'/ 30 min show',team:['F','D','+2'],stat:'Wow',statLabel:'factor'},
      {name:'Face Paint Studio',pat:'pat-grid',deco:'🎨',badge:'🎨 Face & body art',rating:4.89,meta:['📍 2.7 km','⏱ 2–4 hr','👥 4 artists'],tags:['Face paint','Kids','Glitter'],price:'Rp 850k',sub:'/ 2 hr · up to 30 kids',team:['F','P','+3'],stat:'30 kids',statLabel:'/ 2 hr'},
      {name:'DJ Bali Events',pat:'pat-dots',deco:'🎧',badge:'🎶 Wedding & event DJ',rating:4.93,meta:['📍 3.6 km','⏱ 4–6 hr','👥 1 DJ + MC'],tags:['DJ','Wedding','Events'],price:'Rp 4.5M',sub:'/ 4 hr event',team:['D','B','+1'],stat:'500+',statLabel:'events'},
      {name:'Live Band Bali',pat:'pat-lines',deco:'🎸',badge:'🎵 Live music',rating:4.94,meta:['📍 4.2 km','⏱ 2–4 hr','👥 4–6 musicians'],tags:['Live band','Acoustic','Wedding'],price:'Rp 6.5M',sub:'/ 2 hr set',team:['L','B','+4'],stat:'4–6',statLabel:'musicians'},
      {name:'Balloon Art Bali',pat:'pat-grid',deco:'🎈',badge:'🎈 Balloon installs',badgeType:'green',rating:4.88,meta:['📍 3.9 km','⏱ 2–4 hr','👥 2 artists'],tags:['Balloons','Garlands','Arches'],price:'Rp 1.8M',sub:'/ balloon install',team:['B','A','+1'],stat:'Custom',statLabel:'installs'},
      {name:'Acro Show Bali',pat:'pat-waves',deco:'🤸',badge:'🤸 Acrobats & stilts',rating:4.91,meta:['📍 4.5 km','⏱ 30–60 min','👥 3 performers'],tags:['Acrobats','Stilts','Aerial'],price:'Rp 3.2M',sub:'/ performance',team:['A','S','+2'],stat:'Aerial',statLabel:'silks'}
    ]
  },
  decorator: { icon:'🎀', theme:'decorator', count:24, eyebrow:'Events & Celebrations', title:'Event Decorators',
    sub:'24 event decorators for birthday setups, baby showers, proposals, anniversaries, and themed parties.',
    subs:['All Decorators','Birthday Setup','Baby Shower','Proposal Setup','Anniversary','Themed Party','Picnic Setup','Romantic Dinner'],
    providers:[
      {name:'Proposal Bali',pat:'pat-dots',deco:'💍',badge:'💍 Proposal specialist',badgeType:'hot',rating:4.98,meta:['📍 2.3 km','⏱ 3–6 hr setup','👥 3 crew'],tags:['Proposals','Romantic','Beach setup'],price:'Rp 4.5M',sub:'/ proposal setup',team:['P','B','+2'],stat:'200+',statLabel:'yeses'},
      {name:'Picnic Bali Co.',pat:'pat-waves',deco:'🧺',badge:'🌸 Luxury picnics',rating:4.94,meta:['📍 1.9 km','⏱ 2 hr setup','👥 2 crew'],tags:['Picnic','Beach','Garden'],price:'Rp 1.8M',sub:'/ picnic setup for 2',team:['P','B','+1'],stat:'Luxe',statLabel:'picnics'},
      {name:'Birthday Bali Setup',pat:'pat-grid',deco:'🎉',badge:'🎂 Birthday specialist',rating:4.92,meta:['📍 2.8 km','⏱ 2–4 hr setup','👥 4 crew'],tags:['Birthday','Themed','Balloons'],price:'Rp 2.5M',sub:'/ birthday setup',team:['B','B','+3'],stat:'Custom',statLabel:'themes'},
      {name:'Baby Shower Bali',pat:'pat-dots',deco:'👶',badge:'👶 Baby shower pro',badgeType:'green',rating:4.93,meta:['📍 3.2 km','⏱ 3 hr setup','👥 3 crew'],tags:['Baby shower','Pastel','Gender reveal'],price:'Rp 2.2M',sub:'/ shower setup',team:['B','S','+2'],stat:'Pastel',statLabel:'specialist'},
      {name:'Anniversary Studio',pat:'pat-lines',deco:'❤️',badge:'❤️ Romantic setups',rating:4.91,meta:['📍 3.6 km','⏱ 2–4 hr setup','👥 2 crew'],tags:['Anniversary','Romantic','Candles'],price:'Rp 1.5M',sub:'/ romantic dinner setup',team:['A','S','+1'],stat:'Romantic',statLabel:'specialist'},
      {name:'Themed Party Bali',pat:'pat-grid',deco:'🎭',badge:'🎨 Any theme',rating:4.89,meta:['📍 4.0 km','⏱ 4–6 hr setup','👥 5 crew'],tags:['Tropical','Vintage','Garden'],price:'Rp 3.8M',sub:'/ themed party setup',team:['T','P','+3'],stat:'Any',statLabel:'theme'}
    ]
  }
};
