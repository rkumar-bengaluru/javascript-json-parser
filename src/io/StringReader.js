export default class StringReader {

    constructor(input) {
        this._input = input;
        this._length = this._input.length;
        this._next = 0;
        this._mark = 0;
    }

    _ensureOpen() {
        if(this._input === null)
            throw new Error("Stream closed");
    }

    /*
     Reads a single character.

     @return -1, if the end of stream has reached.
    */
    read() {
        this._ensureOpen();
        if (this._next >= this._length)
            return -1;
        return this._input[this._next++];
    }
}