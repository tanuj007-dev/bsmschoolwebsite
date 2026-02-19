/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Bundle & Compression ────────────────────────────────────────────────
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // ─── Experimental: faster builds + turbopack styles ──────────────────────
  experimental: {
    // optimizeCss: true,         // disabled — critters crashes on static pages in Next.js 15
    optimizePackageImports: [     // tree-shake large icon/motion packages
      "lucide-react",
      "react-icons",
      "framer-motion",
    ],
  },

  // ─── Image optimisation ──────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],   // serve AVIF first, fallback WebP
    minimumCacheTTL: 60 * 60 * 24 * 30,     // cache optimised images 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },

  // ─── HTTP headers for caching & security ─────────────────────────────────
  async headers() {
    return [
      {
        // Cache static assets aggressively (Next.js handles cache-busting with hashes)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache public media assets
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
