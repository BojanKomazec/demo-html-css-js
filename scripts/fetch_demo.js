import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-1').onclick = function() {
    clearElement('output');
    initialization();
};

document.getElementById('button-demo-2').onclick = function() {
    clearElement('output');
    demo2();
};

document.getElementById('button-demo-3').onclick = function() {
    clearElement('output');
    demo3();
};

//
// Core functions
//

function initialization() {
    log('Using *then-catch* idiom to call fetch API:');
    let url = 'http://geoip.nekudo.com/api'; // returns body in JSON format
    fetch(url).then(response => {
        log(`Response: ${response}`);
        log(`Response status : ${response.status}`);
        log(`Response statusText : ${response.statusText}`);
        log(`Response body : ${response.body}`);

        // response data is JSON so can use json() API to parse it
        log('Parsing response body as *JSON*:');
        response.json().then(data => {
            log(`Response data: ${JSON.stringify(data)}`);
        });
    }).catch(e => {
        log(`Error: ${e.statusText}`);
    });
}

async function demo2() {
    log('Using *async-await* idiom to call fetch API:');
    try {
        let response = await fetch('http://geoip.nekudo.com/api');
        log(`Response status : ${response.status}`);
        log(`Response statusText : ${response.statusText}`);
        if (response.status == 200) {
            try {
                log('Parsing response body as *JSON*:');
                let data = await response.json();
                log(`Response data: ${JSON.stringify(data)}`);
            } catch (e) {
                log(`Error: ${e.statusText}`);
            }
        }
    } catch (e) {
        log(`Error: ${e.statusText}`);
    }
}

async function demo3() {
    log('Using *async-await* idiom to call fetch API:');
    try {
        let response = await fetch('http://geoip.nekudo.com/api');
        log(`Response status : ${response.status}`);
        log(`Response statusText : ${response.statusText}`);
        if (response.status == 200) {
            try {
                log('Parsing response body as *text*:');
                let data = await response.text();
                log(`Response data: ${data}`);
            } catch (e) {
                log(`Error: ${e.statusText}`);
            }
        }
    } catch (e) {
        log(`Error: ${e.statusText}`);
    }
}