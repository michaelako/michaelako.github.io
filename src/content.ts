/**
 * All site copy lives here. Nothing else in src/ contains prose.
 */

export const site = {
  title: 'Michaela Kotarba',
  description:
    'Michaela Kotarba — product manager and RYT-200 yoga instructor in Raleigh, NC.',
  email: 'michaelakotarba@gmail.com',
  brand: 'mk',
} as const;

export const hero = {
  name: 'michaela kotarba',
  /**
   * Three free-floating labels; index maps to --float-1/2/3. 9–5 is set in
   * mono, so its labels are written MACRO_CASE here rather than uppercased in
   * CSS — text-transform cannot turn a space into an underscore. Index 1 is
   * Raleigh in both modes, so the two sides stay in visual parallel.
   */
  day: ['yoga instructor', 'Raleigh, NC', 'studio fitness'],
  night: ['PRODUCT_MANAGER', 'RALEIGH_NC', 'EX_SWE'],
} as const;

import community from './assets/photos/community.jpg';
import studio from './assets/photos/studio.jpg';
import privates from './assets/photos/privates.jpg';
import groups from './assets/photos/groups.jpg';

/**
 * 5–9 photo stack. Sources live in src/assets/photos/ (not public/) so Astro
 * runs them through sharp at build time and emits sized WebP. Set `src` to
 * null to fall back to a placeholder frame.
 */
export const photos = [
  {
    caption: 'community',
    src: community,
    alt: 'Michaela teaching a free outdoor yoga class in a park at sunset',
  },
  {
    caption: 'studio',
    src: studio,
    alt: 'A studio inversion workshop, students in headstands and arm balances',
  },
  {
    caption: 'privates',
    src: privates,
    alt: 'Michaela in a warrior asana on a deck overlooking a lake at sunrise',
  },
  {
    caption: 'groups',
    src: groups,
    alt: 'Michaela leading a poolside yoga session for a bachelorette party',
  },
] as const;

export const about = {
  kicker: 'About me',
  paragraphs: [
    'Movement has always been in my life. I grew up in Winston-Salem, NC, and started dancing when I was 3 years old. Dance shaped who I am today, strengthening my work ethic and fostering my creative identity. More importantly, dance empowered me to share movement with others.',
    'At 16, I was introduced to hot yoga in the style of 26 postures, and I immediately wanted to know more. I kept practicing and exploring new styles in my hometown, including Iyengar, Hatha, and Vinyasa. While studying Psychology and Computer Science at Duke University, I studied Kundalini yoga under Dr. Keval Kaur Khalsa and researched the impact of yoga on adolescent mental health. A year after graduation, I moved to Denver, CO, where I found amazing community through yoga and dance, but never took the leap to start teaching. Fast forward to late 2025: I moved back to Raleigh, and I signed up for a teacher training before I signed a lease for a place to live.',
    "After 10 years of ebbing and flowing, I finally earned my RYT-200 certification. Now, I'm building community in Raleigh and deepening my relationship with the 8-limb path. I'm most comfortable teaching Vinyasa and passionate about helping others find strength, curiosity, and freedom.",
  ],
} as const;

export const playlist = {
  kicker: 'On repeat',
  id: '2lfLw4ho5fyW0bekAb8qIy',
  title: "Michaela's playlist",
} as const;

/**
 * 9–5 text stack. Recomposed from the facts on the previous site — the
 * corporate About paragraphs plus the experience table the new layout drops.
 */
export const work = [
  {
    caption: 'PRODUCT_MANAGEMENT',
    paragraphs: [
      "I'm a product manager at Bandwidth, working on a product suite made for developers, by developers.",
      "I led Bandwidth's first self-serve consumer platform from a prototype into a real, revenue-generating product line, owning strategy end-to-end from beta through general availability. Within ten weeks of launch, we'd acquired 350 users organically, with zero marketing spend, and an 8% trial-to-paid conversion rate that validated a customer segment the company had never been able to serve before.",
      'My product “Big Three” is transparency, confidence, and iteration, and my workday must-haves are my notebook, post-its, and espresso.',
    ],
  },
  {
    caption: 'SOFTWARE_ENGINEERING',
    paragraphs: [
      'The engineering came sideways. I picked up a few computer science classes sophomore year to better understand statistical analysis and data visualization for my research. The side quest turned into a degree and an early career.',
      'I spent 2021 to 2025 as a software engineer at Bandwidth on voice routing, the layer that decides how a call actually gets where it is going. Working on core network infrastructure was unglamorous, difficult, and an incredible learning experience.',
      'The iterative nature of software engineering showed me that every problem has a solution and informs my product management and leadership style today.',
    ],
  },
  {
    caption: 'RESEARCH',
    paragraphs: [
      'My four years at Duke were mostly behavioral health research. I was an undergraduate researcher from 2019 to 2021 and a data science intern in the summer of 2020, working where mental health and technology meet.',
      'I led a nationwide survey on adolescent motivations and risk perception around COVID-19 vaccination, co-authored a systematic review of healthcare providers’ vaccine hesitancy, and studied the impact of yoga on adolescent mental health. Both papers are in the writing list below.',
    ],
  },
  {
    caption: 'EDUCATION',
    paragraphs: [
      'B.S. in Psychology and Computer Science from Duke University, 2022. I joined DTech, a Duke group for women in technology, and am an alumni mentor and coach for DTech Build, helping college-aged women build their first full-stack applications.',
      'Movement was always my throughline. My favorite class was Jazz with Nina Wheeler. I also studied yoga under Dr. Keval Kaur Khalsa and worked on the Embodied Learning Summit for the History of Yoga in 2021. Years later, in 2026, I earned my RYT-200 certification through Dose Yoga.',
    ],
  },
] as const;

interface WritingItem {
  title: string;
  year: string;
  /** null renders the row as plain text rather than a link. */
  href: string | null;
}

export const writing = {
  kicker: 'WRITING',
  /* Annotated rather than inferred: with `as const` alone, every entry having
     a link would narrow href to string and make Writing.astro's no-link branch
     unreachable — so a later entry with href: null would render a dead <a>. */
  items: [
    {
      title: "Developer Experience isn't just for developers anymore",
      year: '2026',
      href: 'https://www.bandwidth.com/blog/developer-experience-isnt-just-for-developers/',
    },
    {
      title:
        'Internal and External Motivations and Risk Perception toward COVID-19 Vaccination in Adolescents in the U.S.',
      year: '2022',
      href: 'https://pubmed.ncbi.nlm.nih.gov/35632453/',
    },
    {
      title:
        'Healthcare Providers’ Vaccine Perceptions, Hesitancy, and Recommendation to Patients',
      year: '2021',
      href: 'https://pubmed.ncbi.nlm.nih.gov/34358132/',
    },
  ] as readonly WritingItem[],
} as const;

/**
 * The design specifies one shared contact section, but its wording is
 * yoga-specific and reads wrong in 9–5, so the kicker, heading, note and
 * résumé all follow the mode the same way the hero labels do. Only the "say
 * hello" button is shared.
 */
export const contact = {
  cta: 'say hello',
  day: {
    kicker: 'Practice with me',
    heading: 'open to opportunities',
    note: 'studio classes, pop-ups, and private sessions',
    resume: { label: 'résumé', href: '/yoga-resume.pdf' },
  },
  night: {
    kicker: 'GET_IN_TOUCH',
    heading: "let's work together",
    note: 'product, wellness, and anything in between',
    resume: { label: 'résumé', href: '/corporate-resume.pdf' },
  },
} as const;

export const sms = {
  programName: 'Michaela Kotarba Yoga Updates',
  maxMessagesPerMonth: 4,
  keywords: {
    help: 'HELP',
    stop: 'STOP',
  },
  ui: {
    legalNavAriaLabel: 'Legal',
    lastUpdatedLabel: 'Last updated',
  },
  confirmationMessage:
    'Michaela Kotarba Yoga Updates: Thanks for subscribing! Up to 4 msgs/month. Msg & data rates may apply. Reply HELP for help, STOP to cancel.',
  support: {
    email: site.email,
  },
  optIn: {
    heading: 'Get yoga updates by text',
    note: 'Class announcements, pop-ups, and private session openings — sent sparingly.',
    fields: {
      nameLabel: 'Name',
      phoneLabel: 'Mobile phone',
      submitLabel: 'Subscribe',
    },
    status: {
      successHeading: 'You’re subscribed.',
      successBody: 'Check your phone for a confirmation text.',
      missingEndpoint:
        'Text sign-ups are temporarily unavailable. Please email Michaela to subscribe.',
      genericError:
        'Something went wrong sending your request. Please try again, or email Michaela.',
    },
    disclosureVersion: '2026-11-12',
    disclosureText:
      'By checking this box, you agree to receive recurring text messages from Michaela Kotarba about yoga classes, pop-ups, and private sessions at the number provided. Up to 4 msgs/month. Message and data rates may apply. Reply HELP for help, STOP to cancel. Consent is not a condition of purchase. See our Privacy Policy and SMS Terms.',
  },
  privacy: {
    navLabel: 'Privacy Policy',
    title: 'Privacy Policy',
    lastUpdated: 'November 12, 2026',
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'This Privacy Policy describes how Michaela Kotarba collects and uses personal information for the Michaela Kotarba Yoga Updates text messaging program.',
        ],
      },
      {
        heading: 'Information we collect',
        paragraphs: [
          'When you opt in to receive text messages, we may collect your name, your mobile phone number, and a record of your consent (including the date/time, the disclosure text shown at opt-in, and related request metadata such as IP address and user agent).',
        ],
      },
      {
        heading: 'How we use information',
        paragraphs: [
          'We use this information only to send you updates about yoga classes, pop-ups, and private sessions and to maintain compliance records for the program.',
          'Message frequency is up to 4 messages per month. Message and data rates may apply.',
        ],
      },
      {
        heading: 'Sharing of information',
        paragraphs: [
          'No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties.',
        ],
      },
      {
        heading: 'Your choices (opt out)',
        paragraphs: [
          'You can opt out at any time by replying STOP to any message. You can also request help by replying HELP.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          `If you have questions about this Privacy Policy or the text messaging program, contact ${site.email}.`,
        ],
      },
    ],
  },
  terms: {
    navLabel: 'SMS Terms',
    title: 'SMS Terms',
    lastUpdated: 'November 12, 2026',
    paragraphs: [
      'By opting in to receive text messages from Michaela Kotarba, you agree to these SMS Terms.',
      'Program: Michaela Kotarba Yoga Updates. Messages may include updates about yoga classes, pop-ups, and private sessions.',
      'Message frequency is up to 4 messages per month. Message and data rates may apply.',
      'To get help, reply HELP. To cancel, reply STOP.',
      `For support, email ${site.email}.`,
      'Carriers are not liable for delayed or undelivered messages.',
      'See our Privacy Policy for more information.',
    ],
  },
} as const;
