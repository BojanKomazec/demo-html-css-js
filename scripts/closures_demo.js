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

// inner() can access variables from outer/enclosing scope
function demo1() {
    function outer() {
        log('outer()');
        let a = 123;
        function inner() {
            log(`inner(): a = ${a}`);
        }
        inner();
    }

    outer();
}

// inner() can access variables from outer/enclosing scope even after outer() returns
function demo2() {
    function outer() {
        log('outer()');
        let a = 123;
        function inner() {
            log(`inner(): a = ${a}`);
        }
        return inner;
    }

    var f = outer();
    f();
}

// inner() can access arguments passed to outer/enclosing scope even after outer() returns
function demo3() {
    function outer(val) {
        log(`outer(): val = ${val}`);
        return function inner() {
            log(`inner(): val = ${val}`);
        };
    }

    var f = outer(456);
    f();
}