const cc = require('../index');


async function test() {
    console.time();
    const result = await cc({}, 3);
    console.log(result);
    console.timeEnd();
}

test();
