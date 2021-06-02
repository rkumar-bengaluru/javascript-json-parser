import StringReader from '../../src/io/StringReader.js';
var logger = require('../../src/logger/logger');

var input = "";
var instance = null;

beforeEach(() => {
    input = "My Name is rupak";
    instance = new StringReader(input);
});

test('read', () => {
    try {
        var dst = new Array(2);;
        var expected = ['M','y',' '];
        instance.read(dst, 0, 2);
        expect(JSON.stringify(dst)).toBe(JSON.stringify(expected));
    } catch (e) {
        throw e;
    }
})

test('read01', () => {
    try {
        var dst = new Array(3);;
        var expected = ['M','y',' '];
        logger.debug('before copy - '+ JSON.stringify(dst));
        instance.read(dst, 0, 2);
        logger.debug('after copy - '+ JSON.stringify(dst));
        expect(JSON.stringify(dst)).toBe(JSON.stringify(expected));
    } catch (e) {
        throw e;
    }
})

test('read02', () => {
    try {
        var len = input.length -1;
        var dst = new Array(len);
        var expected = input.split('');
        logger.debug('input length - '+ len);
        logger.debug('before copy - '+ JSON.stringify(dst));
        instance.read(dst, 0, len);
        logger.debug('after copy - '+ JSON.stringify(dst));
        expect(JSON.stringify(dst)).toBe(JSON.stringify(expected));
    } catch (e) {
        throw e;
    }
})
