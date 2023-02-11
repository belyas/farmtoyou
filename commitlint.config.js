const Configuration = {
  'extends': ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', 'upper-case'],
    'scope-empty': [2, 'never'],
  },
}

module.exports = Configuration
