const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const simulate = require('miniprogram-simulate');

const cache = new Map();
const idCache = new Map();

/**
 * 获取随机 id，生成 15 位
 */
let seed = 1e14 + Math.floor(Math.random() * 9e14);
const charString = 'abcdefghij';

function getId(_path) {
  if (idCache.has(_path)) {
    return idCache.get(_path);
  }
  seed += 1;
  const id = seed;
  const random = id
    .toString()
    .split('')
    .map((item) => charString[+item])
    .join('');

  idCache.set(path, random);
  return random;
}

const getBehavior = function getBehavior(behaviorPath, ...args) {
  const oldBehavior = global.Behavior;
  global.Behavior = (options) => {
    const id = getId(behaviorPath);

    if (cache.has(id)) {
      return cache.get(id);
    }

    cache.set(id, options);
    return id;
  };

  // eslint-disable-next-line import/no-dynamic-require
  const req = require(path.resolve(behaviorPath)).default;
  let behaviorId;

  if (typeof req === 'function') {
    behaviorId = req(...args);
  } else {
    behaviorId = req;
  }

  const behavior = simulate.behavior(cache.get(behaviorId));
  global.Behavior = oldBehavior;
  return behavior;
};

module.exports = {
  getBehavior
};
