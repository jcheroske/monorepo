const { isProd } = require('@jcheroske/dev-or-prod')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ['./src/**/*.html', './src/**/*.svelte'],
    enabled: isProd,
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
