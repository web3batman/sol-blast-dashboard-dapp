/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com', //twitter
        pathname: '/profile_images/**',
      },
    ],
  },
};

export default nextConfig;
