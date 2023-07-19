/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "restaurant-strapi-backend.onrender.com", // Update with your new backend URL
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
