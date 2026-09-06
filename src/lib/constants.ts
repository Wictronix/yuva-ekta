export const SITE = {
  name: 'Yuva Ekta India Foundation',
  tagline: 'Education. Livelihood. Environment.',
  description: 'A registered NGO in Gurugram empowering grassroot communities through remedial education, digital literacy, women\'s livelihood, and daily nutrition. Donate today — 80G certified.',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://yuvaektaindiafoundation.org',
  email: 'yuvaekta2018@gmail.com',
  phone1: '+91 85699 23173',
  phone2: '+91 99909 11405',
  whatsapp: '+91 99909 11405',
  address: 'Village Sehjawas, Panchayat Sohna, Block Gurgaon, Haryana – 122102',
  addressAlt: 'Damdama Lake Road, Vill. Bahelpa, Gurugram, Haryana – 122102',
  regNo: '03485',
  registrationNo: '03485',
  pan: 'AAATY6815D',
  founded: '21 November 2018',
  upi: 'Q64836034@ybl',
  bank: {
    name: 'Union Bank of India',
    account: '220711100001158',
    ifsc: 'UBIN0565091',
    holder: 'Yuva Ekta India Foundation',
  },
  social: {
    facebook: 'https://facebook.com/yuvaektaindiafoundation',
    instagram: 'https://instagram.com/yuvaektaindiafoundation',
    youtube: 'https://youtube.com/@YuvaEktaIndiaFoundation',
  },
};

// Site navigation
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Projects', href: '/projects' },
  { label: 'CSR', href: '/csr' },
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
