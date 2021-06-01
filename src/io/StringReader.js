import Reader from './Reader.js';

var logger = require('../logger/logger');

export default class StringReader extends Reader {

    constructor(newInput) {
        super(newInput);
    }
    /*
     * Reads characters into a portion of an array. This method will block until some input is 
     * available, an I/O error occurs, or the end of the stream is reached.
     * 
     * return The number of characters read, or -1 if the end of the stream has been reached
     */
    read(cbuf, offset, len) {
        this.ensureOpen();
        if ((offset < 0) || (offset > cbuf.length) || (len < 0) ||
            ((offset + len) > cbuf.length) || ((offset + len) < 0)) {
            throw new Error('index out of bounds.');
        } else if (len == 0) {
            return 0;
        }
        if (this.next >= this.length)
            return -1;
        var n = Math.min(this.length - this.next, len);
        this.getChars(this.next, this.next + n, cbuf, offset);
        this.next += n;
        return n;
    }

    getChars(srcBegin, srcEnd, dst, dstBegin) {
        if (srcBegin < 0) {
            new Error('index out of bounds - ' + srcBegin);
        }
        if (srcEnd > this.input.length) {
            new Error('index out of bounds - ' + srcEnd);
        }   
        if (srcBegin > srcEnd) {
            throw new Error('index out of bounds - ' + (srcEnd - srcBegin));
        }
        var i;
        for(i = srcBegin; i <= srcEnd; i++) {
            dst[dstBegin] = this.input[i];
            dstBegin++;
        }
    }
}