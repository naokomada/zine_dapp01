module.exports = {
  root: true,
  // This tells ESLint to stop looking in parent folders
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
  },
  rules: {
    // You can add custom rules here
  },
};