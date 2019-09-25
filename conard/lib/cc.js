#!/usr/bin/env node
const cc = require('c-complexity');
const logger = require('../utils/logger');


module.exports = async function (param) {

    logger.loading('正在执行检测');

    const start = Date.now();

    const {
        min,
        rootPath = '',
        defalutIgnore = true,
        ignoreFileName = '.gitignore'
    } = param;

    const ccResult = await cc({
        rootPath,
        defalutIgnore,
        ignoreFileName
    }, min);

    logger.stop();

    const { fileCount, funcCount, result } = ccResult;

    logger.success(`检测完成,耗费${Date.now() - start}ms，共检测【${fileCount}】个文件，【${funcCount}】个函数，其中可能存在问题的函数【${result.length}】个`);

    if (result.length) {
        logger.table(result);
    } else {
        logger.info('你的代码非常棒！');
    }

};