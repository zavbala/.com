import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Tell search engines to drop the résumé from their index even if it gets
    // linked or crawled directly. Header rules are checked before /public
    // files, so this also covers the static resume.pdf.
    const noIndex = [
      { key: "X-Robots-Tag", value: "noindex, noarchive, nofollow" },
    ];
    return [
      { source: "/resume.pdf", headers: noIndex },
      { source: "/resume", headers: noIndex },
    ];
  },
  async redirects() {
    return [
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/zavbala",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/zavbala",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "/x",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://x.com/zavbala",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
