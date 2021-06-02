export default class Reader {

    constructor(newInput) {
        if (this.constructor === Reader) {
            throw new TypeError("Can not construct abstract class.");
        }

        if (this.read === Reader.prototype.read) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError("Please implement abstract method read.");
        }

        if (this.getChars === Reader.prototype.getChars) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError("Please implement abstract method getChars.");
        }

        if (this.close === Reader.prototype.close) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError("Please implement abstract close getChars.");
        }
        
        this.input = newInput;
        this.length = this.input.length;
        this.next = 0;
        this.mark = 0;
    }

    read(cbuf, offset, len) {
        throw new TypeError("Do not call abstract method read from child.");
    }

    getChars(srcBegin, srcEnd, dst, dstBegin) {
        throw new TypeError("Do not call abstract method getChars from child.");
    }

    close() {
        throw new TypeError("Do not call abstract method close from child.");
    }

    ensureOpen() {
        if (this.input === null)
            throw new Error('Stream closed');
    }
}