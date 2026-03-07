export const SITE = {
    name: 'Yuva Ekta India Foundation',
    tagline: 'Education. Livelihood. Environment.',
    description: 'A registered NGO in Gurugram empowering grassroot communities through remedial education, digital literacy, women\'s livelihood, and daily nutrition. Donate today — 80G certified.',
    url: 'https://yuvaektaindiafoundation.org',
    email: 'yuvaekta2018@gmail.com',
    phone1: '+91 8569923173',
    phone2: '+91 99909 11405',
    whatsapp: '9990911405',
    address: 'Village Sehjawas, Panchayat Sohna, Block Gurgaon, Haryana – 122102',
    addressAlt: 'Damdama Lake Road, Vill. Bahelpa, Gurugram, Haryana – 122102',
    regNo: '03485',
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
        youtube: 'https://youtube.com/@YuvaEktaIndiaFoundation',
        instagram: 'https://instagram.com/yuvaektaindiafoundation',
    },
};

export const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Impact", href: "/impact" },
    { label: "Contact", href: "/contact" },
];

export const IMPACT_STATS = [
    { value: 1000, suffix: "+", label: "Children Educated" },
    { value: 100, suffix: "+", label: "Women Empowered" },
    { value: 100, suffix: "", label: "Children Fed Daily" },
    { value: 7, suffix: "+", label: "Years of Service" },
];

export const FOCUS_AREAS = [
    {
        title: "Remedial Education",
        desc: "Free classes, village libraries, and learning workshops that bring dropout and at-risk children back into education.",
        icon: "BookOpen",
        color: "#BF3475", // brand-pink
        link: "/projects#sakshar-sohna",
    },
    {
        title: "Digital Literacy",
        desc: "A 30-computer Digital Learning Centre giving rural children free access to computer education.",
        icon: "Monitor",
        color: "#6FA656", // brand-green
        link: "/projects#digital-saksharta",
    },
    {
        title: "Women's Livelihood",
        desc: "Stitching, tailoring, and entrepreneurship training that turns existing skills into real income.",
        icon: "Scissors",
        color: "#D94A3D", // brand-terra
        link: "/projects#mahila-ajeevika",
    },
    {
        title: "Health & Nutrition",
        desc: "Daily food packets for 100 malnourished children and children with critical illness — every single day.",
        icon: "Heart",
        color: "#593414", // brand-brown
        link: "/projects#swastha-sohna",
    },
];
