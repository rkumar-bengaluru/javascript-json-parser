export default class RJsonConstants {

    constructor() {
        /** End of File. */
        this.EOF = 0;
        /** RegularExpression Id. */
        this.C_SINGLE_COMMENT = 1;
        /** RegularExpression Id. */
        this.C_MULTILINE_COMMENT = 2;
        /** RegularExpression Id. */
        this.SH_SINGLE_COMMENT = 3;
        /** RegularExpression Id. */
        this.WHITESPACE = 4;
        /** RegularExpression Id. */
        this.EOL = 5;
        /** RegularExpression Id. */
        this.COMMA = 6;
        /** RegularExpression Id. */
        this.BRACE_OPEN = 7;
        /** RegularExpression Id. */
        this.BRACE_CLOSE = 8;
        /** RegularExpression Id. */
        this.COLON = 9;
        /** RegularExpression Id. */
        this.BRACKET_OPEN = 10;
        /** RegularExpression Id. */
        this.BRACKET_CLOSE = 11;
        /** RegularExpression Id. */
        this.ZERO = 12;
        /** RegularExpression Id. */
        this.DIGIT_NONZERO = 13;
        /** RegularExpression Id. */
        this.DIGIT = 14;
        /** RegularExpression Id. */
        this.NUMBER_INTEGER = 15;
        /** RegularExpression Id. */
        this.NUMBER_DECIMAL = 16;
        /** RegularExpression Id. */
        this.TRUE = 17;
        /** RegularExpression Id. */
        this.FALSE = 18;
        /** RegularExpression Id. */
        this.NULL = 19;
        /** RegularExpression Id. */
        this.QUOTE_DOUBLE = 20;
        /** RegularExpression Id. */
        this.QUOTE_SINGLE = 21;
        /** RegularExpression Id. */
        this.STRING_SINGLE_EMPTY = 22;
        /** RegularExpression Id. */
        this.STRING_DOUBLE_EMPTY = 23;
        /** RegularExpression Id. */
        this.STRING_SINGLE_BODY = 24;
        /** RegularExpression Id. */
        this.STRING_DOUBLE_BODY = 25;
        /** RegularExpression Id. */
        this.STRING_SINGLE_NONEMPTY = 26;
        /** RegularExpression Id. */
        this.STRING_DOUBLE_NONEMPTY = 27;
        /** RegularExpression Id. */
        this.SYMBOL = 28;

        /** Lexical state. */
        this.DEFAULT = 0;

        this.LEXICAL_ERROR = 0;

        /** Literal token values. */
        this.tokenImage = [
            "<EOF>",
            "<C_SINGLE_COMMENT>",
            "<C_MULTILINE_COMMENT>",
            "<SH_SINGLE_COMMENT>",
            "<WHITESPACE>",
            "<EOL>",
            "\",\"",
            "\"{\"",
            "\"}\"",
            "\":\"",
            "\"[\"",
            "\"]\"",
            "\"0\"",
            "<DIGIT_NONZERO>",
            "<DIGIT>",
            "<NUMBER_INTEGER>",
            "<NUMBER_DECIMAL>",
            "\"true\"",
            "\"false\"",
            "\"null\"",
            "\"\\\"\"",
            "\"\\\'\"",
            "\"\\\'\\\'\"",
            "\"\\\"\\\"\"",
            "<STRING_SINGLE_BODY>",
            "<STRING_DOUBLE_BODY>",
            "<STRING_SINGLE_NONEMPTY>",
            "<STRING_DOUBLE_NONEMPTY>",
            "<SYMBOL>",
        ];
    }
}