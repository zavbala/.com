import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the résumé out of search indexes so it stops surfacing to
      // email/phone-harvesting crawlers. Note: only well-behaved bots honor
      // this — see the X-Robots-Tag headers in next.config.ts too.
      disallow: ["/resume.pdf", "/resume"],
    },
    sitemap: "https://zavbala.com/sitemap.xml",
  };
}
