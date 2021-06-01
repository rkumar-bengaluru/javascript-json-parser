import JsonToken from "./JsonToken";
import StringReader from "../io/CharStream"

var logger = require('../logger/logger');

export default class JsonLexer {

    constructor(input, src) {
        this._input = input;
        this._src = src;
        this._tokenTypes = {
            openBrace: '{',
            closeBrace: '}',
            openBracket: '[',
            closeBracket: ']',
            colon: ':',
            comma: ',',
            stringValue: "",
            integerValue: 0,
            floatValue: 0.0,
            trueValue: 'true',
            falseValue: 'false',
            nullValue: 'null',
            endOfFile: 'EOF'
        }
        this._currentLine = 1;
        this._currentColumn = 0;

        this._tokenWriter = [];

        this._tokenLine = -1;
        this._tokenColumn = -1;

        this._reader = new StringReader(this._input);
        this._nextChar = this.readChar();
        this._nextToken = this.readToken();
    }

    get tokenTypes() {
        return this._tokenTypes;
    }

    readToken() {
        while (true) {
            if (this.testChar(' ') || this.testChar('\t') || this.testChar('\n') || this.testChar('\r')) {
                // Parse white space.
                this.useChar();
            } else if (this.testChar('/')) {
                // Parse comments.
                this.useChar();

                if (this.testChar('/')) {
                    this.useChar();

                    while (!(this.testChar('\n') || this.isEOF())) {
                        this.useChar();
                    }
                } else if (this.testChar('*')) {
                    this.useChar();

                    while (!this.testChar('*')) {
                        if (this.isEOF()) {
                            throw new Error("Invalid comment");
                        }

                        this.useChar();
                    }

                    this.useChar();

                    while (this.testChar('*')) {
                        this.useChar();
                    }

                    if (!this.testChar('/')) {
                        throw new Error("Invalid comment");
                    }

                    this.useChar();
                }
            } else {
                break;
            }
        }

        if (this.testChar(',')) {
            return this.singleCharToken(this._tokenTypes.comma);
        } else if (this.testChar(':')) {
            return this.singleCharToken(this._tokenTypes.colon);
        } else if (this.testChar('{')) {
            return this.singleCharToken(this._tokenTypes.openBrace);
        } else if (this.testChar('}')) {
            return this.singleCharToken(this._tokenTypes.closeBrace);
        } else if (this.testChar('[')) {
            return this.singleCharToken(this._tokenTypes.openBracket);
        } else if (this.testChar(']')) {
            return this.singleCharToken(this._tokenTypes.closeBracket);
        } else if (this.testChar('t')) {
            return this.keywordToken(this._tokenTypes.trueValue, "true");
        } else if (this.testChar('f')) {
            return this.keywordToken(this._tokenTypes.falseValue, "false");
        } else if (this.testChar('n')) {
            return this.keywordToken(this._tokenTypes.nullValue, "null");
        } else if (this.testChar('0', '9') || this.testChar('-')) {
            this.startToken();
            this.useChar();

            while (this.testChar('0', '9') || this.testChar('.') || this.testChar('e') || this.testChar('E') || this.testChar('-') || this.testChar('+')) {
                this.useChar();
            }

            // Cannot use the patters to find the match directly because we are reading from a Reader and not a CharSequence.
            if (integralPattern.matcher(getMatch()).matches()) {
                return this.finishToken(this._tokenTypes.integralValue);
            } else if (floatingPattern.matcher(getMatch()).matches()) {
                return this.finishToken(this._tokenTypes.floatingValue);
            } else {
                throw createParseException("Invalid number");
            }
        } else if (this.testChar('\"')) {
            // "((?:[^\\"]|\\.)*)"
            this.startToken();
            this.useChar();

            while (!this.testChar('\"')) {
                if (this.isEOF()) {
                    var message = "EOF inside string";
                    throw createParseException(message);
                }

                if (this.testControlChar()) {
                    throw createParseException("Invalid control character");
                }

                if (this.testChar('\\')) {
                    this.useChar();
                }

                this.useChar();
            }

            this.useChar();

            return this.finishToken(this._tokenTypes.stringValue);
        } else if (this.isEOF()) {
            return new Token(TokenType.endOfFile, "", currentLine, currentColumn); // meaning there are no more tokens
        } else if (this.testControlChar()) {
            throw this.createParseException("Invalid control character");
        } else {
            console.log('invalid token....');
            throw this.createParseException(this._currentLine,this._currentColumn,"Invalid Token @Line " + this._currentLine + ", @column " + this._currentColumn);
        }
    }

    readChar() {
        return this._reader.read();
    }

    testToken(type) {
        var res = this._nextToken.type === type;
        console.log('_nextToken-' + this._nextToken.type + ', input->' + type + ',res-' + res);
        console.log('_nextToken.line-' + this._nextToken.line + ', _nextToken.column->' + this._nextToken.column );
        return this._nextToken.type === type;
    }

    createParseException(message) {
        console.log(message);
        return new Error('1234');
    }

    createTokenParseException(token, message) {
        return this.createParseException(token.line, token.column, message);
    }

    createParseException(line, column, message) {
        var instance = new Error(message, line, column);
        return instance;
    }

    useToken() {
        let res = this._nextToken;
        this._nextToken = this.readToken();
        return res;
    }

    useChar() {
        if (this._nextChar === -1)
            throw new Error('assertion failed.');

        var res = this._nextChar;

        if (this._nextChar === '\n') {
            this._currentLine += 1;
            this._currentColumn = 0;
        } else {
            this._currentColumn += 1;
        }

        if (this._tokenWriter != null) {
            this._tokenWriter.push(res);
        }

        this._nextChar = this.readChar();

        return res;
    }

    testChar(character) {
        return this._nextChar === character;
    }

    singleCharToken(type) {
        var line = this._currentLine;
        var column = this._currentColumn;

        return new JsonToken(type, this._valueOf(this.useChar()), line, column);
    }

    _keywordToken(type, keyword) {
        var length = keyword.length();

        // we skip testing the first character as we wouldn't be here it it didn't match
        useChar();

        for (var i = 1; i < length; i += 1) {
            if (!this.testChar(keyword.charAt(i))) {
                throw createParseException(currentLine, currentColumn - i, "Invalid token"); // i hope we're safe with `currentColumn - i', multi-line keywords aren't that common ;-)
            }

            this.useChar();
        }

        return new JsonToken(type, keyword, currentLine, currentColumn - length);
    }

    _valueOf(input) {
        return (input == null) ? "null" : '\"' + input + '\"';
    }

    startToken() {
        this._tokenWriter = [];
        this._tokenLine = this._currentLine;
        this._okenColumn = this._currentColumn;
    }

    finishToken(type) {
        let match = this.getMatch();

        this._tokenWriter = null;

        return new JsonToken(type, match, this._tokenLine, this._tokenColumn);
    }

    getMatch() {
        return this._tokenWriter.toString();
    }

    isEOF() {
		return this._nextChar === -1;
	}

    testControlChar() {
		return this.isISOControl(this._nextChar);
	}

    /**
     * Determines if the referenced character (Unicode code point) is an ISO control
     * character.  A character is considered to be an ISO control
     * character if its code is in the range {@code '\u005Cu0000'}
     * through {@code '\u005Cu001F'} or in the range
     * {@code '\u005Cu007F'} through {@code '\u005Cu009F'}.
     *
     * @param   codePoint the character (Unicode code point) to be tested.
     * @return  {@code true} if the character is an ISO control character;
     *          {@code false} otherwise.
     * @see     Character#isSpaceChar(int)
     * @see     Character#isWhitespace(int)
     * @since   1.5
     */
     isISOControl( codePoint) {
        // Optimized form of:
        //     (codePoint >= 0x00 && codePoint <= 0x1F) ||
        //     (codePoint >= 0x7F && codePoint <= 0x9F);
        return codePoint <= 0x9F &&
            (codePoint >= 0x7F || (codePoint >>> 5 == 0));
    }
}
