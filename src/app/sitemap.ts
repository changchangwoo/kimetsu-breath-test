import { breathingNames } from '@/constants/breathingColors';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kimetsu-breath-test.site';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/index.html`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/quiz/index.html`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const resultPages: MetadataRoute.Sitemap = Object.keys(breathingNames).map(
    breathType => ({
      url: `${baseUrl}/results/${breathType}/index.html`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  );

  return [...staticPages, ...resultPages];
}
