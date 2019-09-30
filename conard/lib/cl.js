#!/usr/bin/env node
const cl = require('c-line-sys');
const logger = require('../utils/logger');

const TABLE_HEAD = ['文件类型', '数量', '代码行数', '空行', '总行数'];

const EXTENSIONS = '**/+(*.js|*.md|*.cpp|*.py|*.ts|*.tsx|*.jsx|*.vue|*.json|*.c|*.h|*.c++|*.java|*.php|*.html|*.ejs|*.css|*.sass|*.less|*.sql|*.dart|*.xml|*.go|*.svg|*.cc|*.CPP|*.cpp|*.cxx|*.h++|*.inl|*.ipp|*.pcc|*.tcc|*.tpp|*.jsp)';

const hanleResult = target => {
    const result = target.map(t => [t.name, t.files, t.codeLine, t.blankLine, t.allLine]);
    result.unshift(TABLE_HEAD);
    return result;
};

module.exports = async function (param) {

    logger.loading('正在执行代码行数检测...');

    const start = Date.now();

    const {
        extensions = EXTENSIONS,
        rootPath = '',
        defalutIgnore = true,
        ignoreFileName = '.gitignore',
        ignoreRules = ['node_modules']
    } = param;

    const result = await cl({ extensions, rootPath, defalutIgnore, ignoreFileName, ignoreRules });

    logger.stop();

    const { data, sys } = result;

    logger.success(`检测完成,耗费${Date.now() - start}ms`);

    if (sys.length) {
        logger.table(hanleResult(sys));
    }

    process.exit(0);

};