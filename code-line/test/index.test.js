const cc = require('../index');


async function test() {
    console.time();
    const result = await cc({ extensions: '**/+(*.js|*.md)' });
    console.log(result);
    console.timeEnd();
}

test();
