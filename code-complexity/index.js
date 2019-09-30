/**
 * 代码复杂度检测
 */

const eslint = require('eslint');
const scan = require('c-scan');


const { CLIEngine } = eslint;

const cli = new CLIEngine({
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        complexity: [
            'error',
            { max: 0 }
        ]
    },
    useEslintrc: false
});

/**
 * 提取函数类型正则
 */
const REG_FUNC_TYPE = /^(Method |Async function |Arrow function |Function )/g;

/**
 * eslint提示前缀
 */
const MESSAGE_PREFIX = 'Maximum allowed is 1.';

/**
 * eslint提示后缀
 */
const MESSAGE_SUFFIX = 'has a complexity of ';

/**
 * 提取mssage主要部分
 * @param {*} message 
 */
function getMain(message) {
    return message.replace(MESSAGE_PREFIX, '').replace(MESSAGE_SUFFIX, '');
}

/**
 * 提取代码复杂度
 * @param {*} message 
 */
function getComplexity(message) {
    const main = getMain(message);
    (/(\d+)\./g).test(main);
    return +RegExp.$1;
}

/**
 * 获取函数名
 * @param {*} message 
 */
function getFunctionName(message) {
    const main = getMain(message);
    let test = /'([a-zA-Z0-9_$]+)'/g.test(main);
    return test ? RegExp.$1 : '*';
}

/**
 * 提取函数类型
 * @param {*} message 
 */
function getFunctionType(message) {
    let hasFuncType = REG_FUNC_TYPE.test(message);
    return hasFuncType ? RegExp.$1 : '';
}

/**
 * 提取文件名称
 * @param {*} filePath 
 */
function getFileName(filePath) {
    return filePath.replace(process.cwd(), '').trim();
}

/**
 * 获取重构建议
 * @param {*} complexity 
 */
function getAdvice(complexity) {
    if (complexity > 15) {
        return '强烈建议';
    } else if (complexity > 10) {
        return '建议';
    } else {
        return '无需';
    }
}

/**
 * 获取单个文件的复杂度
 */
function executeOnFiles(paths, min) {
    const reports = cli.executeOnFiles(paths).results;
    const result = [];
    const fileCount = paths.length;
    let funcCount = 0;
    for (let i = 0; i < reports.length; i++) {
        const { messages, filePath } = reports[i];
        for (let j = 0; j < messages.length; j++) {
            const { message, ruleId, line, column } = messages[j];
            funcCount++;
            if (ruleId === 'complexity') {
                const complexity = getComplexity(message);
                if (complexity >= min) {
                    result.push({
                        funcType: getFunctionType(message),
                        funcName: getFunctionName(message),
                        position: line + ',' + column,
                        fileName: getFileName(filePath),
                        complexity,
                        advice: getAdvice(complexity)
                    });
                }
            }
        }
    }
    return { fileCount, funcCount, result };
}

/**
 * 执行扫描
 * @param {*} scanParam 扫描参数，具体参见 c-scan
 * @param {*} min 最小代码复杂度 , 大于此值不会被添加到结果
 */
module.exports = async function (scanParam = {}, min = 1) {

    const files = await scan(scanParam);

    return executeOnFiles(files, min);

};
