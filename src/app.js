import RJsonParser from "./parser/RJsonParser"
import JsonString from "./json/JsonString"
import css from "./css/style.css";

parse();

function parse() {
    try {
        let instance = new RJsonParser(document.getElementById('inputtextarea').innerHTML);
        var appendable = {
            destination: ""
        }
        var obj = instance.parse();
        obj.formatJsonToString(appendable, -1);
        
        
        document.getElementById('inputtextarea').innerHTML = appendable.destination;
        appendable.destination = "";
        obj.formatJsonToHtml(appendable, -1);
        console.log(appendable.destination);
        
    } catch (e) {
        console.error(e.stack);
        document.getElementById('inputtextarea').innerHTML = e.message;
    }
}

