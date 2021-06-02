var logger = require('../logger/logger');

export default class CharStream {
    maxBufSize = 4096;

    constructor(stream) {
        this.maxNextCharInd = 0;
        this.nextCharInd = -1;

        this.bufline = [];
        this.bufcolumn = [];
        this.column = 0;
        this.line = 1;

        this.bufpos = -1;
        this.bufsize = 0;
        this.available = this.maxBufSize;
        this.inBuf = 0;

        this.prevCharIsCR = false;
        this.prevCharIsLF = false;
        this.tabSize = 4;

        this.tokenBegin = 0;
        this.nextCharBuf = new Array(this.maxBufSize);
        this.buffer = [];
        this.inputStream = stream;
    }

    beginToken() {
        if (this.inBuf > 0) {
            // lookahead and backup has happened.
            return this.readFromBuffer();
        }
        this.tokenBegin = 0;
        this.bufpos = -1;
        return this.readChar();
    }

    readChar() {
        if (this.inBuf > 0) {
            // lookahead and backup has happened.
            return this.readFromBuffer();
        }
        if (++this.bufpos === this.available)
            this.adjustBuffSize();

        let c = this.readByte();
        this.buffer.push(c);

        if (this.buffer[this.bufpos] === '\\') {
            return this.checkSpecial(c);
        } else {
            this.updateLineColumn(c);
            return c;
        }
    }

    readByte() {
        
        if (++this.nextCharInd >= this.maxNextCharInd)
            this.fillBuff();
        logger.debug("nextCharInd=" + (this.nextCharInd) + ",nextChar=" + this.nextCharBuf[this.nextCharInd]);
        return this.nextCharBuf[this.nextCharInd];
    }

    fillBuff() {
        let i;
        if (this.maxNextCharInd === this.maxBufSize)
            this.maxNextCharInd = this.nextCharInd = 0;
        try {
            if ((i = this.inputStream.read(this.nextCharBuf, this.maxNextCharInd, this.maxBufSize - this.maxNextCharInd)) === -1) {
                this.inputStream.close();
                throw new Error("stream has not enough data.");
            } else {
                this.maxNextCharInd += i;
            }
        } catch (e) {
            if (this.bufpos != 0) {
                --this.bufpos;
                this.backup(0);
            } else {
                this.bufline[this.bufpos] = this.line;
                this.bufcolumn[this.bufpos] = this.olumn;
            }
            throw e;
        }
    }

    backup(amount) {
        this.inBuf += amount;
        if ((this.bufpos -= amount) < 0)
            this.bufpos += this.bufsize;
    }

    readFromBuffer() {
        --this.inBuf;
        if (++this.bufpos == this.bufsize)
            this.bufpos = 0;
        return this.buffer[this.bufpos];
    }

    adjustBuffSize() {
        if (this.available === this.bufsize) {
            if (this.tokenBegin > 2048) {
                this.bufpos = 0;
            } else {
                this.expandBuff(true);
            }
        } else if (this.available > this.tokenBegin) {
            this.available = this.bufsize;
        }  else if ((this.tokenBegin - this.available) < 2048) {
            this.expandBuff(true);
        } else {
            this.available = this.tokenBegin;
        }
    }

    expandBuff() {
        throw new Error("Implementation to be done....");
    }

    checkSpecial(c) {
        throw new Error("Implementation to be done....");
    }

    updateLineColumn(c) {
        this.column++;
        if (this.prevCharIsLF) {
            this.prevCharIsLF = false;
            this.line += (this.column = 1);
        } else if (this.prevCharIsCR) {
            this.prevCharIsCR = false;
            if (c == '\n') {
                this.prevCharIsLF = true;
            } else {
                this.line += (this.column = 1);
            }
        }

        switch (c) {
            case '\r' :
                this.tokenBegin++;
                this.prevCharIsCR = true;
                break;
            case '\n' :
                this.tokenBegin++;
                this.prevCharIsLF = true;
                break;
            case '\t' :
                this.tokenBegin++;
                this.column--;
                this.column += (this.tabSize - (this.column % this.tabSize));
                break;
            case 32:
                break;
            default :
                break;
        }

        this.bufline[this.bufpos] = this.line;
        this.bufcolumn[this.bufpos] = this.column;
    }

    spaceDetected() {
        this.tokenBegin++;
    }

    getImage() {
        var response;
        logger.debug("bufpos=" + this.bufpos + ",tokenBegin="+ this.tokenBegin);
        if (this.bufpos >= this.tokenBegin)
            response = new String(this.buffer, this.tokenBegin, this.bufpos - this.tokenBegin + 1);
        else 
            response = new String(this.buffer, this.tokenBegin, this.bufsize - this.tokenBegin).toString() + new String(buffer, 0, bufpos + 1).toString();
        logger.debug("response=" + response );
        return response.toString();
    }

    get getColumn() {
        return this.bufcolumn[this.bufpos];
    }

    get getLine() {
        return this.bufline[this.bufpos];
    }

    get getEndLine() {
        return this.bufline[this.bufpos];
    }

    get getBeginColumn() {
        return this.bufcolumn[this.tokenBegin];
    }

    get getBeginLine() {
        return this.bufline[this.tokenBegin];
    }
}