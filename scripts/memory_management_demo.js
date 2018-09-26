import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-demo1').onclick = function() {
    clearElement('output');
    demo1();
};

document.getElementById('button-demo-demo2').onclick = function() {
    clearElement('output');
    demo2();
};

//
// Core functions
//

async function fetchGeoIpDataAsync() {
    let response = await fetch('http://geoip.nekudo.com/api');
    let data = await response.text();
    log(`fetchGeoIpDataAsync(): Data: ${data}`);
    return data;
}

async function demo1() {
    log('demo1');

    let data_fn;

    try {
        let data = await fetchGeoIpDataAsync();
        log(`Data (try scope): ${data}`);

        // although 'data' variable will go here out of scope
        // the object it references won't be claimed by garbage collector
        // as 'data_fn' will refer to it and 'data_fn' will live in the outer (function) scope.
        data_fn = data;
    } catch (e) {
        log(`Error: ${e}`);
    }

    log(`Data (function scope): ${data_fn}`);
}

function demo2() {
    log('demo2');

    // Take this as the following: object { name : "Alexa" } is created in memory.
    // Reference to that memory is stored as the element of array. 
    let arr = [ { name : "Alexa" } ];
    log(`arr[0] = ${JSON.stringify(arr[0])}`);

    let arr2 = [];

    // This performs shallow copy - only references are copied (but not data)
    // Both arrays have elements which point to the same data.
    for(let i = 0; i < arr.length; ++i) {
        arr2[i] = arr[i];
    }

    log(`arr2[0] = ${JSON.stringify(arr2[0])}`);

    arr2[0].name = 'Echo';
    log(`arr2[0] = ${JSON.stringify(arr2[0])}`);
    log(`arr[0] = ${JSON.stringify(arr[0])}`);
}