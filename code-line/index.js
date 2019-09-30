/**
 * 代码复杂度检测
 */
const fs = require('fs');
const scan = require('c-scan');

const DEFAULT_PARAM = {
    extensions: '**/+(*.js|*.md|*.cpp|*.py|*.ts|*.tsx|*.jsx|*.vue|*.json|*.c|*.h|*.c++|*.java|*.php|*.html|*.ejs|*.css|*.sass|*.less|*.sql|*.dart|*.xml|*.go|*.svg|*.cc|*.CPP|*.cpp|*.cxx|*.h++|*.inl|*.ipp|*.pcc|*.tcc|*.tpp|*.jsp)'
    // extensions: '**/+(*.*)'
};

/**
 * 获取文件类型
 * @param {*} path 
 */
function getFileType(path) {
    const matches = /\.[\w]+$/.exec(path);
    return matches ? matches[0].replace('.', '') : '';
}

/**
 * 计算单个文件的代码行数
 * @param {*} file 
 */
function getLine(file) {
    try {
        const fileContent = fs.readFileSync(file).toString();
        const codeArray = fileContent.split('\n');
        const allLine = codeArray.length;
        const codeLine = codeArray.filter(c => c).length;
        const blankLine = allLine - codeLine;
        const type = getFileType(file);
        if (type && allLine) {
            return {
                file,
                type,
                codeLine,
                blankLine,
                allLine
            };
        }
    } catch (error) {
        // 类似 .git 类的文件夹会根据规则被匹配为文件。
    }
}

/**
 * 获取代码行数
 */
function getCodeLine(files) {
    const result = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const line = getLine(file);
        if (line) {
            result.push(line);
        }
    }
    return result;
}

/**
 * 处理统计结果
 */
function formatSys(sys) {
    const array = [];
    const keys = Object.keys(sys);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        array.push({
            name: key,
            ...sys[key]
        });
    }
    return array.sort((a, b) => b.allLine - a.allLine);
}

/**
 * 统计源文件代码情况
 * @param {*} data 
 */
function getSys(datas) {
    const result = {};
    for (let i = 0; i < datas.length; i++) {
        const { type, codeLine, blankLine, allLine } = datas[i];
        const current = result[type];
        if (result[type]) {
            current.codeLine += codeLine;
            current.blankLine += blankLine;
            current.allLine += allLine;
            current.files++;
        } else {
            result[type] = {
                codeLine,
                blankLine,
                allLine,
                files: 1
            };
        }
    }
    return formatSys(result);
}

/**
 * 执行扫描
 * @param {*} scanParam 扫描参数，具体参见 c-scan
 */
module.exports = async function (scanParam = {}) {

    scanParam = Object.assign(DEFAULT_PARAM, scanParam);

    const files = await scan(scanParam);

    const data = getCodeLine(files);

    const sys = getSys(data);

    return {
        data,
        sys
    };

};
