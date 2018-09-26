import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo1').onclick = function() {
    clearElement('output');
    demo1();
};

//
// Core functions
//

class Person {
    constructor(name) {
        this._name = name;
    }

    // getter
    get name() {
        return this._name;
    }

    sayName() {
        log(`My name is ${this._name}.`);
    }
}

function demo1() {
    log('Demo1');

    let person = new Person('Bojan');
    person.sayName();
    log(`person.name = ${person.name}`);
}