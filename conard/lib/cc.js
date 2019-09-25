#!/usr/bin/env node
const cc = require('c-complexity');


module.exports = async function (param) {
    console.log('正在执行检测');
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

    const { fileCount, funcCount, result } = ccResult;
    console.log(`检测完成,耗费${Date.now() - start}ms，共检测【${fileCount}】个文件，【${funcCount}】个函数，其中可能存在问题的函数【${result.length}】个`);
    if (result.length) {
        console.table(result);
    } else {
        console.log('你的代码非常棒！');
    }
};