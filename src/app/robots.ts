import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  // Sharing crawlers must be able to fetch the page and its original OG image.
  // Search indexing remains controlled by the layout's noindex metadata.
  return { rules: { userAgent: '*', allow: '/' } };
}
