module.exports = {
  root: true,
  extends: '@react-native-community',
  'linebreak-style': [
    'error',
    require('os').EOL === '\r\n' ? 'windows' : 'unix',
  ],
  'prettier/prettier': ['error', {endOfLine: 'auto'}],
};
