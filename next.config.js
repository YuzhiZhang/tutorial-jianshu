/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputStandalone: true
  },
  images: {
    domains: [
      'cdn2.jianshu.io',
      'upload-images.jianshu.io',
      'upload.jianshu.io',
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.plugins.push(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('unplugin-icons/webpack')({
        compiler: 'jsx',
        jsx: 'react',
      })
    )

    return config
  },
}

module.exports = nextConfig
