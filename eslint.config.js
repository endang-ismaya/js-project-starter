// ESLint 9 flat config - replaces legacy .eslintrc.json format

const { FlatCompat } = require('@eslint/eslintrc');
const nodePlugin = require('eslint-plugin-n');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  { ignores: ['**/node_modules/', '**/dist/', '**/coverage/'] },

  // airbnb flat config PR pending - use FlatCompat workaround
  ...compat.extends('airbnb'),

  // eslint-plugin-n replaces deprecated eslint-plugin-node
  nodePlugin.configs['flat/recommended-script'],

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.browser, ...globals.node, ...globals.es2021 },
    },
  },

  {
    rules: {
      'spaced-comment': 'off',
      'no-console': 'off',
      'consistent-return': 'off',
      'func-names': 'off',
      'object-shorthand': 'off',
      'no-process-exit': 'off',
      'no-param-reassign': 'off',
      'no-return-await': 'off',
      'no-underscore-dangle': 'off',
      'class-methods-use-this': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'n/no-unpublished-require': 'off',
    },
  },

  // prettier config MUST be last - disables conflicting ESLint formatting rules
  eslintPluginPrettierRecommended,
];
