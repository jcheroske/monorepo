module.exports = {
  env: {
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  reportUnusedDisableDirectives: true,
  extends: [
    'eslint:recommended',
    'plugin:array-func/all',
    'plugin:compat/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/all',
    'plugin:lodash-fp/recommended',
    'plugin:optimize-regex/all',
    'plugin:promise/recommended',
    'plugin:ramda/recommended',
    'plugin:sonarjs/recommended',
    'plugin:switch-case/recommended',
    'plugin:unicorn/recommended',
    'xo/esnext',
  ],
  plugins: [
    'array-func',
    'compat',
    'eslint-comments',
    'import',
    'jest',
    'lodash-fp',
    'no-constructor-bind',
    'no-secrets',
    'no-use-extend-native',
    'optimize-regex',
    'promise',
    'ramda',
    'simple-import-sort',
    'sonarjs',
    'switch-case',
    'unicorn',
  ],
  root: true,
  rules: {
    'import/order': 'off',
    'sort-imports': 'off',
    'simple-import-sort/sort': 'error',

    'array-func/prefer-array-from': 'off',

    'capitalized-comments': 'off',

    'import/no-anonymous-default-export': 'off',

    'no-constructor-bind/no-constructor-bind': 'error',
    'no-constructor-bind/no-constructor-state': 'error',

    'no-secrets/no-secrets': 'error',

    'no-use-extend-native/no-use-extend-native': 'error',

    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',

    'switch-case/newline-between-switch-case': [
      'error',
      'always',
      { fallthrough: 'never' },
    ],

    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-reduce': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
}
