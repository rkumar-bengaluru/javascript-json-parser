import JsonFormat from "./json/JsonFormat"
import css from "./css/style.css";

parse();

function parse() {
    try {
        let json = new JsonFormat();
        //var res = json.parse('{"rupak":"abcd"}')
        //console.log(res);
        //document.getElementById('root').innerHTML = res;
    } catch (e) {
        console.error(e);
        document.getElementById('root').innerHTML = e.message;
    }
}

