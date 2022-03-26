module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: '2021',
    ecmaFeatures: { jsx: true },
  },

  ignorePatterns: [
    '.eslint*',
    '**/dist/',
    '**/node_modules'
  ],
  plugins: ['react-hooks'],
  rules: {
    'eol-last': 'error',
    // Indentation
    'no-mixed-spaces-and-tabs': 2,
    indent: [2, 2],
    offsetTernaryExpressions: 0,
    // Variable names
    camelcase: 2,
    // Language constructs
    curly: 2,
    'func-style': [2, 'expression'],
    'no-var': 2,
    'prefer-const': 2,
    // Semicolons
    semi: 2,
    'no-extra-semi': 2,
    // Padding & additional whitespace (preferred but optional)
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'semi-spacing': 1,
    'key-spacing': 1,
    'block-spacing': 1,
    'comma-spacing': 1,
    'no-multi-spaces': 1,
    'space-before-blocks': 1,
    'keyword-spacing': [1, { before: true, after: true }],
    'space-infix-ops': 1,
    // Minuta
    'comma-style': [2, 'last'],
    quotes: [1, 'single']
  },
};


// module.exports = {
//   env: {
//     es2021: true,
//     node: true,
//   },
//   extends: [
//     'airbnb-base',
//   ],
//   parserOptions: {
//     ecmaVersion: 12,
//   },
//   rules: {
//     'linebreak-style': 0,
//     'no-console': ['error', { allow: ['warn', 'error'] }],
//   },
// };
