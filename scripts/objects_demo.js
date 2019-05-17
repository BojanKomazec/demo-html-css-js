import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo').onclick = function() {
    clearElement('output');
    demo();
};

document.getElementById('button-demo-reflection').onclick = function() {
    clearElement('output');
    demoReflection();
};

document.getElementById('button-demo-types').onclick = function() {
    clearElement('output');
    demoTypes();
};

document.getElementById('button-demo-object-getOwnPropertyNames').onclick = function() {
    clearElement('output');
    Object_getOwnPropertyNames_demo();
};

document.getElementById('button-demo-json-object').onclick = function() {
    clearElement('output');
    jsonObjectDemo();
};

document.getElementById('button-demo-object-assign').onclick = function() {
    clearElement('output');
    objectAssignDemo();
};

document.getElementById('button-demo-null-property-demo').onclick = function() {
    clearElement('output');
    nullPropertyDemo();
};


document.getElementById('button-demo-json-verification').onclick = function() {
    clearElement('output');
    jsonVerificationDemo();
};

// constructor
function Person(name) {
    this.name = name;
    this.greeting = function() {
        log('Hi! I\'m ' + this.name + '.');
    };
}

function demo1() {
    let person1 = new Person('Alice');
    let person2 = new Person('Bob');
    log('person1 object: ');
    log(person1);
    log(`person1 object: \n${JSON.stringify(person1)}`);
    log('person1 object: %o', person1);
    log(`person2 object: \n${JSON.stringify(person2)}`);
    person1.greeting();

    // unnamed object type
    const unnamedObject = {
        a: 1,
        b: 'b',
        // JS objects can contain functions
        foo: function(c) {
            log(`foo(): c = ${c}`);
        },
        // use 'this' to access other properties from the same object
        bar: function() {
            log(`bar(): this.a = ${this.a}`);
            this.foo('bar is calling foo');
        }
    };

    unnamedObject.foo(123);
    unnamedObject.bar();
    // the type of the value can be changed in runtime
    // Also, note that although unnamedObject is declared as const
    // it is possible to change values/types of the object's properties!
    unnamedObject.a = 'a has now changed the type, it is a string now';
    unnamedObject.bar();

    const unnamedObject2 = {
        a: 1,
        b: 'b',
        // JS objects can contain functions
        foo(c) {
            log(`foo(): c = ${c}`);
        }
    };

    unnamedObject2.foo(456);

    function funcionWhichReturnsObjectWithFunction() {
        return  {
            a: 1,
            b: 'b',
            // JS objects can contain functions
            foo(c) {
                log(`foo(): c = ${c}`);
            }
        };
    }

    const objectWithFunction = funcionWhichReturnsObjectWithFunction();
    objectWithFunction.foo(789);
}

// for..in lists ONLY enumerable properties!
function getKeysVia_For_In(obj) {
    let keys = [];
    for(let key in obj){
        keys.push(key);
    }
    return keys;
}

// Object.keys
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
function logKeys(obj) {
    log('logKeys()');
    const keys = Object.keys(obj);
    keys.forEach(function(key) {
        log(`key: ${key}`);
    });
}

// for..in
function logKeys2(obj) {
    log('logKeys2()');
    for(let key in obj) {
        log(`\t\tkey: ${key}`);
    }
}

function logKeysAndValues(obj) {
    log('logKeysAndValues()');
    for(let key in obj) {
        log(`${key} : ${obj[key]}`);
    }
}

function getFunctions(obj) {
    log('getFunctions()');
    let functions = [];
    for(let key in Object.keys(obj)) {
        log(`key = ${key}`);
        if(typeof obj[key] === 'function') {
            functions.push({ key : obj[key]});
        }
    }
    return functions;
}

// Print all object members which are functions
function logFunctionMembers(obj) {
    log('logFunctionMembers()');
    let functions = getFunctions(obj);
    functions.forEach(function(value) {
        log(`value = ${value}\n`);
    });
}

// literals give you a string primitive, whereas the constructor gives you a String object.
function demoReflection() {

    let person = new Person('Alice');

    log(String); // output: function String() { [native code] }
    log(new String()); // output:


    log('\n');

    log('Print all object keys:');

    logKeys(String);
    logKeys(new String());
    logKeys(new String('test'));
    logKeys('test');
    logKeys(person);

    logKeys2(new String());
    logKeys2(new String('test'));
    logKeys2('test');
    logKeys2(person);

    logKeysAndValues(new String());
    logKeysAndValues(new String('test'));
    logKeysAndValues('test');
    logKeysAndValues(person);

    log(getFunctions(person));
    logFunctionMembers(person);

    log(getFunctions(Person));
    logFunctionMembers(Person);

    log('');
    log('Analyzing person object defined as JSON object:');
    person = {
        age: 21,
        name: 'Bob',
        greeting: function() { return `Hi, my name is ${this.name}.`; }
    };
    log(`keys (via for..in) = ${getKeysVia_For_In(person)}`);
    log(`keys (via Object.getOwnPropertyNames) = ${Object.getOwnPropertyNames(person)}`);

    log('');
    log('Analyzing String:');
    log(`keys (via for..in) = ${getKeysVia_For_In(String)}`);
    log(`keys (via Object.getOwnPropertyNames) = ${Object.getOwnPropertyNames(String)}`);
}

function demoTypes() {
    log('demoTypes()');

    log(`typeof 'test' = ${typeof 'test'}`); // output: string

    // String is a global object - a constructor for strings
    log(`typeof new String() = ${typeof new String()}`); // output: object
    log(`typeof new String('test') = ${typeof new String('test')}`); // output: object

    const json1 = {};
    log(`typeof of ${JSON.stringify(json1)}: ${typeof(json1)}`); // object

    const json2 = {
        a: 1,
    };
    log(`typeof of ${JSON.stringify(json2)}: ${typeof(json2)}`); // object

    const str1 = "";
    log(`typeof of \"${str1}\": ${typeof(str1)}`); // string

    const str2 = "test";
    log(`typeof of \"${str2}\": ${typeof(str2)}`); // string

    log('~demoTypes()');
}

// Object.getOwnPropertyNames() lists both enumerable and non-enumerable properties of the object
function Object_getOwnPropertyNames_demo() {
    // properties added directly to the object are enumerable
    let student = {
        age: 21,
        name: 'Bob',
        greeting: function() { return `Hi, my name is ${this.name}.`; }
    };
    student['department'] = 'computer science';
    student.surname = 'Johnson';

    log(student.greeting()); // Hi, my name is Bob.

    log(Object.getOwnPropertyNames(student)); // age,name,greeting,department,surname
    log(Object.keys(student));                // age,name,greeting,department,surname

    // add read-only, non-enumerable property
    Object.defineProperty(student, 'yearOfAdmission', { value : 2012, writable : false } );
    // getOwnPropertyNames returns non-enumerable properties as well
    log(Object.getOwnPropertyNames(student)); // age,name,greeting,department,surname,yearOfAdmission
    // Object.keys (and for..in) does not return non-enumerable properties
    log(Object.keys(student));                // age,name,greeting,department,surname

    log('');
    //log(Object.getOwnPropertyNames(student.));


    log('');

    log(Object.getOwnPropertyNames('test'));                // 0,1,2,3,length
    log(Object.getOwnPropertyNames([111, 222, 333]));       // 0,1,2,length
    log(Object.getOwnPropertyNames(String));                // length,name,prototype,fromCharCode,fromCodePoint,raw
    log(Object.getOwnPropertyNames(new String()));          // length
    log(Object.getOwnPropertyNames(new String('test')));    // 0,1,2,3,length
}

function jsonObjectDemo() {
    function getText(id) {
        if (id === 'msg1') {
            return 'message1';
        }
    }

    // it is possible to use some function in order to calculate the value of some key
    var o = {
        text : getText('msg1')
    };

    log(`o.text = ${o.text}`);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function objectAssignDemo() {
    log(`Object.assign({ }, {a: 1, b: 2}) = ${JSON.stringify(Object.assign({ }, {a: 1, b: 2}))}`);
    log(`Object.assign({ a: 1, b: 2}, {a: 1, b: 3}) = ${JSON.stringify(Object.assign({ a: 1, b: 2}, {a: 1, b: 3}))}`);
}

function nullPropertyDemo() {
    const o = {
        prop1: 'a',
        prop2: 1,
        prop3: null
    };

    log(`prop3 is ${o.prop3}`);
    if (o.prop3 === null) {
        log('prop3 is null');
    }
}

/**
 * If JSON comes from the outside world, it might not contain all expected properties, it might be missing some values
 * or be corrupted in some other way so it's always good to verify if it's corrupted or not. But, how to do it properly?
 * */
function jsonVerificationDemo() {
    // This JSON string is malformed. JSON.parse throws exception:
    //    Unexpected token , in JSON at position 51 at JSON.parse (<anonymous>)
    // let jsonString = '{ "prop1": "1", "prop2": "b", "prop3": {}, "prop4":, "prop6": null}';

    let jsonString = '{ "prop1": "1", "prop2": "b", "prop3": {}, "prop4": "", "prop6": null}';
    log(`Incoming (corrupted) JSON: ${jsonString}`);

    let o = JSON.parse(jsonString);

    if (o) {
        log(`o is not null/undefined. o: ${o}`);
    }

    if (o.prop1) {
        let val1 = o.prop1;
        log(`val1: ${val1}`);
    }

    if (o.prop4) {
        log(`o.prop4 is not null/undefined. o.prop4: ${o.prop4}`);
        let val4 = o.prop4;
        log(`val4: ${val4}`);
    } else {
        log('o.prop4 is null/undefined.'); // this gets printed
    }

    if (o.prop4 === '') {
        log(`o.prop4 is empty string. o.prop4: ${o.prop4}`); // this gets printed
        let val4 = o.prop4;
        log(`val4: ${val4}`);
    } else {
        log('o.prop4 is not empty string.');
    }

    if (o.prop5) {
        log('o.prop5 is not null/undefined.');
    } else {
        log('o.prop5 is null/undefined.'); // this gets printed
    }

    if (o.prop5 === null) {
        log('o.prop5 is null.');
    } else {
        log('o.prop5 is not null.'); // this gets printed
    }

    if (o.prop5 === undefined) {
        log('o.prop5 is undefined.'); // this gets printed
    } else {
        log('o.prop5 is not undefined.');
    }

    if (typeof o.prop5 === 'undefined') {
        log('typeof o.prop5 is \'undefined\'.'); // this gets printed
    } else {
        log('typeof o.prop5 is not \'undefined\'.');
    }

    try {
        let val5 = o.prop5;
        log(`val5: ${val5}`); // val5: undefined
    } catch (e) {
        log(`Error: ${e}`);
    }

    if (o.prop6 === null) {
        log(`o.prop6 is null. o.prop6 = ${o.prop6}`);
    } else {
        log(`o.prop6 is NOT null. o.prop6 = ${o.prop6}`);
    }
}

function shallowCloneTrapDemo(){

    let country_uk = {
        name: "United Kingdom",
        capital: "London"
    };

    let country_fr = {
        name: "France",
        capital: "Paris"
    };

    let country_ch = {
        name: "China",
        capital: "Beijing"
    };

    let country_jp = {
        name: "Japan",
        capital: "Tokio"
    };

    let continent_eu = {
        name: "europe",
        countries: [
            country_fr,
            country_uk
        ]
    }

    let continent_as = {
        name: "asia",
        countries: [
            country_ch,
            country_jp
        ]
    }

    let world = {
        continents: [
            continent_as,
            continent_eu
        ]
    };

    log("shallowCloneTrapDemo()");
    log("Before shallow copy:");
    log("world = " + JSON.stringify(world));
    let world_clone = Object.assign({}, world);
    log("world_clone = " + JSON.stringify(world_clone));

    log("After shallow copy:")
    world_clone.continents[0].countries[0].capital =  "XOXOXOXOXOXOXOXO";
    log("world = " + JSON.stringify(world));
    log("world_clone = " + JSON.stringify(world_clone));
}

function objectCloningDemo() {
    log("objectCloningDemo()");

    let country_uk = {
        name: "United Kingdom",
        capital: "London"
    };

    let country_fr = {
        name: "France",
        capital: "Paris"
    };

    let country_ch = {
        name: "China",
        capital: "Beijing"
    };

    let country_jp = {
        name: "Japan",
        capital: "Tokio"
    };

    let continent_eu = {
        name: "europe",
        countries: [
            country_fr,
            country_uk
        ]
    }

    let continent_as = {
        name: "asia",
        countries: [
            country_ch,
            country_jp
        ]
    }

    let planet = {
        name: "Earth",
        continents: [
            continent_as,
            continent_eu
        ]
    };

    function objectAssignDemo(obj) {
        log("obj = " + JSON.stringify(obj));
        let obj_clone = Object.assign({}, obj);
        log("obj_clone = " + JSON.stringify(obj_clone));
    }

    function processCountry(country) {
        let country_clone = Object.assign({}, country);
        country_clone.name = "WhateverCountryName";
        return country_clone;
    }

    function process1(planet) {
        let planet_clone = Object.assign({}, planet);
        delete planet_clone.name;
        // log("planet_clone = " + JSON.stringify(planet_clone));
        return planet_clone;
    }

    function process2(planet) {
        let planet_clone = Object.assign({}, planet);
        // (!) We are changing nested object on the cloned object - this makes permanent damage on that object and breaks immuatability!
        planet_clone.continents[0].name = "*** WHATEVER CONTINTENT ***";
        return planet_clone;
    }

    function process3(planet) {
        let planet_clone = Object.assign({}, planet);
        delete planet_clone.continents;
        // log("planet_clone = " + JSON.stringify(planet_clone));
        return planet_clone;
    }


    function shallowCloneDemo() {
        log("shallowCloneDemo()");

        let country_uk = {
            name: "United Kingdom",
            capital: "London"
        };

        let country_fr = {
            name: "France",
            capital: "Paris"
        };

        let country_ch = {
            name: "China",
            capital: "Beijing"
        };

        let country_jp = {
            name: "Japan",
            capital: "Tokio"
        };

        let continent_eu = {
            name: "europe",
            countries: [
                country_fr,
                country_uk
            ]
        }

        let continent_as = {
            name: "asia",
            countries: [
                country_ch,
                country_jp
            ]
        }

        let planet = {
            name: "Earth",
            continents: [
                continent_as,
                continent_eu
            ]
        };

        log("planet = " + JSON.stringify(planet));
        let processed1 = process1(planet);
        log("processed1 = " + JSON.stringify(processed1));
        log("planet = " + JSON.stringify(planet));
        let processed2 = process2(processed1);
        log("processed2 = " + JSON.stringify(processed2));
        log("planet = " + JSON.stringify(planet));
        let processed3 = process3(processed2);
        log("processed3 = " + JSON.stringify(processed3));
        log("planet = " + JSON.stringify(planet));
    }


    // objectAssignDemo();
    shallowCloneDemo();
}

function demo() {
    demo1();
    shallowCloneTrapDemo();
    objectCloningDemo();
}
