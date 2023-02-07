// eslint-disable-next-line @typescript-eslint/no-var-requires
const typeEnum = require('./cz-customizable.config');

/**
 * @see https://commitlint.js.org/
 * @see https://juejin.cn/post/6979054290526535717
 * 默认 @commitlint/config-conventional 约束规则 &&  自定义约束规则
 * 约束调用方 @commitlint/cli
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // feat ...
    'type-enum': [2, 'always', typeEnum.types.map((i) => i.value)],
    // 单词格式
    'type-case': [0, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', typeEnum.subjectLimit]
  }
};
