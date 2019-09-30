const cc = require('../index');


async function test() {
    console.time();
    const result = await cc();
    // console.log(result);
    console.timeEnd();
}

test();
