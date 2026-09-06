export const PROJECT_CARDS = [
    {
        id: 'sakshar-sohna',
        name: 'Sakshar Sohna',
        supporter: 'Expert Solutions for Non Profit',
        summary: 'Remedial education for 200+ children from learning to read to running school libraries.',
        image: '/campaign/yuva_ekta_01.jpeg',
        href: '/projects#sakshar-sohna',
        badge: 'Education',
        badgeColor: '#BF3475',
    },
    {
        id: 'digital-saksharta',
        name: 'Digital Saksharta',
        supporter: 'Morning Star Foundation',
        summary: 'A 30-computer learning centre in Sehjawas Village, free digital education for 50 children and youth.',
        image: '/campaign/yuva_ekta_02.jpeg',
        href: '/projects#digital-saksharta',
        badge: 'Digital Literacy',
        badgeColor: '#6FA656',
    },
    {
        id: 'mahila-ajeevika',
        name: 'Mahila Ajeevika',
        supporter: 'Srujna Charitable Trust',
        summary: 'Sewing machines, raw materials, and business training for 50 rural women building their own income.',
        image: '/campaign/yuva_ekta_03.jpeg',
        href: '/projects#mahila-ajeevika',
        badge: 'Livelihood',
        badgeColor: '#D94A3D',
    },
    {
        id: 'swastha-sohna',
        name: 'Swastha Sohna',
        supporter: 'Taj Gateway Resort',
        summary: 'Free nutritious food packets distributed every day to 100 malnourished and critically ill children.',
        image: '/campaign/yuva-ekta-03.png',
        href: '/projects#swastha-sohna',
        badge: 'Health & Nutrition',
        badgeColor: '#593414',
    },
];

export const WAYS_TO_HELP = [
    {
        icon: 'HandHeart',
        title: 'Donate',
        description: 'Make a one-time or monthly contribution. Your donation is 100% tax-exempt under Section 80G.',
        cta: { label: 'Donate Now', href: '/donate' },
    },
    {
        icon: 'ShoppingBag',
        title: 'Buy Products',
        description: 'Purchase handmade goods crafted by our beneficiaries. Every purchase creates livelihood.',
        cta: { label: 'Explore Products', href: '/impact' },
    },
    {
        icon: 'Users',
        title: 'Volunteer',
        description: 'Bring your skills in teaching, technology, or health and give a few hours a month.',
        cta: { label: 'Volunteer With Us', href: '/contact#volunteer' },
    },
];

export interface Partner {
    name: string;
    role: string;
    category: string;
    impact: string;
    initials: string;
    color: string;
}

export const PARTNERS: Partner[] = [
    { 
        name: 'Morning Star Foundation',
        role: 'Education Alliance',
        category: 'Remedial Learning',
        impact: 'Remediation centres & village libraries',
        initials: 'MS',
        color: '#BF3475',
    },
    { 
        name: 'Srujna Charitable Trust',
        role: 'Livelihood Partner',
        category: 'Women Empowerment',
        impact: 'Sewing machines & micro-enterprises',
        initials: 'SC',
        color: '#9E3C1B',
    },
    { 
        name: 'Taj Gateway Resort',
        role: 'Hospitality Partner',
        category: 'Child Nutrition',
        impact: '365 days daily fresh meal distribution',
        initials: 'TG',
        color: '#6FA656',
    },
    { 
        name: 'Expert Solutions for Non Profit',
        role: 'Advisory Partner',
        category: 'Institutional Governance',
        impact: 'Statutory compliance & audit assurance',
        initials: 'ES',
        color: '#593414',
    },
];
