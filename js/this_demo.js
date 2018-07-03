//
// HTML event callbacks
//

document.getElementById('button-demo-this-subroutine').onclick = function() {
    clearElement('output');
    thisInSubroutineDemo();
}

//
// Core functions
//

function thisInSubroutineDemo() {

    {
        let o = {
            name : "Bojan",
            greeting : function () {
                log(`name = ${name}`);
            }
        }

        o.greeting;
    }
  
}



