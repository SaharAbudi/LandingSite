/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    css: {
      // השבתת lightningcss — שימוש ב־postcss רגיל
      loader: 'postcss'
    }
  }
}

module.exports = nextConfig
