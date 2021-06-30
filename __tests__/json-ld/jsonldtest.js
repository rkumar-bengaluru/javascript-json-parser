
const fs = require("fs");
var logger = require('../../src/logger/logger');
const { default: RJsonParser } = require('../../src/parser/RJsonParser');
const { default: RJsonParserError } = require('../../src/parser/RJsonParserError');

var instance = null;

beforeEach(() => {
});

function testParse(data) {
    try {
        instance = new RJsonParser(data);
        var obj = instance.parse();
        logger.debug('----------------');
        var appendable = {
            destination: ""
        }
        obj.formatJsonToString(appendable, -1);
        logger.debug(appendable.destination);
    } catch (e) {
        logger.debug('caught exception' + e.stack);
        throw e;
    }
}

test('prokick.json', () => {
    const data = fs.readFileSync('./__tests__/json-ld/prokick.json',{encoding:'utf8'});
    testParse(data);
});

test('flipkart.json', () => {
    const data = fs.readFileSync('./__tests__/json-ld/flipkart.json',{encoding:'utf8'});
    testParse(data);
});

test('sportsuncle.json', () => {
    const data = fs.readFileSync('./__tests__/json-ld/sportsuncle.json',{encoding:'utf8'});
    testParse(data);
});

test('1001.json', () => {
    const data = fs.readFileSync('./__tests__/json-ld/1001.json',{encoding:'utf8'});
    testParse(data);
});
