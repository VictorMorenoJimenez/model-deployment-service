module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:fp/recommended',
    'plugin:ramda/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['fp', 'ramda'],
  rules: {
    'import/prefer-default-export': 'warn',
    'implicit-arrow-linebreak': 'off',
    'object-curly-spacing': ['warn', 'always'],
    'no-underscore-dangle': ['error', { allow: ['__'] }],
    'fp/no-class': 'warn',
    'fp/no-loops': 'error',
    'fp/no-mutating-methods': 'warn',
    'fp/no-mutation': 'warn',
    'fp/no-mutating-methods': [
      'warn',
      { allowedObjects: ['_', 'R', 'fp', 'Actions'] },
    ],
    'fp/no-nil': 'off',
    'fp/no-rest-parameters': 'off',
    'fp/no-unused-expression': 'off',
    'fp/no-mutation': 'error',
  },
};