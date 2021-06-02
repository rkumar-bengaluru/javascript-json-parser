import RJsonLexer from '../../src/parser/RJsonLexer.js';
import CharStream from '../../src/io/CharStream.js';
import StringReader from '../../src/io/StringReader.js';

var logger = require('../../src/logger/logger');

var instance = null;

beforeEach(() => {
    var jsonStr = "{\"name\":\"rupak\"}";
    var reader = new StringReader(jsonStr);
    instance = new RJsonLexer(reader);
});

test('getNextToken()', () => {
    try {
        var token = instance.getNextToken();
        logger.debug("token->" + token);
        expect(token.image).toBe("{");
    } catch (e) {
        throw e;
    }
})

test('getNextToken()', () => {
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