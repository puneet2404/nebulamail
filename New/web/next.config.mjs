/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:7071/api/:path*',
      },
    ];
  },
};

export default nextConfig;
