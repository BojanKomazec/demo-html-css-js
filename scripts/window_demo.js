import { clearElement, log}  from './common.js';

// To test these event handlers: open window_demo.html in a tab or separate Window and then try to close it.
// (Typing at lest one character in the input might be required)
//
// window_demo.html has to have some user input element (e.g. <input>) 
// otherwise Chrome wouldn't show popup (beforeunload dialog) which looks like this:
//
// -----------------------------------------
// "Leave site? 
//  Changes you made might not be saved.
//                         [Leave][Cancel]
// -----------------------------------------
//
// See: 
//  https://developers.google.com/web/updates/2017/03/dialogs-policy
//  https://www.chromestatus.com/feature/5082396709879808)
//
// My tests in Chrome:
// I had to put breakpoints to unload handlers in order to verify that they fire.

// Preferred way of attaching (possibly multiple) event handlers is addEventListener.
window.addEventListener('beforeunload', function (event) {
    const dialogText = 'beforeunload';
    event.returnValue = dialogText;
    console.log(dialogText);
    // alert(dialogText); // In Chrome this error appears: Blocked alert('beforeunload') during beforeunload.
    log(dialogText);
    // debugger; // try breaking into debugger
    return dialogText;
});

// Alternative way of attaching a (single) handler.
// window.onbeforeunload = function(event) { 
//     const dialogText = 'onbeforeunload';
//     event.returnValue = dialogText;
//     console.log(dialogText);
//     // alert(dialogText); // // In Chrome this error appears: Blocked alert('onbeforeunload') during beforeunload.
//     return dialogText;
// };

window.addEventListener('unload', function (event) {
    // debugger; // try breaking into debugger
    const dialogText = 'unload';
    event.returnValue = dialogText;
    console.log(dialogText);
    // log(dialogText); // no need for this as at this point nothing is visible anymore to the end user
    // alert(dialogText); // In Chrome this error appears: Blocked alert('unload') during unload.
    return dialogText;
});

// window.onunload = function(event) {
//     const dialogText = 'unload';
//     event.returnValue = dialogText;
//     console.log(dialogText);
//     // log(dialogText); // no need for this as at this point nothing is visible anymore to the end user
//     // alert(dialogText); // In Chrome this error appears: Blocked alert('unload') during unload.
//     return dialogText;
// };

//
// HTML event callbacks
//
document.getElementById('button-demo-location').onclick = function() {
    clearElement('output');
    locationDemo();
};

//
// Core functions
//

function locationDemo(){
    log(`location = ${location}`);
    log(`window.location = ${window.location}`);
    log(`window.location.protocol = ${window.location.protocol}`);
    log(`window.location.host = ${window.location.host}`);
    log(`window.location.port = ${window.location.port}`);

    var srcUrl = window.location.protocol + '//' + window.location.host  + '/src';
    log(srcUrl);
}