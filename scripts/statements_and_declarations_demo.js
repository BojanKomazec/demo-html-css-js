document.getElementById('button-demo-switch').onclick = function() {
    clearElement('output');
    demoSwitch();
}

function demoSwitch() {
    log(`getMessage('msg1') = ${getMessage('msg1')}`);
    log(`getMessage('msg2') = ${getMessage('msg2')}`);
    log(`getMessage('msg3') = ${getMessage('msg3')}`);
    log(`getMessage('msg4') = ${getMessage('msg4')}`);
    log(`getMessage('msg5') = ${getMessage('msg5')}`);
    log(`getMessage('msg6') = ${getMessage('msg6')}`);
}

function getMessage(messageId) {
    let result = '';
    switch (messageId) {
        case 'msg1':
            result = 'Message1';
            break;
        case 'msg2':
            result = 'Message2';
            // note that there is NO break here!
        case 'msg3':
            result = 'Message3';
            break;
        case 'msg4':
        case 'msg5':
            result = 'Message45';
            break;
        default:
            result = 'default_message';
    }
    return result;
}