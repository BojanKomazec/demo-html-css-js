import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-conversions').onclick = function() {
    clearElement('output');
    conversionsDemo();
};

//
// Core functions
//

function conversionsDemo() {
    log('conversionsDemo()');
    log(`"10" to int: ${parseInt('10')}`);
    log(`"10." to int: ${parseInt('10.')}`);
    log(`"10.1" to int: ${parseInt('10.1')}`);
    log(`".10" to int: ${parseInt('.10')}`);
    log(`"0.10" to int: ${parseInt('0.10')}`);
    log(`"0.8" to int: ${parseInt('0.8')}`);
    log(`"1.8" to int: ${parseInt('1.8')}`);
    log(`"010" to int: ${parseInt('010')}`);
    log(`"O10" to int: ${parseInt('O10')}`);
    log(`"0x10" to int: ${parseInt('0x10')}`);

    log(`"101" to int (radix = 10): ${parseInt('101', 10)}`);
    log(`"101" to int (radix = 2): ${parseInt('101', 2)}`);
}