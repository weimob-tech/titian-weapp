const esbuildPluginCopyFiles = require('./esbuild-plugin-copy-files');
const esbuildPluginPostcssLess = require('./esbuild-plugin-postcss-less');
const esbuildPluginSWC = require('./esbuild-plugin-swc');
const esbuildPluginTime = require('./esbuild-plugin-time');

module.exports = {
  esbuildPluginPostcssLess,
  esbuildPluginCopyFiles,
  esbuildPluginTime,
  esbuildPluginSWC
};
