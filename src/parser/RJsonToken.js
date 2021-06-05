var logger = require('../logger/logger');

export default class RJsonToken {
    constructor(ofkind,nimage) {
        this._kind = ofkind;
        this._image = nimage;
        this._next = null;
        this.specialToken = null;
    }

    set next(newNext) {
        this._next = newNext;
    }

    get next() {
        return this._next;
    }

    set beginLine(line) {
        this._beginLine = line;
    }

    get beginLine() {
        return this._beginLine;
    }

    set endLine(line) {
        this._endLine = line;
    }

    set beginColumn(column) {
        this._beginColumn = column;
    }

    get beginColumn() {
        return this._beginColumn;
    }

    set endColumn(column) {
        this._endColumn = column;
    }

    get kind() {
        return this._kind;
    }

    set kind(newKind) {
        this._kind = newKind;
    }

    get image() {
        logger.debug('returning from token image length ->' + this._image.length);
        return this._image;
    }

    static newToken(kind,image) {
        return new RJsonToken(kind,image);
    }

    toString() {
     return "kind=" + this._kind + ",image=" + this.image;
    }
}