import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "logo.svgcdn.com" },
      { protocol: "https", hostname: "www.logowik.com" },
      { protocol: "https", hostname: "logowik.com" },
      { protocol: "https", hostname: "www.zohowebstatic.com" },
      { protocol: "https", hostname: "www.servicenow.com" },
      { protocol: "https", hostname: "www.hubspotware.net" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "brandeps.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.proprofs.com" },
      { protocol: "https", hostname: "supportbee.com" },
      { protocol: "https", hostname: "brandfetch.com" },
      { protocol: "https", hostname: "cloud.gmelius.com" },
      { protocol: "https", hostname: "images.g2crowd.com" },
    ],
  },
};

export default nextConfig;
