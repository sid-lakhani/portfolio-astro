import { getCollection } from "astro:content";

const siteUrl = 'https://sidlakhani.in';
const buildDate = new Date().toISOString();

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.85', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

export async function GET() {
  const blogPosts = await getCollection("blogs");

  const staticUrls = staticPages
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${new URL(path, siteUrl).toString()}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  const blogUrls = blogPosts
    .map((post) => {
      const loc = `${siteUrl}/blog/${post.data.slug}`;
      const lastmod = new Date(post.data.date).toISOString();
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${blogUrls}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}