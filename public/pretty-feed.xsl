<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> (RSS Feed)</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <style type="text/css">
          :root {
            --bg: #0b0f19;
            --fg: #f3f4f6;
            --accent: #ff3b3b;
            --border: rgba(255, 255, 255, 0.08);
            --muted: #9ca3af;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg);
            color: var(--fg);
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 680px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .banner {
            background: rgba(255, 59, 59, 0.08);
            border: 1px solid rgba(255, 59, 59, 0.2);
            border-radius: 6px;
            padding: 16px;
            margin-bottom: 40px;
            font-size: 14px;
          }
          .banner strong {
            color: var(--accent);
          }
          .banner a {
            color: var(--fg);
            text-decoration: underline;
          }
          header {
            margin-bottom: 40px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 24px;
          }
          h1 {
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 8px 0;
            letter-spacing: -0.02em;
          }
          .desc {
            color: var(--muted);
            font-size: 16px;
            margin: 0 0 16px 0;
          }
          .site-link {
            color: var(--accent);
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
          }
          .site-link:hover {
            text-decoration: underline;
          }
          .feed-title {
            font-size: 18px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 24px;
            color: var(--muted);
          }
          .item {
            margin-bottom: 32px;
            padding-bottom: 32px;
            border-bottom: 1px solid var(--border);
          }
          .item:last-child {
            border: none;
          }
          .item h3 {
            font-size: 20px;
            margin: 0 0 8px 0;
            letter-spacing: -0.01em;
          }
          .item h3 a {
            color: var(--fg);
            text-decoration: none;
          }
          .item h3 a:hover {
            color: var(--accent);
          }
          .item p {
            color: var(--muted);
            margin: 0 0 12px 0;
            font-size: 15px;
          }
          .item small {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.4);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="banner">
            <strong>This is a web feed</strong> (RSS). Subscribe by copying the URL from the address bar and pasting it into your newsreader. Learn more at <a href="https://aboutfeeds.com" target="_blank">About Feeds</a>.
          </div>
          
          <header>
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p class="desc"><xsl:value-of select="/rss/channel/description"/></p>
            <a class="site-link" target="_blank">
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link"/>
              </xsl:attribute>
              Visit Website &#x2192;
            </a>
          </header>

          <div class="feed-title">Recent Posts</div>
          
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h3>
                <a target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              <p><xsl:value-of select="description"/></p>
              <small>
                Published: <xsl:value-of select="pubDate" />
              </small>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
