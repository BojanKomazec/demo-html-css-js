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

//
// Core functions
//


function initialization() {
    log('Empty array:');
    let arr = [];
    log(`arr = ${arr}`);

    log('');
    log('Array containg 1, \'1\', \"1\"');
    arr = [1, '1', "1"];
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
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
function forEachDemo() {
    let arr = [1, 2, 3];
    log(`arr = ${arr}`);
    arr.forEach(el => log(`${el}`));
}