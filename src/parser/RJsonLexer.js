import RJsonToken from './RJsonToken.js';
import RJsonTokenMgrError from './RJsonTokenMgrError.js';
import RJsonConstants from './RJsonConstants.js';

var logger = require('../logger/logger');

export default class RJsonLexer extends RJsonConstants {

    constructor(istream) {
        super();
        this.input_stream = istream;
        this.curChar = '';
        this.matchedKind = 0;
        this.matchedPos = 0;
        this.toToken = [0x1ccf8fc1,];
        this.curLexState = 0;
        // this.strLiteralImages = [
        //     "", null, null, null, null, 'null', '0o54', 0o173, 0o175, 0o072, 0o133, 
        //     0o135, null, null, null, null, null, null, null, null, null, null, "\'", 
        //     "\"", null, null, null, null, null, ];
        this.strLiteralImages = [
            "", null, null, null, null, 'null', ',', '{', '}', ':', '[',
            ']', null, null, null, null, null, null, null, null, null, null, "\'",
            "\"", null, null, null, null, null,];
    }

    getNextToken() {
        logger.debug("getNextToken()");
        var matchedToken = null;
        var curPos = 0;
        EOFLoop:
        for (; ;) {
            try {
                this.curChar = this.input_stream.beginToken();
            } catch (e) {
                logger.debug(e.stack);
                this.matchedKind = 0;
                matchedToken = this.fillToken();
                return matchedToken;
            }
            logger.debug("this.curChar =" + this.curChar);
            this.matchedKind = 0x7fffffff;
            this.matchedPos = 0;
            curPos = this.analyzeCurrentCharacter();
            logger.debug("matchedKind()->" + this.matchedKind + ",curPos->" + curPos);
            if (this.matchedKind != 0x7fffffff) {
               
                if (this.matchedPos + 1 < curPos) {
                    this.input_stream.backup(curPos - this.matchedPos - 1); // possible backtracking.
                }
                logger.debug("curPos=" + curPos);
                if ((this.matchedKind == this.C_SINGLE_COMMENT)
                    || (this.matchedKind == this.C_MULTILINE_COMMENT) ) {
                        logger.debug("this.matchedKind=" + this.matchedKind);
                    this.matchedToken = this.fillToken();
                    logger.debug("getNextToken()::Matched" + this.matchedKind);
                    return matchedToken;
                }
                if (this.matchedKind == this.BRACE_OPEN || this.matchedKind == this.TRUE
                    || this.matchedKind == this.NUMBER_INTEGER
                    || this.matchedKind == this.NULL
                    || this.matchedKind == this.COMMA 
                    || this.matchedKind == this.STRING_DOUBLE_EMPTY
                    || this.matchedKind == this.STRING_DOUBLE_EMPTY) {
                    matchedToken = this.fillToken();
                    logger.debug("getNextToken()::Matched->" + matchedToken);
                    return matchedToken;
                }
                if ((this.toToken[this.matchedKind >> 6] & (1 << (this.matchedKind & 77))) != 0) {
                    matchedToken = this.fillToken();
                    logger.debug("getNextToken()::Matched >> 6->" + this.matchedKind);
                    return matchedToken;
                } else {
                    continue EOFLoop;
                }
            }
            // error begins.....
            let error_line = this.input_stream.getEndLine;
            let error_column = this.input_stream.getEndColumn;
            let error_after = null;
            let EOFSeen = false;
            try {
                this.input_stream.readChar();
                this.input_stream.backup(1);
            } catch (e1) {
                logger.debug(e1.stack);
                EOFSeen = true;
                error_after = curPos <= 1 ? "" : this.input_stream.getImage();
                if (this.curChar == '\n' || this.curChar == '\r') {
                    error_line++;
                    error_column = 0;
                } else {
                    error_column++;
                }
            }
            logger.debug('xxxxxxxxxxxx');
            if (!EOFSeen) {
                logger.debug('xxxxxxxxxxxx');
                this.input_stream.backup(1);
                error_after = curPos <= 1 ? "" : this.input_stream.getImage();
            }
            logger.debug('zzzzzzzzzzzzzzzz');
            throw new RJsonTokenMgrError(EOFSeen, this.curLexState, error_line, error_column, error_after, this.curChar, this.LEXICAL_ERROR);
        }
    }

    analyzeCurrentCharacter() {
        if (this.curChar == ' ' || this.curChar == '\t' || this.curChar == '\n' || this.curChar == '\r') {
            this.consume_char();
            try {
                this.curChar = this.input_stream.readChar();
            } catch (e) {
                // hack for special characters after the last token.
                this.matchedKind = 0;
                return 1;
            }
            return this.analyzeCurrentCharacter();
        }
        let code = this.curChar.charCodeAt();
        //logger.debug('analyzeCurrentCharacter()->' + code);
        switch (code) {
            case 123: // '{'
                return this.stopAtPos(0, this.BRACE_OPEN);
            case 125: // '}'
                return this.stopAtPos(0, this.BRACE_CLOSE);
            case 34: // '"'
                logger.debug('case 34()->' + code);
                return this.moveChar01(8);
            case 39: // '\''
                return this.moveChar01(4);
            case 44: // ','
                return this.stopAtPos(0, this.COMMA);
            case 58: // ':'
                return this.stopAtPos(0, this.COLON);
            case 91: // '['
                return this.stopAtPos(0, this.BRACKET_OPEN);
            case 93: // ']'
                return this.stopAtPos(0, this.BRACKET_CLOSE);
            case 70: // 'F'
            case 102: // 'f'
                return this.moveChar01(4);
            case 78: // 'N'
            case 110: // 'n'
                return this.moveChar01(8);
            case 84: // 'T'
            case 116: // 't'
                return this.moveChar01(2);
            case 47: // '/'
                return this.moveChar01(6);
            case 35: // '#'
                return this.moveChar(0, '\n');
            default:
                return this.findNumber(0, 0);
        }
    }

    isDigit() {
        
        let code = this.curChar.charCodeAt();
        logger.debug("isDigit-\"" + code + "\"");

        if (code == 46) { // '.'
            return true;
        }

        if (code > 47 && code < 58) {
            return true;
        }
        return false;
    }

    findNumber(startState, curPos) {
        logger.debug("findNumber=\"" + this.curChar + "\"");
        while (this.isDigit()) {
            ++curPos;
            try {
                this.curChar = this.input_stream.readChar();
            } catch (e) {
                return curPos;
            }
        }
        let code = this.curChar.charCodeAt();
        logger.debug("\"" + code + "\"");
        if (code == 44 || code == 125
            || this.curChar == '\r' || this.curChar == '\n' || this.curChar == ' '
            || this.curChar == '\t') {
            --curPos;
            logger.debug("\"" + code + "\"");
            this.matchedKind = this.NUMBER_INTEGER;
            this.matchedPos = curPos;
            this.input_stream.backup(1);
            return curPos;
        }
        // not a valid numbers
        return curPos;
    }

    findStringLiteral(curPos, active0) {
        //logger.debug("finding string literal");
        var kind = 0x7fffffff;
        try {
            this.curChar = this.input_stream.readChar();
        } catch (e) {
            return 1;
        }
        for (; ;) {
            let code = this.curChar.charCodeAt();
            //logger.debug("findStringLiteral() = " + code);
            switch (code) {
                case 34: // '"'
                    kind = this.STRING_DOUBLE_NONEMPTY;
                    break;
                case 92: // '\escape char
                    // check if the next char is '"', then it is escape sequence. consume the next token.
                    try {
                        this.curChar = this.input_stream.readChar();
                    } catch (e) {
                        return 1;
                    }
                    break;
                default:
                    break;
            }
            ++curPos;
            if (kind != 0x7fffffff) {
                this.matchedKind = kind;
                this.matchedPos = curPos;
                //logger.debug("returning curPos = " + curPos);
                return curPos;
            }
            try {
                this.curChar = this.input_stream.readChar();
            } catch (e) {
                logger.debug(e.stack);
                return curPos;
            }
        }
    }

    moveChar(curPos, target) {
        logger.debug("moveChar::curChar=" + this.curChar + ",target=" + target);
        var kind = 0x7fffffff;
        try {
            this.curChar = this.input_stream.readChar();
        } catch (e) {
            return 1;
        }
        let code = this.curChar.charCodeAt();
        for (; ;) {
            if (this.curChar == '\n' || this.curChar == '\r' || this.curChar == '\f') {
                kind = this.C_SINGLE_COMMENT;
            }
            if (code == 42) { // '*'
                
                // lookahead for char '/'
                try {
                    this.curChar = this.input_stream.readChar();
                } catch (e) {
                    return 1;
                }
                let ccode = this.curChar.charCodeAt();
                if (ccode == 47) {
                    ++curPos;
                    kind = this.C_MULTILINE_COMMENT;
                } else {
                    this.input_stream.backup(1);
                }
            }

            ++curPos;
            if (kind != 0x7fffffff) {
                this.matchedKind = kind;
                this.matchedPos = curPos;
                return curPos;
            }
            try {
                this.curChar = this.input_stream.readChar();
            } catch (e) {
                return curPos;
            }
            code = this.curChar.charCodeAt();
        }
    }

    moveChar01(active0) {
        try {
            //logger.debug("@moveChar01::curChar=" + this.curChar + ",code=" + code);
            this.curChar = this.input_stream.readChar();
            //logger.debug("@moveChar01::curChar=" + this.curChar + ",code=" + code);
        } catch (e) {
            logger.debug(e.stack);
            return 1;
        }
        let code = this.curChar.charCodeAt();
        logger.debug("moveChar01::curChar=" + this.curChar + ",code=" + code);
        switch (code) {
            case 34: // '"'
                if ((active0 & 8) != 0)
                    return this.stopAtPos(1, this.STRING_DOUBLE_EMPTY);
                break;
            case 39: // '\''
                if ((active0 & 4) != 0)
                    return this.stopAtPos(1, this.STRING_SINGLE_EMPTY);
                break;
            case 65: // 'A'
            case 97: // 'a'
                if ((active0 & 4) != 0)
                    return this.moveChar02(active0, 4);
                break;
            case 82: // 'R'
            case 114: // 'r'
                if ((active0 & 2) != 0)
                    return this.moveChar02(active0, 4);
                break;
            case 85: // 'U'
            case 117: // 'u'
                if ((active0 & 8) != 0)
                    return this.moveChar02(active0, 8);
                break;
            case 47: // '/' - C_SINGLE_COMMENT
                if ((active0 & 6) != 0)
                    return this.moveChar(0, '\n');
                break;
            case 42: // '*' - C_MULTILINE_COMMENT
                if ((active0 & 6) != 0)
                    return this.moveChar(0, '*');
                break;
            default:
                break;

        }
        return this.findStringLiteral(0, active0);
    }

    moveChar02(old0, active0) {
        try {
            this.curChar = this.input_stream.readChar();
        } catch (e) {
            return 2;
        }
        let code = this.curChar.charCodeAt();
        //logger.debug("moveChar02::curChar=" + this.curChar + ",code=" + code);
        switch (code) {
            case 76: // L
            case 108:// l
                return this.moveChar03(active0, 5);
            case 85:// U
            case 117:// u
                return this.moveChar03(active0, 2);
            default:
                break;
        }
        return this.findStringLiteral(1, active0);
    }

    moveChar03(old0, active0) {
        try {
            this.curChar = this.input_stream.readChar();
        } catch (e) {
            return 3;
        }
        let code = this.curChar.charCodeAt();
        logger.debug("moveChar03::curChar=" + this.curChar + ",code=" + code);
        switch (code) {
            case 69: // E
            case 101: // e
                if ((active0 & 2) != 0)
                    return this.stopAtPos(3, this.TRUE);
                break;
            case 76: // L
            case 108:// l
                
                if ((active0 & 5) != 0) {
                    logger.debug('moveChar03->foundNull-' + (active0 & 5));
                    return this.stopAtPos(3, this.NULL);
                }
                break;
            case 83: // S
            case 115:// s
                return this.moveChar04(active0, 4);
            default:
                break;
        }
        return -1;
    }

    moveChar04(old0, active0) {
        try {
            this.curChar = this.input_stream.readChar();
        } catch (e) {
            return 4;
        }
        let code = this.curChar.charCodeAt();
        logger.debug("moveChar04::curChar=" + this.curChar + ",code=" + code);
        switch (code) {
            case 69: // E
            case 101:// e
                if ((active0 & 4) != 0)
                    return this.stopAtPos(4, this.FALSE);
                break;
            default:
                break;
        }
        return -1;
    }

    stopAtPos(pos, kind) {
        this.matchedKind = kind;
        this.matchedPos = pos;
        return pos + 1;
    }

    checkForSpace() {
        let code = this.curChar.charCodeAt();
        if (code == 32) {
            try {
                curChar = input_stream.readChar();
            } catch (e) {
            }
            let ccode = this.curChar.charCodeAt();
            if (ccode != 32) {
                input_stream.backup(1);
                return;
            } else {
                this.checkForSpace();
            }
        }
    }

    fillToken() {
        let beginLine = this.input_stream.getBeginLine;
        let beginColumn = this.input_stream.getBeginColumn;
        let endLine = this.input_stream.getEndLine;
        let endColumn = this.input_stream.getEndColumn;
        var im = this.strLiteralImages[this.matchedKind];
        let tokenImage = (im == null) ? this.input_stream.getImage() : im;
        //let tokenImage = this.input_stream.getImage();
        let token = RJsonToken.newToken(this.matchedKind, tokenImage);
        logger.debug('generated new token ->' + token.toString());
        token.beginLine = beginLine;
        token.endLine = endLine;
        token.beginColumn = beginColumn;
        token.endColumn = endColumn;
        return token;
    }

    consume_char() {
        if (this.curChar == '\n') {
        } else if (this.curChar == ' ') {
            this.input_stream.spaceDetected();
        }

    }
}
