//alert('Press OK to start...');

function log(text) {
    var outputElement = document.getElementById('output');
    var textContent = document.createTextNode(text);
    outputElement.appendChild(textContent);
}

function delay(timeInterval) {
    return new Promise(function(resolve, reject) {
        return setTimeout(resolve, timeInterval);
    });
}

var promise = delay(3000);
//promise.then(log('Delay completed!')); // WRONG! log() is executed immediately!
promise.then(function() { log('Delay completed!') });