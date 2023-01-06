/* eslint-disable no-new */
const { logger } = require('@titian-design/cli');
const Compiler = require('./BasicCompiler');

process.on('unhandledRejection', (error) => {
  logger.error('compiler', error);
});

function start(...args) {
  new Compiler(...args);
}

function build(...args) {
  new Compiler(...args);
}

function release() {
  logger.error('compiler', 'release is not supported');
}

module.exports = {
  start,
  build,
  release,
  Compiler
};
