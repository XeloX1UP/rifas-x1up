/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.freeimages.com"],
  },
};

module.exports = nextConfig;
