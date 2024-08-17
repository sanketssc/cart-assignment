/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fakestoreapi.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
