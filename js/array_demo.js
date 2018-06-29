//
// HTML event callbacks
//

document.getElementById('button-demo-initializing').onclick = function() {
    clearElement('output');
    initialization();
}

document.getElementById('button-demo-adding-removing').onclick = function() {
    clearElement('output');
    addingAndRemovingElements();
}

document.getElementById('button-demo-element-ops').onclick = function() {
    clearElement('output');
    elementOperations();
}

document.getElementById('button-demo-4').onclick = function() {
    clearElement('output');
    demo4();
}

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
    arr.push(value)
    printElementPresence(arr, value);
}



