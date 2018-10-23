import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-destructuring-assignment').onclick = function() {
    clearElement('output');
    destructuringAssignmentDemo();
};

//
// Core functions
//

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// https://medium.com/front-end-hacking/es6-cool-stuffs-destructuring-me-plz-b8f1335d241a
// deconstructuring an object (right of =) into set of variables (left of =)
// https://stackoverflow.com/questions/26999820/javascript-object-bracket-notation-navigation-on-left-side-of-assign
function destructuringAssignmentDemo() {
    log('destructuringAssignmentDemo()');

    let a, b;
    [a, b] = [1, 2];
    log(`a = ${a}, b = ${b}`);

    // declare variables and use destructuring assignment in one line
    let [c, d] = [1, 2];
    log(`c = ${c}, d = ${d}`);

    // use Spread Operators for Arrays (it takes either an array or an object and expands it into its set of items)
    // https://zendev.com/2018/05/09/understanding-spread-operator-in-javascript.html
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    let [e, f, ...rest] = [3, 4, 5, 6, 7];
    log(`e = ${e}, f = ${f}, rest = ${rest}`);

    let {x, y, ...z} = { x: 1, y: 2, a: 3, b: 4 };
    log(`x = ${x}`);
    log(`y = ${y}`);
    log(`z = ${z}`);
}
