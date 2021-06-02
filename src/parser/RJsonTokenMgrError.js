export default class RJsonTokenMgrError {
    static addEscapes(str) {
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
                        var s = "0000" + Integer.toString(ch, 16);
                        retval += "\\u" + s.substring(s.length() - 4, s.length());
                    } else {
                        retval += ch;
                    }
                    continue;
            }
        }
        return retval.toString();
    }

    static LexicalError(EOFSeen, lexState, errorLine, errorColumn, errorAfter, curChar) {
        let code = curChar.charCodeAt();
        return "Lexical error at line " +
            errorLine + ", column " +
            errorColumn + ".  Encountered: " +
            (EOFSeen ? "<EOF> " : ("\"" + RJsonTokenMgrError.addEscapes(curChar) + "\"") + " (" + code + "), ") +
            "after : \"" + RJsonTokenMgrError.addEscapes(errorAfter) + "\"";
    }

    constructor(EOFSeen, lexState, errorLine, errorColumn, errorAfter, curChar, reason) {
        this.message = RJsonTokenMgrError.LexicalError(EOFSeen, lexState, errorLine, errorColumn, errorAfter, curChar);
        this.reason = reason;
    }
}