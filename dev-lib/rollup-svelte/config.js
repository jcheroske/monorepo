const { isDev } = require('@jcheroske/dev-or-prod')
const sveltePreprocessConfig = require('@jcheroske/svelte-preprocess/config')
const commonjs = require('@rollup/plugin-commonjs')
const css = require('rollup-plugin-css-only')
const resolve = require('@rollup/plugin-node-resolve').default
const replace = require('@rollup/plugin-replace')
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
    compilerOptions: {
      dev: isDev,
    },
    preprocess: sveltePreprocess(sveltePreprocessConfig),
  }),
  css({ output: `bundle.css` }),
  resolve({
    browser: true,
    dedupe: ['svelte'],
  }),
  commonjs(),
  replace({
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
  }),
  typescript({ sourceMap: isDev }),
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
  watch: {
    clearScreen: false,
  },
}
