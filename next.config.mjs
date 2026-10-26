/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? '/fulchand-gulabchand-jewellers' : '');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: isProd ? 'export' : undefined,
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isProd ? {} : {
    async rewrites() {
      return [
        {
          source: '/fulchand-gulabchand-jewellers/:path*',
          destination: '/:path*',
        },
      ];
    },
  }),
};

export default nextConfig;
