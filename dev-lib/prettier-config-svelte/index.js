const config = require('@jcheroske/prettier-config')

module.exports = {
  ...config,
  plugins: ['prettier-plugin-svelte'],
  svelteBracketNewLine: true,
  svelteStrictMode: true,
}
