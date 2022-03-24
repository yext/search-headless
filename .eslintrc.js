module.exports = {
  extends: [
    '@yext/slapshot/typescript'
  ],
  overrides: [
    {
      files: ['src/transformers/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      }
    }
  ],
  ignorePatterns: [
    'lib',
    'scripts',
    'test-site-node',
    'dist'
  ],
};
