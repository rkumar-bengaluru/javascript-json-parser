import RJsonParser from "./parser/RJsonParser"

import css from "./css/style.css";

var example = { "store": { "book": [{ "category": "reference", "author": "Nigel Rees", "title": "Sayings of the Century", "price": 8.95 }, { "category": "fiction", "author": "Evelyn Waugh", "title": "Sword of Honour", "price": 12.99 }, { "category": "fiction", "author": "J. R. R. Tolkien", "title": "The Lord of the Rings", "isbn": "0-395-19395-8", "price": 22.99 }], "bicycle": { "color": "red", "price": 19.95 } } };

format();
var editor;

function formatInputString(jsonObj) {
    var appendable = {
        destination: ""
    }
    jsonObj.formatJsonToString(appendable, -1);
    console.log(appendable.destination);
    editor.setValue(appendable.destination);
    //document.getElementById('inputtextarea').value = appendable.destination;
}

function formatHtml(jsonObj) {
    var appendable = {
        destination: ""
    }
    jsonObj.formatJsonToHtml(appendable, -1);
    console.log(appendable.destination);
    document.getElementById('json').innerHTML = appendable.destination;
}

function initCm() {
    var editorEl = document.getElementById("inputtextarea");
    editor = CodeMirror.fromTextArea(editorEl, {
        lineNumbers: true,
        styleSelectedText: true
    });
   
    editor.setValue('loading...');
    editor.setSize(700, 500);
   
}

function init() {
    try {
        console.log('reformatting.');
        document.getElementById("input-spinner").classList.toggle("hidden");
        
        //var target = document.getElementById('inputtextarea');
        console.log('parsing ' + editor.getValue());
        let instance = new RJsonParser(editor.getValue());
        //target.value = 'loading';
        console.log('parsing json...');
        var jsonObj = instance.parse();
        console.log('parsing json done...');
        formatInputString(jsonObj);
        formatHtml(jsonObj);
        document.getElementById("input-spinner").classList.toggle("hidden");
    } catch (e) {
        console.log('exception');
        console.log(e.stack);
        editor.setValue('error loading json...');
        //document.getElementById('inputtextarea').innerHTML = e.message;
    }
}

// function onTextEditorChange(cm, evt) {
//     console.log('onTextEditorChange(cm, evt)');
//     init();
// }

function format() {
    try {
        //var target = document.getElementById('inputtextarea');
        //target.value = JSON.stringify(example);
        initCm();
        editor.setValue(JSON.stringify(example));
        init();
        // editor.on("change", (cm, evt) => {
        //     console.log('editor changed ...');
        //     onTextEditorChange(cm, evt)
        // });
        document.getElementById('loadjson').addEventListener('click', () => {
            //console.log('load json...' + document.getElementById('inputtextarea').value);
            //alert('-----------' + document.getElementById('inputtextarea').innerHTML);
            init();
        })
    } catch (e) {
        console.log(e.stack);
        //document.getElementById('inputtextarea').innerHTML = e.message;
    }
}


