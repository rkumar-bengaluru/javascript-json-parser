import JsonObject from './JsonObject.js';

var logger = require('../logger/logger');

export default class JsonString extends JsonObject {
    
    constructor(root, isKey, input) {
        super(root, isKey, input);
    }

    formatJsonToString(appendable, currentLevel) {
        let destination = "";
        let tabs = '';
        let i;
        for (i = 0; i <= currentLevel; i++)
            tabs = tabs.concat("\t");
        logger.debug('appendable->' + appendable);
        if (this._isKey) {
            destination += tabs + "\"" + this._input + "\"";
        } else {
            destination += "\"" + this._input + "\"";
        }
        logger.debug('destination->' + destination);
        appendable.destination = destination;
    }

    formatJsonToHtml(appendable, currentLevel) {
        logger.info('Hello again distributed logs');
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