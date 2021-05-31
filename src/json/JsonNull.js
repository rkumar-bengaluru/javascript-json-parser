
import JsonObject from './JsonObject.js';

export default class JsonBoolean extends JsonObject {

    constructor(root, isKey, input) {
        super(root, isKey, input);
    }

    formatJsonToString(appendable, currentLevel) {
        //console.log('destination->' + destination);
        appendable.destination = null;
    }

    formatJsonToHtml(appendable, currentLevel) {
        let destination = "";
        destination += "<span class=\"type-null\">";
        destination += this._input + "</span>";
        appendable.destination = destination;
    }
}