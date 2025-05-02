/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add webpack configuration to handle MP4 files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/media/',
            publicPath: '/_next/static/media/',
          },
        },
      ],
    });

    return config;
  },
}

module.exports = nextConfig
