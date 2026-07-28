export type Package = {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  tagline: string;
  duration: string;
  features: string[];
  accent: string;
  highlight?: boolean;
  badge?: string;
  isCustom?: boolean;
};

export const PACKAGES: Package[] = [
  {
    id: 'express',
    name: 'Express Detail',
    price: '$139',
    priceNum: 139,
    tagline: 'Quick refresh for daily drivers',
    duration: '1–2 hrs',
    accent: 'silver',
    features: [
      'Exterior hand wash & dry',
      'Wheel & tire clean',
      'Interior vacuum',
      'Window cleaning (interior)',
      'Dashboard & console wipe-down',
    ],
  },
  {
    id: 'exterior',
    name: 'Exterior Only',
    price: '$79',
    priceNum: 79,
    tagline: 'Showroom shine from the outside',
    duration: '1–2 hrs',
    accent: 'teal',
    features: [
      'Hand wash & clay bar',
      'Wheel & tire deep clean',
      'Trim dressing',
      'Exterior glass polish',
      'Spray wax protection',
    ],
  },
  {
    id: 'interior',
    name: 'Interior Only',
    price: '$159',
    priceNum: 159,
    tagline: 'Deep clean inside your vehicle',
    duration: '2–3 hrs',
    accent: 'blue',
    features: [
      'Full interior vacuum',
      'Seat & carpet shampoo',
      'Leather conditioning',
      'Dashboard & trim detail',
      'Door panel deep clean',
      'All-glass interior cleaning',
    ],
  },
  {
    id: 'gold',
    name: 'Gold Detail',
    price: '$189',
    priceNum: 189,
    tagline: 'The premium all-in-one experience',
    duration: '4–5 hrs',
    accent: 'gold',
    features: [
      'Full exterior hand wash',
      'Clay bar decontamination',
      'Full interior shampoo',
      'Leather conditioning',
      'Engine bay clean',
      'Premium wax finish',
    ],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'platinum',
    name: 'Platinum Detail',
    price: '$279',
    priceNum: 279,
    tagline: 'The ultimate detailing package',
    duration: '6–8 hrs',
    accent: 'platinum',
    features: [
      'Everything in Gold Detail',
      'Paint correction & polish',
      'Headlight restoration',
      'Odor elimination treatment',
      'Paint sealant application',
      'Premium microfiber finish',
    ],
    badge: 'Best Value',
  },
  {
    id: 'custom',
    name: 'Custom Packages',
    price: 'Call Us',
    priceNum: 0,
    tagline: 'We tailor it to you.',
    duration: 'Varies',
    accent: 'blue',
    features: [],
    isCustom: true,
  },
];

export const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
];

export const SERVICE_CITIES = [
  'Dallas, TX', 'Fort Worth, TX', 'Arlington, TX',
  'Plano, TX', 'Irving, TX', 'Garland, TX',
  'McKinney, TX', 'Frisco, TX', 'Denton, TX',
];

export const PHONE = '830-399-0485';
export const PHONE_HREF = 'tel:8303990485';
