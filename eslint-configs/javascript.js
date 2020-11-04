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
  overrides: [
    {
      plugins: ['no-secrets'],
      rules: {
        'no-secrets/no-secrets': 'error',
      },
      files: ['*', '**/*'],
      excludedFiles: ['*.json', '**/*.json'],
    },
  ],
  plugins: [
    '@cypress/json',
    'array-func',
    'compat',
    'eslint-comments',
    'import',
    'jest',
    'lodash-fp',
    'no-use-extend-native',
    'no-constructor-bind',
    'optimize-regex',
    'promise',
    'ramda',
    'simple-import-sort',
    'sonarjs',
    'switch-case',
    'unicorn',
  ],
  rules: {
    'import/order': 'off',
    'sort-imports': 'off',
    'simple-import-sort/sort': 'error',

    'array-func/prefer-array-from': 'off',

    'import/no-anonymous-default-export': 'off',

    'no-constructor-bind/no-constructor-bind': 'error',
    'no-constructor-bind/no-constructor-state': 'error',

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
  },
  settings: {
    'json/json-with-comments-files': [],
    'json/package-json-sort-order': [
      'name',
      'version',
      'private',
      'description',
      'license',
      'keywords',
      'author',
      'repository',
      'homepage',
      'bugs',
      'engines',
      'scripts',
      'bin',
      'type',
      'exports',
      'main',
      'types',
      'typesVersions',
      'files',
      'browser',
      'workspaces',
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'resolutions',
      'eslintConfig',
      'prettier',
    ],
  },
}
