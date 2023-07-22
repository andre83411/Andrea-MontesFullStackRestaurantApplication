const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['render-strapi-backend.s3.us-west-1.amazonaws.com'], // Replace 'your-bucket-name' with your actual AWS bucket name
  },
};

module.exports = nextConfig;
