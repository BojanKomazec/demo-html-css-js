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
    return currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
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
    return new Promise(resolve => {
        let timer = setTimeout(async () => {
            log('timeout handler');
            clearTimeout(timer);
            let result = await f();
            resolve(result);
        }, timeout);
    })
}

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
                result = await executeDelayedAsync(timeout, f)();
                return result;
            } catch (e) {
                log(`exponentialBackoffExecutionAsync(): error = ${e}`);
                elapsedTime += timeout;
            }
            
            if ((timeout < maxInterval) && (elapsedTime < maxElapsedTime)) {
                timeout *= multiplier;
            } else {
                throw new Error('All retries failed.');
            }
        }
    }
}
