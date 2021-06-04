import RJsonLexer from '../../src/parser/RJsonLexer.js';
import StringReader from '../../src/io/StringReader.js';
import CharStream from '../../src/io/CharStream.js';

var logger = require('../../src/logger/logger');

var instance = null;

beforeEach(() => {

});

test('spaceTest()', () => {
    var jsonStr = " {\"name\":\"sonoo\",\"salary\":600000.0,\"age\":27}";
    var reader = new StringReader(jsonStr);
    instance = new RJsonLexer(new CharStream(reader));
    var token = instance.getNextToken();
});

test('test_Input()', () => {
    try {
        var jsonStr = "{\"name\":\"sonoo\",\"salary\":600000.0,\"age\":27}";
        var reader = new StringReader(jsonStr);
        instance = new RJsonLexer(new CharStream(reader));
        var token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        expect(token.image).toBe("name");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        expect(token.image).toBe("sonoo");
        token = instance.getNextToken();
        expect(token.image).toBe(",");
        token = instance.getNextToken();
        expect(token.image).toBe("salary");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        expect(token.image).toBe("600000.0");
        token = instance.getNextToken();
        expect(token.image).toBe(",");
        token = instance.getNextToken();
        expect(token.image).toBe("age");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        expect(token.image).toBe("27");
    } catch (e) {
        throw e;
    }
})

test('test_C_SINGLE_COMMENT()', () => {
    try {
        var jsonStr = "//test comment\n//another comment\n  {\"name\"://simple comment\n\"son oo\" , \"salary\":600000.0,\"age\":27}";
        var reader = new StringReader(jsonStr);
        instance = new RJsonLexer(new CharStream(reader));
        var token = instance.getNextToken();
        token = instance.getNextToken();
        token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        expect(token.image).toBe("name");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        token = instance.getNextToken();
        expect(token.image).toBe("son oo");
        token = instance.getNextToken();
        expect(token.image).toBe(",");
        token = instance.getNextToken();
        expect(token.image).toBe("salary");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        expect(token.image).toBe("600000.0");
        token = instance.getNextToken();
        expect(token.image).toBe(",");
        token = instance.getNextToken();
        expect(token.image).toBe("age");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        expect(token.image).toBe("27");
    } catch (e) {
        throw e;
    }
})

test('test_C_MULTILINE_COMMENT()', () => {
    try {
        var jsonStr = "/*test comment*///another comment\n  {\"name\":/*simple comment*/\"son oo\" , \"salary\":600000.0,\"age\":27}";
        var reader = new StringReader(jsonStr);
        instance = new RJsonLexer(new CharStream(reader));
        var token = instance.getNextToken();
        token = instance.getNextToken();
        token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        expect(token.image).toBe("name");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        token = instance.getNextToken();
        expect(token.image).toBe("son oo");
        token = instance.getNextToken();
        expect(token.image).toBe(",");
        token = instance.getNextToken();
        expect(token.image).toBe("salary");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        expect(token.image).toBe("600000.0");
        token = instance.getNextToken();
        expect(token.image).toBe(",");
        token = instance.getNextToken();
        expect(token.image).toBe("age");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        expect(token.image).toBe("27");
    } catch (e) {
        throw e;
    }
})

test('test_C_MULTILINE_COMMENT()', () => {
    try {
        var jsonStr = "/*test comment*/#another comment\n{\"name\":/*simple comment*/\"sonoo\",\"salary\":600000.0,\"age\":27}";
        var reader = new StringReader(jsonStr);
        instance = new RJsonLexer(new CharStream(reader));
        var token = instance.getNextToken();
        token = instance.getNextToken();
        token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        expect(token.image).toBe("name");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        token = instance.getNextToken();
        expect(token.image).toBe("sonoo");
        token = instance.getNextToken();
        expect(token.image).toBe(",");
        token = instance.getNextToken();
        expect(token.image).toBe("salary");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        expect(token.image).toBe("600000.0");
        token = instance.getNextToken();
        expect(token.image).toBe(",");
        token = instance.getNextToken();
        expect(token.image).toBe("age");
        token = instance.getNextToken();
        expect(token.image).toBe(":");
        token = instance.getNextToken();
        expect(token.image).toBe("27");
    } catch (e) {
        throw e;
    }
})

