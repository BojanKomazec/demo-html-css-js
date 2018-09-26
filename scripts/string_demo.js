import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-destructuring').onclick = function() {
    clearElement('output');
    demoDestructuring();
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



