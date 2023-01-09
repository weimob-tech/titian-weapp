const path = require('path');
const { wxTool } = require('./tasks/watchWxOutput');
// const { webhook } = require('./tasks/webhook');

function watch(hook) {
  
  // TODO example 自动构建
  // hook.afterRun.tap('build', wxTool.packNpm);
  // hook.watch.tap('packNpmWatch', wxTool.packNpmDebounce);
  hook.release.tap('release', ({ release, data }) => {
    // webhook(data);
    if (release) {
      wxTool.upload();
    }
  });
}

module.exports = (config) => ({
  basedir: __dirname,
  compiler: config.command === 'release' ? '@titian-design/compiler' : path.join(__dirname, 'packages/compiler'),
  version: '0.1.4',
  entryPath: path.resolve(__dirname, 'packages', 'weapp', 'src'),
  output: {
    path: path.join(__dirname, 'packages', 'weapp', 'esm')
  },
  tsconfig: './tsconfig.json',
  typesDir: path.join(__dirname, 'packages', 'weapp', 'types'),
  hooks: [watch],
  mainPackage: '@titian-design/weapp'
});
