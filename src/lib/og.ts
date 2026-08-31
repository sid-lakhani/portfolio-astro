export async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    if (!match) return null;

    let ogUrl = match[1];
    // Resolve relative URLs
    if (ogUrl.startsWith("/")) {
      const urlObj = new URL(url);
      ogUrl = `${urlObj.protocol}//${urlObj.host}${ogUrl}`;
    }
    return ogUrl;
  } catch (err) {
    console.error(`Failed to fetch OG image for ${url}:`, err);
    return null;
  }
}
