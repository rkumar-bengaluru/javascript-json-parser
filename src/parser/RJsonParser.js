import JsonMap from "../json/JsonMap";
import JsonList from "../json/JsonList";

var logger = require('../logger/logger');

export default class RJsonParser extends RJsonAbsParser {

    constructor(rinput) {
        super(rinput);
    }

    parse() {
        var toReturn = this.anything();
        toReturn.root = true;
        toReturn.rawInput = this.input;
        if (!this.ensureEOF()) {
            throw new Error("parser.expectedEOF");
        }
        return toReturn;
    }

    anything() {
        logger.debug("RJsonParser::anything()" + this.jj_nt.toString());
        let x;
        switch (this.jj_nt.kind) {
            case this.BRACE_OPEN:
                x = this.object();
                break;
            case this.BRACKET_OPEN:
                x = this.list();
                break;
            case this.NUMBER_INTEGER:
            case this.NUMBER_DECIMAL:
            case this.TRUE:
            case this.FALSE:
            case this.NULL:
            case this.STRING_SINGLE_EMPTY:
            case this.STRING_DOUBLE_EMPTY:
            case this.STRING_SINGLE_NONEMPTY:
            case this.STRING_DOUBLE_NONEMPTY:
                x = value();
                break;
            default:
                this.jj_la1[0] = this.jj_gen;
                this.jj_consume_token(-1);
                throw new RJsonParserError();
        }
        { if (true) return x; }
    }

    object() {
        let map = new JsonMap(true, false, new Map());
        let key, value;
        this.jj_consume_token(this.BRACE_OPEN);
        switch (this.jj_nt.kind) {
            case this.NUMBER_INTEGER:
            case this.NUMBER_DECIMAL:
            case this.TRUE:
            case this.FALSE:
            case this.NULL:
            case this.STRING_SINGLE_EMPTY:
            case this.STRING_DOUBLE_EMPTY:
            case this.STRING_SINGLE_NONEMPTY:
            case this.STRING_DOUBLE_NONEMPTY:
            case this.SYMBOL:
                key = this.objectKey();
                this.jj_consume_token(COLON);
                value = this.anything();
                value.key = true;
                map.put(key, value);
                key = null; value = null;
                label_1:
                while (true) {
                    switch (this.jj_nt.kind) {
                        case this.COMMA:
                            ;
                            break;
                        default:
                            this.jj_la1[3] = this.jj_gen;
                            break label_1;
                    }
                    this.jj_consume_token(this.COMMA);
                    key = this.objectKey();
                    this.jj_consume_token(this.COLON);
                    value = this.anything();
                    value.key = true;
                    map.put(key, value);
                    key = null; value = null;
                }
                break;
            default:
                this.jj_la1[4] = jj_gen;
        }
        this.jj_consume_token(this.BRACE_CLOSE);
        { if (true) return map; }
    }

    list() {
        let list = new JsonList(true, false, []);
        logger.debug("RJsonParser::list()" + this.jj_nt.toString());
        let value;
        this.jj_consume_token(this.BRACKET_OPEN);
        switch (this.jj_nt.kind) {
            case this.BRACE_OPEN:
            case this.BRACKET_OPEN:
            case this.NUMBER_INTEGER:
            case this.NUMBER_DECIMAL:
            case this.TRUE:
            case this.FALSE:
            case this.NULL:
            case this.STRING_SINGLE_EMPTY:
            case this.STRING_DOUBLE_EMPTY:
            case this.STRING_SINGLE_NONEMPTY:
            case this.STRING_DOUBLE_NONEMPTY:
                value = anything();
                list.add(value);
                value = null;
                label_2:
                while (true) {
                    switch (this.jj_nt.kind) {
                        case COMMA:
                            ;
                            break;
                        default:
                            this.jj_la1[5] = this.jj_gen;
                            break label_2;
                    }
                    this.jj_consume_token(this.COMMA);
                    value = this.anything();
                    list.add(value);
                    value = null;
                }
                break;
            default:
                this.jj_la1[6] = this.jj_gen;
                ;
        }
        this.jj_consume_token(this.BRACKET_CLOSE);
        {if (true) return list;}
    }

    

    ensureEOF() {
        this.jj_consume_token(0);
        { if (true) return true; }
    }

    jj_consume_token(kind) {
        var oldToken = this.token;
        if ((this.token = this.jj_nt).next != null) {
            this.jj_nt = this.jj_nt.next;
        } else {
            this.jj_nt = this.jj_nt.next = this.lexer.getNextToken();
        }
        logger.debug("RJsonParser::jj_consume_token::tokenKind=" + this.token.kind + "," + kind);
        if (this.token.kind === kind) {
            this.jj_gen++;
            return this.token;
        }
        this.jj_nt = this.token;
        this.token = oldToken;
        this.jj_kind = kind;
        throw generateParseException();
    }

    generateParseException() {
        var jj_expentries = [];
        var la1tokens = [];
        var jj_expentry = [];
        var i, j, k, l;
        if (jj_kind >= 0) {
            la1tokens[jj_kind] = true;
            jj_kind = -1;
        }
        for (i = 0; i < 13; i++) {
            if (jj_la1[i] == jj_gen) {
                for (j = 0; j < 32; j++) {
                    if ((jj_la1_0[i] & (1 << j)) != 0) {
                        la1tokens[j] = true;
                    }
                }
            }
        }

        for (k = 0; k < 29; k++) {
            if (la1tokens[k]) {
                jj_expentry[0] = k;
                jj_expentries.push(jj_expentry);
            }
        }
        var exptokseq = [];
        for (l = 0; l < jj_expentries.size(); l++) {
            exptokseq[l] = jj_expentries[l];
        }

        return new RJsonParserError(token, exptokseq, tokenImage);
    }

    static runParser(input) {
        var instance = new RJsonParser(input);
        var jsonObject = instance.parse();
        return jsonObject;
    }
}

export function runParser(input) {
    RJsonParser.runParser(input);
}