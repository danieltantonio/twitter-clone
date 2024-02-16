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
}

module.exports = nextConfig
