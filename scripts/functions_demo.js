import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-rest-parameter').onclick = function() {
    clearElement('output');
    restParameterDemo();
};

//
// Core functions
//

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// rest parameter syntax allows us to represent an indefinite number of arguments as an array
function restParameterDemo() {
    function foo(a, b, ...c) {
        log(`a = ${a}. typeof a = ${typeof a}`);
        log(`b = ${b}. typeof b = ${typeof b}`);
        log(`c = ${c}. typeof c = ${typeof c}`);
    }

    foo();
    foo(1);
    foo(1, 2);
    foo(1, 2, 3);
    foo(1, 2, 3, 4);
}
