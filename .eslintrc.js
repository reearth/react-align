module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  rules: {
    'import/newline-after-import': 'warn',
    'import/no-anonymous-default-export': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
