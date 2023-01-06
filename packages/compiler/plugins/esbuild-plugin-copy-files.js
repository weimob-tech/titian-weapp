const path = require('path');
const { logger, pathExistsSync } = require('@titian-design/cli');
const fs = require('fs-extra');
const glob = require('tiny-glob');
// const { addHoverClass } = require('../../../tasks/addHoverClass');

const getAllFiles = async (selector, cwd) => {
  let ret = [];

  if (selector && cwd) {
    ret = await glob(selector, {
      cwd
    });
  }
  return ret.filter((i) => !i.includes('__test__'));
};

const esbuildPluginCopyFiles = (selector) => {
  const rootPath = process.cwd();

  return {
    name: 'files-cp',
    setup(build) {
      build.onStart(async () => {
        if (!build.initialOptions.metafile) {
          logger.error('compiler', 'please set metafile');
          process.exit(1);
        }
      });

      build.onEnd(async ({ errors, metafile }) => {
        const set = new Set();
        if (errors.length > 0) {
          return;
        }

        const { outputs } = metafile;

        Object.keys(outputs).forEach((item) => {
          const dirname = path.dirname(outputs[item].entryPoint);
          const outputDirname = path.dirname(item);
          const sourceDir = path.join(rootPath, dirname);

          getAllFiles(selector, sourceDir).then((files) => {
            files.forEach((file) => {
              const needCpFile = path.join(sourceDir, file);
              if (set.has(needCpFile)) {
                return;
              }
              set.add(needCpFile);
              const targetFile = path.join(rootPath, outputDirname, file);

              if (pathExistsSync(needCpFile)) {
                try {
                  fs.copySync(needCpFile, targetFile, { overwrite: true });

                  // 给外层view添加hover-class,帮助UI验收使用。待删
                  // if (process.env.NODE_ENV === 'production' && selector === '**/*.wxml') {
                  //   addHoverClass(targetFile);
                  // }

                  logger.debug('compiler', `copy file ${needCpFile} to ${targetFile} success`);
                } catch (err) {
                  logger.debug('compiler', err);
                  logger.error('compiler', `copy file ${needCpFile} to ${targetFile} failed`);
                }
              }
            });
          });
        });
      });
    }
  };
};

module.exports = esbuildPluginCopyFiles;
