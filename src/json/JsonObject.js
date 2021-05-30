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

        if (typeof root === 'undefined') {
            this._root = false;
        } else {
            this._root = root;
        }

        if (typeof isKey === 'undefined') {
            this._isKey = false;
        } else {
            this._isKey = root;
        }

        if (typeof input === 'undefined') {
            this._input = input;
        } else {
            this._input = input;
        }
    }

    get root() {
        return this_root;
    }

    set root(newRoot) {
        this._root = newRoot;
    }

    get key() {
        return this_root;
    }

    set key(newKey) {
        this._isKey = newKey;
    }

    get input() {
        return this._input;
    }

    set input(newInput) {
        this._input = newInput;
    }

    getInput() {
        return this._input;
    }

    toString(appendable, currentLevel) {
        throw new TypeError("Do not call abstract method toString from child.");
    }

    toHtml(appendable) {
        throw new TypeError("Do not call abstract method toHtml from child.");
    }
}