/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.fanmarket.app.br',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.fanbase.com.br',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'config.fanbase.com.br',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig; 
// Nota: Se o seu arquivo for next.config.js mais antigo, pode ser necessário usar "module.exports = nextConfig;" na última linha no lugar do "export default".