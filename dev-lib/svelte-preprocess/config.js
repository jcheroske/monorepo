// const { isDev } = require('@jcheroske/dev-or-prod')
const postcssConfig = require('@jcheroske/postcss-svelte/config')

module.exports = {
  sourceMap: false, // isDev,
  defaults: {
    script: 'typescript',
  },
  postcss: postcssConfig,
}
