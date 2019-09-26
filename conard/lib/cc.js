#!/usr/bin/env node
const cc = require('c-complexity');
const logger = require('../utils/logger');

const hanleResult = result => result.map(r => ({
    ['函数名']: r.funcName,
    ['位置']: `${r.fileName} [${r.position}]`,
    ['函数类型']: r.funcType,
    ['复杂度']: r.complexity,
    ['重构建议']: `${r.advice}重构`,
}));

module.exports = async function (param) {

    logger.loading('正在执行检测');

    const start = Date.now();

    const {
        min = 10,
        rootPath = '',
        defalutIgnore = true,
        ignoreFileName = '.gitignore',
        ignoreRules = ['node_modules']
    } = param;

    const ccResult = await cc({
        rootPath,
        defalutIgnore,
        ignoreFileName,
        ignoreRules
    }, min);

    logger.stop();

    const { fileCount, funcCount, result } = ccResult;

    logger.success(`检测完成,耗费${Date.now() - start}ms，共检测【${fileCount}】个文件，【${funcCount}】个函数，其中可能存在问题的函数【${result.length}】个`);

    if (result.length) {
        console.table(hanleResult(result));
    } else {
        logger.info('你的代码非常棒！');
    }

};