/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This is the magic command for static export
  basePath: '/serene-portfolio', // Your repository name is important here
  images: {
    unoptimized: true, // Required because GitHub Pages can't run Next.js image optimization
  },
};

module.exports = nextConfig;