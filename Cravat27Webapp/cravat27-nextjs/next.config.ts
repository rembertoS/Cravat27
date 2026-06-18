import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Supabase Storage public bucket (uploaded service / gallery photos)
        protocol: "https",
        hostname: "mpzjagnpuhlmbkbetmod.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
