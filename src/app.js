import RJsonParser from "./parser/RJsonParser"

import css from "./css/style.css";

format();

function formatInputString(jsonObj, textDiv) {
    var appendable = {
        destination: ""
    }
    jsonObj.formatJsonToString(appendable, -1);
    textDiv.innerHTML = appendable.destination;
}

function formatHtml(jsonObj, jsonDiv) {
    var appendable = {
        destination: ""
    }
    jsonObj.formatJsonToHtml(appendable, -1);
    jsonDiv.innerHTML = appendable.destination;
}

function init() {
    try {
        console.log('reformatting.');
        let textDiv = document.getElementById('inputtextarea');
        let jsonDiv = document.getElementById('json');
        let instance = new RJsonParser(textDiv.innerHTML);
        
        var jsonObj = instance.parse();
        formatInputString(jsonObj, textDiv);
        formatHtml(jsonObj, jsonDiv);
    } catch (e) {
        console.log(e.stack);
        //document.getElementById('inputtextarea').innerHTML = e.message;
    }
}

function format() {
    try {
        init();
        let textDiv = document.getElementById('inputtextarea');
        textDiv.addEventListener('input', () => {
            console.log('input changed...' + document.getElementById('inputtextarea').innerHTML);
            //alert('-----------' + document.getElementById('inputtextarea').innerHTML);
            init();
        })
    } catch (e) {
        console.log(e.stack);
        //document.getElementById('inputtextarea').innerHTML = e.message;
    }
}


