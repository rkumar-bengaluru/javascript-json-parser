import RJsonParser from "./parser/RJsonParser"

import css from "./css/style.css";

var example = {"name":"sonoo","salary":600000.0,"age":27};

format();

function formatInputString(jsonObj) {
    var appendable = {
        destination: ""
    }
    jsonObj.formatJsonToString(appendable, -1);
    console.log(appendable.destination);
    document.getElementById('inputtextarea').value = appendable.destination;
}

function formatHtml(jsonObj) {
    var appendable = {
        destination: ""
    }
    jsonObj.formatJsonToHtml(appendable, -1);
    console.log(appendable.destination);
    document.getElementById('json').innerHTML = appendable.destination;
}

function init() {
    try {
        console.log('reformatting.');
        document.getElementById("input-spinner").classList.toggle("hidden");
        var target = document.getElementById('inputtextarea');
        let instance = new RJsonParser(target.value);
        target.value = 'loading';
        
        var jsonObj = instance.parse();
        formatInputString(jsonObj);
        formatHtml(jsonObj);
        document.getElementById("input-spinner").classList.toggle("hidden");
    } catch (e) {
        console.log(e.stack);
        //document.getElementById('inputtextarea').innerHTML = e.message;
    }
}

function format() {
    try {
        var target = document.getElementById('inputtextarea');
        target.value = JSON.stringify(example);
        init();
        document.getElementById('loadjson').addEventListener('click', () => {
            console.log('load json...' + document.getElementById('inputtextarea').value);
            //alert('-----------' + document.getElementById('inputtextarea').innerHTML);
            init();
        })
    } catch (e) {
        console.log(e.stack);
        //document.getElementById('inputtextarea').innerHTML = e.message;
    }
}


