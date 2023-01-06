module.exports = {
  '!(.)*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{css,less,scss,wxss}': ['stylelint --fix', 'prettier --write'],
  '*.{md,wxs}': ['prettier --write']
};
