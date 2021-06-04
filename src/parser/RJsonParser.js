import RJsonLexer from "./RJsonLexer";
import CharStream from "./CharStream";
import StringReader from "./StringReader";
import RJsonToken from "./RJsonToken";
import RJsonConstants from "./RJsonConstants";

var logger = require('../logger/logger');

export default class RJsonParser extends RJsonConstants {

    constructor(rinput) {
        this.input = rinput;
        this.reader = new StringReader(this.input);
        this.stream = new CharStream(this.reader);
        this.lexer = new RJsonLexer(this.stream);
        this.token = new RJsonToken();
        this.token.next = this.jj_nt = this.lexer.getNextToken();
        this.jj_gen = 0;
        this.jj_la1 = new Array(13);
        this.jj_la1_0 = [0xccf8480,0x78000,0x1ccf8000,0x40,0x1ccf8000,0x40,0xccf8480,0xccf8000,0x60000,0x18000,0xcc00000,0x8800000,0x4400000,];;
        var i;
        for (i = 0; i < 13; i++) 
            this.jj_la1[i] = -1;
        
        this.jj_kind = -1;
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

    ensureEOF() {
        this.jj_consume_token(0);
        {if (true) return true;}
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
        var i,j,k,l;
        if (jj_kind >= 0) {
            la1tokens[jj_kind] = true;
            jj_kind = -1;
        }
        for (i = 0; i < 13; i++) {
            if (jj_la1[i] == jj_gen) {
                for (j = 0; j < 32; j++) {
                    if ((jj_la1_0[i] & (1<<j)) != 0) {
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