import { Metadata } from "next";
import { SITE } from "./constants";

export function constructMetadata({
    title = SITE.name,
    description = SITE.description,
    image = "/cinematic-hero.png",
    icons = "/favicon.ico",
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title: title === SITE.name ? title : {
            default: title,
            template: `%s | ${SITE.name}`,
        },
        description,
        openGraph: {
            title,
            description,
            url: SITE.url,
            siteName: SITE.name,
            images: [
                {
                    url: image,
                    alt: title,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
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
            canonical: SITE.url,
        },
    };
}
