import { SITE } from "@/lib/constants";

export default function SEOHeader() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": SITE.name,
        "url": SITE.url,
        "logo": `${SITE.url}/yuva-ekta-logo.jpg`,
        "description": SITE.description,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Damdama lake road, Dev nager part 2 Rithoj, Near Sigma company",
            "addressLocality": "Gurugram",
            "addressRegion": "Haryana",
            "postalCode": "122102",
            "addressCountry": "IN"
        },
        "areaServed": {
            "@type": "City",
            "name": "Gurugram",
            "sameAs": "https://en.wikipedia.org/wiki/Gurgaon"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": SITE.phone1,
            "contactType": "customer service",
            "email": SITE.email,
            "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
            SITE.social.facebook,
            SITE.social.instagram,
            SITE.social.youtube
        ],
        "knowsAbout": ["Child Education", "Healthcare", "Women Empowerment", "Environment"],
        "hasMap": "https://share.google/PdeQMKQeJVCFAQIqx",
        "keywords": "NGO in Gurugram, 80G Certified NGO, 12A Certified NGO, Top NGO in NCR",
        "awards": "12A and 80G Certified NGO",
        "taxID": SITE.pan,
        "foundingDate": "2018-11-21"
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "Website",
        "name": SITE.name,
        "url": SITE.url,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is Yuva Ekta India Foundation?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yuva Ekta India Foundation is a registered grassroots NGO based in Gurugram, dedicated to empowering communities through education, healthcare, environment, and women empowerment initiatives since 2018."
                }
            },
            {
                "@type": "Question",
                "name": "Is my donation to Yuva Ekta India Foundation tax-exempt?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Yuva Ekta India Foundation is 80G and 12A certified. All donations made to the foundation are eligible for tax deduction under Section 80G of the Income Tax Act."
                }
            },
            {
                "@type": "Question",
                "name": "Where is Yuva Ekta India Foundation located?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our primary operations and headquarters are located at Damdama lake road, Near Sigma company, Gurugram, Haryana, 122102."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
