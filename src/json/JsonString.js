
import JsonObject from './JsonObject.js';

export default class JsonString extends JsonObject {

    constructor(root, isKey, input) {
        super(root, isKey, input);
    }

    toString(appendable, currentLevel) {
        let destination = "";
        let tabs = '';
        let i;
        for (i = 0; i <= currentLevel; i++)
            tabs = tabs.concat("\t");
        //console.log('tabs->' + tabs);
        if (this._isKey) {
            destination += tabs + "\"" + this._input + "\"";
        } else {
            destination += "\"" + this._input + "\"";
        }
        //console.log('destination->' + destination);
        appendable.destination = destination;
    }

    toHtml(appendable, currentLevel) {
        let destination = "";
        if (this._isKey) {
            destination += "<span class=\"type-key\">\"";
        }else  {
            destination += "<span class=\"type-string\">\"";
        }
        destination += this._input + "\"</span>";
        appendable.destination = destination;
    }
}