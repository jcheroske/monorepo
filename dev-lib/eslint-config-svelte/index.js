const sveltePreprocessConfig = require('@jcheroske/svelte-preprocess/config')
const eslintSveltePreprocess = require('eslint-svelte3-preprocess')
const sveltePreprocess = require('svelte-preprocess')

module.exports = {
  parserOptions: {
    extraFileExtensions: ['.svelte'],
  },
  plugins: ['svelte3'],
  processor: 'svelte3/svelte3',
  settings: {
    'svelte3/preprocess': eslintSveltePreprocess(
      sveltePreprocess(sveltePreprocessConfig),
    ),
  },
}

// {
//   "files": [
//     "**/*.svelte"
//   ],
//   "parserOptions": {
//     "extraFileExtensions": [
//       ".svelte"
//     ]
//   },
//   "extends": [
//     "@jcheroske/eslint-config-typescript",
//     "@jcheroske/eslint-config-svelte"
//   ]
// },

// {
//   "files": [
//     "**/*.svelte/*.js",
//     "**/*.svelte/*.js"
//   ],
//   "rules": {
//     "import/no-unresolved": "off",
//     "unicorn/filename-case": "off"
//   }
// },
