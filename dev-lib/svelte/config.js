const sveltePreprocessConfig = require('@jcheroske/svelte-preprocess/config')
const sveltePreprocess = require('svelte-preprocess')

module.exports = {
  preprocess: sveltePreprocess(sveltePreprocessConfig),
}
