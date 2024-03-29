module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {

    'no-underscore-dangle': ['error', { allow: ['_id'] }],

  },
  plugins: [
    prettier
  ]
};
