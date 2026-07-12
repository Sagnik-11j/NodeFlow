import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //  this will redirect users landing on the root page to /workflows
  async redirects() {
    return [
      {
        source: "/",
        destination: "/workflows",
        permanent: false,
      }
    ]
  },

  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: false,
  
};

export default nextConfig;
