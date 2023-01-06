const pretty = require('pretty');
const { wxmlParser } = require('./parser');

const languages = [
  {
    name: 'wxml',
    parsers: ['wxml'],
    extensions: ['.wxml']
  }
];

const parsers = {
  wxml: {
    astFormat: 'wxml',
    parse: (text) => text
  }
};

const spaceBetweenTags = (string) =>
  string
    .replace(/{({?)\s*/g, '{$1 ')
    .replace(/"\s+({{)/g, '"$1')
    .replace(/(\s*(}?)})/g, ' $2}')
    .replace(/(}})\s+"/g, '$1"');

const bindWithColon = (string) =>
  string
    .replace(/bind(:?)([a-zA-Z]*=)/g, 'bind:$2')
    // .replace(/mark(:?)([a-zA-Z]*=)/g, 'mark:$2')
    .replace(/catch(:?)([a-zA-Z]*=)/g, 'catch:$2')
    .replace(/capture-bind(:?)([a-zA-Z]*=)/g, 'capture-bind:$2')
    .replace(/capture-catch(:?)([a-zA-Z]*=)/g, 'capture-catch:$2')
    .replace(/mut-bind(:?)([a-zA-Z]*=)/g, 'mut-bind:$2');

const printWxml = (path, options) => {
  const { endLine } = options;
  let result = path.getValue();
  if (!result) return '';

  result = pretty(result);

  result = spaceBetweenTags(result); // {{xxx}} => {{ xxx }}

  result = bindWithColon(result); // bind:xxx / bindxxx => bind:xxx

  result = wxmlParser(result, options); // attrName => attr-name

  return result.replace(/\n*$/, endLine === 'lf' ? '\n' : '\r\n');
};

const printers = {
  wxml: {
    print: printWxml
  }
};

module.exports = {
  languages,
  parsers,
  printers
};
