/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
        },
      },
    },
  },
  rules: {
    'linebreak-style': 0,
    // 'vue/no-irregular-whitespace': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0,
    'vue/no-unused-components': 0,
    // 'no-irregular-whitespace': 0,
    'no-unused-vars': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
  },
};
