/** @type {import('next').NextConfig} */
const nextConfig = {
  dangerouslyAllowSVG: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['source.unsplash.com', 'image.tmdb.org'],
  },
  reactStrictMode: false,
  env: {
    CPABUILD_ID: process.env.CPABUILD_ID,
    CPABUILD_KEY: process.env.CPABUILD_KEY,
  },
}

module.exports = nextConfig
