import RJsonLexer from '../../src/parser/RJsonLexer.js';
import StringReader from '../../src/io/StringReader.js';

var logger = require('../../src/logger/logger');

var instance = null;

beforeEach(() => {
    var jsonStr = "{\"name\":\"rupak\"}";
    var reader = new StringReader(jsonStr);
    instance = new RJsonLexer(reader);
});

test('getNextToken()-01', () => {
    try {
        var token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
    } catch (e) {
        throw e;
    }
})

test('getNextToken()-02', () => {
    try {
        var token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        var image = token.image;
        var expected = "name";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
})

test('getNextToken()-03', () => {
    try {
        var token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        var image = token.image;
        var expected = "name";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = ":";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "rupak";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "}";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
})

test('getNextToken()-boolean(true)', () => {
    try {
        var jsonStr = "{\"isBoolean\":true}";
        var reader = new StringReader(jsonStr);
        instance = new RJsonLexer(reader);

        var token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        var image = token.image;
        var expected = "isBoolean";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = ":";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "true";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "}";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
})

test('getNextToken()-boolean(true)', () => {
    try {
        var jsonStr = "{\"isBoolean\":false}";
        var reader = new StringReader(jsonStr);
        instance = new RJsonLexer(reader);

        var token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        var image = token.image;
        var expected = "isBoolean";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = ":";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "false";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "}";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
})

test('getNextToken()-number(12)', () => {
    try {
        var jsonStr = "{\"isNumber\":12}";
        var reader = new StringReader(jsonStr);
        instance = new RJsonLexer(reader);

        var token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        var image = token.image;
        var expected = "isNumber";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = ":";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "12";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "}";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
})

test('getNextToken()-number(12.243)', () => {
    try {
        var jsonStr = "{\"isNumber\":12.243}";
        var reader = new StringReader(jsonStr);
        instance = new RJsonLexer(reader);

        var token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        var image = token.image;
        var expected = "isNumber";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = ":";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "12.243";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "}";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
})

test('getNextToken()-null test', () => {
    try {
        var jsonStr = "{\"isNumber\":null}";
        var reader = new StringReader(jsonStr);
        instance = new RJsonLexer(reader);

        var token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
        token = instance.getNextToken();
        var image = token.image;
        var expected = "isNumber";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = ":";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "null";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
        token = instance.getNextToken();
        var image = token.image;
        var expected = "}";
        logger.debug('recvd token-'+ image);
        expect(image).toBe(expected);
    } catch (e) {
        logger.debug(e.stack);
        throw e;
    }
})