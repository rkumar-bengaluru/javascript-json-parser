import JsonObject from "./json/JsonObject"
import css from "./css/style.css";

parse();

function parse() {
    try {
        let instance = new JsonObject(false,false,"{\"name\"=\"rupak\"}");
        //var res = json.parse('{"rupak":"abcd"}')
        //console.log(res);
        document.getElementById('inputtextarea').innerHTML = instance.input;
    } catch (e) {
        console.error(e);
        document.getElementById('inputtextarea').innerHTML = e.message;
    }
}

