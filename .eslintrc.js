module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-warning-comments': ['warn', { terms: ['todo', 'fixme'], location: 'start' }],
    'no-console': 'error',
    'no-trailing-spaces': ['error'],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 2
      }
    ],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'max-len': [
      'warn',
      {
        ignorePattern: '^import |// import',
        code: 120
      }
    ]
  },
  overrides: [
    {
      files: ['*.component.html'],
      parser: '@angular-eslint/template-parser',
      rules: {
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        strict: 'off',
        'import/first': 'off',
        'lines-around-directive': 'off'
      },
      plugins: ['@angular-eslint/template']
    }
  ]
};
