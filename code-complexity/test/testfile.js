

const fun1 = (a, b, array) => {
    if (a) {
        if (a > b) {
            if (a - b > 100) {
                for (let i = 0; i < array.length; i++) {
                    const element = array[i];
                    if (element > 10) {
                        console.log(100);
                    } else {
                        console.log(200);
                    }
                }
            } else {
                return 7;
            }
        } else {
            return 5;
        }
    } else {
        return b;
    }
};


function fun2() {
    console.log('func2');
}


console.log(3);