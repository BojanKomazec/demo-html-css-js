import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-throw-catch').onclick = function() {
    clearElement('output');
    throwCatchDemo();
};

//
// Core functions
//


function throwCatchDemo() {
    log('throwCatchDemo()');

    try {
        throw new Error('This is an Error text.');
    } catch (e) {
        log(`Error caught. Name: ${e.name}, message: ${e.message}`);
    }
}



