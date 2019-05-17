import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-rest-parameter').onclick = function() {
    clearElement('output');
    restParameterDemo();
};

document.getElementById('button-demo-dynamically-set-object-on-which-fn-is-invoked').onclick = function() {
    clearElement('output');
    dynamicallySetObjectOnWhichFunctionIsInvokedDemo();
};

document.getElementById('button-demo').onclick = function() {
    clearElement('output');
    demo();
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

function dynamicallySetObjectOnWhichFunctionIsInvokedDemo() {
    const o1 = {
        foo: function() {
            log('o1.foo()');
        },
    };

    const o2 = {
        foo: function() {
            log('o2.foo()');
        },
    };

    let o = o1;
    o.foo();

    o = o2;
    o.foo();
}

function modifyingArgumentDemo() {
    log('modifyingArgumentDemo()');

    /**
     * Modifies input json object by adding a new property.
     * @param json - json to be modified
     */
    function modifyJson(json) {
        json['newProp'] = 'I am a new property';
    };

    let json = {
        a: 1,
        b: 'two'
    };

    log(`json (before passing through 'modifyJson') = ${JSON.stringify(json)}`);

    modifyJson(json);

    log(`json (after) = ${JSON.stringify(json)}`);
}

function demo() {
    modifyingArgumentDemo();
}
