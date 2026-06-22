# Doora — Legal & Regulatory Questions for Indonesia (Bali) Launch

> **Not legal advice.** This is a preparation checklist to bring to a qualified
> Indonesian lawyer/notary. Bring this whole document. Indonesian rules change
> often and depend heavily on whether you (the founder) are an Indonesian
> citizen or a foreigner — answer that first, because it changes almost
> everything below.

---

## 0. The single most important question
**"Am I a foreigner for the purposes of this business, and what does that change?"**
- If you're foreign: most paths require a **PT PMA** (foreign-owned company) with
  minimum capital/investment commitments. Ask about the exact current numbers.
- If Indonesian: a local **PT** is far cheaper/simpler.
- Ask specifically: *can a foreigner legally own/operate an online services
  marketplace in Indonesia, and at what ownership %?*

---

## 🚩 HIGHEST-RISK AREAS — ask these first
These can each independently block or reshape the business:

1. **The in-app wallet (top-ups / stored balance).** Holding customers' money as
   a balance can count as **electronic money (uang elektronik)** or a stored-value
   service regulated by **Bank Indonesia**. This may require a license or force me
   to route all funds through a licensed e-money issuer / payment gateway and
   never hold the float myself. *Do I need a BI license, or must I use a licensed
   partner? Can I legally hold customer balances at all?*
2. **Medical / quasi-medical services.** The app lists **IV drips, physiotherapy,
   and "health & recovery."** These may legally count as **medical practice**,
   requiring licensed practitioners (STR/SIP), a clinic permit, and Ministry of
   Health compliance. *Can these be offered through a platform at all? What
   licensing do the providers and I need? Should I remove these categories for
   launch?*
3. **Massage / spa / wellness.** This category is sensitive in Indonesia
   (regulated for health/tourism, and policed for links to prostitution).
   *What permits do massage providers need? What's my liability and exposure?*
4. **Electronic System Operator (PSE) registration with Kominfo/Komdigi.** Apps/
   platforms generally **must** register as a PSE. *Is registration mandatory for
   me, what's the process, and what are penalties for operating unregistered?*
5. **Foreign ownership / Positive Investment List (Perpres 10/2021).** *Is this
   exact business sector (per its KBLI codes) open to foreign investment, and up
   to what percentage?*

---

## 1. Company formation & structure
- Do I need a company to operate legally, or can I start as a sole individual?
- PT vs PT PMA vs CV vs representative office — which fits, and why?
- For a PT PMA: current **minimum paid-up and minimum investment** requirements?
- Which **KBLI business classification codes** apply (the app platform itself +
  the service activities it facilitates)? Am I classified as a marketplace,
  an app developer, a labor-supply business, or something else?
- **NIB (business ID) via OSS** — what licenses cascade from my KBLI codes?
- Are **nominee shareholder arrangements** (a local holding shares "for" a
  foreigner) legal? What are the risks? (I've heard they're risky/unenforceable.)
- What's the realistic **timeline and cost** to get fully set up?
- Where should the entity sit if I want **foreign investors** later (e.g. a
  Singapore holdco over an Indonesian PT PMA)? How does that affect everything?

## 2. Licensing & permits (platform + categories)
- Beyond NIB and PSE registration, what operating licenses do I need?
- Do **each service category** need its own permits/certifications, and is that
  the provider's responsibility or mine? Specifically:
  - Massage / spa / beauty / nails (health & hygiene permits)
  - Tattoo (health regulations)
  - Private chef / food (food-safety / BPOM / hygiene)
  - IV drips / physio / health (medical licensing — see red flags)
  - Home repairs: electrical / plumbing (trade certification)
- Am I legally responsible if a provider operates without their required permit?

## 3. Provider classification (the gig-economy core)
- Are providers **employees** or **independent partners (mitra)**? What's the
  legal basis to treat them as partners (like Gojek/Grab)?
- What does the **Manpower Law / Omnibus Law** require of me toward them?
- Do I owe providers **BPJS (health + employment social security)**, minimum
  wage, or benefits — or do they cover their own?
- **Solo freelancers / individuals:** do they need to register as a business,
  hold an **NPWP (tax ID)**, or get any license before earning on my platform?
- What must my **provider agreement** contain to be enforceable and to keep them
  classified as partners, not employees?
- Can I require **exclusivity**, set prices, or take commission without
  accidentally making them employees?

## 4. Payments, wallet & fintech (see red flag #1)
- Can I legally process payments, and must I use a **licensed payment gateway**
  (Midtrans / Xendit / DOKU)?
- The **wallet/top-up balance** — does this require an e-money license, an escrow
  arrangement, or a licensed partner? Can I hold the float at all?
- Is taking a **commission** from each booking regulated? Any cap?
- **Refunds, chargebacks, failed services, disputes** — what's legally required?
- **Promo credits, referral bonuses, "boost" ad purchases** — any regulatory
  issues with issuing credit or selling promotional placement?
- **AML / KYC** obligations given I move money and hold balances?
- **Settlement & payouts to providers** — tax withholding, timing, FX rules?

## 5. Tax
- What taxes apply: **corporate income tax, VAT (PPN ~11–12%)**, local taxes?
- Does my platform have to **collect/remit VAT** on the services booked, or only
  on my commission? Am I a "VAT collector" for the marketplace?
- **Withholding tax** on payouts to providers — my obligation?
- VAT on **digital/electronic services**?
- Provider tax obligations — do I have to report their earnings to the tax
  office? Issue any tax documents?
- If I use a **foreign holding company**, transfer-pricing / repatriation of
  profit rules?

## 6. Data protection & privacy
- What does Indonesia's **Personal Data Protection Law (UU 27/2022)** require —
  consent, breach notification, a Data Protection Officer, retention limits?
- Are there **data localization** rules forcing me to store certain data (or run
  servers) in Indonesia? (Relevant: I currently use Supabase/Vercel abroad.)
- What must my **Privacy Policy and Terms of Service** contain to be valid and
  enforceable here? Should they be in **Bahasa Indonesia** (is bilingual
  required)?
- Rules around storing customer **payment data, ID documents, and provider KYC**?

## 7. Provider vetting, background checks & safety
- Can I legally run **background checks** on providers? Is the police certificate
  (**SKCK**) the right instrument, and can I require it?
- What's my **liability if I vet negligently** and a provider harms a customer?
- For **in-home services** specifically (provider enters a customer's home, or a
  customer is alone with a provider) — what safety/liability duties do I have?
- Any rules on **ID verification / KYC** for providers?

## 8. Insurance & liability
- Do I need **insurance**, and which kinds: public liability, professional
  indemnity, in-home service coverage?
- If a provider **injures a customer, damages property, or steals** during a
  booking — who's liable: the provider, me, or both? How do I limit my exposure?
- If a **customer harms a provider** — my exposure?
- Can I offer customers/providers **insurance/protection** through the app (like
  Grab/Gojek do), and what's required to do that?
- How do I structure **Terms of Service to disclaim liability** as a "facilitator
  / marketplace" rather than the service provider — and does that disclaimer
  actually hold up in Indonesian courts?

## 9. Consumer protection
- What does the **Consumer Protection Law (UU 8/1999)** require of a marketplace?
- Mandatory disclosures, pricing transparency, cancellation/refund rights?
- Required **dispute-resolution** mechanism between customers and providers?
- Am I liable for the **quality/outcome** of services I merely connect people to?

## 10. Intellectual property & brand
- How do I **trademark the brand name** ("Doora" or final name) in Indonesia
  (DJKI), and should I clear it for conflicts first?
- Any naming/branding restrictions? Do I need the **.id domain** or local
  presence?

## 11. Founder immigration & working legally (if foreign)
- What **visa / KITAS / work permit (RPTKA/IMTA)** do I need to legally live in
  and run/work for this business in Indonesia?
- Can I be a **director/shareholder** of the PT PMA as a foreigner? Any
  restrictions?
- Rules on **bringing in foreign staff** vs. mandatory local hiring ratios?

## 12. Advertising, the "boost/ads" feature & marketing
- Any regulation on **selling sponsored placement / paid boosts** to providers?
- Advertising standards, influencer/promo rules, price-promo (discount) rules?

## 13. Contracts I'll need drafted/reviewed
- **Provider (partner) agreement** — classification, commission, conduct,
  termination, indemnity.
- **Customer Terms of Service** + **Privacy Policy** (enforceable, ideally
  bilingual).
- **Booking/transaction terms** — who contracts with whom at booking.
- **Provider KYC / consent forms** (background check, data use).
- Any **investor / shareholder documents** if I raise money.

## 14. Practical launch & ops
- Can I run a **soft launch / pilot in Bali** with a small group before full
  licensing, or must everything be in place day one?
- What are the **penalties** (fines, shutdown, deportation if foreign) for
  operating before licenses are complete?
- Is there a **sandbox / phased compliance** path for an early-stage startup?
- What does an ongoing **compliance calendar** look like (renewals, reports,
  tax filings)?
- Rough **total cost** (setup + first-year compliance) so I can budget?

---

## Suggested priority order for the meeting
1. Foreigner status → entity type (PT PMA?) → foreign-ownership allowed?
2. The wallet / payments licensing question (could force a redesign).
3. Medical-type categories (IV drips/physio) + massage sensitivity.
4. PSE registration + data protection (PDP law, localization).
5. Provider classification + tax/VAT obligations.
6. Insurance/liability + contracts.
7. Founder visa/work permit.

> Tip: ask the lawyer which items you can **defer past a Bali pilot** vs. which
> are **non-negotiable from day one** — that tells you your true minimum cost and
> timeline to launch.
