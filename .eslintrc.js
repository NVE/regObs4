module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/indent': ['error', 2],
    'no-warning-comments': ['warn', { terms: ['todo', 'fixme'], location: 'start' }],
    'no-console': 'error',
    'no-trailing-spaces': ['error'],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 2
      }
    ]
  }
};
