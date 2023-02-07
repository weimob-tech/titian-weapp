const fs = require('fs');
const { join } = require('path');
const swc = require('@swc/core');

module.exports = () => ({
  name: 'ts-swc',
  setup(build) {
    const baseDir = process.cwd();

    build.onEnd(async (result) => {
      const { outputs } = result.metafile;
      await Object.keys(outputs).reduce(async (_p, cur) => {
        const entryFile = join(baseDir, outputs[cur].entryPoint);
        const outputFile = join(baseDir, cur);
        const sourceCode = await fs.promises.readFile(entryFile, 'utf8');
        const output = await swc.transform(sourceCode, {
          sourceMaps: true,
          jsc: {
            parser: {
              syntax: 'typescript',
              decorators: true,
              dynamicImport: true
            },
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true
            },
            target: 'es2021',
            keepClassNames: true,
            loose: true
          },
          module: {
            type: 'es6',

            // These are defaults.
            strict: true,
            strictMode: true,
            lazy: false,
            noInterop: false
          }
        });
        await fs.promises.writeFile(outputFile, output.code, 'utf-8');
      }, Promise.resolve());
    });
  }
});
