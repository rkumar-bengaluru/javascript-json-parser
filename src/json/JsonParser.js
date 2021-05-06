import JsonLexer from "./JsonLexer";

export default class JsonParser {

    constructor(lexer) {
        this._lexer = lexer;
    }

    parse() {
        if (this._lexer.testToken(this._lexer.tokenTypes.openBrace)) {
            this._lexer.useToken(); // {
            if (!this._lexer.testToken(this._lexer.tokenTypes.closeBrace)) {
                while (true) {
                    // if (!this._lexer.testToken(this._lexer.tokenTypes.stringValue)) {
					// 	throw this._createParseExceptionUnexpectedToken("string");
					// }

                    break;
                }
            }
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