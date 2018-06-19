//alert('Press OK to start...');

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

//
// Core functions
//

function demo1() {
    var promise = new Promise((resolve, reject) => {
        log('executor()');
        if (Math.random() > .5) {
            resolve("SUCCESS");
          } else {
            reject("FAILURE");
          }
    });
    
    promise.then(
        resultSuccess => { log(resultSuccess); }, 
        resultFailure => { log(resultFailure); }
    );
}


function delay(timeInterval) {
    log('delay()');
    return new Promise(function(resolve, reject) {
        log('executor()');
        return setTimeout(resolve, timeInterval);
    });
}

function demo2() {
    var promise = delay(3000);
    //promise.then(log('Delay completed!')); // WRONG! log() is executed immediately!
    promise.then(function() { log('Delay completed!') });
}