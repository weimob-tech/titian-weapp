const { performance } = require('perf_hooks');
const { logger } = require('@titian-design/cli');
const colors = require('colors');

const time = (name) => ({
  name: 'Log',
  setup(build) {
    let startTime = performance.now();

    build.onStart(() => {
      startTime = performance.now();
      logger.info(`Build${name ? ` ${colors.green(name)} ` : ' '}start...`);
    });

    build.onEnd(() => {
      const endTime = performance.now() - startTime;
      const totalTime = (endTime / 1000).toFixed(3);
      logger.info('compiler', `Build${name ? ` ${colors.green(name)} ` : ' '}ended: ${colors.yellow(`${totalTime}s`)}`);
    });
  }
});

module.exports = time;
