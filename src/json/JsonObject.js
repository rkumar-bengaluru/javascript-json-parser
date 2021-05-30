export default class JsonObject {

    constructor(root,isKey,input) {

        if(typeof root === 'undefined') {
            this._root = false;
        } else {
            this._root = root;
        }

        if(typeof isKey === 'undefined') {
            this._isKey = false;
        } else {
            this._isKey = root;
        }

        if(typeof input === 'undefined') {
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
}