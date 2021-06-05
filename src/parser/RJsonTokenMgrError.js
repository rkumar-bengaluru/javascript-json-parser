var logger = require('../logger/logger');

export default class RJsonTokenMgrError {
    static addEscapes(str) {
        //logger.debug('addEscapes)' + str);
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
                        //logger.debug('retval' + retval);
                    } else {
                        retval += ch;
                    }
                    continue;
            }
        }
        //logger.debug('8888' + retval.toString());
        return retval.toString();
    }

    static LexicalError(EOFSeen, lexState, errorLine, errorColumn, errorAfter, curChar) {
        let code = curChar.charCodeAt();
        //logger.debug('LexicalError(EOFSeen, lexState, errorLine, errorColumn, errorAfter, curChar)');
        var res = "Lexical error at line " +
            errorLine + ", column " +
            errorColumn + ".  Encountered: " +
            (EOFSeen ? "<EOF> " : ("\"" + RJsonTokenMgrError.addEscapes(curChar) + "\"") + " (" + code + "), ") +
            "after : \"" + RJsonTokenMgrError.addEscapes(errorAfter) + "\"";
        //logger.debug(res);
    }

    constructor(EOFSeen, lexState, errorLine, errorColumn, errorAfter, curChar, reason) {
        this.message = RJsonTokenMgrError.LexicalError(EOFSeen, lexState, errorLine, errorColumn, errorAfter, curChar);
        this.reason = reason;
    }
}