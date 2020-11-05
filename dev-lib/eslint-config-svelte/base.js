const svelteConfig = require('@jcheroske/svelte-config')
const eslintSveltePreprocess = require('eslint-svelte3-preprocess')

module.exports = {
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  settings: {
    'svelte3/preprocess': eslintSveltePreprocess(svelteConfig.preprocess),
  },
}
