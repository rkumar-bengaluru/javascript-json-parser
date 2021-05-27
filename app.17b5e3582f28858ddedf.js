(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RJsonParser"] = factory();
	else
		root["RJsonParser"] = factory();
})(this, function() {
return (this["webpackChunkRJsonParser"] = this["webpackChunkRJsonParser"] || []).push([["app"],{

/***/ 193:
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 672:
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _json_JsonFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json/JsonFormat */ 85);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/style.css */ 193);



parse();

function parse() {
    try {
        let json = new _json_JsonFormat__WEBPACK_IMPORTED_MODULE_0__.default();
        //var res = json.parse('{"rupak":"abcd"}')
        //console.log(res);
        //document.getElementById('root').innerHTML = res;
    } catch (e) {
        console.error(e);
        document.getElementById('root').innerHTML = e.message;
    }
}



/***/ }),

/***/ 562:
/*!********************************!*\
  !*** ./src/io/StringReader.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StringReader)
/* harmony export */ });
class StringReader {

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

/***/ }),

/***/ 85:
/*!********************************!*\
  !*** ./src/json/JsonFormat.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JsonFormat)
/* harmony export */ });
/* harmony import */ var _JsonParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JsonParser */ 482);



class JsonFormat {

    parse(input) {
        return _JsonParser__WEBPACK_IMPORTED_MODULE_0__.default.runParser(input, null);
    }
}


/***/ }),

/***/ 663:
/*!*******************************!*\
  !*** ./src/json/JsonLexer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JsonLexer)
/* harmony export */ });
/* harmony import */ var _JsonToken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JsonToken */ 524);
/* harmony import */ var _io_StringReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../io/StringReader */ 562);



class JsonLexer {

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

        this._reader = new _io_StringReader__WEBPACK_IMPORTED_MODULE_1__.default(this._input);
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

        return new _JsonToken__WEBPACK_IMPORTED_MODULE_0__.default(type, this._valueOf(this.useChar()), line, column);
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

        return new _JsonToken__WEBPACK_IMPORTED_MODULE_0__.default(type, keyword, currentLine, currentColumn - length);
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

        return new _JsonToken__WEBPACK_IMPORTED_MODULE_0__.default(type, match, this._tokenLine, this._tokenColumn);
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


/***/ }),

/***/ 482:
/*!********************************!*\
  !*** ./src/json/JsonParser.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JsonParser),
/* harmony export */   "runParser": () => (/* binding */ runParser)
/* harmony export */ });
/* harmony import */ var _JsonLexer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JsonLexer */ 663);


class JsonParser {

    constructor(lexer) {
        this._lexer = lexer;
    }

    parseString(token) {
        var res = [];
        var string = token.match;
        var pos = 1; // skip leading "
        var length = string.length - 1; // skip trailing "
        while (pos < length) {
            if (string[pos] === '\\') {
                let ch = string[pos + 1];
                pos += 2;
                if (ch === '"') {
                    res.push('"');
                } else if (ch === '\\') {
                    res.push('\\');
                } else if (ch === '/') {
                    res.push('/');
                } else if (ch === 'b') {
                    res.push('\b');
                } else if (ch === 'f') {
                    res.push('\f');
                } else if (ch === 'n') {
                    res.push('\n');
                } else if (ch === 'r') {
                    res.push('\r');
                } else if (ch === 't') {
                    res.push('\t');
                } else if (ch === 'u') {
                    res.push(string.substring(pos, pos + 4), 16);
                    pos += 4;
                } else {
                    throw this._lexer.createParseException(token.line, token.column + pos - 2, "Illegal string escape sequence");
                }
            } else {
                res.push(string[pos]);
                pos += 1;
            }
        }
    }

    parse() {
        if (this._lexer.testToken(this._lexer.tokenTypes.openBrace)) {
            let jsonMap = new Map();

            this._lexer.useToken(); // {
            if (!this._lexer.testToken(this._lexer.tokenTypes.closeBrace)) {
                while (true) {
                    if (!this._lexer.testToken(this._lexer.tokenTypes.stringValue)) {
                        throw this._createParseExceptionUnexpectedToken("string");
                    }
                    var key = this.parseString(this._lexer.useToken());
                    if (!this._lexer.testToken(this._lexer.tokenTypes.colon)) {
                        throw createParseExceptionUnexpectedToken("colon");
                    }
                    this._lexer.useToken(); // :
                    console.log('key-' + key);
                    jsonMap[key] = this.parse();

                    if (this._lexer.testToken(this._lexer.tokenTypes.comma)) {
                        this._lexer.useToken(); // ,
                    } else if (this._lexer.testToken(this._lexer.tokenTypes.closeBrace)) {
                        break;
                    } else {
                        throw createParseExceptionUnexpectedToken("comma or closing brace");
                    }

                }
            }

            lexer.useToken(); // }
            return map;
        }
        return ' after processing';
    }

    static runParser(input, src) {
        this._input = input;
        this._src = src;
        this._lexer = new _JsonLexer__WEBPACK_IMPORTED_MODULE_0__.default(this._input, this._src);
        this._instance = new JsonParser(this._lexer);
        var result = this._instance.parse();

        if (!this._lexer.testToken(this._lexer.tokenTypes.endOfFile)) {
            throw this._createParseExceptionUnexpectedToken("end of file");
        }
        return result;
    }

    static _createParseExceptionUnexpectedToken(expected) {
        return this._lexer.createTokenParseException(this._lexer.useToken(), "Expected " + expected);
    }
}

function runParser(input) {
    JsonParser.runParser(input);
}

/***/ }),

/***/ 524:
/*!*******************************!*\
  !*** ./src/json/JsonToken.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JsonToken)
/* harmony export */ });
class JsonToken {
    constructor(type, match, line, column) {
        this._type = type;
        this._match = match;
        this._line = line;
        this._column = column;
    }

    get type() { return this._type }
    set type(ntype) { this._type = ntype; }

    get match() { return this._match; }
    set match(nmatch) { this._match = nmatch; }

    get line() { return this._line; }
    set line(nline) { this._line = nline; }

    get column() { return this._column; }
    set column(ncolumn) { this._column = ncolumn; }
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(672));
/******/ __webpack_exports__ = __webpack_exports__.default;
/******/ return __webpack_exports__;
/******/ }
]);
});
//# sourceMappingURL=app.17b5e3582f28858ddedf.js.map