import { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${SITE.url}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${SITE.url}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${SITE.url}/campaigns`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${SITE.url}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${SITE.url}/csr`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE.url}/donate`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE.url}/impact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE.url}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    try {
        const supabase = await createClient();
        const { data: campaigns } = await supabase
            .from('campaigns')
            .select('slug, updated_at')
            .neq('status', 'archived');

        const campaignRoutes: MetadataRoute.Sitemap = (campaigns || []).map((c) => ({
            url: `${SITE.url}/campaigns/${c.slug}`,
            lastModified: new Date(c.updated_at || Date.now()),
            changeFrequency: 'weekly',
            priority: 0.85,
        }));

        return [...staticRoutes, ...campaignRoutes];
    } catch {
        return staticRoutes;
    }
}
