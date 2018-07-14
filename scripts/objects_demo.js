//
// HTML event callbacks
//

document.getElementById('button-demo-1').onclick = function() {
    clearElement('output');
    demo1();
}

document.getElementById('button-demo-reflection').onclick = function() {
    clearElement('output');
    demoReflection();
}

document.getElementById('button-demo-types').onclick = function() {
    clearElement('output');
    demoTypes();
}

document.getElementById('button-demo-object-getOwnPropertyNames').onclick = function() {
    clearElement('output');
    Object_getOwnPropertyNames_demo();
}


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
function logKeys(obj) {
    log('logKeys()');
    let keys = Object.keys(obj);
    keys.forEach(function(key) {
        log(`key: ${key}`);
    });
}

// for..in 
function logKeys2(obj) {
    log('logKeys2()');
    for(let key in obj) {
        log(`\t\tkey: ${key}`);
    };
}

function logKeysAndValues(obj) {
    log('logKeysAndValues()');
    for(let key in obj) {
        log(`${key} : ${obj[key]}`);
    };
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


    log('\n')
    
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
    log('demoTypes');
    log(`typeof \'test\' = ${typeof 'test'}`); // output: string

    // String is a global object - a constructor for strings
    log(`typeof new String() = ${typeof new String()}`); // output: 
    log(`typeof new String(\'test\') = ${typeof new String('test')}`); // output:

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