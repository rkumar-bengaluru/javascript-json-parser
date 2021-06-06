import JsonString from "../json/JsonString";
import JsonBoolean from "../json/JsonBoolean";
import JsonNumber from "../json/JsonNumber";
import JsonNull from "../json/JsonNull";
import RJsonConstants from "./RJsonConstants";
import StringReader from "../io/StringReader";
import CharStream from "../io/CharStream";
import RJsonLexer from "./RJsonLexer";
import RJsonToken from "./RJsonToken";

export default class RJsonAbsParser extends RJsonConstants {

    constructor(rinput,startNow) {
        super();
        
        if(startNow === undefined) {
            this.init(rinput);
        }
    }

    init(rinput) {
        this.input = rinput;
        this.reader = new StringReader(this.input);
        this.stream = new CharStream(this.reader);
        this.lexer = new RJsonLexer(this.stream);
        this.token = new RJsonToken();
        this.token.next = this.jj_nt = this.lexer.getNextToken();
        this.jj_gen = 0;
        this.jj_la1 = new Array(13);
        this.jj_la1_0 = [0xccf8480, 0x78000, 0x1ccf8000, 0x40, 0x1ccf8000, 0x40, 0xccf8480, 0xccf8000, 0x60000, 0x18000, 0xcc00000, 0x8800000, 0x4400000,];;
        var i;
        for (i = 0; i < 13; i++)
            this.jj_la1[i] = -1;

        this.jj_kind = -1;
        this.nativeNumbers = false;
    }

    getNextToken() {
        if ((this.token = this.jj_nt).next != null) this.jj_nt = this.jj_nt.next;
        else this.jj_nt = this.jj_nt.next = this.lexer.getNextToken();
        this.jj_gen++;
        return this.token;
    }

    objectKey() {
        let o, key;
        switch (this.jj_nt.kind) {
            case this.STRING_SINGLE_EMPTY:
            case this.STRING_DOUBLE_EMPTY:
            case this.STRING_SINGLE_NONEMPTY:
            case this.STRING_DOUBLE_NONEMPTY:
                key = this.string();
                break;
            case this.SYMBOL:
                key = this.symbol();
                break;
            case this.NULL:
                this.nullValue();
                key = null;
                break;
            case this.NUMBER_INTEGER:
            case this.NUMBER_DECIMAL:
            case this.TRUE:
            case this.FALSE:
                switch (this.jj_nt.kind) {
                    case this.TRUE:
                    case this.FALSE:
                        o = this.booleanValue();
                        break;
                    case this.NUMBER_INTEGER:
                    case this.NUMBER_DECIMAL:
                        o = this.number();
                        break;
                    default:
                        this.jj_la1[1] = this.jj_gen;
                        this.jj_consume_token(-1);
                        throw new Error();
                }
                key = o;
                break;
            default:
                this.jj_la1[2] = this.jj_gen;
                this.jj_consume_token(-1);
                throw new Error();
        }
        { if (true) { key.key = true; return key; } }
    }

    string() {
        let s;
        switch (this.jj_nt.kind) {
            case this.STRING_DOUBLE_EMPTY:
            case this.STRING_DOUBLE_NONEMPTY:
                s = this.doubleQuoteString();
                break;
            case this.STRING_SINGLE_EMPTY:
            case this.STRING_SINGLE_NONEMPTY:
                s = this.singleQuoteString();
                break;
            default:
                this.jj_la1[10] = this.jj_gen;
                this.jj_consume_token(-1);
                throw new Error();
        }
        { if (true) return s; }
    }

    doubleQuoteString() {
        switch (this.jj_nt.kind) {
            case this.STRING_DOUBLE_EMPTY:
                this.jj_consume_token(this.STRING_DOUBLE_EMPTY);
                { if (true) return new JsonString(false, false, ""); }
                break;
            case this.STRING_DOUBLE_NONEMPTY:
                this.jj_consume_token(this.STRING_DOUBLE_NONEMPTY);
                var image = this.token.image;
                { if (true) return new JsonString(false, false, image); }
                break;
            default:
                this.jj_la1[11] = this.sjj_gen;
                this.jj_consume_token(-1);
                throw new Error();
        }
    }

    singleQuoteString() {
        switch (this.jj_nt.kind) {
            case this.STRING_SINGLE_EMPTY:
                this.jj_consume_token(this.STRING_SINGLE_EMPTY);
                { if (true) return new JsonString(false, false, ""); }
                break;
            case this.STRING_SINGLE_NONEMPTY:
                this.jj_consume_token(this.STRING_SINGLE_NONEMPTY);
                var image = token.image;
                { if (true) return new JsonString(false, false, image); }
                break;
            default:
                this.jj_la1[12] = this.jj_gen;
                this.jj_consume_token(-1);
                throw new Error();
        }
    }

    symbol() {
        this.jj_consume_token(this.SYMBOL);
        { if (true) return new JsonString(false, false, token.image); }
    }

    nullValue() {
        this.jj_consume_token(this.NULL);
        { if (true) return new JsonNull(); }
    }

    booleanValue() {
        var b;
        switch (this.jj_nt.kind) {
            case this.TRUE:
                this.jj_consume_token(this.TRUE);
                b = true;
                break;
            case this.FALSE:
                this.jj_consume_token(this.FALSE);
                b = false;
                break;
            default:
                this.jj_la1[8] = this.jj_gen;
                this.jj_consume_token(-1);
                throw new Error();
        }
        { if (true) return new JsonBoolean(b); }
    }

    value() {
        let x;
        switch (this.jj_nt.kind) {
            case this.STRING_SINGLE_EMPTY:
            case this.STRING_DOUBLE_EMPTY:
            case this.STRING_SINGLE_NONEMPTY:
            case this.STRING_DOUBLE_NONEMPTY:
                x = this.string();
                break;
            case this.NUMBER_INTEGER:
            case this.NUMBER_DECIMAL:
                x = this.number();
                break;
            case this.TRUE:
            case this.FALSE:
                x = this.booleanValue();
                break;
            case this.NULL:
                x = this.nullValue();
                break;
            default:
                this.jj_la1[7] = this.jj_gen;
                this.jj_consume_token(-1);
                throw new Error();
        }
        { if (true) return x; }
    }

    number() {
        let t;
        switch (this.jj_nt.kind) {
            case this.NUMBER_DECIMAL:
                t = this.jj_consume_token(this.NUMBER_DECIMAL);
                if (nativeNumbers) {
                    { if (true) return new JsonNumber(false, false, t.image); }
                } else {
                    { if (true) return new JsonNumber(false, false, t.image); }
                }
                break;
            case this.NUMBER_INTEGER:
                t = this.jj_consume_token(this.NUMBER_INTEGER);
                if (this.nativeNumbers) {
                    { if (true) return new JsonNumber(false, false, t.image); }
                } else {
                    { if (true) return new JsonNumber(false, false, t.image); }
                }
                break;
            default:
                this.jj_la1[9] = this.jj_gen;
                this.jj_consume_token(-1);
                throw new Error();
        }
    }
}