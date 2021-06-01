var logger = require('../logger/logger');

import JsonObject from './JsonObject.js';

export default class JsonMap extends JsonObject {
    
    constructor(root, isKey, input) {
        super(root, isKey, input);
    }

    put(jsonObjectKey,jsonObjectValue) {
        this._input.set(jsonObjectKey, jsonObjectValue);
        logger.debug('map size ->' + this._input.size);
        return this;
    }
    
    formatJsonToString(appendable, currentLevel) {
        ++currentLevel;
        let tabs = '';
        let i,j;
        for (i = 0; i < currentLevel; i++)
            tabs += "\t";
        let destination = "";
        destination += "\n" + tabs + "{\n";
        j = 0;
        let size = this._input.size;
        logger.info('size of the map ' + this._input.size);

        this._input.forEach(function(value, key) {
            var keyAppendable = {
                destination : ""
            }
            var valueAppendable = {
                destination : ""
            }
         
            key.formatJsonToString(keyAppendable,currentLevel);
            destination += keyAppendable.destination;
            destination += " : ";
            
            value.keyValue = true;
            value.formatJsonToString(valueAppendable,currentLevel);
            destination += valueAppendable.destination;
            if(j != (size-1))
                destination += ",\n";
            j++;  
        });
        destination += "\n" + tabs + "}";
        appendable.destination += destination;
    }

    formatJsonToHtml(appendable, currentLevel) {
        if(this._root) {
            destination += "<div class=\"json-viewer\"><code class=\"js\" id=\"js\">";
        }
        let destination = "";
        let size = this._input.size;
        destination += "<a class=\"list-link\" href=\"javascript:void(0)\">{";
        destination += "<span style=\"color: #1d57d4;\"><i onClick=\"spanClicked(event);\" class=\"far fa-minus-square\"></i></span>";
        destination += "<span style=\"color: #1d57d4;\" class=\"hide\"><i onClick=\"spanClicked(event);\" class=\"fas fa-plus-square\"></i></span>";
        destination += "<span class=\"hide\"><span onClick=\"spanClicked(event);\" class=\"items-ph\">" + size + " items</span></span>";
        destination += "</a>";
        let i,j;
        destination += "<ul data-level=\"" + ++currentLevel + "\" class=\"type-array\">";
        this._input.forEach(function(value, key) {
            destination += "<li>";
            var keyAppendable = {
                destination : ""
            }
            key.formatJsonToHtml(keyAppendable,currentLevel);
            destination += keyAppendable.destination;
            destination += "<span class=\"type-colon\">:</span>";
			var valueAppendable = {
                destination : ""
            }
            value.formatJsonToHtml(valueAppendable,currentLevel);
            destination += valueAppendable.destination;
           
            if(j != (size-1))
                destination += "<span class=\"type-comma\">" + "," + "</span>";
            destination += "</li>";
            j++;  
        });
        destination += "</ul>";
        destination += "<span class=\"type-symbol\">}</span>";
        if(this._root) {
            destination += "</code></div>";
        }

        appendable.destination = destination;
    }
}