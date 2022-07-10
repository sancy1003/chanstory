/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true, // (optional)
  exclude: ["/server-sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL}/server-sitemap.xml`, // <==== Add here
    ],
  },
  sitemapSize: 7000,
  // ...other options
};

module.exports = config;
