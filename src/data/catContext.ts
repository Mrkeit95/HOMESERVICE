import type { CatContext } from './types';

export const CAT_CONTEXT: CatContext = {
  massage: {
    aboutTemplate: (p, c) => `${p.name} is a ${c.themeAdj || 'wellness'} collective based in Canggu, delivering authentic Balinese and contemporary bodywork right to your villa, hotel or home. The team trained at Jamu Wellness Academy and brings ${p.stat === '12 yr' ? 'over a decade' : 'years'} of hands-on experience to every session.\n\nThey arrive with everything needed — folding table, fresh linens, organic oils sourced from Ubud, and a curated playlist. No setup hassle on your end. Just open the door.`,
    quote: 'We don\'t just do massages. We come into your space and leave it lighter than we found it.',
    roleLabels: ['Lead Therapist', 'Senior Therapist', 'Therapist', 'Therapist', 'Therapist'],
    teamBios: [
      ['Specializes in deep tissue and sports recovery. Former physio assistant.', ['Deep tissue', 'Sports', 'Trigger point']],
      ['Traditional Balinese expert. Trained in Ubud since age 16.', ['Balinese', 'Aromatherapy', 'Reflexology']],
      ['Prenatal-certified. Gentle, intuitive pressure work.', ['Prenatal', 'Swedish', 'Lymphatic']],
      ['Hot stone & couples specialist. Calm, methodical approach.', ['Hot stone', 'Couples', 'Aromatherapy']]
    ],
    portfolio: ['Treatment Room', 'Mobile Setup', 'Organic Oils', 'Hot Stones', 'Villa Session', 'Beach Massage', 'Couples Suite', 'Therapy Table'],
    portIcons: ['🛏️', '🧴', '🌿', '🪨', '🏖️', '🌅', '💑', '🤲'],
    portTabs: ['All Work', 'Treatment Spaces', 'Villa Sessions', 'Products & Tools']
  },
  barber: {
    aboutTemplate: (p) => `${p.name} is a mobile barbering crew that brings the chair to you. No more sitting around shops — book a slot and a master barber shows up at your villa, office or hotel with their full kit. Sharpened shears, clippers, hot towels, lather, the works.\n\nThe team's ${p.stat === '15 yr' ? 'lead barber has 15 years' : 'lead barber has years'} of experience working chairs from Jakarta to Sydney, with a portfolio spanning classic side-parts to modern textured fades. Beard sculpts and hot lather shaves are a specialty.`,
    quote: 'A good cut isn\'t about the chair you\'re sitting in. It\'s about the hands holding the clippers.',
    roleLabels: ['Master Barber', 'Senior Barber', 'Barber', 'Apprentice Barber'],
    teamBios: [
      ['10+ years on the chair. Specializes in skin fades, classic cuts and beard sculpting. Trained in London.', ['Skin fade', 'Classic', 'Beard sculpt']],
      ['Hot towel shave specialist. Old-school straight razor work.', ['Hot shave', 'Straight razor', 'Lather']],
      ['Modern textured cuts. Specializes in waves and curly hair.', ['Textured', 'Curly hair', 'Modern']],
      ['Kids cuts and quick fades. Patient with first-timers.', ['Kids', 'Fades', 'Quick cuts']]
    ],
    portfolio: ['Skin Fade', 'Classic Side Part', 'Beard Sculpt', 'Hot Towel Shave', 'Textured Crop', 'Pompadour', 'Hair Tattoo', 'Mobile Kit'],
    portIcons: ['✂️', '💈', '🧔', '🪒', '💇', '🎩', '🎨', '🧳'],
    portTabs: ['All Work', 'Cuts', 'Beards', 'Mobile Setup']
  },
  physio: {
    aboutTemplate: (p) => `${p.name} is a licensed in-home physiotherapy practice serving Bali's expat and traveller community. The team holds international qualifications (BSc/MSc Physio) and specializes in sports injury, post-surgical rehab, and chronic pain management.\n\nEvery session begins with a movement assessment. You get a personalized plan, hands-on manual therapy, and follow-up exercises to do between visits. The team brings their own table and equipment — you don't need anything except a quiet space.`,
    quote: 'Recovery isn\'t passive. We meet you where you are and build the road back together.',
    roleLabels: ['Lead Physio (MSc)', 'Senior Physio (BSc)', 'Physio (BSc)', 'Sports Physio'],
    teamBios: [
      ['MSc Physio, Sydney University. 15 years in sports rehab and post-surgical recovery.', ['Sports injury', 'Post-surgery', 'Manual therapy']],
      ['BSc Physio, specializes in chronic back and neck pain. Dry needling certified.', ['Back pain', 'Neck', 'Dry needling']],
      ['Surfer-specific rehab. Treats shoulders, knees, lower back.', ['Surf injuries', 'Shoulders', 'Knees']],
      ['Sports physio for runners and triathletes. Gait analysis expert.', ['Running', 'Gait', 'Triathlon']]
    ],
    portfolio: ['Assessment Room', 'Manual Therapy', 'Dry Needling Kit', 'Cupping Therapy', 'Exercise Tools', 'Rehab Bands', 'Foam Rollers', 'Mobile Table'],
    portIcons: ['🦴', '🩺', '🪡', '🥢', '💪', '🎯', '🌀', '🏥'],
    portTabs: ['All', 'Treatment Modalities', 'Equipment', 'Clinic Space']
  },
  chiro: {
    aboutTemplate: (p) => `${p.name} brings Doctor of Chiropractic-level care to your door. The team specializes in spinal adjustment, decompression therapy, and posture correction — using both traditional manual techniques and gentler Activator Method instruments depending on what your body needs.\n\nA full intake and consultation comes with your first session. If imaging is needed, they coordinate with local imaging centers. Pregnancy-safe protocols available.`,
    quote: 'Your spine is the highway. Our job is to make sure the traffic flows.',
    roleLabels: ['Lead Chiropractor (DC)', 'Chiropractor', 'Chiropractor'],
    teamBios: [
      ['DC, Palmer College. 12 years adjusting spines from LA to Bali.', ['Adjustment', 'Sciatica', 'Posture']],
      ['Activator Method specialist. Gentler approach for sensitive patients.', ['Activator', 'Gentle', 'Pregnancy-safe']],
      ['Sports chiropractor. Works with surfers and athletes for performance.', ['Sports', 'Performance', 'Athletes']]
    ],
    portfolio: ['Adjustment Table', 'Activator Tool', 'Decompression', 'Posture Analysis', 'X-Ray Lab', 'Treatment Room', 'Sports Chiro', 'Pregnancy Pillow'],
    portIcons: ['🦴', '⚡', '🌀', '📏', '🩺', '🛏️', '🏃', '🤰'],
    portTabs: ['All', 'Treatment', 'Equipment', 'Clinic']
  },
  yoga: {
    aboutTemplate: (p) => `${p.name} delivers private yoga sessions in your villa, garden or on the beach. RYT-200 and RYT-500 certified instructors, all trained in lineage-respectful traditions — from dynamic Vinyasa to grounding Yin to therapeutic Restorative.\n\nMats, blocks, bolsters and props all provided. Sessions are tailored to your level and goals, whether you're a beginner curious about your first downward dog or an advanced practitioner working toward arm balances.`,
    quote: 'A great yoga teacher doesn\'t lead the class. They follow your breath.',
    roleLabels: ['Lead Teacher (RYT-500)', 'Senior Teacher (RYT-200)', 'Teacher (RYT-200)', 'Specialty Teacher'],
    teamBios: [
      ['RYT-500, trained in India and Bali. Vinyasa and Yin master.', ['Vinyasa', 'Yin', 'Pranayama']],
      ['Sunrise specialist. Hatha and gentle flow for all levels.', ['Hatha', 'Gentle', 'Beginner-friendly']],
      ['Power yoga and athletic flow. For surfers and runners.', ['Power', 'Athletic', 'Strength']],
      ['Prenatal certified. Mom-to-be and postnatal recovery.', ['Prenatal', 'Postnatal', 'Restorative']]
    ],
    portfolio: ['Beach Session', 'Garden Practice', 'Villa Studio', 'Sunset Class', 'Group Class', 'Props & Mats', 'Acro Yoga', 'Meditation Space'],
    portIcons: ['🧘‍♀️', '🌿', '🏠', '🌅', '👥', '🪷', '🤸', '🧠'],
    portTabs: ['All Practices', 'Locations', 'Styles', 'Props & Setup']
  },
  pilates: {
    aboutTemplate: (p) => `${p.name} is a STOTT-certified Pilates studio bringing portable reformers and mat sessions to your home. The team has trained in classical and contemporary methods, with a focus on core control, posture, and injury rehabilitation.\n\nReformer sessions use a compact, professional-grade unit transported to your villa. Mat sessions need only enough floor space for two mats. Pre and postnatal certified.`,
    quote: 'Pilates is the conversation between mind and muscle. We just translate.',
    roleLabels: ['Lead Instructor (STOTT)', 'Senior Instructor', 'Instructor'],
    teamBios: [
      ['STOTT-certified. 10 years teaching reformer and mat.', ['Reformer', 'Core', 'STOTT']],
      ['Pre/postnatal specialist. Diastasis recovery expert.', ['Prenatal', 'Postnatal', 'Diastasis']],
      ['Athletic Pilates for runners and surfers.', ['Athletic', 'Posture', 'Strength']]
    ],
    portfolio: ['Reformer Setup', 'Mat Session', 'Core Work', 'Props', 'Posture Work', 'Pre-natal', 'Studio Space', 'Mobile Kit'],
    portIcons: ['🤍', '🧘', '💪', '🎯', '📏', '🤰', '🏠', '🧳'],
    portTabs: ['All', 'Reformer', 'Mat', 'Specialty']
  },
  meditation: {
    aboutTemplate: (p) => `${p.name} offers private guided meditation, breathwork and sound healing sessions in your home or villa. The team brings deep training — some have spent years in monasteries, others are Wim Hof-certified breathwork practitioners.\n\nWhether you're managing stress, struggling with sleep, looking to deepen a practice, or new to all of this, the team meets you where you are.`,
    quote: 'You don\'t find stillness. It finds you when you stop running.',
    roleLabels: ['Lead Teacher', 'Sound Healer', 'Breathwork Practitioner'],
    teamBios: [
      ['20 years of practice. Trained in Vipassana and mindfulness traditions.', ['Vipassana', 'Mindfulness', 'Sleep']],
      ['Sound bath specialist. Crystal bowls, gongs, tuning forks.', ['Sound bath', 'Crystal bowls', 'Gong']],
      ['Wim Hof-certified. Breathwork for energy and resilience.', ['Wim Hof', 'Breathwork', 'Energy']]
    ],
    portfolio: ['Singing Bowls', 'Gong Setup', 'Meditation Space', 'Breathwork', 'Crystal Bowls', 'Sound Bath', 'Guided Session', 'Outdoor Practice'],
    portIcons: ['🔔', '🪘', '🧘', '🌬️', '💎', '🎶', '🧠', '🌿'],
    portTabs: ['All', 'Sound Healing', 'Breathwork', 'Meditation']
  },
  pt: {
    aboutTemplate: (p) => `${p.name} is a mobile personal training collective. Certified trainers (NSCA, NASM) arrive at your villa with equipment, programming, and accountability. No gym membership, no commute — just consistent, expert-guided training in your own space.\n\nFirst session includes a full movement screen and goal-setting. Programs are progressive and adapted weekly. Nutrition guidance available as an add-on.`,
    quote: 'The hardest rep is opening the front door. We make that part easy.',
    roleLabels: ['Lead Trainer (NSCA)', 'Senior Trainer', 'Trainer', 'Specialty Coach'],
    teamBios: [
      ['NSCA-CPT. 12 years coaching strength and hypertrophy.', ['Strength', 'Powerlifting', 'Hypertrophy']],
      ['Boxing coach, former amateur fighter. Pads + conditioning.', ['Boxing', 'Cardio', 'Conditioning']],
      ['Pre/post natal specialist. Diastasis-safe programming.', ['Prenatal', 'Postnatal', 'Mom strong']],
      ['Surf-specific training. Mobility and explosive power for surfers.', ['Surf-specific', 'Mobility', 'Power']]
    ],
    portfolio: ['Strength Setup', 'Boxing Training', 'Mobility Tools', 'Resistance Bands', 'Outdoor Session', 'Villa Workout', 'Surf Training', 'Recovery Tools'],
    portIcons: ['🏋️', '🥊', '🌀', '💪', '🌅', '🏠', '🏄', '🧊'],
    portTabs: ['All', 'Equipment', 'Locations', 'Specialties']
  },
  hair: {
    aboutTemplate: (p) => `${p.name} is a mobile hair styling team for events, weddings and everyday glam. The lead stylist has worked weddings from Bali to Sydney and brings a full pro kit — curling wands, flat irons, professional products, the works.\n\nBridal trials available. Bridal party packages cover mom, bridesmaids, and any flower girls. Day-of styling can run 4–6 hours on-site.`,
    quote: 'Your wedding hair should last longer than the open bar.',
    roleLabels: ['Lead Stylist', 'Senior Stylist', 'Stylist', 'Bridal Specialist'],
    teamBios: [
      ['Bridal specialist. 300+ weddings and counting.', ['Bridal', 'Updo', 'Trial']],
      ['Blowout queen. 45-minute red carpet hair.', ['Blowout', 'Quick', 'Glam']],
      ['Braid artist. Cornrows, fishtails, Boho braids.', ['Braids', 'Cornrows', 'Boho']],
      ['Extensions specialist. Tape-in, K-tip, clip-in.', ['Extensions', 'Premium', 'Custom']]
    ],
    portfolio: ['Bridal Updo', 'Boho Waves', 'Sleek Blowout', 'Braided Crown', 'Hollywood Glam', 'Extensions', 'Mobile Kit', 'Event Styling'],
    portIcons: ['👰', '🌊', '💨', '🌾', '✨', '💫', '🧳', '💄'],
    portTabs: ['All Looks', 'Bridal', 'Event', 'Casual']
  },
  waxing: {
    aboutTemplate: (p) => `${p.name} offers professional waxing at your home with maximum discretion and hygiene. Hard wax for Brazilians and bikinis, sugar wax option for sensitive skin. Single-use applicators, fresh linens, full sanitization between clients.\n\nThe team is trained in fast, low-pain techniques. Most clients say it's less painful than the salon because they're more relaxed at home.`,
    quote: 'Bringing salon hygiene to your bathroom — same standards, none of the awkward chairs.',
    roleLabels: ['Lead Esthetician', 'Senior Esthetician', 'Esthetician'],
    teamBios: [
      ['Brazilian wax specialist. Fast, gentle, hard wax only.', ['Brazilian', 'Hard wax', 'Speed']],
      ['Sugar wax expert. Natural, sensitive-skin friendly.', ['Sugar', 'Natural', 'Sensitive']],
      ['Full body and face waxing. Detailed brow design.', ['Full body', 'Face', 'Brows']]
    ],
    portfolio: ['Hard Wax Kit', 'Sugar Wax', 'Hygiene Setup', 'Mobile Cart', 'Linens', 'Calming Oils', 'Bikini Care', 'Face Wax'],
    portIcons: ['🪷', '🌿', '🧴', '🧳', '🛏️', '✨', '💫', '👁️'],
    portTabs: ['All', 'Wax Types', 'Setup', 'Products']
  },
  nails: {
    aboutTemplate: (p) => `${p.name} is a mobile nail studio bringing salon-grade gel, acrylic, builder gel and nail art to your home. Every kit is sanitized between clients. UV/LED lamps, professional polishes, and a curated library of design references.\n\nNail art is a specialty — bring an inspiration photo or browse the lookbook with your technician. Custom designs and 3D work available.`,
    quote: 'Your nails should match your vibe — not the salon\'s mood board.',
    roleLabels: ['Lead Nail Artist', 'Senior Technician', 'Technician', 'Nail Art Specialist'],
    teamBios: [
      ['Gel specialist. Clean, classic, builder gel sets.', ['Gel', 'Classic', 'Builder']],
      ['Nail art expert. 3D designs, chrome, hand-painted.', ['Nail art', '3D', 'Hand-painted']],
      ['Acrylic extensions. Long, dramatic, sculpted shapes.', ['Acrylic', 'Long', 'Sculpted']],
      ['Pedicure specialist. Spa-style foot care.', ['Pedicure', 'Spa', 'Foot care']]
    ],
    portfolio: ['Chrome Set', 'French Tips', '3D Art', 'Pedi Suite', 'Builder Gel', 'Custom Design', 'Press-ons', 'Sculpted Acrylic'],
    portIcons: ['💅', '🌸', '✨', '🦶', '💎', '🎨', '💖', '🌺'],
    portTabs: ['All Sets', 'Nail Art', 'Classic', 'Pedicures']
  },
  lashes: {
    aboutTemplate: (p) => `${p.name} is a sterile mobile lash studio. The lead artist trained in Russia and brings Volume, Mega Volume and Hybrid sets to your home. Every lash is hand-isolated for a clean, lift-from-roots look that lasts 4–6 weeks.\n\nLash mapping consultations available — they'll match the set to your eye shape, lifestyle and existing lashes. Refills every 2–3 weeks.`,
    quote: 'Good lashes don\'t shout. They whisper "she\'s effortlessly stunning."',
    roleLabels: ['Lead Lash Artist', 'Senior Artist', 'Artist'],
    teamBios: [
      ['Russian Volume specialist. 8 years and 4,000+ sets.', ['Volume', 'Russian', 'Mapping']],
      ['Classic and hybrid expert. Natural, wispy looks.', ['Classic', 'Hybrid', 'Natural']],
      ['Lash lift and tint. Mascara-free everyday eyes.', ['Lift', 'Tint', 'Low-maintenance']]
    ],
    portfolio: ['Volume Set', 'Hybrid Look', 'Wispy Classics', 'Mega Volume', 'Lash Lift', 'Cat Eye', 'Doll Eye', 'Mapping'],
    portIcons: ['👁️', '🌸', '✨', '💫', '🌹', '😻', '💖', '📏'],
    portTabs: ['All Looks', 'Volume', 'Classic', 'Lifts']
  },
  brows: {
    aboutTemplate: (p) => `${p.name} shapes, tints, laminates and threads brows in your home. Every shape is custom-mapped to your face proportions — no cookie-cutter arches here.\n\nLamination lasts 6–8 weeks. Henna tint lasts 2–3 weeks. The team can also do microblading consultations (the procedure itself is studio-only).`,
    quote: 'Brows frame your face. Frame them right.',
    roleLabels: ['Lead Brow Artist', 'Senior Specialist', 'Specialist'],
    teamBios: [
      ['Lamination and tint specialist. 6 years shaping brows.', ['Lamination', 'Tint', 'Shape']],
      ['Threading expert. Precision, fast, low-pain.', ['Threading', 'Precision', 'Quick']],
      ['Henna brow specialist. Natural, long-lasting tint.', ['Henna', 'Natural', 'Long-lasting']]
    ],
    portfolio: ['Lamination', 'Henna Tint', 'Threading', 'Brow Map', 'Bold Brows', 'Natural Brows', 'Wax + Tint', 'Microblading'],
    portIcons: ['✨', '🌿', '🪡', '📏', '👁️', '🌸', '💫', '🖌️'],
    portTabs: ['All', 'Shaping', 'Tinting', 'Lamination']
  },
  makeup: {
    aboutTemplate: (p) => `${p.name} brings event-ready makeup to your villa or hotel. Full pro kits, HD-ready airbrush, and a library of looks from natural glow to full smoky drama. The lead artist works editorial and bridal across Bali.\n\nBridal trials available — book a separate session before your wedding to lock in the look. Makeup lessons offered as 1-on-1 sessions for clients who want to learn their own face.`,
    quote: 'Your face is the canvas. The makeup is just the conversation.',
    roleLabels: ['Lead MUA', 'Senior MUA', 'MUA', 'Bridal Specialist'],
    teamBios: [
      ['Bridal specialist. 200+ brides. Natural glow signature look.', ['Bridal', 'Natural glow', 'Long-wear']],
      ['Editorial and photoshoot work. HD airbrush specialist.', ['Editorial', 'HD', 'Airbrush']],
      ['Smoky eye expert. Night-out and event glam.', ['Smoky', 'Glam', 'Night out']],
      ['Makeup teacher. Patient, personalized 1-on-1 lessons.', ['Lessons', '1-on-1', 'Beginner']]
    ],
    portfolio: ['Bridal Glow', 'Smoky Glam', 'Editorial', 'Natural Look', 'Photo Ready', 'Airbrush', 'Pro Kit', 'Lesson Setup'],
    portIcons: ['💄', '🌙', '✨', '🌸', '📸', '💫', '🎨', '🎓'],
    portTabs: ['All Looks', 'Bridal', 'Event', 'Editorial']
  },
  facials: {
    aboutTemplate: (p) => `${p.name} is a skin therapy practice bringing facials, LED, microcurrent and hands-on treatments to your home. Every facial starts with a skin analysis, then a custom protocol — no one-size-fits-all menus.\n\nProducts used are cosmeceutical-grade (think Dermalogica, Image Skincare, SkinCeuticals). LED panel comes with every premium facial.`,
    quote: 'Great skin isn\'t a product. It\'s a relationship — with your skin and the person treating it.',
    roleLabels: ['Lead Esthetician (ITEC)', 'Senior Esthetician', 'Esthetician'],
    teamBios: [
      ['ITEC-certified. 10 years in facial therapy and skin analysis.', ['Anti-aging', 'LED', 'Cosmeceutical']],
      ['Acne specialist. Extractions, calming, clearing protocols.', ['Acne', 'Extractions', 'Calming']],
      ['Gua sha and lymphatic drainage. TCM-influenced sculpting.', ['Gua sha', 'Lymphatic', 'Sculpting']]
    ],
    portfolio: ['LED Therapy', 'Gua Sha Tools', 'Microderm', 'Steam Setup', 'Treatment Room', 'Pro Products', 'Mask Application', 'Mobile Kit'],
    portIcons: ['🧖', '🪷', '💧', '🌫️', '🛏️', '✨', '🎭', '🧳'],
    portTabs: ['All', 'Modalities', 'Tools', 'Products']
  },
  skincare: {
    aboutTemplate: (p) => `${p.name} is a skincare consultancy. The team analyzes your skin — texture, hydration, pigment, sensitivity — and builds a custom in-home routine. Chemical peels available for clients ready to level up.\n\nThis isn't a one-and-done facial. It's a relationship. Most clients book monthly check-ins to track progress.`,
    quote: 'Your skin tells the truth about how you treat yourself. Let\'s read it together.',
    roleLabels: ['Skin Analyst', 'Senior Consultant', 'Consultant'],
    teamBios: [
      ['10 years in skin consultation. AI-assisted analysis tools.', ['Analysis', 'Custom plan', 'Tracking']],
      ['Chemical peel specialist. Glycolic, lactic, TCA.', ['Peels', 'Glycolic', 'Renewal']],
      ['Routine designer. Cuts through marketing to what works.', ['Routine', 'Products', 'Honest advice']]
    ],
    portfolio: ['Skin Analysis', 'Chemical Peel', 'Pro Products', 'Routine Plan', 'Tracking Tool', 'pH Test', 'LED Add-on', 'Consult Setup'],
    portIcons: ['🌟', '💧', '🧴', '📋', '📊', '🔬', '✨', '🩺'],
    portTabs: ['All', 'Analysis', 'Treatments', 'Products']
  },
  tattoo: {
    aboutTemplate: (p) => `${p.name} is a tattoo studio with a roster of resident artists working in fine line, blackwork, traditional, and watercolor styles. Every piece is custom-designed in consultation with the client — no flash sheets stuck on the wall.\n\nFully sterile equipment, single-use needles, professional inks, and after-care kit included. Villa appointments available for larger pieces that need multiple sessions.`,
    quote: 'A tattoo is forever. So is the conversation you have with the person making it.',
    roleLabels: ['Resident Artist', 'Senior Artist', 'Guest Artist', 'Apprentice'],
    teamBios: [
      ['Fine line specialist. 8 years, delicate single-needle work.', ['Fine line', 'Single needle', 'Delicate']],
      ['Blackwork and tribal. Bold, geometric, sacred geometry.', ['Blackwork', 'Tribal', 'Geometric']],
      ['Sak Yant master. Traditional hand-poked Thai sacred tattoos.', ['Sak Yant', 'Traditional', 'Hand-poked']],
      ['Watercolor and color realism. Vibrant, painterly work.', ['Watercolor', 'Color', 'Realism']]
    ],
    portfolio: ['Fine Line Floral', 'Blackwork Sleeve', 'Sak Yant', 'Watercolor Piece', 'Lettering', 'Geometric', 'Studio Space', 'Custom Design'],
    portIcons: ['🌸', '🖤', '🐉', '🌈', '✒️', '⬡', '🏠', '🎨'],
    portTabs: ['All Work', 'Fine Line', 'Blackwork', 'Color']
  },
  piercing: {
    aboutTemplate: (p) => `${p.name} is an APP-certified piercing studio offering ear curation, body piercings and premium implant-grade jewelry. Every piercing uses a fresh, sterile needle (never a gun) and is done in a fully sanitized in-home setup.\n\nEar curation consultations are a specialty — the artist designs a constellation that suits your ear anatomy, not just trending arrangements.`,
    quote: 'A great piercing isn\'t just a hole. It\'s a placement decision that lasts decades.',
    roleLabels: ['Master Piercer (APP)', 'Senior Piercer', 'Piercer'],
    teamBios: [
      ['APP-certified. Ear curation specialist. 12 years of practice.', ['Ear curation', 'Cartilage', 'Premium']],
      ['Body piercing specialist. Septum, nipple, navel, daith.', ['Body', 'Septum', 'Daith']],
      ['Premium jewelry curator. 14k gold and titanium specialist.', ['14k gold', 'Titanium', 'Implant-grade']]
    ],
    portfolio: ['Ear Curation', '14k Jewelry', 'Sterile Setup', 'Cartilage Set', 'Body Piercing', 'Jewelry Library', 'Pro Tools', 'Aftercare Kit'],
    portIcons: ['💎', '💍', '🩺', '👂', '✨', '💫', '🔧', '🧴'],
    portTabs: ['All', 'Ear Work', 'Body', 'Jewelry']
  },
  bridal: {
    aboutTemplate: (p) => `${p.name} is a bridal-only collective. Hair, makeup, and full party prep for your wedding day — from intimate elopements to 200-guest events. The team has worked weddings across Bali, Lombok, and the Gilis.\n\nEvery bride gets a trial session 4–6 weeks before the wedding. Day-of, the team arrives early and stays through the ceremony to touch up between photos.`,
    quote: 'Your wedding day is one day. Looking back at the photos is forever.',
    roleLabels: ['Lead Bridal Artist', 'Senior MUA', 'Bridal Hair', 'Touch-up Artist'],
    teamBios: [
      ['500+ brides. Signature soft glow look. Trial-included pricing.', ['Bridal MUA', 'Soft glow', 'Long-wear']],
      ['Bridal hair specialist. Updos, half-ups, beach waves.', ['Bridal hair', 'Updo', 'Waves']],
      ['Bridesmaids and mother-of-the-bride specialist.', ['Bridal party', 'Mom MUA', 'Coordinated']],
      ['On-site touch-up artist. Stays through reception.', ['Touch-ups', 'Reception', 'All-day']]
    ],
    portfolio: ['Soft Glow Look', 'Beach Wedding', 'Updo Style', 'Trial Session', 'Bridal Party', 'Photo Ready', 'Pro Kit', 'Day-of Setup'],
    portIcons: ['👰', '🌊', '👑', '💋', '💐', '📸', '🎨', '🧳'],
    portTabs: ['All', 'Bridal Looks', 'Hair', 'Party']
  },
  chef: {
    aboutTemplate: (p) => `${p.name} brings restaurant-grade cooking to your villa kitchen. The chef arrives with ingredients sourced that morning from local markets — produce from Bedugul, seafood from Jimbaran, organic herbs from Ubud farms. No grocery runs, no menu planning, no dishes for you to do.\n\nMenus are confirmed 48 hours ahead. Dietary restrictions, allergies, and preferences accommodated. The team handles their own prep, service, and clean-up — you just sit down and eat.`,
    quote: 'A great meal isn\'t cooked in a restaurant. It\'s plated where the people you love are sitting.',
    roleLabels: ['Head Chef', 'Sous Chef', 'Pastry Chef', 'Service Lead'],
    teamBios: [
      ['12 years across Michelin-starred kitchens in Milan and Sydney. Italian and Mediterranean.', ['Italian', 'Pasta-from-scratch', 'Wine pairing']],
      ['Specializes in Asian fusion and tasting menus. Former Locavore (Ubud) chef de partie.', ['Asian fusion', 'Tasting menu', 'Plating']],
      ['Paris-trained pastry chef. Wedding cakes and dessert courses.', ['Pastry', 'Desserts', 'Cakes']],
      ['Front-of-house lead. Wine, service, and event flow.', ['Service', 'Wine', 'Hosting']]
    ],
    portfolio: ['4-Course Tasting', 'BBQ Spread', 'Rijsttafel', 'Romantic Dinner', 'Pasta Course', 'Dessert Plating', 'Pool Party BBQ', 'Meal Prep Boxes'],
    portIcons: ['🍽️', '🔥', '🍛', '🕯️', '🍝', '🥐', '🍖', '🥡'],
    portTabs: ['All', 'Dinners', 'Events', 'Meal Prep']
  },
  cleaning: {
    aboutTemplate: (p) => `${p.name} is a professional home-cleaning service. Every cleaner is vetted, trained on consistent protocols, and uniformed. They bring their own supplies — eco-friendly options available — and follow a room-by-room checklist so nothing gets missed.\n\nBook one-off cleans, recurring weekly slots, or villa turnovers between Airbnb guests. Insured and bondable. The team can also handle laundry, ironing, and post-party cleanup.`,
    quote: 'A clean home isn\'t about perfection. It\'s about coming home and feeling like the day got easier.',
    roleLabels: ['Team Lead', 'Senior Cleaner', 'Cleaner', 'Laundry Specialist'],
    teamBios: [
      ['6 years and 800+ cleans. Manages crew of 4. Detail-obsessed.', ['Standard clean', 'Deep clean', 'Trained']],
      ['Move-in/out and deep-clean specialist. Handles tough kitchens.', ['Deep clean', 'Move-out', 'Kitchen']],
      ['Eco-products only. Great for villas with kids and pets.', ['Eco', 'Non-toxic', 'Family-safe']],
      ['Laundry, ironing, and folding. Pickup and same-day delivery.', ['Laundry', 'Ironing', 'Pickup']]
    ],
    portfolio: ['Living Spaces', 'Kitchen Deep', 'Bathroom Refresh', 'Bedroom Reset', 'Eco Products', 'Villa Turnover', 'Laundry Service', 'Post-Event'],
    portIcons: ['🛋️', '🍽️', '🛁', '🛏️', '🌿', '🏠', '👕', '🎉'],
    portTabs: ['All', 'Spaces', 'Products', 'Specialty']
  },
  language: {
    aboutTemplate: (p) => `${p.name} offers private language lessons in your home, at a café, or online. Lessons are tailored to your goals — whether you're prepping for IELTS/JLPT/HSK, learning enough Bahasa to chat with your villa staff, or finally cracking the basics of a language you've always wanted to speak.\n\nEvery first lesson starts with a level assessment and conversation about your goals. Lesson plans are then built around what you actually want to use the language for — travel, work, romance, or just for fun.`,
    quote: 'Learning a language isn\'t about grammar drills. It\'s about finding the courage to make beautiful mistakes.',
    roleLabels: ['Lead Tutor', 'Senior Tutor', 'Tutor', 'Cultural Coach'],
    teamBios: [
      ['Linguistics MA. 15 years teaching Bahasa to expats. Patient and structured.', ['Bahasa', 'Beginner-friendly', 'Conversation']],
      ['HSK examiner. Mandarin tutor for business and HSK exam prep.', ['Mandarin', 'HSK prep', 'Business']],
      ['Native Japanese speaker, certified JLPT examiner. Cultural depth.', ['Japanese', 'JLPT', 'Cultural']],
      ['IELTS specialist. 90%+ pass rate with target band scores.', ['IELTS', 'TOEFL', 'Academic']]
    ],
    portfolio: ['Lesson Setup', 'Workbook Series', 'Conversation Café', 'Exam Prep', 'Kids Class', 'Group Session', 'Online Option', 'Cultural Immersion'],
    portIcons: ['📚', '📖', '☕', '📝', '🧒', '👥', '💻', '🌏'],
    portTabs: ['All', 'Methods', 'Materials', 'Specialty']
  },
  music: {
    aboutTemplate: (p) => `${p.name} brings music lessons to your living room. The instructor arrives with their own instrument (and often a backup so you can try before you buy one). Lessons are personalized — whether you want to learn one song for your wedding, prep for grade exams, or finally master an instrument you've owned for years.\n\nFor beginners, the focus is on having fun and seeing fast progress. For intermediate and advanced players, technique refinement and repertoire building.`,
    quote: 'The right teacher doesn\'t teach you music. They reveal it was already in you.',
    roleLabels: ['Lead Instructor', 'Senior Instructor', 'Instructor'],
    teamBios: [
      ['Berklee College of Music alumni. 20 years teaching guitar across styles.', ['Guitar', 'Theory', 'All levels']],
      ['ABRSM examiner. Classical and jazz piano specialist.', ['Piano', 'Classical', 'Jazz']],
      ['Royal Conservatoire vocal coach. Pop, jazz, classical, performance prep.', ['Voice', 'Performance', 'Coaching']]
    ],
    portfolio: ['Lesson Studio', 'Pro Instruments', 'Sheet Music', 'Group Class', 'Recital Setup', 'Production Setup', 'Theory Whiteboard', 'Online Option'],
    portIcons: ['🎸', '🎹', '📜', '👥', '🎤', '🎧', '🎼', '💻'],
    portTabs: ['All', 'Instruments', 'Methods', 'Performance']
  },
  ivdrip: {
    aboutTemplate: (p) => `${p.name} is a doctor-supervised IV therapy service. A licensed nurse arrives at your villa, performs a brief intake (pulse, blood pressure, allergy check), and administers the drip in the comfort of your own space. Sessions take 45–60 minutes — most people scroll their phone or nap.\n\nAll medications and vitamins are sourced from licensed pharmaceutical suppliers. A doctor is on-call for every appointment. Common drips treat hangovers, dehydration, low energy, immunity, beauty (glutathione), and athletic recovery.`,
    quote: 'Wellness isn\'t a supplement. It\'s what happens when your body has what it actually needs.',
    roleLabels: ['Medical Director (MD)', 'Lead Nurse (RN)', 'Senior Nurse (RN)', 'Aesthetic Nurse'],
    teamBios: [
      ['MD, 12 years internal medicine. Reviews every protocol and is on-call.', ['MD-supervised', 'Internal med', 'On-call']],
      ['Registered nurse with IV expertise. 8 years administering drips.', ['IV expert', 'RN certified', 'Gentle']],
      ['Sports medicine nurse. Specializes in athletic recovery drips.', ['Sports', 'Recovery', 'Athletes']],
      ['Aesthetic nurse, beauty drip specialist (glutathione, vitamin C).', ['Beauty', 'Glutathione', 'Aesthetic']]
    ],
    portfolio: ['Sterile Setup', 'Vitamin Library', 'Drip Stand', 'Hangover Kit', 'Beauty Drip', 'Athletic Recovery', 'NAD+ Setup', 'Pre-screening'],
    portIcons: ['💉', '💊', '🩺', '🍻', '✨', '💪', '🧬', '📋'],
    portTabs: ['All', 'Drip Types', 'Equipment', 'Protocols']
  },
  ac: {
    aboutTemplate: (p) => `${p.name} services and repairs all major AC brands. Standard service includes coil cleaning, filter wash, gas check, drain flush, and a full performance test. Most AC issues in Bali come from humidity and dust — regular service every 3-4 months keeps your unit running properly and extends its life.\n\nThe team also handles diagnostics, gas refills (R-32, R-410A), repairs, and new installations. Same-day service available for most jobs.`,
    quote: 'A working AC in Bali is the difference between a great day and a miserable one. We take that seriously.',
    roleLabels: ['Lead Technician', 'Senior Technician', 'Technician', 'Installation Lead'],
    teamBios: [
      ['10 years servicing ACs across Bali. Daikin-certified technician.', ['Daikin', 'Service', 'Diagnosis']],
      ['Specializes in gas refills and complex repairs. Quick diagnosis.', ['Gas refill', 'Repair', 'All brands']],
      ['Same-day callout specialist. Most common issues fixed in one visit.', ['Same-day', 'Quick fix', 'Mobile']],
      ['New installations and villa fit-outs. Mounting and pipework expert.', ['Install', 'Villa', 'Mounting']]
    ],
    portfolio: ['Service Cleaning', 'Gas Refill', 'Repair Job', 'New Install', 'Villa Setup', 'Diagnostic Tools', 'Mobile Kit', 'Filter Wash'],
    portIcons: ['❄️', '🌬️', '🔧', '🏠', '🛠️', '🩺', '🧳', '💧'],
    portTabs: ['All', 'Services', 'Equipment', 'Installs']
  },
  electrical: {
    aboutTemplate: (p) => `${p.name} is a licensed master electrician practice serving villas, businesses, and homes across Bali. From flickering lights and faulty sockets to full villa rewires and smart-home installs — the team is qualified to handle it safely and to code.\n\nEvery job starts with a free quote. Emergency callouts available 24/7 for power outages and electrical hazards. Insured for residential and commercial work.`,
    quote: 'Good electrical work is invisible. You never think about it — because it just works, safely.',
    roleLabels: ['Master Electrician', 'Senior Electrician', 'Electrician', 'Smart-Home Specialist'],
    teamBios: [
      ['Licensed master electrician. 18 years. Handles complex residential and commercial.', ['Master', 'Wiring', 'Inspection']],
      ['LED and lighting design specialist. Plans and installs villa lighting schemes.', ['Lighting', 'LED', 'Design']],
      ['Emergency callout specialist. Fast diagnosis and safe repairs.', ['Emergency', 'Diagnosis', '24/7']],
      ['Smart-home installer. Hue, Sonos, Google Home, custom automation.', ['Smart home', 'Automation', 'Tech']]
    ],
    portfolio: ['Wiring Work', 'LED Install', 'Safety Inspection', 'Smart Home', 'Tools', 'Emergency Call', 'Generator Setup', 'Compliance Report'],
    portIcons: ['🔌', '💡', '🛡️', '🏡', '🛠️', '🚨', '⚡', '📋'],
    portTabs: ['All', 'Services', 'Specialty', 'Equipment']
  },
  plumbing: {
    aboutTemplate: (p) => `${p.name} handles everything from a dripping tap to a full villa repipe. The team is licensed, insured, and equipped with modern leak-detection tools so problems can be found without ripping up tiles unnecessarily.\n\nCommon Bali plumbing calls: hard-water buildup in showers, blocked drains, leaking pipes from tree root intrusion, water heater issues, and pool plumbing. Most jobs quoted upfront with no surprise fees.`,
    quote: 'A small leak today is a flooded floor tomorrow. We\'d rather fix it before the drama.',
    roleLabels: ['Master Plumber', 'Senior Plumber', 'Plumber', 'Specialist'],
    teamBios: [
      ['Licensed master plumber. 15 years. Handles repairs to full villa repipes.', ['Master', 'Repipes', 'Installation']],
      ['Leak detection specialist. Uses thermal and acoustic tools — no digging.', ['Leak detection', 'Non-invasive', 'Tech']],
      ['Water heater specialist. Solar, tankless, traditional. Install and repair.', ['Water heater', 'Solar', 'Tankless']],
      ['Pool plumbing expert. Filters, pumps, plumbing redesign.', ['Pool', 'Filters', 'Pumps']]
    ],
    portfolio: ['Leak Repair', 'Drain Clear', 'Water Heater', 'Pool Plumbing', 'New Install', 'Detection Tools', 'Mobile Kit', 'Emergency Call'],
    portIcons: ['🔧', '🚿', '🚰', '🏊', '🛠️', '🩺', '🧳', '🚨'],
    portTabs: ['All', 'Repairs', 'Installs', 'Specialty']
  },
  photo: {
    aboutTemplate: (p) => `${p.name} is a photography studio capturing weddings, portraits, families and brand work across Bali. Every shoot starts with a planning call — to understand the vibe you want, the locations that work, and the must-have moments.\n\nFull-resolution edits delivered in 7-10 days. Same-day previews available on request. The team brings their own pro Canon/Sony gear, lighting kit, and back-up equipment for every shoot.`,
    quote: 'A great photo isn\'t about the camera. It\'s about being there at the exact moment when the light and the moment align.',
    roleLabels: ['Lead Photographer', 'Senior Photographer', 'Second Shooter', 'Editor'],
    teamBios: [
      ['Lead shooter. 10 years across weddings and editorial. Sony A7R V.', ['Weddings', 'Editorial', 'Sony pro']],
      ['Portrait and family specialist. Natural light, candid moments.', ['Portrait', 'Family', 'Natural light']],
      ['Second shooter and assistant. Covers angles you don\'t see.', ['Second angle', 'Detail shots', 'Backup']],
      ['Post-production editor. Handles colour grading and retouching.', ['Editing', 'Colour grade', 'Retouch']]
    ],
    portfolio: ['Wedding Day', 'Portrait Session', 'Sunset Couple', 'Family Shoot', 'Newborn', 'Branding', 'Product', 'Behind Scenes'],
    portIcons: ['💒', '📸', '🌅', '👨‍👩‍👧', '👶', '💼', '📦', '🎬'],
    portTabs: ['All Work', 'Weddings', 'Portraits', 'Commercial']
  },
  video: {
    aboutTemplate: (p) => `${p.name} produces cinematic films for weddings, brands and events. The team shoots on professional cinema cameras (Sony FX3, Blackmagic Pocket 6K) with proper lighting, gimbals, and licensed drones for aerial coverage.\n\nFinal edits delivered 3–6 weeks after the shoot. Same-day highlight reel available for weddings — perfect for the reception screen.`,
    quote: 'A wedding photo freezes a moment. A film makes you live it again.',
    roleLabels: ['Lead Cinematographer', 'Senior Videographer', 'Drone Operator', 'Editor'],
    teamBios: [
      ['Cinematic storyteller. 8 years shooting weddings and brand films.', ['Cinematic', 'Wedding', 'Story']],
      ['Documentary-style coverage. Captures real emotion, not staged shots.', ['Documentary', 'Candid', 'Story-driven']],
      ['Licensed drone operator. Mavic 3 Pro. Aerial and establishing shots.', ['Drone', 'Aerial', 'Licensed']],
      ['Post-production editor. Colour grade, sound design, final delivery.', ['Editing', 'Colour', 'Sound']]
    ],
    portfolio: ['Wedding Film', 'Same-Day Edit', 'Drone Footage', 'Brand Film', 'Reels', 'Setup Kit', 'Color Grade', 'Behind Scenes'],
    portIcons: ['💒', '⚡', '🚁', '💼', '🎞️', '🎥', '🎨', '🎬'],
    portTabs: ['All Work', 'Weddings', 'Brand', 'Aerial']
  },
  florist: {
    aboutTemplate: (p) => `${p.name} designs floral arrangements for every occasion. From a single signature bouquet to full wedding installations, the team works with locally-sourced flowers — frangipani, orchids, ginger, tropical foliage — alongside imported roses and peonies for clients who want a specific look.\n\nSame-day bouquets available before 11am. Wedding florals booked at least 2 months ahead. Free design consultation included for events over Rp 5M.`,
    quote: 'Flowers don\'t just decorate a room. They change the temperature of it.',
    roleLabels: ['Lead Florist', 'Senior Florist', 'Florist', 'Installation Crew'],
    teamBios: [
      ['Lead designer. 12 years and 150+ weddings. Trained in London.', ['Wedding', 'Design', 'Lead']],
      ['Bouquet specialist. Handles daily orders and subscriptions.', ['Bouquets', 'Daily', 'Subscription']],
      ['Tropical flowers specialist. Frangipani, orchid, hibiscus expert.', ['Tropical', 'Local', 'Seasonal']],
      ['Event install crew. Handles arches, ceiling installs, large setups.', ['Install', 'Arches', 'Large events']]
    ],
    portfolio: ['Bridal Bouquet', 'Wedding Arch', 'Bouquet Delivery', 'Event Install', 'Ceiling Florals', 'Subscription Box', 'Centerpieces', 'Studio'],
    portIcons: ['💐', '⛩️', '🌹', '🎉', '✨', '📦', '🌷', '🏠'],
    portTabs: ['All Work', 'Weddings', 'Events', 'Daily']
  },
  cakes: {
    aboutTemplate: (p) => `${p.name} is a pastry studio crafting custom cakes for birthdays, weddings, and celebrations. Every cake is made-to-order — no off-the-shelf inventory. Send a reference photo or describe the vibe, and the team designs to match.\n\nBirthday cakes need 48 hours lead time. Wedding cakes book 1+ week out. Vegan and gluten-free options available. Free tasting session for wedding cakes over Rp 2.5M.`,
    quote: 'Every cake is a sculpture you eat. We take that responsibility seriously.',
    roleLabels: ['Head Pastry Chef', 'Senior Baker', 'Decorator', 'Apprentice'],
    teamBios: [
      ['Paris-trained pastry chef. 15 years across luxury hotels and weddings.', ['Pastry', 'Wedding cakes', 'Custom']],
      ['Birthday cake specialist. Custom themes and character cakes.', ['Birthday', 'Custom', 'Themed']],
      ['Sugar decorator. Hand-piped florals, edible art, fondant work.', ['Decorating', 'Florals', 'Fondant']],
      ['Vegan and GF specialist. Plant-based and allergen-free recipes.', ['Vegan', 'Gluten-free', 'Allergen-free']]
    ],
    portfolio: ['Birthday Cake', 'Wedding Tier', 'Custom Design', 'Cupcakes', 'Dessert Table', 'Sugar Art', 'Vegan Option', 'Kids Theme'],
    portIcons: ['🎂', '💍', '✨', '🧁', '🍰', '🌸', '🌿', '🎈'],
    portTabs: ['All', 'Birthday', 'Wedding', 'Custom']
  },
  entertainment: {
    aboutTemplate: (p) => `${p.name} brings the show to your event. Whether it's a kids party that needs a magician, a wedding reception that needs a DJ, or a corporate event that needs fire dancers — the team books, briefs, and delivers performances tailored to your vibe and crowd.\n\nEvery performer is vetted, insured, and has performed at 50+ events. Equipment provided (sound, lighting, props) where relevant.`,
    quote: 'Great entertainment turns a gathering into a story people tell for years.',
    roleLabels: ['Lead Performer', 'Senior Entertainer', 'Performer', 'Crew'],
    teamBios: [
      ['Pro magician. 10 years on cruise ships and corporate events.', ['Magic', 'Close-up', 'Stage']],
      ['Kids party specialist. Clown, games, balloon art, face painting.', ['Kids', 'Games', 'Balloons']],
      ['Fire performer. Poi, fans, staff. Hawaiian-trained.', ['Fire', 'Poi', 'Spectacle']],
      ['Event DJ. Wedding, party, corporate. Full sound + lighting kit.', ['DJ', 'Wedding', 'Sound kit']]
    ],
    portfolio: ['Magic Show', 'Fire Dancers', 'Face Paint', 'Clown Show', 'Live DJ', 'Acrobats', 'Balloon Art', 'Live Band'],
    portIcons: ['🎩', '🔥', '🎨', '🤡', '🎧', '🤸', '🎈', '🎸'],
    portTabs: ['All', 'Kids Parties', 'Adult Events', 'Spectacle']
  },
  decorator: {
    aboutTemplate: (p) => `${p.name} transforms any space for any occasion. From a beach proposal setup with rose petals and candles to a fully-themed birthday party with balloons, backdrops, and table styling — the team handles design, setup, and breakdown so you just show up to the moment.\n\nProposal packages are a specialty. Other popular setups: baby showers, milestone birthdays, anniversaries, gender reveals, and romantic dinners.`,
    quote: 'The right setup isn\'t about how it looks. It\'s about how it makes the moment feel.',
    roleLabels: ['Lead Designer', 'Setup Lead', 'Stylist', 'Setup Crew'],
    teamBios: [
      ['Lead designer. Proposal and romantic setup specialist. 200+ yeses.', ['Proposals', 'Romantic', 'Beach']],
      ['Birthday and event setup specialist. Themed installs.', ['Birthday', 'Themed', 'Custom']],
      ['Baby shower and pastel-themed event specialist.', ['Baby shower', 'Pastel', 'Gender reveal']],
      ['Setup crew. Handles delivery, install, and breakdown.', ['Install', 'Delivery', 'Breakdown']]
    ],
    portfolio: ['Proposal Setup', 'Birthday Decor', 'Picnic Setup', 'Baby Shower', 'Anniversary', 'Themed Party', 'Romantic Dinner', 'Breakdown'],
    portIcons: ['💍', '🎉', '🧺', '👶', '❤️', '🎭', '🕯️', '🚚'],
    portTabs: ['All', 'Romantic', 'Parties', 'Specialty']
  }
};
