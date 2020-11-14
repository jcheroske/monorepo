const { isDev } = require('@jcheroske/dev-or-prod')
const sveltePreprocessConfig = require('@jcheroske/svelte-preprocess/config')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve').default
const typescript = require('@rollup/plugin-typescript')
const html = require('rollup-plugin-html2')
const livereload = require('rollup-plugin-livereload')
const serve = require('rollup-plugin-serve')
const svelte = require('rollup-plugin-svelte')
const { terser } = require('rollup-plugin-terser')
const sveltePreprocess = require('svelte-preprocess')

const buildDir = 'dist'
const port = 3000

// Define all our plugins
const plugins = [
  svelte({
    dev: isDev,
    // Extract all styles to an external file
    css: (css) => {
      css.write(`bundle.css`)
    },
    extensions: ['.svelte'],
    preprocess: sveltePreprocess(sveltePreprocessConfig),
  }),
  resolve({
    browser: true,
    dedupe: ['svelte'],
  }),
  typescript({ sourceMap: isDev }),
  commonjs(),
  // Injects your bundles into index page
  html({
    template: 'src/index.html',
    fileName: 'index.html',
  }),
]

if (isDev) {
  plugins.push(
    // Like a webpack-dev-server
    serve({
      contentBase: buildDir,
      historyApiFallback: true, // For SPAs
      port,
    }),
    livereload({ watch: buildDir }),
  )
} else {
  plugins.push(terser({ sourcemap: isDev }))
}

module.exports = {
  input: 'src/main.ts',
  output: {
    name: 'bundle',
    file: `${buildDir}/bundle.js`,
    sourcemap: isDev,
    format: 'iife',
  },
  plugins,
}
