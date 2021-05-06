import JsonLexer from "./JsonLexer";

export default class JsonParser {

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
        this._lexer = new JsonLexer(this._input, this._src);
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

export function runParser(input) {
    JsonParser.runParser(input);
}