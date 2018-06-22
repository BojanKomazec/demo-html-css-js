//
// HTML event callbacks
//

document.getElementById('button-demo-1').onclick = function() {
    clearElement('output');
    demo1();
}

document.getElementById('button-demo-2').onclick = function() {
    clearElement('output');
    demo2();
}

let _isConnectedToInternet = false;

let statusOnlineElement = document.getElementById('status_online');
statusOnlineElement.style.display = 'none';

let statusOfflineElement = document.getElementById('status_offline');
statusOfflineElement.style.display = 'none';

function checkOnlineStatus(onOnlineDetected = function (){}) {

}

function determineInternetConnection() {
    let req = new XMLHttpRequest();
    //req.open('GET', 'https://www.google.com/s2/favicons?domain=google.com');
    req.open('GET', 'http://geoip.nekudo.com/api');
    // req.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36');
    // req.setRequestHeader('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
    // req.setRequestHeader('accept-encoding', 'gzip, deflate, br');
    // req.setRequestHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');

    req.onreadystatechange = function () {
        log('onreadystatechange()');
        log(`req.readyState = ${req.readyState}, req.status = ${req.status}`);
        if (req.readyState == 4) {
            let reqSucceeded = (req.status >= 200 && req.status < 304);
            if (reqSucceeded) {
                log('Request succeeded. Response: ' + req.responseText);
                _isConnectedToInternet = true;
            }
            else {
                log('Request failed.');
                _isConnectedToInternet = false;
            }
        }
    };
    req.send();
    log('Request sent.');
}

function determineInternetConnectionAsync() {
    log((new Date()).toLocaleTimeString());
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        // req.open('GET', 'https://www.google.com/s2/favicons?domain=google.com');
        req.open('GET', 'http://geoip.nekudo.com/api');
        // req.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36');
        // req.setRequestHeader('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
        // req.setRequestHeader('accept-encoding', 'gzip, deflate, br');
        // req.setRequestHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');

        req.onreadystatechange = function () {
            log('onreadystatechange()');
            log(`req.readyState = ${req.readyState}, req.status = ${req.status}`);
            if (req.readyState == 4) {
                let reqSucceeded = (req.status >= 200 && req.status < 304);
                if (reqSucceeded) {
                    log('Request succeeded. Response: ' + req.responseText);
                    //_isConnectedToInternet = true;
                    resolve(true);
                }
                else {
                    log('Request failed.');
                    //_isConnectedToInternet = false;
                    resolve(false);
                }
            }
        };
        req.send();
        log('Request sent.');
    });
}

//document.addEventListener('DOMContentLoaded', function() {
    //determineInternetConnection();
//});

//determineInternetConnection();

function updateStatus(isConnectedToInternet) {
    if (isConnectedToInternet) {
        statusOnlineElement.style.display = 'block';
        statusOfflineElement.style.display = 'none';
    } else {
        statusOnlineElement.style.display = 'none';
        statusOfflineElement.style.display = 'block';
    }
}

async function executeDelayedDetermineInternetConnectionAsync(timeout) {
    return new Promise(resolve => {
        let timer = setTimeout(async () => {
            log('timeout handler');
            clearTimeout(timer);
            let isConnectedToInternet = await determineInternetConnectionAsync();
            resolve(isConnectedToInternet);
        }, timeout);
    })
}

async function demo1() {
    let isConnectedToInternet = await determineInternetConnectionAsync();
    log(`isConnectedToInternet = ${isConnectedToInternet}`);
    updateStatus(isConnectedToInternet);

    let timeout = 5000;
    while(!isConnectedToInternet) {
        isConnectedToInternet = await executeDelayedDetermineInternetConnectionAsync(timeout);
        timeout *= 2;
    }
    updateStatus(isConnectedToInternet);
}

async function demo2() {
    let isConnectedToInternet = await determineInternetConnectionAsync();
    log(`isConnectedToInternet = ${isConnectedToInternet}`);
    updateStatus(isConnectedToInternet);

    let timeout = 5000;
    while(!isConnectedToInternet) {
        isConnectedToInternet = await executeDelayedAsync(timeout, determineInternetConnectionAsync);
        timeout *= 2;
    }
    updateStatus(isConnectedToInternet);
}