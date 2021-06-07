
const fs = require("fs");
var logger = require('../../src/logger/logger');
const { default: RJsonParser } = require('../../src/parser/RJsonParser');
const { default: RJsonParserError } = require('../../src/parser/RJsonParserError');

var instance = null;

beforeEach(() => {
   
});

function testParse(data) {
    try {
        logger.debug('data-' + data);
        instance = new RJsonParser(data);
        var obj = instance.parse();
        logger.debug('----------------');
        var appendable = {
            destination: ""
        }
        var expected = "{\n\t\"productId\" : \"0ENJMZAXX2\",\n\t\"Title\" : \"APACS™\"\n}";
        obj.formatJsonToString(appendable, -1);
        logger.debug(appendable.destination);
        expect(appendable.destination).toBe(expected);
    } catch (e) {
        logger.debug('caught exception' + e.stack);
        throw e;
    }
}

test('product4.json', () => {
    fs.readFile("./__tests__/parser/product4.json", { encoding: 'utf8' }, function (err, data) {
        if (err) {
            logger.error(err);
        }
        testParse(data);
    });
});