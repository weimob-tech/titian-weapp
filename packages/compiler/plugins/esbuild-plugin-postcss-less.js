const fs = require('fs');
const { join } = require('path');
const { logger } = require('@titian-design/cli');
const postcss = require('postcss');
const postcssRc = require('postcss-load-config');

module.exports = {
  name: 'postcss-less',
  async setup(build) {
    const baseDir = process.cwd();

    let config = {
      plugins: {
        autoprefixer: {},
        cssnano: {
          preset: 'default'
        },
        'postcss-pxtorpx': {
          multiplier: 1,
          minPixelValue: 2,
          propList: ['*']
        }
      }
    };

    try {
      config = await postcssRc();
    } catch (e) {
      logger.debug('esbuild plugin postcss less', 'no postcss.config.js found, use default config');
      config = await postcssRc({ env: process.env.NODE_ENV, cwd: __dirname }, __dirname);
    }

    // count 为了防止有class导致的重复插入
    const replace = (sourceCode, count = 0) => {
      if (sourceCode.indexOf('inset:') > -1 && count < 3) {
        const newSource = sourceCode.replace(/(inset:([a-zA-Z0-9%\s]*));/g, (_s, _p1, p2) => {
          const [t, r = t, b = t, l = r] = p2.split(' ').filter(Boolean);
          return `top: ${t}; left: ${r}; bottom: ${b}; right: ${l};`;
        });
        return replace(newSource, count + 1);
      }
      return sourceCode;
    };

    build.onEnd(async (result) => {
      const { outputs } = result.metafile;
      await Object.keys(outputs).reduce(async (_p, cur) => {
        const outputFile = join(baseDir, cur);

        const sourceCode = await fs.promises.readFile(outputFile, 'utf8');
        const { css } = await postcss(config.plugins).process(sourceCode, {
          from: outputFile.replace(/\.wxss$/, '.css')
        });
        const newSource = replace(css);

        // 给外层view添加hover-class, popup添加border, 帮助UI验收使用。待删
        // if (process.env.NODE_ENV === 'production') {
        //   if (outputFile.includes('popup')) {
        //     newSource += '.titian-popup-mask{border: 1px solid red;}';
        //   } else {
        //     newSource += '.hover-titian-ui{opacity: 0.1 !important}';
        //   }
        // }

        await fs.promises.writeFile(outputFile, newSource.replace(/(\/\**\s*!)/g, '/*'), 'utf-8');
      }, Promise.resolve());
    });
  }
};
