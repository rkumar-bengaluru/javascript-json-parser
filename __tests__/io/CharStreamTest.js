import StringReader from '../../src/io/StringReader.js';
import CharStream from '../../src/io/CharStream.js';

var logger = require('../../src/logger/logger');

test('beginToken()', () => {
    try {
        var jsonStr = "{\"name\":\"rupak\"}";
        var stream = new StringReader(jsonStr);
        var instance = new CharStream(stream);
        var token = instance.beginToken();
        logger.debug("token->" + token);
        expect(token).toBe("{");
    } catch (e) {
        throw e;
    }
})

test('getImage()', () => {
    try {
        var jsonStr = "{\"name\":\"rupak\"}";
        var stream = new StringReader(jsonStr);
        var instance = new CharStream(stream);
        var token = instance.beginToken();
        logger.debug("token->" + token);
        expect(token).toBe("{");
        var image = instance.getImage();
        expect(image).toBe("{");
    } catch (e) {
        throw e;
    }
})