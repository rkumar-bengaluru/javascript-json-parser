
import JsonObject from './JsonObject.js';

export default class JsonBoolean extends JsonObject {

    constructor(root, isKey, input) {
        super(root, isKey, input);
    }

    toString(appendable, currentLevel) {
        //console.log('destination->' + destination);
        if(this._input)
            appendable.destination = true;
        else 
            appendable.destination = false;
    }

    toHtml(appendable, currentLevel) {
        let destination = "";
        destination += "<span class=\"type-boolean\">";
        destination += this._input + "</span>";
        appendable.destination = destination;
    }
}