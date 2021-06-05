
import JsonObject from './JsonObject.js';

export default class JsonList extends JsonObject {
    
    constructor(root, isKey, input) {
        super(root, isKey, input);
    }

    add(jsonObject) {
        this._input.push(jsonObject);
        return this;
    }

    formatJsonToString(appendable, currentLevel) {
        ++currentLevel;
        let tabs = '';
        let i,j;
        for (i = 0; i < currentLevel; i++)
            tabs += "\t";
        let destination = "";
        destination += "\n" + tabs + "[\n";
        j = 0;
        let size = this._input.length;
        this._input.forEach(element => {
            var cAppendable = {
                destination : ""
            }
            element.formatJsonToString(cAppendable,currentLevel);
            destination += cAppendable.destination;
            if(j != (size-1))
                destination += ",\n";
            j++;
        });
        destination += "\n" + tabs + "]";
        appendable.destination += destination;
        //console.log('destination->' + destination);
    }

    formatJsonToHtml(appendable, currentLevel) {
        let destination = "";
        if(this._root) {
            destination += "<div class=\"json-viewer\"><code class=\"js\" id=\"js\">";
        }
        
        let size = this._input.length;
        destination += "<a class=\"list-link\" href=\"javascript:void(0)\">[";
        destination += "<span style=\"color: #1d57d4;\"><i onClick=\"spanClicked(event);\" class=\"far fa-minus-square\"></i></span>";
        destination += "<span style=\"color: #1d57d4;\" class=\"hide\"><i onClick=\"spanClicked(event);\" class=\"fas fa-plus-square\"></i></span>";
        destination += "<span class=\"hide\"><span onClick=\"spanClicked(event);\" class=\"items-ph\">" + size + " items</span></span>";
        destination += "</a>";
        let i,j;
        destination += "<ul data-level=\"" + ++currentLevel + "\" class=\"type-array\">";
        this._input.forEach(element => {
            j++;
            destination += "<li>";
            var cAppendable = {
                destination : 0
            }
            element.formatJsonToHtml(cAppendable,currentLevel);
            destination += cAppendable.destination;
            if(j != (size-1))
                destination += "<span class=\"type-comma\">" + "," + "</span>";
            destination += "</li>";
        });
        destination += "</ul>";
        destination += "<span class=\"type-symbol\">]</span>";
        if(this._root) {
            destination += "</code></div>";
        }

        appendable.destination = destination;
    }
}