const path = require('path');
const fs = require('fs');
const glob = require('glob');
const ignore = require('ignore');



/**
 * 默认扫描扩展
 */
const EXTENSIONS = '**/*.js';

/**
 * 默认忽略文件夹
 */
const DEFAULT_IGNORE_PATTERNS = [
    'node_modules/**',
    'build/**',
    'dist/**',
    'output/**',
    'common_build/**'
];

/**
 * ignore文件名
 */
const IGNORE_FILE_NAME = '.gitignore';


/**
 * 默认参数
 */
const DEFAULT_PARAM = {
    rootPath: '',
    ignoreRules: [],
    defalutIgnore: true,
    extensions: EXTENSIONS,
    ignoreFileName: IGNORE_FILE_NAME
};


/**
 * 获取glob扫描的文件列表
 * @param {*} rootPath 跟路径
 * @param {*} extensions 扩展
 * @param {*} defalutIgnore 是否开启默认忽略
 */
function getGlobScan(rootPath, extensions, defalutIgnore) {
    return new Promise(resolve => {
        glob(`${rootPath}${extensions}`,
            { dot: true, ignore: defalutIgnore ? DEFAULT_IGNORE_PATTERNS : [] },
            (err, files) => {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                resolve(files);
            });
    });
}

/**
 * 加载ignore配置文件，并处理成数组
 * @param {*} ignoreFileName 
 */
async function loadIgnorePatterns(ignoreFileName) {
    const ignorePath = path.resolve(process.cwd(), ignoreFileName);
    try {
        const ignores = fs.readFileSync(ignorePath, 'utf8');
        return ignores.split(/[\n\r]|\n\r/).filter(pattern => Boolean(pattern));
    } catch (e) {
        return [];
    }
}

/**
 * 根据ignore配置过滤文件列表
 * @param {*} files 
 * @param {*} ignorePatterns 
 * @param {*} cwd 
 */
function filterFilesByIgnore(files, ignorePatterns, ignoreRules, cwd = process.cwd()) {
    const ig = ignore().add([...ignorePatterns, ...ignoreRules]);
    const filtered = files
        .map(raw => (path.isAbsolute(raw) ? raw : path.resolve(cwd, raw)))
        .map(raw => path.relative(cwd, raw))
        .filter(filePath => !ig.ignores(filePath))
        .map(raw => path.resolve(cwd, raw));
    return filtered;
}


/**
 * 执行扫描
 * @param {*} path 扫描路径 - 默认为当前路径
 */
module.exports = async function scan(param) {

    param = Object.assign(DEFAULT_PARAM, param);

    const { rootPath, extensions, defalutIgnore, ignoreRules, ignoreFileName } = param;

    const ignorePatterns = await loadIgnorePatterns(ignoreFileName);

    let files = await getGlobScan(rootPath, extensions, defalutIgnore);

    return filterFilesByIgnore(files, ignorePatterns, ignoreRules);

};

