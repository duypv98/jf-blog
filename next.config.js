const { i18n } = require('./i18n.config');

const headers = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' }
];

module.exports = {
  i18n,
  async headers() {
    return [{
      source: '/(.*)',
      headers
    }]
  }
}
