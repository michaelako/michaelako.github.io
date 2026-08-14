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
  /** Three free-floating italic labels; index maps to --float-1/2/3. */
  day: ['yoga instructor', 'Raleigh, NC', 'studio fitness'],
  night: ['product manager', 'Raleigh, NC', 'ex-SWE'],
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
    caption: 'Product',
    paragraphs: [
      "I'm a product manager at Bandwidth, working on a product suite made for developers, by developers.",
      "I led Bandwidth's first self-serve consumer platform from a prototype into a real, revenue-generating product line, owning strategy end-to-end from beta through general availability. Within ten weeks of launch, we'd acquired 350 users organically, with zero marketing spend, and an 8% trial-to-paid conversion rate that validated a customer segment the company had never been able to serve before.",
      'My product “Big Three” is transparency, confidence, and iteration, and my workday must-haves are my notebook, post-its, and espresso.',
    ],
  },
  {
    caption: 'SWE',
    paragraphs: [
      'The engineering came sideways. I picked up a few computer science classes sophomore year to better understand statistical analysis and data visualization for my research. The side quest turned into a degree and an early career.',
      'I spent 2021 to 2025 as a software engineer at Bandwidth on voice routing, the layer that decides how a call actually gets where it is going. Working on core network infrastructure was unglamorous, difficult, and an incredible learning experience.',
      'The iterative nature of software engineering showed me that every problem has a solution and informs my product management and leadership style today.',
    ],
  },
  {
    caption: 'Research',
    paragraphs: [
      'My four years at Duke were mostly behavioral health research. I was an undergraduate researcher from 2019 to 2021 and a data science intern in the summer of 2020, working where mental health and technology meet.',
      'I led a nationwide survey on adolescent motivations and risk perception around COVID-19 vaccination, co-authored a systematic review of healthcare providers’ vaccine hesitancy, and studied the impact of yoga on adolescent mental health. Both papers are in the writing list below.',
    ],
  },
  {
    caption: 'Education',
    paragraphs: [
      'B.S. in Psychology and Computer Science from Duke University, 2022. I joined DTech, a Duke group for women in technology, and am an alumni mentor and coach for DTech Build, helping college-aged women build their first full-stack applications.',
      'Movement was always my throughline. My favorite class was Jazz with Nina Wheeler. I also studied yoga under Dr. Keval Kaur Khalsa and worked on the Embodied Learning Summit for the History of Yoga in 2021. Years later, in 2026, I earned my RYT-200 certification through Dose Yoga.',
    ],
  },
] as const;

export const writing = {
  kicker: 'Writing',
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
      href: null,
    },
  ],
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
    kicker: 'Get in touch',
    heading: "let's work together",
    note: 'product, wellness, and anything in between',
    resume: { label: 'résumé', href: '/corporate-resume.pdf' },
  },
} as const;
