export const SITE = {
  name: 'Yuva Ekta India Foundation',
  description: 'Yuva Ekta India Foundation is a non-profit organisation dedicated to empowering communities through education, healthcare, environment, and women empowerment initiatives across India.',
  address: 'Damdama lake road, Dev nager part 2 Rithoj, Near Sigma company Gurugram haryana, 122102',
  addressAlt: 'Damdama lake road, Dev nager part 2 Rithoj, Near Sigma company Gurugram haryana, 122102',
  phone1: '+91 99909 11405',
  phone2: '+91 85699 23173',
  whatsapp: '+91 99909 11405',
  email: 'yuvaekta2018@gmail.com',
  registrationNo: '03485/2018',
  regNo: '03485/2018',
  pan: 'ABCDE1234F',
  founded: '2018',
  tagline: 'Empowering Communities',
  upi: 'yuvaekta@upi',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://yuvaektaindiafoundation.org',
  social: {
    facebook: 'https://facebook.com/yuvaekta',
    instagram: 'https://instagram.com/yuvaekta',
    youtube: 'https://youtube.com/yuvaekta',
  },
};

// Site navigation
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

// Focus Areas
export const FOCUS_AREAS = [
  {
    title: 'Education',
    desc: 'Empowering children with quality education and necessary learning materials.',
    icon: 'BookOpen',
    color: '#f97316',
  },
  {
    title: 'Healthcare',
    desc: 'Providing accessible medical care and health awareness in rural communities.',
    icon: 'HeartPulse',
    color: '#ef4444',
  },
  {
    title: 'Environment',
    desc: 'Promoting sustainable practices and organizing tree plantation drives.',
    icon: 'Leaf',
    color: '#22c55e',
  },
  {
    title: 'Women Empowerment',
    desc: 'Skill development programs to foster financial independence for women.',
    icon: 'HandHeart',
    color: '#a855f7',
  },
];

// Impact Stats
export const IMPACT_STATS = [
  { label: 'Lives Impacted', value: 50, suffix: 'K+' },
  { label: 'Volunteers', value: 1000, suffix: '+' },
  { label: 'Projects Completed', value: 500, suffix: '+' },
  { label: 'Communities Served', value: 100, suffix: '+' },
];
