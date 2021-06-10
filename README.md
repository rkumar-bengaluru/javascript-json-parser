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
Below is the output of the above program.
```json
{
	"name" : "sonoo",
	"salary" : 600000.0,
	"age" : 27
}
```
### Using the Parser (Formatted Html)
```javascript
import RJsonParser from "./parser/RJsonParser";

var appendable = {
        destination: ""
}
let instance = new RJsonParser("{\"name\":\"sonoo\",\"salary\":600000.0,\"age\":27}");
var jsonObj = instance.parse();
// parse to formatted string.
jsonObj.formatJsonToHtml(appendable, -1);
console.log(appendable.destination);
```
See the **[DEMO LINK](https://rkumar-bengaluru.github.io/javascript-json-parser/)** for the formatted html example.

Developers can choose to customize the output based on customized CSS. For this developers needs to change/override
the 'formatJsonToHtml' methods.

## Checkout & Build
### Clone
```
git clonse https://github.com/rkumar-bengaluru/javascript-json-parser
```
### Build
```
npm run build
```
### Test
```
npm run test
```

## Using in Your Code.
```html
<script defer="defer" src="./dist/runtime.js"></script>
<!--Your Javascript Code-->
<script defer="defer" src="./yourapp.js"></script> 
```
yourapp.js
```javascript
import RJsonParser from "./parser/RJsonParser"

function yourformatInputStringFunction() {
    let instance = new RJsonParser(/*json string your div*/);
    var jsonObj = instance.parse();

    var appendable = {
        destination: ""
    }
    jsonObj.formatJsonToString(appendable, -1);
    console.log(appendable.destination);
    document.getElementById('yourdestinationdiv').value = appendable.destination;
}
```

