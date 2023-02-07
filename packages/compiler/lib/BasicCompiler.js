/* eslint-disable class-methods-use-this */
const path = require('path');
const { Command, logger } = require('@titian-design/cli');
const esbuild = require('esbuild');
const { dtsPlugin } = require('esbuild-plugin-d.ts');
const { lessLoader } = require('esbuild-plugin-less');
const glob = require('tiny-glob');
const watch = require('watch');
const { esbuildPluginPostcssLess, esbuildPluginCopyFiles, esbuildPluginTime, esbuildPluginSWC } = require('../plugins');

const FILE_TYPE = {
  JS: '.js',
  TS: '.ts',
  LESS: '.less',
  CSS: '.css',
  JSON: '.json',
  PNG: '.png',
  JPG: '.jpg',
  JPEG: '.jpeg',
  GIF: '.gif',
  SVG: '.svg',
  WXML: '.wxml',
  WXS: '.wxs',
  WXSS: '.wxss',
  MD: '.md'
};

process.on('unhandledRejection', (error) => {
  logger.error('compiler', error);
});

class BasicCompiler extends Command {
  async buildLess(less) {
    if (!Array.isArray(less)) return null;
    if (less.length === 0) return null;
    if (less.length === 1) {
      const hasCommon = less.some((item) => item.includes('common'));

      if (hasCommon) {
        less = this.lessFiles;
      }
    }

    const isProd = process.env.NODE_ENV === 'production';

    return esbuild.build({
      entryPoints: less,
      outdir: this.buildPath,
      outbase: this.entryPath,
      minifyWhitespace: !!isProd,
      charset: 'utf8',
      metafile: true,
      plugins: [esbuildPluginPostcssLess, lessLoader(), esbuildPluginTime('less')],
      outExtension: {
        '.css': '.wxss'
      }
    });
  }

  async pickChangedFiles(changedFiles) {
    const ret = {};
    if (!Array.isArray(changedFiles) || changedFiles.length === 0) return ret;

    if (changedFiles.length > 1) {
      ret.type = 'all';
      return ret;
    }
    const file = changedFiles[0];

    if (file.endsWith(FILE_TYPE.TS)) {
      ret.type = 'ts';
      ret.file = [file];
      return ret;
    }
    if (file.endsWith(FILE_TYPE.MD)) {
      ret.type = 'md';
    } else if (file.endsWith(FILE_TYPE.JSON)) {
      ret.type = 'json';
    } else if (file.endsWith(FILE_TYPE.WXS)) {
      ret.type = 'wxs';
    } else if (file.endsWith(FILE_TYPE.WXML)) {
      ret.type = 'wxml';
    } else {
      ret.type = 'all';
    }

    const dir = path.dirname(file);
    const files = await this.getGlobFiles('**/*.{js,ts,json,wxml,wxs,md}', dir);
    const scriptFiles = files.filter((f) => f.endsWith('.ts') || f.endsWith('.js'));

    // no script file
    if (scriptFiles.length === 0) {
      ret.file = [this.tsFiles[0]];
      return ret;
    }

    // more than one script files
    ret.file = [scriptFiles.map((f) => path.join(dir, f))[0]];
    return ret;
  }

  async buildTs(changedFiles) {
    const ret = await this.pickChangedFiles(changedFiles);
    if (this.tsFiles.length === 0) return null;
    const entryPoints = ret.type !== 'all' ? ret.file : this.tsFiles;

    this.logger.debug('compiler', 'ts build entry points: ', entryPoints);

    return esbuild.build({
      entryPoints,
      outdir: this.buildPath,
      outbase: this.entryPath,
      format: 'esm',
      charset: 'utf8',
      metafile: true,
      plugins: [
        esbuildPluginSWC(),
        dtsPlugin(),
        (ret.type === 'all' || ret.type === 'json') && esbuildPluginCopyFiles('**/*.json'),
        (ret.type === 'all' || ret.type === 'wxs') && esbuildPluginCopyFiles('**/*.wxs'),
        (ret.type === 'all' || ret.type === 'wxml') && esbuildPluginCopyFiles('**/*.wxml'),
        esbuildPluginTime('ts')
      ].filter(Boolean)
    });
  }

  async beforeInit() {
    const { entryPath, output } = this.config;

    if (!entryPath) {
      this.logger.error('compiler', 'entry path is required');
      process.exit(1);
    }

    if (!output?.path) {
      this.logger.error('compiler', 'output path is required');
      process.exit(1);
    }

    this.entryPath = this.config.entryPath;
    this.buildPath = this.config.output.path;
    this.typesDir = this.config.typesDir;
    this.tsconfig = path.isAbsolute(this.config.tsconfig)
      ? this.config.tsconfig
      : path.join(this.config.root, this.config.tsconfig);

    super.beforeInit();
  }

  async init() {
    await this.getAllFiles();
  }

  async getGlobFiles(selector, cwd) {
    const files = (
      await glob(selector, {
        cwd,
        filesOnly: true,
        flush: true
      })
    ).filter((i) => !i.includes('__test__'));

    return files;
  }

  async getAllFiles() {
    const files = await this.getGlobFiles('**/*', this.entryPath);

    this.tsFiles = files.filter((file) => file.endsWith('.ts')).map((file) => path.resolve(this.entryPath, file));
    this.lessFiles = files.filter((file) => file.endsWith('.less')).map((file) => path.resolve(this.entryPath, file));
  }

  async run() {
    await Promise.all([this.buildTs(this.tsFiles), this.buildLess(this.lessFiles)]).then(() => {
      this.logger.info('compiler', 'build success');
    });
  }

  afterRun() {
    if (process.env.NODE_ENV === 'development') {
      watch.watchTree(this.entryPath, { interval: 1, ignoreDirectoryPattern: /__test__/ }, (f, curr, prev) => {
        try {
          if (typeof f === 'object' && prev === null && curr === null) {
            this.logger.info('compiler', 'watching ...');
          } else {
            let type = 'changed';
            if (prev === null) {
              type = 'added';
            } else if (curr.nlink === 0) {
              type = 'deleted';
            }

            this.logger.info('compiler', `file ${type}:`, f);

            this.getAllFiles().then(() => {
              if (f.endsWith('.less')) {
                this.buildLess([f]).then(async () => {
                  await this.hooks.watch.call(null, f);
                  this.logger.info('compiler', 'rebuild success');
                });
              } else {
                this.buildTs([f]).then(async () => {
                  await this.hooks.watch.call(null, f);
                  this.logger.info('compiler', 'rebuild success');
                });
              }
            });
          }
        } catch (e) {
          this.logger.error('compiler', e);
          process.exit(0);
        }
      });
    }

    super.afterRun();
  }
}

module.exports = BasicCompiler;
