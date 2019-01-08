import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-1').onclick = function() {
    clearElement('output');
    demo1();
};

document.getElementById('button-demo-2').onclick = function() {
    clearElement('output');
    demo2();
};

document.getElementById('button-demo-3').onclick = function() {
    clearElement('output');
    demo3();
};

document.getElementById('button-demo-testThrowingException').onclick = function() {
    clearElement('output');
    testThrowingException();
};

var total = 0;

function doubleAfter2Seconds(x) {
    log(`doubleAfter2Seconds(): x = ${x}`);
    return new Promise(resolve => {
        setTimeout(() => { 
            let doubled = x*2; 
            total += doubled; 
            log(`total = ${total}`);
            resolve(doubled); 
        }, 2000);
    });
}

// calculate sum of x + 2*x + 2*(2*x) + 2*(2*(2*x))
// e.g. for x = 3: 3 + 6 + 12 + 24 = 45
function demo1() {
    total = 3;
    doubleAfter2Seconds(total)
        .then(x => doubleAfter2Seconds(x))
        .then(x => doubleAfter2Seconds(x));
}

// 10 + 2*10 + 2*20 + 2*30 = 130
function demo2() {
    total = 10;
    doubleAfter2Seconds(total)
        .then(doubleAfter2Seconds(20))
        .then(doubleAfter2Seconds(30));
}

async function addAsync() {
    total = 10;
    total += await doubleAfter2Seconds(total);
    total += await doubleAfter2Seconds(20);
    total += await doubleAfter2Seconds(30);
    return total;
}

function demo3() {
    addAsync().then(x => log(`x=${x}`));
}

function SomeLongBackgroundTask(value) {
    return new Promise((res, rej) => {
        if (value) {
            res(value);
        } else {
            rej('Value not provided to succeed!')
        }
    });
}

async function testThrowingException() {
    try {
        // async fn not awaited => its return value remains promise
        const value = SomeLongBackgroundTask('This is the key of success!');
        log(`value = ${value}`);
        // test if object is of type Promise
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
        if (Promise.resolve(value) === value) {
            value.then(val => log(`Promise fulfilled with value: ${val}`));
            // Output: Promise fulfilled with value: This is the key of success!
        }
    } catch (e) {
        log(`Error caught: ${e}`);
    }

    try {
        // async fn awaited => its return value is converted to value passed to promise's resolve fn
        const value = await SomeLongBackgroundTask('This is the key of success!');
        log(`value = ${value}`);
    } catch (e) {
        log(`Error caught: ${e}`);
    }

    try {
        // not awaiting async fn which rejects => return value remains a (rejected) promise
        const value = SomeLongBackgroundTask(null);
        log(`value = ${value}`);

        // test if object is of type Promise
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
        if (Promise.resolve(value) === value) {
            value.catch(reason => log(`Promise rejected with reason: ${reason}`));
            // Promise rejected with reason: Value not provided to succeed!
        }
    } catch (e) {
        log(`Error caught: ${e}`);
    }

    try {
        const value = await SomeLongBackgroundTask(null);
        log(`value = ${value}`);
    } catch (e) {
        log(`Error caught: ${e}`);
    }
}