module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['standard', 'prettier', 'plugin:prettier/reccomended'],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'error'
  }
}