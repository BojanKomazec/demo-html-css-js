import { clearElement, log, hideAllDivChildren}  from './common.js';

(function() {
    //
    // HTML event callbacks
    //
    document.getElementById('button-demo-input-files').onclick = function() {
        clearElement('output');
        inputFilesDemo();
    };

    document.getElementById('get-files').onchange = function() {
        log('Input changed.');
    };

    document.getElementById('list-selected-files').onclick = function() {
        listAllSelectedFiles();
    };

    //
    // Core functions
    //

    window.addEventListener('DOMContentLoaded', function() {
        let divContent = document.querySelectorAll('div.content')[0];
        hideAllDivChildren(divContent);
    }, false);

    // let divContent = document.querySelectorAll("div.content")[0];
    // hideAllDivChildren(divContent);

    function inputFilesDemo() {
        var inputFilesDiv = document.querySelectorAll('div.demo-input-files')[0];
        inputFilesDiv.style.display = 'block';
    }

    function listAllSelectedFiles() {
        var inp = document.getElementById('get-files');
        const selectedFilesCount = inp.files.length;
        if (selectedFilesCount === 0) {
            alert('No files selected!');
        } else {
            for (let i = 0; i < selectedFilesCount; i++) {
                let file = inp.files[i];
                log(`File: ${file.name}`);
            }
        }
    }
})();