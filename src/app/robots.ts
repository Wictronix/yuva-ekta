import { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/auth/',
                '/api/',
                '/donate/thank-you',
                '/thank-you',
                '/private/',
            ],
        },
        sitemap: `${SITE.url}/sitemap.xml`,
    };
}
