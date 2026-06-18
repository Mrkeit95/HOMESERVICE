// Terms of Service and Privacy Policy content for Doora.
// NOTE: This is a sensible starting draft for a home-services marketplace
// operating in Indonesia — it should be reviewed by qualified legal counsel
// before launch. Edit the BRAND name / contact details in src/config/brand.ts.

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const TERMS: LegalDoc = {
  title: 'Terms of Service',
  updated: 'Last updated: June 2026',
  intro:
    'These Terms govern your use of the Doora platform, which connects customers with independent home-service providers. By creating an account or booking a service, you agree to these Terms.',
  sections: [
    {
      heading: '1. The platform',
      body: [
        'Doora is a marketplace that lets customers discover, book, and pay independent service providers ("Providers") who deliver services at a location of the customer\'s choosing.',
        'Doora is not the provider of the services. Providers are independent businesses or individuals responsible for the services they deliver. Doora facilitates discovery, booking, communication, and payment.',
      ],
    },
    {
      heading: '2. Accounts',
      body: [
        'You must be at least 18 years old and provide accurate information to create an account. You are responsible for activity under your account and for keeping your credentials secure.',
        'Customer and Business (Provider) accounts have different features and obligations. Provider accounts are subject to additional onboarding, verification, and the Provider Agreement.',
      ],
    },
    {
      heading: '3. Bookings & payments',
      body: [
        'When you book a service, you enter into a contract directly with the Provider. Prices, durations, and inclusions are set by the Provider and shown before you confirm.',
        'Payments are processed through the Doora Wallet or a connected payment method. Doora charges Providers a service commission. Bonus credits, wallet top-ups, and promotions are subject to their own terms.',
        'Cancellation and refund eligibility depend on the timing of the cancellation and your membership tier. Free cancellation windows are shown at booking.',
      ],
    },
    {
      heading: '4. Messaging',
      body: [
        'In-app messaging becomes available once you have an active booking with a Provider and is intended to coordinate that booking. When a booking is completed, the conversation is closed.',
        'Do not use messaging to share off-platform contact details to avoid fees, to harass, or to send unlawful content. We may review messages for safety and policy enforcement.',
      ],
    },
    {
      heading: '5. Reviews',
      body: [
        'After a completed booking you may leave a rating and review. Reviews must be honest, based on a genuine experience, and free of unlawful or abusive content. We may remove reviews that violate these rules.',
      ],
    },
    {
      heading: '6. Conduct & safety',
      body: [
        'You agree to treat Providers and other users with respect, to provide a safe environment for services delivered at your location, and to comply with applicable law.',
        'Prohibited: harassment, discrimination, fraud, requesting services outside a Provider\'s stated offerings, and any illegal activity. We may suspend accounts that breach these Terms.',
      ],
    },
    {
      heading: '7. Liability',
      body: [
        'To the maximum extent permitted by law, Doora is not liable for the acts or omissions of Providers or customers, or for indirect or consequential losses arising from the services.',
        'Nothing in these Terms excludes liability that cannot be excluded under applicable law.',
      ],
    },
    {
      heading: '8. Changes & contact',
      body: [
        'We may update these Terms; material changes will be notified in-app. Continued use after changes means you accept the updated Terms.',
        'Questions about these Terms: legal@doora.app.',
      ],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  title: 'Privacy Policy',
  updated: 'Last updated: June 2026',
  intro:
    'This Policy explains what personal data Doora collects, how we use it, and the choices you have. We aim to handle your data transparently and in line with applicable Indonesian data-protection law.',
  sections: [
    {
      heading: '1. Data we collect',
      body: [
        'Account data: name, email, phone, profile photo, date of birth, and preferences.',
        'Booking data: services booked, location/address for delivery, schedule, and payment records (we do not store full card numbers).',
        'Usage data: device, app interactions, and approximate location (to show nearby Providers) where you grant permission.',
        'Communications: in-app messages and support requests.',
      ],
    },
    {
      heading: '2. How we use data',
      body: [
        'To operate the marketplace: matching you with Providers, processing bookings and payments, and enabling messaging for active bookings.',
        'To keep the platform safe: verifying accounts, preventing fraud, and enforcing our Terms.',
        'To improve and personalise the service, and — with your consent — to send promotions and deals you can opt out of at any time.',
      ],
    },
    {
      heading: '3. Sharing',
      body: [
        'With Providers: the details needed to deliver your booking (e.g., name, address, booking notes).',
        'With service partners: payment processors, hosting, analytics, and communications providers acting on our instructions.',
        'For legal reasons: where required by law or to protect rights and safety. We do not sell your personal data.',
      ],
    },
    {
      heading: '4. Location & permissions',
      body: [
        'Location is used to show nearby Providers and estimate travel. You can disable location permission in your device settings; some features may then be limited.',
      ],
    },
    {
      heading: '5. Retention & security',
      body: [
        'We keep personal data only as long as needed for the purposes above or as required by law, then delete or anonymise it.',
        'We use technical and organisational measures to protect your data. No system is perfectly secure, so we also rely on you to protect your account.',
      ],
    },
    {
      heading: '6. Your rights',
      body: [
        'Subject to applicable law, you may access, correct, export, or delete your personal data, and object to or restrict certain processing. Manage core preferences under Account → Privacy & Data, or contact us.',
      ],
    },
    {
      heading: '7. Contact',
      body: ['Privacy questions or requests: privacy@doora.app.'],
    },
  ],
};

export const LEGAL_DOCS: Record<string, LegalDoc> = { terms: TERMS, privacy: PRIVACY };
