const updater = require('update-notifier');
const chalk = require('chalk');
const pkg = require('../package.json');
const logger = require('../utils/logger');

/**
 * 一天提醒一次
 */
const updateCheckInterval = 1000 * 60 * 60 * 24;
const WARNING_BG_COLOR = '#f75f00';
const WARNING_COLOR = '#f7e8f6';

module.exports = function () {
  const notifier = updater({
    pkg,
    updateCheckInterval,
  });
  const updateInfo = notifier.update;
  if (updateInfo) {
    const current = chalk.hex(WARNING_COLOR)(updateInfo.current);
    const latest = chalk.hex(WARNING_BG_COLOR)(updateInfo.latest);
    logger.info('---------------------------------------');
    logger.info(`conard 有新版本发布了 ${current} -> ${latest}`);
    logger.info('执行 npm i -g conard 执行更新！');
  }
};