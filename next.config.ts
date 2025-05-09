import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nkihbopqxauxphmaqvey.supabase.co',
        pathname: '/storage/v1/object/public/articles/articles/**'
      }
    ]
  }
};

export default nextConfig;
