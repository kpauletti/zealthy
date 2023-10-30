/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    env: {
        es6: true,
        node: true
    },
    ignorePatterns: ['*.js'],
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        "eslint/padded-blocks": ["error", "always"],
    }
  };