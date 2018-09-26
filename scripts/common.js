//
// Helper functions
//

function clearElement(id) {
    var myNode = document.getElementById(id);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function log(text) {
    var outputElement = document.getElementById('output');
    var textContent = document.createTextNode(text);
    outputElement.appendChild(textContent);

    var br = document.createElement('br');
    outputElement.appendChild(br);
}

/*
* Returns current time timestamp as string HH:MM:SS.
* NOTE: 
*    Better Acceptable solution: new Date().toLocaleTimeString() // outputs e.g. 10:59:18 AM
*
*/ 
function getShortTimestamp() {
    var currentdate = new Date(); 
    return currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();
}

/*
* Triggers execution of the async method after timeout delay.
*
* @param {int} timeout setTimeout's timeout
* @param {function} f Function to be executed after timeout expires.
* @return A promise which is resolved after f() returns.
*
*/
async function executeDelayedAsync(timeout, f) {
    return new Promise((resolve, reject) => {
        let timer = setTimeout(async () => {
            log('timeout handler');
            clearTimeout(timer);
            try {
                let result = await f();
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }, timeout);
    })
}

/*
* Retries to execute function f in a loop by using Exponential backoff. First execution is performed immediately.
*
* @param {int} initialTimeout Initial period (in milliseconds) after which first retry is performed.
* @param {int} maxInterval Maximal period (in milliseconds) between two consecutive retries.
* @param {int} maxElapsedTime Maximum period (in milliseconds) of all retries. If 0, retries go indefinitely untill f resolves (settles successfully).
* @param {int} multiplier Used to calculate the next timeout.
* @param {function} f Function to be executed.
*
* @todo Add random offset to each new timeout to prevent the case when multiple synchronized clients hitting the same server at same times.
*/
async function exponentialBackoffExecutionAsync(initialTimeout, maxInterval, maxElapsedTime, multiplier, f) {
    let timeout = initialTimeout;

    let result;
    let isRetryRequired = false;
    let elapsedTime = 0;

    try {
        result = await f();
        log(`exponentialBackoffExecutionAsync(): result = ${result}`); 
        return result;
    } catch (e) {
        log(`exponentialBackoffExecutionAsync(): error = ${e}`);
        let timeout = initialTimeout;

        while(true) {
            try {
                result = await executeDelayedAsync(timeout, f);
                return result;
            } catch (e) {
                log(`exponentialBackoffExecutionAsync(): error = ${e}`);
            }
            
            if (maxElapsedTime > 0) {
                elapsedTime += timeout;
                if (elapsedTime < maxElapsedTime) {
                    if (timeout < maxInterval) {
                        timeout = Math.min(timeout * multiplier, maxInterval);
                    }
                } else {
                    throw new Error('All retries failed.');
                }
            }
        }
    }
}

/*
* Retries to execute function f in a loop by using Exponential backoff. First execution is performed after initialTimeout.
*
* @param {int} initialTimeout Initial period (in milliseconds) after which first retry is performed.
* @param {int} maxInterval Maximal period (in milliseconds) between two consecutive retries.
* @param {int} maxElapsedTime Maximum period (in milliseconds) of all retries. If 0, retries go indefinitely untill f resolves (settles successfully).
* @param {int} multiplier Used to calculate the next timeout.
* @param {function} f Function to be executed.
*
* @todo Add random offset to each new timeout to prevent the case when multiple synchronized clients hitting the same server at same times.
* @todo Add the ability to cancel the function execution
*
* Example of the usage:
*
*    let result;
*    try {
*        result = await f();
*        // handle result
*    } catch (e) {
*        // handle first f's failure
*        try {
*           result = await exponentialBackoffRetryAsync(initialTimeout, maxInterval, maxElapsedTime, multiplier, f)
*           // handle result
*        } catch (e) {
*           // handle failure of all retries
*        }
*    }
*/
async function exponentialBackoffRetryAsync(initialTimeout, maxInterval, maxElapsedTime, multiplier, f) {
    let elapsedTime = 0;
    let timeout = initialTimeout;

    do {
        try {
            return await executeDelayedAsync(timeout, f);
        } catch (e) {
            log(`exponentialBackoffExecutionAsync(): error = ${e}`);
        }
        
        if (maxElapsedTime > 0) {
            elapsedTime += timeout;
        }

        if (timeout < maxInterval) {
            timeout = Math.min(timeout * multiplier, maxInterval);
        }
    } while ((maxElapsedTime == 0) || ((maxElapsedTime > 0) && (elapsedTime < maxElapsedTime)));

    throw new Error('All retries failed.');
}

function hideAllDivChildren(element) {
    let divs = element.querySelectorAll('div');
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.display = 'none';
    }
}

export {
    clearElement,
    log,
    hideAllDivChildren
};