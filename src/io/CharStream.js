var logger = require('../logger/logger');

export default class CharStream {

    constructor(stream) {
        this.maxNextCharInd = 0;
        this.nextCharInd = -1;

        this.bufline = [];
        this.bufcolumn = [];
        this.column = 0;
        this.line = 1;

        this.bufpos = -1;
        this.bufsize = 0;
        this.available = 0;
        this.inBuf = 0;

        this.prevCharIsCR = false;
        this.prevCharIsLF = false;
        this.tabSize = 4;

        this.tokenBegin = 0;
        this.nextCharBuf = [];
        this.buffer = [];
        this.inputStream = stream;
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