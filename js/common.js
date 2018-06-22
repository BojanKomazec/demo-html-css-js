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

function getShortTimestamp() {
    var currentdate = new Date(); 
    return currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
}