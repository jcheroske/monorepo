const purgecss = require('@fullhuman/postcss-purgecss')
const { isProd } = require('@jcheroske/dev-or-prod')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const purgecssConfig = {
  content: ['./src/**/*.html', './src/**/*.svelte'],

  whitelistPatterns: [/svelte-/],

  defaultExtractor: (content) => content.match(/[\w/:-]+/g) || [],
}

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer(),
    // postcssPresetEnv(postcssPresetEnvConfig),
    ...(isProd ? [purgecss(purgecssConfig)] : []),
  ],
}
