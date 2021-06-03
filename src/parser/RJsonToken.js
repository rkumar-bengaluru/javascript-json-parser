var logger = require('../logger/logger');

export default class RJsonToken {
    constructor(ofkind,nimage) {
        this._kind = ofkind;
        this._image = nimage;
    }

    set beginLine(line) {
        this._beginLine = line;
    }

    set endLine(line) {
        this._endLine = line;
    }

    set beginColumn(column) {
        this._beginColumn = column;
    }

    set endColumn(column) {
        this._endColumn = column;
    }

    get kind() {
        return this.kind;
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