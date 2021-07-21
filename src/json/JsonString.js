import JsonObject from './JsonObject.js';

var logger = require('../logger/logger');

export default class JsonString extends JsonObject {

    constructor(root, isKey, input) {
        super(root, isKey, input);
        this.removeSpecialChars();
    }

    removeSpecialChars() {
        var tmp = this._input;
        var i = 0;
        var r = [];
        for(i=0;i<tmp.length;i++) {
            if(tmp[i] != '\r' && tmp[i] != '\t' && tmp[i] != '\n') {
                r.push(tmp[i]);
            }
        }

        this._input = r.join("");
    }

    toUnformattedString(appendable, currentLevel) {
        ++currentLevel;
        let destination = "";
        let i;
        logger.debug('appendable->' + appendable);
        if (this._isKey) {
            destination += "\"" + this._input + "\"";
        } else if (this._keyValue) {    
            destination += "\"" + this._input + "\"";
        } else {
            destination += "\"" + this._input + "\"";
        }
        logger.debug('destination->' + destination);
        appendable.destination = destination;
    }

    formatJsonToString(appendable, currentLevel) {
        ++currentLevel;
        let destination = "";
        let tabs = '';
        let i;
        for (i = 0; i < currentLevel; i++)
            tabs = tabs.concat("\t");
        logger.debug('appendable->' + appendable);
        if (this._isKey) {
            destination += tabs + "\"" + this._input + "\"";
        } else if (this._keyValue) {    
            destination += "\"" + this._input + "\"";
        } else {
            destination += tabs + "\"" + this._input + "\"";
        }
        logger.debug('destination->' + destination);
        appendable.destination = destination;
    }

    formatJsonToHtml(appendable, currentLevel) {
        let destination = "";
        if (this._isKey) {
            destination += "<span class=\"type-key\">\"";
        } else {
            destination += "<span class=\"type-string\">\"";
        }
        destination += this._input + "\"</span>";
        appendable.destination = destination;
    }
}