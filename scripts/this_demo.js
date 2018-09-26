import { clearElement, log}  from './common.js';

//
// HTML event callbacks
//

document.getElementById('button-demo-this-subroutine').onclick = function() {
    clearElement('output');
    thisInSubroutineDemo();
};

//
// Core functions
//

function thisInSubroutineDemo() {

    {
        let o = {
            name : 'Bojan',
            logName : function () {
                log(`name = ${name}`); // name = 
            },
            logName2 : function () { // logName2 is a method
                log(`name = ${this.name}`); // name = Bojan
            },
            delayedLogName : function() {
                let timer = setTimeout(function() { // this is a subroutine
                    clearTimeout(timer);
                    log(`delayedLogName(): name = ${name}`); // name = 
                    log(`this = ${this}`); // this = [object Window]
                    // this.logName2(); // Uncaught TypeError: this.logName2 is not a function
                }, 1000);
            },
            delayedLogName2 : function() {
                let timer = setTimeout(function() {
                    clearTimeout(timer);
                    log(`delayedLogName2(): name = ${this.name}`);  // name =  
                    log(`this = ${this}`);                          // this = [object Window]
                    // this.logName2(); // Uncaught TypeError: this.logName2 is not a function
                }, 1000);
            },
            delayedLogName3 : function() {
                let that = this;
                let timer = setTimeout(function() {
                    clearTimeout(timer);
                    log(`delayedLogName3(): name = ${that.name}`);  // name = Bojan
                    log(`this = ${this}`);                          // this = [object Window]
                    that.logName2();                                // name = Bojan
                    // this.logName2(); // Uncaught TypeError: this.logName2 is not a function
                }, 1000);
            },
            delayedLogName4 : function() {
                let timer = setTimeout(function() {
                    clearTimeout(timer);
                    log(`delayedLogName4(): name = ${this.name}`);  // name = Bojan
                    log(`this = ${this}`);                          // this = [object Object]
                    this.logName2();                                // name = Bojan
                }.bind(this), 1000);
            },            
            delayedLogName5 : function() {
                let timer = setTimeout(() => {
                    clearTimeout(timer);
                    log('delayedLogName5(): arrow fn');
                    log(`name = ${name}`);                          // name =
                    log(`this = ${this}`);                          // this = [object Object]
                    this.logName2();                                // name = Bojan
                }, 1000);
            },
            // arrow function gets 'this' value from its lexical scope
            delayedLogName6 : function() {
                let timer = setTimeout(() => {
                    clearTimeout(timer);
                    log('delayedLogName6(): arrow fn ');
                    log(`this.name = ${this.name}`);                // name = Bojan
                    log(`this = ${this}`);                          // this = [object Object]
                    this.logName2();                                // name = Bojan
                }, 1000);
            }
        };

        o.logName();
        o.logName2();

        // in these examples this in the callback is bound to the global object (window)
        o.delayedLogName();
        o.delayedLogName2();
        o.delayedLogName3();

        // in these examples this in the callback is bound to the object
        o.delayedLogName4();
        o.delayedLogName5();
        o.delayedLogName6();
    }
}