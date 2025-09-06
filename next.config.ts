import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [

      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/**"
      }
    ]
  }
};

export default nextConfig;
