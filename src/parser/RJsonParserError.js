var logger = require('../logger/logger');

export default class RJsonParserError extends Error {

    constructor(_currentTokenVal, _expectedTokenSequencesVal, _tokenImageVal) {
        super();
        this.name = "RJsonParserError"; 
        this.currentToken = _currentTokenVal;
        this.expectedTokenSequences = _expectedTokenSequencesVal;
        this.tokenImage = _tokenImageVal;
        this.eol = "&";
    }

    getMessage() {
        let expected = '';
        let maxSize, i, j = 0;
        for (i = 0; i < this.expectedTokenSequences.length; i++) {
            if (maxSize < this.expectedTokenSequences[i].length) {
                maxSize = this.expectedTokenSequences[i].length;
            }
            for (j = 0; j < this.expectedTokenSequences[i].length; j++) {
                expected += this.tokenImage[this.expectedTokenSequences[i][j]] + ' ';
            }
            if (this.expectedTokenSequences[i][this.expectedTokenSequences[i].length - 1] != 0) {
                expected += "...";
            }
            expected += eol + "    ";
        }

        let retval = "Encountered \"";
        let tok = this.currentToken.next;
        for (i = 0; i < maxSize; i++) {
            if (i != 0) retval += " ";
            if (tok.kind == 0) {
                retval += this.tokenImage[0];
                break;
            }
            retval += " " + this.tokenImage[tok.kind];
            retval += " \"";
            retval += this.add_escapes(tok.image);
            retval += " \"";
            tok = tok.next;
        }

        retval += "\" at line " + this.currentToken.next.beginLine + ", column " + this.currentToken.next;
        retval += "." + this.eol;
        if (this.expectedTokenSequences.length == 1) {
            retval += "Was expecting:" + this.eol + "    ";
        } else {
            retval += "Was expecting one of:" + this.eol + "    ";
        }
        retval += expected;
        this.message = retval;
        logger.debug(this.message);
        return retval;
    }

    addEscapes(str) {
        let i,ch;
        let retval = "";
        for (i = 0; i < str.length; i++) {
            switch (str.charAt(i)) {
                case 0:
                    continue;
                case '\b':
                    retval += "\\b";
                    continue;
                case '\t':
                    retval += "\\t";
                    continue;
                case '\n':
                    retval += "\\n";
                    continue;
                case '\f':
                    retval += "\\f";
                    continue;
                case '\r':
                    retval += "\\r";
                    continue;
                case '\"':
                    retval += "\\\"";
                    continue;
                case '\'':
                    retval += "\\\'";
                    continue;
                case '\\':
                    retval += "\\\\";
                    continue;
                default:
                    if ((ch = str.charAt(i)) < 0x20 || ch > 0x7e) {
                        var s = "0000" + ch.toString();
                        retval += "\\u" + s.substring(s.length - 4, s.length);
                    } else {
                        retval += ch;
                    }
                    continue;
            }
        }
        return retval.toString();
    }
}