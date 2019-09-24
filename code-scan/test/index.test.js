const scan = require('../index');


async function test() {
    console.time();
    const result = await scan({
        rootPath: '',
        extensions: '**/*.js',
        defalutIgnore: false,
        ignoreRules: ['node_modules', 'inner'],
        ignoreFileName: '.ignore'
    });
    console.log(result);
    console.timeEnd();
}

test();
