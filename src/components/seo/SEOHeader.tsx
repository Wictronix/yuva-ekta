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
            "streetAddress": SITE.address,
            "addressLocality": "Gurugram",
            "addressRegion": "Haryana",
            "postalCode": "122102",
            "addressCountry": "IN"
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
        "taxID": SITE.pan,
        "foundingDate": "2018-11-21"
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": SITE.name,
        "url": SITE.url,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
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
        </>
    );
}
