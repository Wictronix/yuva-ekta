import { MetadataRoute } from 'next';
import { SITE, NAV_LINKS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = NAV_LINKS.map((link) => ({
        url: `${SITE.url}${link.href}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: link.href === '/' ? 1 : 0.8,
    }));

    const extraRoutes = ['/thank-you'].map((route) => ({
        url: `${SITE.url}${route}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    }));

    return [...routes, ...extraRoutes];
}
