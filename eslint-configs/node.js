module.exports = {
  env: {
    node: true,
  },
  extends: ['plugin:node/recommended'],
  plugins: ['node'],
  rules: {
    'node/no-exports-assign': 'off',
    'node/no-extraneous-import': 'off',
    'node/no-missing-import': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=14.0.0',
        ignores: ['modules'],
      },
    ],
  },
}
