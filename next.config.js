/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Necessary for static export
  },
  basePath: '/To-Do-List-App-with-Next.js', // Replace with your GitHub repository name
};

module.exports = nextConfig;
