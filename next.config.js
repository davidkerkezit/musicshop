/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["music-shop-storage.s3.eu-west-3.amazonaws.com"],
  },
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  swcMinify: true, // Enable SWC minification
};

module.exports = nextConfig;
