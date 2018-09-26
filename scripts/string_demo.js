import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-destructuring').onclick = function() {
    clearElement('output');
    demoDestructuring();
};

document.getElementById('button-demo-substring').onclick = function() {
    clearElement('output');
    demoSubstring();
};

//
// Core functions
//

function demoDestructuring() {
    let s1 = '123.456';

    {
        let [a, b] = s1.split('.');
        log(`a = ${a}, b = ${b}`); // a = 123, b = 456
    }

    {
        let s = 'New York, USA';
        let [a, b] = s.split(',');
        log(`a = ${a}, b = ${b}`); // a = New York b = USA
    }

    {
        let s = 'New York, USA';
        let [a, b] = s.split(', ');
        log(`a = ${a}, b = ${b}`); // a = New York b = USA
    }
}

function demoSubstring() {
    log('str.substring(indexStart[, indexEnd]) demo.');
    log('indexEnd is optional. The index of the first character to exclude from the returned substring.');
    let s1 = 'ThisIsOneVeryLongString';
    log(`${s1}.length = ${s1.length}`);
    log(`${s1}.substring(0, 0) = ${s1.substring(0, 0)}`);
    log(`${s1}.substring(0, 1) = ${s1.substring(0, 1)}`);
    log(`${s1}.substring(0, 2) = ${s1.substring(0, 2)}`);
    log(`${s1}.substring(0, 22) = ${s1.substring(0, 22)}`);
    log(`${s1}.substring(0, 23) = ${s1.substring(0, 23)}`);
    log(`${s1}.substring(1, 0) = ${s1.substring(1, 0)}`);
    log(`${s1}.substring(1, 1) = ${s1.substring(1, 1)}`);
    log(`${s1}.substring(1, 2) = ${s1.substring(1, 2)}`);
    log(`${s1}.substring(1, 22) = ${s1.substring(1, 22)}`);
    log(`${s1}.substring(1, 23) = ${s1.substring(1, 23)}`);
}