import JsonFormat from "./json/JsonFormat"
let json = new JsonFormat();
var res = json.parse('parse this json 123')
console.log(res);
document.getElementById('root').innerHTML = res;

