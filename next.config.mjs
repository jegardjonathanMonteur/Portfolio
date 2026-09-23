/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/demo/:path*",
          destination: "/demo/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
