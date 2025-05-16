/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tắt strict mode trong development để tránh render 2 lần
  reactStrictMode: false,
  
  // Cấu hình xử lý hình ảnh
  images: {
    domains: ['localhost'], // Cho phép tải ảnh từ localhost
    // Cấu hình kích thước ảnh
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Cấu hình đường dẫn API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Cấu hình webpack nếu cần
  webpack(config) {
    return config;
  },
};

module.exports = nextConfig; 