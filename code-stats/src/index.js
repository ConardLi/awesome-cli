const path = require('path');
const spawnSync = require('cross-spawn').sync;


const dir = path.resolve(__dirname, '../repositories/react');


const a = spawnSync('git', ['log', 'stat'], {
    encoding: 'utf8',
    cwd: dir
});


console.log(a.stdout);

// https://www.cnblogs.com/bellkosmos/p/5923439.html