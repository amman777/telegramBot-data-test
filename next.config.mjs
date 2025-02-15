/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    experimental: { appDir: true }, // Enable App Router (if needed)
    api: {
      bodyParser: true, // Ensure body parsing isn't disabled
    },
  }

export default nextConfig;



// const nextConfig = {
  
// };

// module.exports = nextConfig;
