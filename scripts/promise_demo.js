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

document.getElementById('button-demo-4').onclick = function() {
    clearElement('output');
    demo4();
};

//
// Core functions
//

function demo1() {
    var promise = new Promise((resolve, reject) => {
        log('executor()');
        if (Math.random() > .5) {
            resolve('SUCCESS');
        } else {
            reject('FAILURE');
        }
    });
    
    promise.then(
        resultSuccess => { log(resultSuccess); }, 
        resultFailure => { log(resultFailure); }
    );

    function someAsyncFunction() {
        return new Promise((resolve, reject) => {
            resolve('Success!');
        });
    }

    function someFunctionWithStringArg(s) {
        log(`Passed string is: ${s}`);
    }

    // resolved promise value is automatically passed into chained function, no need to specify passing the argument
    // explicitly
    someAsyncFunction().then(someFunctionWithStringArg);
    // Output: Passed string is: Success!
}

var timer;

function delay(timeInterval) {
    log(`delay(): timeout set to ${timeInterval}ms`);
    return new Promise(function(resolve, reject) {
        log('executor()');

        // resolve is called but then timer has to be cancelled in onfullfilled callback
        // timer = setTimeout(resolve, timeInterval);

        timer = setTimeout(
            () => { 
                resolve('SUCCESS'); 
                clearTimeout(timer); // cleanup timer resources in timer callback
            }, 
            timeInterval
        );
    });
}

function demo2() {
    let demo2Button = document.getElementById('button-demo-2');

    // remove previously added 'Cancel' button, if it exists
    let oldButton = document.getElementById('cancel-button');
    if (oldButton) {
        oldButton.remove();
    }
    
    // add new 'Cancel' button
    let newButton = document.createElement('button');
    newButton.setAttribute('id', 'cancel-button');
    let newButtonText = document.createTextNode('Cancel');
    newButton.appendChild(newButtonText);
    demo2Button.insertAdjacentElement('afterend', newButton);

    // clicking the 'Cancel' button 
    document.getElementById('cancel-button').onclick = function() {
        clearTimeout(timer);
        log('Waiting canceled!');
    };

    var promise = delay(3000);
    //promise.then(log('Delay completed!')); // WRONG! log() is executed immediately!
    promise.then(
        function(value) { log('Delay completed! Value: ' + value); }, // onfullfilled callback
        function() { log('Delay canceled!'); }                         // onrejected callback; can also be attached via promise.catch
    );
}

function demo3() {
    let timer1;
    let timer2; 

    let promise1 = new Promise((resolve, reject) => {
        let timeout = 4000;
        timer1 = setTimeout(() => { resolve(timer1); }, timeout);
        log(`Promise 1 created timer with id=${timer1} and timeout=${timeout}.`);
    });

    promise1.then((timer) => { log(`Promise 1 onfullfilled value: ${timer}.`); clearTimeout(timer); });
    promise1.catch((value) => log(`Promise 1 onrejected value: ${value}.`));

    let promise2 = new Promise((resolve, reject) => {
        let timeout = 3000;
        timer2 = setTimeout(() => { resolve(timer2); }, timeout);
        log(`Promise 2 created timer with id=${timer2} and timeout=${timeout}.`);
    });

    promise2.then((timer) => { log(`Promise 2 onfullfilled value: ${value}.`); clearTimeout(timer); } );
    promise2.catch((value) => log(`Promise 2 onrejected value: ${value}.`));

    let winnerPromise = Promise.race([promise1, promise2]);
    winnerPromise.then((timer) => { log(`Race winner promise resolved with value: ${timer}.`); clearTimeout(timer); });
}

// Promise 1: returned number is > 0.5
// Promise 2: returned number is > 0.75
function demo4() {
    var promise = new Promise((resolve, reject) => {
        log('executor()');
        let randomValue = Math.random();
        if (randomValue > .5) {
            resolve(randomValue); // resolve successfully if randomValue > 0.5
        } else {
            reject(randomValue);
        }
    });
    
    promise.then( // promise.then creates a new promise to which onfullfilled/onrejected callbacks can be attached
        randomValue => { 
            log(`onfullfilled (Promise1): ${randomValue} > 0.5`);
            if (randomValue > .75) {
                //resolve(randomValue); // resolve successfully if randomValue > 0.75
                return `${randomValue} > 0.75`; // resolve this promise successfully
            } else {
                //reject(randomValue);  // reject if randomValue <= 0.75
                throw new Error(`${randomValue} <= 0.75`); // we can't call reject here but can throw an Error (reject this promise)
            }
        }, 
        randomValue => { 
            log(`onrejected (Promise1): ${randomValue} < 0.5`);
            throw new Error(`${randomValue} < 0.5`); // we can't call reject here but can throw an Error (reject this promise)
        }
    ).then(
        resolvedMessage => {
            log(`onfullfilled (Promise2): ${resolvedMessage}`); 
        },
        e => {
            log(`onrejected (Promise2): ${e}`);
        }
    ).catch(e => log(`Error: ${e}`));
}

