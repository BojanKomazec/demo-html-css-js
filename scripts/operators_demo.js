import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-operators-demo').onclick = function() {
    clearElement('output');
    demo();
};

document.getElementById('button-demo-equality-operator').onclick = function() {
    clearElement('output');
    equalityOperatorDemo();
};

document.getElementById('button-demo-identity-operator').onclick = function() {
    clearElement('output');
    identityOperatorDemo();
};

document.getElementById('button-demo-spread-operator-properties').onclick = function() {
    clearElement('output');
    spreadOperatorOnPropertiesDemo();
};

document.getElementById('button-demo-delete-operator').onclick = function() {
    clearElement('output');
    deleteOperatorDemo();
};

//
// Core functions
//

function equalityOperatorDemo() {
    log(`' ' == 0: ${'' == 0}`);
    log(`0 == ' ':${0 == ''}`);
    log(`' ' == '0': ${'' == '0'}`);
    log(`'0' == ' ':${'0' == ''}`);

    function f(arg1) {
        log(`arg1 = ${arg1}`);

        if (arg1) {
            log('if (arg1) is true');
        }

        if (arg1 != null) {
            log('if (arg1 != null) is true');
        } else {
            log('if (arg1 == null) is true');
        }

        if (arg1 != undefined) {
            log('if (arg1 != undefined) is true');
        } else {
            log('if (arg1 == undefined) is true');
        }

        if (arg1 !== null) {
            log('if (arg1 !== null) is true');
        } else {
            log('if (arg1 === null) is true');
        }

        if (arg1 !== undefined) {
            log('if (arg1 !== undefined) is true');
        } else {
            log('if (arg1 === undefined) is true');
        }
    }

    log('f()');
    // It is possible to call a function which has parameters in its signature and not pass any arguments!
    // All parameters will become undefined.
    f();

    // f(undefinedVar); // undefinedVar is not defined

    const o = { 'a' : 1 };
    log('o = { "a" : 1 }');
    if (o.a) {
        log('if (o.a) is true');
    } else {
        log('if (o.a) is false');
    }

    if (o.b) {
        log('if (o.b) is true');
    } else {
        log('if (o.b) is false');
    }

    log('f(o.b)');
    f(o.b);

    const o2 = null;
    log('o2 = null');
    // if (o2.a) { // TypeError: Cannot read property 'a' of null
    //     log(`if (o2.a) is true`);
    // } else {
    //     log(`if (o2.a) is false`);
    // }

    log('f(o2)');
    f(o2);
}

function identityOperatorDemo() {

    log(`null == undefined: ${null == undefined}`);
    log(`null === undefined: ${null === undefined}`);

    // log(`undefinedVar === undefined: ${undefinedVar === undefined}`); // ReferenceError: undefinedVar is not defined
    const o = { 'a' : 1 };
    log(`o.b === undefined: ${o.b === undefined}`);

    // typeof accepts undeclared variables
    log(`typeof undefinedVar: ${typeof undefinedVar}`);

    // typeof operator returns string!
    log(`typeof undefinedVar === undefined: ${typeof undefinedVar === undefined}`); // false
    log(`typeof undefinedVar === 'undefined': ${typeof undefinedVar === 'undefined'}`); // true

    let a;
    log('let a;');
    log(`a == undefined: ${a == undefined}`);
    log(`a === undefined: ${a === undefined}`);
    log(`a == null: ${a == null}`);
    log(`a === null: ${a === null}`);

    let b = null;
    log('let b = null;');
    log(`b == undefined: ${b == undefined}`);
    log(`b === undefined: ${b === undefined}`);
    log(`b == null: ${b == null}`);
    log(`b === null: ${b === null}`);

    let c = undefined;
    log('let c = undefined;');
    log(`c == undefined: ${c == undefined}`);
    log(`c === undefined: ${c === undefined}`);
    log(`c == null: ${c == null}`);
    log(`c === null: ${c === null}`);
}

// TODO: spread operator
// https://zendev.com/2018/05/09/understanding-spread-operator-in-javascript.html
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
function spreadOperatorOnPropertiesDemo() {
    let a = 1;
    let b = 2;
    let c = {
        x: 3,
        y: 4
    };

    let aggregateObject = {a, b, ...c};
    log(`aggregateObject = ${JSON.stringify(aggregateObject)}`);
    // output: aggregateObject = {"a":1,"b":2,"x":3,"y":4}
    // This is something similar like flattening multidimensional objects into a 1-D list.

    // What happens if some of expanded objects has propertes with the same names as some of the previous variables
    // added to the aggegate?
    let d = {
        a : 3,
        b: 4
    };

    let aggregateObject2 = {a, b, ...d};
    log(`aggregateObject2 = ${JSON.stringify(aggregateObject2)}`);
    // Values are overwritten!
    // aggregateObject2 = {"a":3,"b":4}
}

function getDepth({children}) {
    let subtreeDepth = 0;
    if (children) {
        Math.max(...children.map(getDepth))
    }
    return 1 + subtreeDepth;
}

function deleteOperatorDemo() {
    var Employee = {
        firstname: 'B',
        lastname: 'Komazec'
    };

    log(Employee.firstname);
    // expected output: "B"

    delete Employee.firstname;

    log(Employee.firstname);
    // expected output: undefined

    // attribute can be delted multiple times
    delete Employee.firstname;
    log(Employee.firstname);
    // output: "undefined"

    Employee.firstname = 'Bojan';
    log(Employee.firstname);

    // a new attribute with arbitrary name can be added dynamically:
    log(`Nickname: ${Employee.nickname}`);
    Employee.nickname = 'Kibo';
    log(`Nickname: ${Employee.nickname}`);
}


/**
 * Yields different value on each call.
 * function* means this is a generator function
 */
function* foo() {
    yield 1;
    yield 2;
    yield 3;
}

function for_of_loop__generator_function__demo() {
    log('for_of_loop__generator_function__demo()');

    for (let o of foo()) {
        log(o);
    }
}

function for_of_loop__json_object__demo() {
    log('for_of_loop__json_object__demo()');

    const json = {
        a: 1,
    };

    try {
        for (let key of json) { // TypeError: json is not iterable
            log(`key = ${key}`);
        }
    } catch (e) {
        log(`Error: ${e}`);
    }
}

function for_in_loop__json_object__demo() {
    log('for_in_loop__json_object__demo()');

    const json = {
        a: 1,
        b: {
            ba: 21,
        },
        c: {
            ca: {
                caa: 311,
            },
        },
        d: {
            da: {
                daa: {
                    daaa: 4111,
                    daab: 4112,
                },
                dab: {
                    daba: 4121,
                    dabb: 4122,
                },
            },
        },
    };

    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];
            log(`key = ${key}, value = ${value}`);
        }
    }
}

function for_in_loop__modify_item_demo() {
    log('for_in_loop__modify_item_demo()');

    let strings = ['a', 'b', 'c'];

    log(`strings (before processing withing for-of-loop) = ${strings}`);

    for (let str of strings) {
        str = str + "_";
    }

    log(`strings (after) = ${strings}`);

    log(`strings (before processing with forEach) = ${strings}`);

    // this loop will permanently change array elements
    strings.forEach((str, index) => {
        strings[index] = str + "_";
    });

    log(`strings (after) = ${strings}`);
}

// typeof operator returns a string indicating the type of the unevaluated operand. It can be:
// "undefined", "object", "function", "boolean" etc...
//
// instanceof operator tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object.
// object is examined against the type constructor! (c-tor names start with capital letter!)
function typeOperatorsDemo() {
    const s = "";
    log(`typeof s = ${typeof s }`);
    log(`s instanceof Number = ${s instanceof Number}`); // false
    log(`s instanceof String = ${s instanceof String}`); // false (!) b/c this is a literal, not String object!
    log(`s instanceof Object = ${s instanceof Object}`); // false

    const s2 = new String("");
    log(`typeof s2 = ${typeof s2 }`);
    log(`s2 instanceof Number = ${s2 instanceof Number}`); // false
    log(`s2 instanceof String = ${s2 instanceof String}`); // true
    log(`s2 instanceof Object = ${s2 instanceof Object}`); // true

    const a = []
    log(`typeof a = ${typeof a }`);
    log(`a instanceof Array = ${a instanceof Array}`);
    log(`a instanceof Object = ${a instanceof Object}`);
    log(`Array.isArray(a) = ${Array.isArray(a)}`);

    const o = {}
    log(`typeof o = ${typeof o }`);
    log(`o instanceof Array = ${o instanceof Array}`);
    log(`o instanceof Object = ${o instanceof Object}`);
    log(`Array.isArray(o) = ${Array.isArray(o)}`);
}

function demo() {
    for_of_loop__generator_function__demo();
    for_of_loop__json_object__demo();
    for_in_loop__json_object__demo();
    for_in_loop__modify_item_demo();
    typeOperatorsDemo();
}
