import { Metadata } from "next";
import { SITE } from "./constants";

export function constructMetadata({
    title = SITE.name,
    description = SITE.description,
    image = "/cinematic-hero.png",
    icons = "/favicon.ico",
    noIndex = false,
    canonicalUrl,
    pathname,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
    canonicalUrl?: string;
    pathname?: string;
} = {}): Metadata {
    const cleanPath = pathname
        ? pathname.startsWith("/") ? pathname : `/${pathname}`
        : "";
    const resolvedCanonical = canonicalUrl || (cleanPath ? `${SITE.url}${cleanPath}` : SITE.url);
    const resolvedImage = image.startsWith("http")
        ? image
        : `${SITE.url}${image.startsWith("/") ? image : `/${image}`}`;

    return {
        title: title === SITE.name ? title : {
            default: title,
            template: `%s | ${SITE.name}`,
        },
        description,
        keywords: [
            "Yuva Ekta India Foundation",
            "NGO in Gurugram",
            "Child Education NGO",
            "Women Empowerment",
            "80G Certified NGO",
            "12A Certified NGO",
            "CSR 1 Registered NGO",
            "Donate to NGO NCR"
        ],
        openGraph: {
            title,
            description,
            url: resolvedCanonical,
            siteName: SITE.name,
            locale: "en_IN",
            images: [
                {
                    url: resolvedImage,
                    alt: title,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [resolvedImage],
            creator: "@yuvaekta",
        },
        icons,
        metadataBase: new URL(SITE.url),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
        alternates: {
            canonical: resolvedCanonical,
        },
    };
}
