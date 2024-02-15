/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cltgswnlsgvjrfszkaiz.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**"
            }
        ]
    },
    async headers() {
        return [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ];
      },
}

module.exports = nextConfig
