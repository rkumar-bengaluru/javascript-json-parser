# javascript-json-parser
This is a light weight javascript json parser and lexer. This is a hand written parser and lexer and gives control
to developers to format, validate and debug the json objects.

This project also shows a demonstration of how this parser is used to generate the AST(Abstract Syntax Tree) from the 
string representation of the JSON to JSON Objects. The AST JSON Objects are then used to generated a formatted JSON string
and the JSON Formatted HTML for beatification. Please click the demo link below to see the Parser in action.

**[DEMO LINK](https://rkumar-bengaluru.github.io/javascript-json-parser/)**

## Using the Parser 

### Using the Parser (Formatted String)
```javascript
import RJsonParser from "./parser/RJsonParser";

var appendable = {
        destination: ""
}
let instance = new RJsonParser("{\"name\":\"sonoo\",\"salary\":600000.0,\"age\":27}");
var jsonObj = instance.parse();
// parse to formatted string.
jsonObj.formatJsonToString(appendable, -1);
console.log(appendable.destination);
```
