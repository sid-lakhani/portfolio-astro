import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blogs");
  const sorted = posts.sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: "Siddhesh Lakhani",
    description:
      "Developer, builder, tinkerer. Notes on code, Linux, and things worth reading.",
    stylesheet: "/pretty-feed.xsl",
    site: context.site!,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.data.slug}/?utm_source=rss&utm_medium=feed`,
    })),
    customData: `<language>en-us</language>`,
  });
}
