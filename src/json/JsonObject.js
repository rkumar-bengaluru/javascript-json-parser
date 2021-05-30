export default class JsonObject {

    constructor(root, isKey, input) {
        if (this.constructor === JsonObject) {
            throw new TypeError("Can not construct abstract class.");
        }

        if (this.toString === JsonObject.prototype.toString) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError("Please implement abstract method toString.");
        }

        if (this.toHtml === JsonObject.prototype.toHtml) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError("Please implement abstract method toHtml.");
        }
        this._root = root;
        this._isKey = isKey;
        this._input = input;
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

    toString(appendable, currentLevel) {
        throw new TypeError("Do not call abstract method toString from child.");
    }

    toHtml(appendable, currentLevel) {
        throw new TypeError("Do not call abstract method toHtml from child.");
    }
}