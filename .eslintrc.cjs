module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    // "ecmaVersion": 6,
    sourceType: 'module',
  },
  globals: {
    fetch: true,
  },
  plugins: ['@typescript-eslint', 'jsdoc', 'security', 'unicorn'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
    'plugin:security/recommended',
    'plugin:unicorn/recommended',
  ],

  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],

    'jsdoc/no-undefined-types': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns': 'off',
    // 'jsdoc/require-property-description': 'off',
    'jsdoc/valid-types': 'off',

    'unicorn/no-nested-ternary': 'off',
  },
};
