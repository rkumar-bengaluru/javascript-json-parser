
import JsonObject from './JsonObject.js';

export default class JsonNumber extends JsonObject {

    constructor(root, isKey, input) {
        super(root, isKey, input);
    }

    toUnformattedString(appendable, currentLevel) {
        appendable.destination += this._input;
    }

    formatJsonToString(appendable, currentLevel) {
        //console.log('destination->' + destination);
        appendable.destination += this._input;
    }

    formatJsonToHtml(appendable, currentLevel) {
        let destination = "";
        destination += "<span class=\"type-number\">";
        destination += this._input + "</span>";
        appendable.destination = destination;
    }
}