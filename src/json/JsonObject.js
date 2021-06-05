export default class JsonObject {

    constructor(root, isKey, input) {
        // if (this.constructor === JsonObject) {
        //     throw new TypeError("Can not construct abstract class.");
        // }

        if (this.formatJsonToString === JsonObject.prototype.formatJsonToString) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError("Please implement abstract method formatJsonToString.");
        }

        if (this.formatJsonToHtml === JsonObject.prototype.formatJsonToHtml) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError("Please implement abstract method formatJsonToHtml.");
        }
        this._root = root;
        this._isKey = isKey;
        this._input = input;
        this._keyValue = false;
        this._rawInput = '';
    }

    get root() {
        return this._root;
    }

    set root(newRoot) {
        this._root = newRoot;
    }

    get isKey() {
        return this._isKey;
    }

    set isKey(newKey) {
        this._isKey = newKey;
    }

    get input() {
        return this._input;
    }

    set input(newInput) {
        this._input = newInput;
    }

    get rawInput() {
        return this._rawInput;
    }

    set rawInput(raw) {
        this._rawInput = raw;
    }

    set keyValue(newValue) {
        this._keyValue = newValue;
    }

    formatJsonToString(appendable, currentLevel) {
        throw new TypeError("Do not call abstract method toString from child.");
    }

    formatJsonToHtml(appendable, currentLevel) {
        throw new TypeError("Do not call abstract method toHtml from child.");
    }
}