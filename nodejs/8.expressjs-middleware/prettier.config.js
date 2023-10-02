module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  jsxSingleQuote: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'auto',
  overrides: [
    {
      files: ['*.json'],
      options: {
        tabWidth: 2,
      },
    },
    {
      files: ['*.html'],
      options: {
        tabWidth: 2,
      },
    },
  ],
};

