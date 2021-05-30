
import JsonObject from './JsonObject.js';

export default class JsonMap extends JsonObject {
    
    constructor(root, isKey, input) {
        super(root, isKey, input);
    }

    put(jsonObjectKey,jsonObjectValue) {
        this._input.set(jsonObjectKey,jsonObjectValue);
        return this;
    }

    toString(appendable, currentLevel) {
        ++currentLevel;
        let tabs = '';
        let i,j;
        for (i = 0; i <= currentLevel; i++)
            tabs += "\t";
        let destination = "";
        destination += "\n" + tabs + "{\n";
        j = 0;
        let size = this._input.size;
        this._input.forEach(function(value, key) {
            j++;
            var keyAppendable = {
                destination : 0
            }
            key.toString(keyAppendable,currentLevel);
            destination += keyAppendable.destination;
            destination += " : ";
            var valueAppendable = {
                destination : 0
            }
            value.toString(valueAppendable,currentLevel);
            destination += valueAppendable.destination;
            if(j != (size-1))
                destination += ",";
        });
        destination += "\n" + tabs + "}";
        appendable.destination += destination;
        //console.log('destination->' + destination);
    }

    toHtml(appendable, currentLevel) {
        if(this._root) {
            destination += "<div class=\"json-viewer\"><code class=\"js\" id=\"js\">";
        }
        let destination = "";
        let size = data.length;
        destination += "<a class=\"list-link\" href=\"javascript:void(0)\">{";
        destination += "<span style=\"color: #1d57d4;\"><i onClick=\"spanClicked(event);\" class=\"far fa-minus-square\"></i></span>";
        destination += "<span style=\"color: #1d57d4;\" class=\"hide\"><i onClick=\"spanClicked(event);\" class=\"fas fa-plus-square\"></i></span>";
        destination += "<span class=\"hide\"><span onClick=\"spanClicked(event);\" class=\"items-ph\">" + size + " items</span></span>";
        destination += "</a>";
        let i,j;
        destination += "<ul data-level=\"" + ++currentLevel + "\" class=\"type-array\">";
        this._input.forEach(function(value, key) {
            j++;
            destination += "<li>";
            var keyAppendable = {
                destination : 0
            }
            key.toHtml(keyAppendable,currentLevel);
            destination += keyAppendable.destination;
            destination += "<span class=\"type-colon\">:</span>";
			var valueAppendable = {
                destination : 0
            }
            value.toString(valueAppendable,currentLevel);
            destination += valueAppendable.destination;
           
            if(j != (size-1))
                destination += "<span class=\"type-comma\">" + "," + "</span>";
            destination += "</li>";
        });
        destination += "</ul>";
        destination += "<span class=\"type-symbol\">}</span>";
        if(this._root) {
            destination += "</code></div>";
        }

        appendable.destination = destination;
    }
}