import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-basic-features').onclick = function() {
    clearElement('output');
    demoBasicFeatures();
};

document.getElementById('button-demo-1').onclick = function() {
    clearElement('output');
    demo1();
};

document.getElementById('button-demo-2').onclick = function() {
    clearElement('output');
    demo2();
};

document.getElementById('button-demo-3').onclick = function() {
    clearElement('output');
    demo3();
};

document.getElementById('button-demo-4').onclick = function() {
    clearElement('output');
    demo4();
};

document.getElementById('button-demo-5').onclick = function() {
    clearElement('output');
    demo5();
};

let _isConnectedToInternet = false;

let statusOnlineElement = document.getElementById('status_online');
statusOnlineElement.style.display = 'none';

let statusOfflineElement = document.getElementById('status_offline');
statusOfflineElement.style.display = 'none';

function checkOnlineStatus(onOnlineDetected = function (){}) {

}

async function demoBasicFeatures() {
    async function f1() {
        return 1;
    }

    // Just like in C#, return type of async function depends on the way how it's called.

    // If it's called as sync function, it returns a Promise object (Task in C#).
    // Returned value is automatically wrapped into the resolved Promise.
    let res1 = f1();
    log(`typeof res1 = ${typeof res1}`);
    log(`res1.constructor.name = ${res1.constructor.name}`);

    // If it's called as async function (if it's awated), it returns the value from the 'return' statement.  
    let res2 = await f1();
    log(`typeof res2 = ${typeof res2}`);
    log(`res2.constructor.name = ${res2.constructor.name}`);

    async function f2(isTobeResolvedSuccessfully) {
        return new Promise((resolve, reject) => {
            if (isTobeResolvedSuccessfully) {
                resolve(123);
            } else {
                reject('Failed to retrieve the value.');
            }
        });
    }

    // Demo awaiting the Promise in try-catch block

    try {
        let res = await f2(true);
        log(`res = ${res}`); // output: res = 123
    } catch (e) {
        log(`e = ${e}`);
    }

    try {
        let res = await f2(false);
        log(`res = ${res}`);
    } catch (e) {
        log(`e = ${e}`); // output: e = Failed to retrieve the value.
    }

    // Demo attaching callbacks to the Promise (with then/catch; await is not used)

    f2(true)
        .then(res => {
            log(`res = ${res}`); // output: res = 123 
        })
        .catch(e => {
            log(`e = ${e}`);
        });

    f2(false)
        .then(res => {
            log(`res = ${res}`);
        })
        .catch(e => {
            log(`e = ${e}`); // output: e = Failed to retrieve the value.
        });

    log('');
    // What happens if Promise gets rejected by throwing exception (not by calling reject)
    async function f3(isTobeResolvedSuccessfully) {
        return new Promise((resolve, reject) => {
            if (isTobeResolvedSuccessfully) {
                resolve(123);
            } else {
                throw new Error('Failed to retrieve the value.'); 
            }
        });
    }

    // Demo awaiting the Promise in try-catch block

    try {
        let res = await f3(true);
        log(`res1 = ${res}`); // output: res = 123
    } catch (e) {
        log(`e1 = ${e}`);
    }

    try {
        let res = await f3(false);
        log(`res2 = ${res}`);
    } catch (e) {
        log(`e2 = ${e}`); // output: e = Failed to retrieve the value.
    }

    // Demo attaching callbacks to the Promise (with then/catch; await is not used)

    f3(true)
        .then(res => {
            log(`res3 = ${res}`); // output: res = 123 
        })
        .catch(e => {
            log(`e3 = ${e}`);
        });

    f3(false)
        .then(res => {
            log(`res4 = ${res}`);
        })
        .catch(e => {
            log(`e4 = ${e}`); // output: e = Failed to retrieve the value.
        });

    log('');

    // What happens if Promise gets manually settle (not by calling resolve/reject but Promise.resolve/Promise.reject)
    async function f4(isTobeResolvedSuccessfully) {
        if (isTobeResolvedSuccessfully) {
            return Promise.resolve(123);
        } else {
            return Promise.reject('Failed to retrieve the value.');
            // throw new Error('Failed to retrieve the value.'); 
        }
    }

    try {
        let res = await f4(true);
        log(`res = ${res}`);  // output: res = 123
    } catch (e) {
        log(`e = ${e}`);
    }

    try {
        let res = await f4(false);
        log(`res = ${res}`);
    } catch (e) {
        log(`e = ${e}`); // output: e = Failed to retrieve the value.
    }
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

function determineInternetConnectionAsync2() {
    log((new Date()).toLocaleTimeString());
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open('GET', 'http://geoip.nekudo.com/api');
        req.onreadystatechange = function () {
            log('onreadystatechange()');
            log(`req.readyState = ${req.readyState}, req.status = ${req.status}`);
            if (req.readyState == 4) {
                let reqSucceeded = (req.status >= 200 && req.status < 304);
                if (reqSucceeded) {
                    resolve(req.responseText);
                }
                else {
                    reject('GeoIp request failed.');
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
    });
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

async function demo3() {
    try {
        const initialTimeout = 5000;
        const maxInterval = 30000; // 60000
        const maxElapsedTime = 0; // 600000
        const multiplier = 2;
        const f = determineInternetConnectionAsync2;
        let geoIpJson = await exponentialBackoffExecutionAsync(initialTimeout, maxInterval, maxElapsedTime, multiplier, f);
    } catch (e) {
        log(`e = ${e}`);
    }
}

async function demo4() {
    let result;
    try {
        result = await determineInternetConnectionAsync2();
        log(`demo4(): result = ${result}`); 
    } catch (e) {
        // handle first f's failure
        log(`demo4(): error = ${e}`);
        try {
            const initialTimeout = 5000;
            const maxInterval = 30000; // 60000
            const maxElapsedTime = 0; // 600000
            const multiplier = 2;
            const f = determineInternetConnectionAsync2;
            result = await exponentialBackoffRetryAsync(initialTimeout, maxInterval, maxElapsedTime, multiplier, f);
            // handle result
            log(`demo4(): result = ${result}`);
        } catch (e) {
            // handle failure of all retries
            log(`demo4(): error = ${e}`);
        }
    }
}

async function demo5() {
    let result;
    try {
        result = await determineInternetConnectionAsync2();
        log(`demo4(): result = ${result}`); 
    } catch (e) {
        // handle first f's failure
        log(`demo4(): error = ${e}`);
        try {
            const initialTimeout = 5000;
            const maxInterval = 30000; // 60000
            const maxElapsedTime = 2 * 60 * 1000; // 2 mins
            const multiplier = 2;
            const f = determineInternetConnectionAsync2;
            result = await exponentialBackoffRetryAsync(initialTimeout, maxInterval, maxElapsedTime, multiplier, f);
            // handle result
            log(`demo4(): result = ${result}`);
        } catch (e) {
            // handle failure of all retries
            log(`demo4(): error = ${e}`);
        }
    }
}