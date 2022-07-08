const withPreact = require('next-plugin-preact');

module.exports = withPreact({
  poweredByHeader: false,
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['tvgidsassets.nl'],
  },
});
