/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-underscore-dangle */
global.getRegExp = (...args) => new RegExp(...args);

global.PREFIX = 'titian';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.getCurrentPages = () => [{}];

global.CACHE = {};
global.ID_CACHE = new Map();
// eslint-disable-next-line no-underscore-dangle
global.__TITAN_CHANNEL__ = 'MP-WEIXIN';

jest.mock('j-component/src/tool/utils', () => {
  const originalModule = jest.requireActual('j-component/src/tool/utils');
  const path = require('path');
  const os = require('os');

  return {
    ...originalModule,
    cache(id: string, instance: any) {
      if (instance?.path) {
        let normalPath = path.normalize(instance.path);
        if (os.platform() !== 'win32') {
          normalPath = path.resolve('/', normalPath);
        }
        global.ID_CACHE.set(normalPath, id);
      }

      if (instance) {
        // 存入缓存
        global.CACHE[id] = instance;
        return null;
      }
      // 取缓存
      return global.CACHE[id];
    }
  };
});
