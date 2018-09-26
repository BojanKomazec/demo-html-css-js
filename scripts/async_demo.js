import { clearElement, log}  from 'common.js';

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