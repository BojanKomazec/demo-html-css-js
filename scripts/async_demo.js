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

document.getElementById('button-demo-testThrowingException').onclick = async function() {
    clearElement('output');
    await testThrowingException();
};

document.getElementById('button-demo-testAwaitingVsFireAndForget').onclick = function() {
    clearElement('output');
    testAwaitingVsFireAndForget();
};

var total = 0;

function doubleAfter2Seconds(x) {
    log(`doubleAfter2Seconds(): x = ${x}`);
    return new Promise(resolve => {
        setTimeout(() => {
            let doubled = x*2; 
            total += doubled; 
            log(`total = ${total}`);
            log('doubleAfter2Seconds(): About to resolve.');
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

function settlePromiseImmediately(value) {
    log(`settlePromiseImmediately(${value})`);
    return new Promise((res, rej) => {
        if (value) {
            res(value);
        } else {
            rej('Value not provided to succeed!');
        }
    });
}

function settlePromiseAfterTimeout(value) {
    log(`settlePromiseAfterTimeout(${value})`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value) {
                resolve(value);
            } else {
                reject('Reject settlePromiseAfterTimeout: Value not provided to succeed!');
            }
        }, 2000);
    });
}

function resolvePromiseOrThrowExceptionImmediately(value) {
    log('resolvePromiseOrThrowExceptionImmediately');
    return new Promise((res) => {
        if (value) {
            res(value);
        } else {
            throw new Error('Exception! Value not provided to succeed!');
        }
    });
}

function backgroundTaskWhichThrowsExceptionAfterTimeout() {
    log('backgroundTaskWhichThrowsExceptionAfterTimeout()');
    return new Promise(() => {
        setTimeout(() => {
            throw new Error('Exception thrown from backgroundTaskWhichThrowsExceptionAfterTimeout()');
        }, 2000);
    });
}

async function testThrowingException() {
    log('');
    log('Call synchronously async function which fulfills immediately');
    try {
        // async fn not awaited => its return value remains promise
        const value = settlePromiseImmediately('This is the key of success!');
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

    log('');
    log('Await async function which fulfills immediately');
    try {
        // async fn awaited => its return value is converted to value passed to promise's resolve fn
        const value = await settlePromiseImmediately('This is the key of success!');
        log(`value = ${value}`);
    } catch (e) {
        log(`Error caught: ${e}`);
    }

    log('');
    log('Call synchronously async function which rejects immediately');
    try {
        // not awaiting async fn which rejects => return value remains a (rejected) promise
        const value = settlePromiseImmediately(null);
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

    log('');
    log('Await async function which rejects immediately');
    try {
        const value = await settlePromiseImmediately(null);
        log(`value = ${value}`);
    } catch (e) {
        log(`Error caught: ${e}`);
    }

    log('');
    log('Call synchronously async function which throws exception immediately');
    try {
        const value = resolvePromiseOrThrowExceptionImmediately(null);
        log(`value = ${value}`);
        // also, in console log:
        //    Uncaught (in promise) Error: Exception! Value not provided to succeed!
    } catch (e) {
        log(`Error caught: ${e}`);
    }

    log('');
    log('Await async function which throws exception immediately');
    try {
        const value = await resolvePromiseOrThrowExceptionImmediately(null);
        log(`value = ${value}`);
    } catch (e) {
        log(`Error caught: ${e}`);
    }

    log('');
    log('Await async function which settles by rejection after a timeout');
    try {
        const value = await settlePromiseAfterTimeout(null);
        log(`value = ${value}`);
    } catch (e) {
        log(`Error caught: ${e}`);
    }

    log('');
    log('Call synchronously async function which settles by rejection after a timeout');
    try {
        // no await => exception won't reach catch and becomes UNHANDLED
        const value = settlePromiseAfterTimeout(null);
        log(`value = ${value}`);
        // output: [object Promise]
        // also, in console.log:
        //     Uncaught (in promise) Reject settlePromiseAfterTimeout: Value not provided to succeed!
    } catch (e) {
        log(`Error caught: ${e}`);
    }

    log('');
    log('Call synchronously async function which throws exception after a timeout');
    try {
        log('Before backgroundTaskWhichThrowsExceptionAfterTimeout()');
        // fire and forget: native exception (not rejection here) will be UNHANDLED
        backgroundTaskWhichThrowsExceptionAfterTimeout();
        log('After backgroundTaskWhichThrowsExceptionAfterTimeout()');
        // also, in console log after 2 seconds:
        //    Uncaught Error: Exception thrown from backgroundTaskWhichThrowsExceptionAfterTimeout()
    } catch (e) {
        log(`Error caught: ${e}`);
    }

    log('');
    log('Await async function which throws exception after a timeout');
    try {
        log('Before await backgroundTaskWhichThrowsExceptionAfterTimeout()');
        await backgroundTaskWhichThrowsExceptionAfterTimeout();
        log('After await backgroundTaskWhichThrowsExceptionAfterTimeout()');
        // also, in console log after 2 seconds:
        //    Uncaught Error: Exception thrown from backgroundTaskWhichThrowsExceptionAfterTimeout()
    } catch (e) {
        log(`Error caught: ${e}`);
    }
}

async function awaitSomeLongBackgroundTask() {
    log('awaitSomeLongBackgroundTask()');
    await doubleAfter2Seconds(2);
    log('~awaitSomeLongBackgroundTask()');
}

function fireAndForgetSomeLongBackgroundTask() {
    log('fireAndForgetSomeLongBackgroundTask()');
    doubleAfter2Seconds(2);
    log('~fireAndForgetSomeLongBackgroundTask()');
}

async function testAwait() {
    log('testAwait()');
    await awaitSomeLongBackgroundTask();
    await awaitSomeLongBackgroundTask();
    log('~testAwait()');
}

function testSynchronousCalls() {
    log('testSynchronousCalls()');
    awaitSomeLongBackgroundTask();
    awaitSomeLongBackgroundTask();
    log('~testSynchronousCalls()');
}

function testFireAndForget() {
    log('testFireAndForget()');
    fireAndForgetSomeLongBackgroundTask();
    fireAndForgetSomeLongBackgroundTask();
    log('~testFireAndForget()');
}

async function testAwaitingVsFireAndForget() {
    //await testAwait();
    testSynchronousCalls();
    //testFireAndForget();
}