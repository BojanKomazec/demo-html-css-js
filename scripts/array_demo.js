import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-initializing').onclick = function() {
    clearElement('output');
    initialization();
};

document.getElementById('button-demo-adding-removing').onclick = function() {
    clearElement('output');
    addingAndRemovingElements();
};

document.getElementById('button-demo-element-ops').onclick = function() {
    clearElement('output');
    elementOperations();
};

document.getElementById('button-demo-search').onclick = function() {
    clearElement('output');
    demoSearch();
};

document.getElementById('button-demo-destructuring').onclick = function() {
    clearElement('output');
    demoDestructuring();
};

document.getElementById('button-demo-copying').onclick = function() {
    clearElement('output');
    copyingDemo();
};

document.getElementById('button-demo-filter').onclick = function() {
    clearElement('output');
    filterDemo();
};

document.getElementById('button-demo-map').onclick = function() {
    clearElement('output');
    mapDemo();
};

document.getElementById('button-demo-forEach').onclick = function() {
    clearElement('output');
    forEachDemo();
};

document.getElementById('button-demo-isArray').onclick = function() {
    clearElement('output');
    isArrayDemo();
};

document.getElementById('button-demo-slice').onclick = function() {
    clearElement('output');
    sliceDemo();
};

document.getElementById('button-demo-join').onclick = function() {
    clearElement('output');
    joinDemo();
};

document.getElementById('button-demo-reduce').onclick = function() {
    clearElement('output');
    reduceDemo();
};

document.getElementById('button-demo-add-elements-conditionally').onclick = function() {
    clearElement('output');
    addElementsConditionally();
};

//
// Core functions
//


function initialization() {
    log('Empty array:');
    let arr = [];
    log(`arr = ${arr}`);

    log('');
    log('Array containg 1, \'1\', \"1\"');
    arr = [1, '1', '1'];
    log(`arr = ${arr}`);
    log(`arr[0] = ${arr[0]}`);
    log(`arr[1] = ${arr[1]}`);
    log(`arr[2] = ${arr[2]}`);
    log(`typeof arr[0] = ${typeof arr[0]}`);
    log(`typeof arr[1] = ${typeof arr[1]}`);
    log(`typeof arr[2] = ${typeof arr[2]}`);

    log('');
    log('Referencing the element past the last one: ');
    log(`arr[3] = ${arr[3]}`);
}

function addingAndRemovingElements() {
    let arr = [];
    log(`arr = ${arr}`);

    arr.push(1);
    log(`arr = ${arr}`);

    arr.push(2, 3);
    log(`arr = ${arr}`);

    arr.push([4, 5, 6]);
    log(`arr = ${arr}`);

    log('');
    log('Array concatenation: ');
    let arr2 = [7, 8];
    log(`arr2 = ${arr2}`);

    arr.push(arr2);
    log(`arr = ${arr}`);
}


function printElementPresence(arr, element) {
    if (arr.indexOf(element) === -1) {
        log(`Array does not contain element ${element}`);
    } else {
        log(`Array contains element ${element}`);
    }
}

function elementOperations() {
    let arr = [1, 2, 3];
    log(`arr = ${arr}`);
    log(`arr[2] = ${arr[2]}`);
    log(`arr[3] = ${arr[3]}`);

    log('Element presence check:');
    let value = 4;
    if (arr.indexOf(value) === -1) {
        log(`Array does not contain element ${value}`);
    }
    arr.push(value);
    printElementPresence(arr, value);
}

function demoSearch() {
    let arr = [1, 2, 3, 4, 5];
    let e = arr.find(e => e < 3);
    log(e);
    e = arr.find(e => e > 4);
    log(e);
    e = arr.find(e => e > 5);
    log(e);
    if (e === undefined) {
        log('Element which matches given criteria has not been found in the array.');
    }
}

function demoDestructuring() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    {
        let [a, b] = arr;
        log(`a = ${a}, b = ${b}`); // a = 1, b = 2
    }

    {
        let [a, b, ...c] = arr;
        log(`a = ${a}, b = ${b}, c = ${c}`);
    }
}

function copyingDemo() {
    let arr = [1, 2, 3];
    log(`arr = ${arr}`);

    {
        let arr2 = [].concat(arr);
        log(`arr2 = ${arr2}`);
    }

    {
        let arr2 = arr.concat();
        log(`arr2 = ${arr2}`);
    }

    {
        // spread syntax
        let arr2 = [...arr];
        log(`arr2 = ${arr2}`);
    }

    {
        //if arr2 already has some elements
        let arr2 = [9, 8, 7];
        arr2 = [...arr];
        log(`arr2 = ${arr2}`);
    }
}

function filterDemo() {
    let arr = [1, 2, 3, 4, 5];
    log(`arr = ${arr}`);
    let arr2 = arr.filter(el => el > 3);
    log(`arr2 = ${arr2}`);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
function mapDemo() {
    let arr = [1, 2, 3];
    log(`arr = ${arr}`);
    let arr2 = arr.map(el => el * 2);
    log(`arr2 = ${arr2}`);
    arr.map((el, index) => log(`index = ${index}, element = ${el}`));
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// https://stackoverflow.com/questions/12482961/is-it-possible-to-change-values-of-the-array-when-doing-foreach-in-javascript
function forEachDemo() {
    log("forEachDemo()");
    let arr = [1, 2, 3];
    log(`arr = ${arr}`);
    arr.forEach(el => log(`${el}`));

    // It is possible to change array elements in forEach loop:
    arr.forEach((elem, index, arr) => {
        arr[index] = elem + 1;
    });
    log(`arr = ${arr}`);

    // another option - pass array as 2nd arg of forEach (not the callback); callback must be in form of 'function'
    arr.forEach(function(elem, index) {
        this[index] = elem + 1;
    }, arr);
    log(`arr = ${arr}`);
    log("~forEachDemo()");
}

function isArrayDemo() {
    log(`Array.isArray([]): ${Array.isArray([])}`);
    log(`Array.isArray([0]): ${Array.isArray([0])}`);
    log(`Array.isArray([0, 1, 2]): ${Array.isArray([0, 1, 2])}`);
    log(`Array.isArray(true): ${Array.isArray(true)}`);
    log(`Array.isArray('IAmAString'): ${Array.isArray('IAmAString')}`);
    log(`Array.isArray(123): ${Array.isArray(123)}`);
    log(`Array.isArray({ name : 'Bojan' }}): ${Array.isArray({ name : 'Bojan' })}`);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
function sliceDemo() {
    let arr = ['Anna', 'Becky', 'Charlotte', 'Danny', 'Eleonore'];
    log(`arr = ${arr}`);
    log(`arr.slice(0, 0) =  ${arr.slice(0, 0)}`);
    log(`arr.slice(0, 1) =  ${arr.slice(0, 1)}`);
    log(`arr.slice(0, 2) =  ${arr.slice(0, 2)}`);
    log(`arr.slice(1, 3) =  ${arr.slice(1, 3)}`);
    log(`arr.slice(3, 1) =  ${arr.slice(3, 1)}`);
    log(`arr.slice(-1, 2) =  ${arr.slice(-1, 2)}`);
    log(`arr.slice(-1, 4) =  ${arr.slice(-1, 4)}`);
    log(`arr.slice(2, -1) =  ${arr.slice(2, -1)}`);
    log(`arr.slice(2, -2) =  ${arr.slice(2, -2)}`);
    log(`arr.slice(0, 5) =  ${arr.slice(0, 5)}`);
    log(`arr.slice(4, 6) =  ${arr.slice(4, 6)}`);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
function joinDemo() {
    let arr = ['Anna', 'Becky', 'Charlotte', 'Danny', 'Eleonore'];
    log(`arr = ${arr}`);
    log(`arr.join() =  ${arr.join()}`);
    log(`arr.join(',') =  ${arr.join(',')}`);
    log(`arr.join(' ') =  ${arr.join(' ')}`);
    log(`arr.join('-') =  ${arr.join('-')}`);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
// https://hackernoon.com/reduce-your-fears-about-array-reduce-629b334ab945
// reduce() method executes provided reducer function on each member of the array resulting in a single output value
function reduceDemo() {
    let arr = [1, 2, 3, 4, 5];

    function reducer(accumulator, nextElement) {
        accumulator += nextElement;
        return accumulator;
    }

    let finalValue = arr.reduce(reducer);
    log(`finalValue = ${finalValue}`);

    FilterUniqueValuesOfNestedProperty();
}

function FilterUniqueValuesOfNestedProperty() {
    const locations = [
        {
            country: 'Austria',
            city: 'Lienz'
        },
        {
            country: 'Austria',
            city: 'Wiena'
        },
        {
            country: 'Bulgaria',
            city: 'Sofia'
        },
        {
            country: 'Croatia',
            city: 'Zagreb'
        },
        {
            country: 'Croatia',
            city: 'Split'
        },
    ];

    const countries = locations.reduce((countries, location) => {
        if (!countries.includes(location.country)) {
            countries.push(location.country);
        }
        return countries;
    }, []);

    log(`Unique countries = ${countries}`);

    /**
     * Create a dictionary which has a country name as a key and an array of cities within it as an value
     */
    const dictionary = locations.reduce((map, location) => {
        if(!Object.keys(map).includes(location.country)) {
            map[location.country] = [];
        }
        map[location.country].push(location.city);
        return map;
    }, {});

    log(`Dictionary = ${JSON.stringify(dictionary)}`);
}

/**
 * filter(callback) - removes from array any element for which callback returns false.
 *
 * Boolean is a constructor for a boolean type - it returns either true or false.
 * It returns false for all falsy input values 0, -0, "", NaN, null and false.
 *
 * This example is also called "Falsy bouncer" as it removes all elements of array which render as falsy if converted
 * to boolean type.
 */
function addElementsConditionally() {
    const condition1 = false;
    const condition2 = true;
    const myArray = [
        {
            id: 1
        },
        condition1 && {
            id: 2
        },
        condition2 && {
            id: 3
        },
    ].filter(Boolean);

    log('Array elements: ');
    myArray.forEach(el => log(el.id));
}
