
import JsonObject from './JsonObject.js';

export default class JsonNumber extends JsonObject {

    constructor(root, isKey, input) {
        super(root, isKey, input);
    }

    toString(appendable, currentLevel) {
        //console.log('destination->' + destination);
        appendable.destination += this._input;
    }

    toHtml(appendable, currentLevel) {
        let destination = "";
        destination += "<span class=\"type-number\">";
        destination += this._input + "</span>";
        appendable.destination = destination;
    }
}