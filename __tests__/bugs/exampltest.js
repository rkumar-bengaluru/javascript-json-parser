
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

test('comma1.json', () => {
    const data = fs.readFileSync('./__tests__/bugs/comma1.json',{encoding:'utf8'});
    testParse(data);
});

test('comma.json', () => {
    const data = fs.readFileSync('./__tests__/bugs/comma.json',{encoding:'utf8'});
    testParse(data);
});

test('example.json', () => {
    const data = fs.readFileSync('./__tests__/bugs/example.json',{encoding:'utf8'});
    testParse(data);
});

test('jsonld.json', () => {
    const data = fs.readFileSync('./__tests__/bugs/jsonld.json',{encoding:'utf8'});
    testParse(data);
});

test('unicode.json', () => {
    const data = fs.readFileSync('./__tests__/bugs/arc.json',{encoding:'utf8'});
    testParse(data);
});
test('pro-zig2.json', () => {
    const data = fs.readFileSync('./__tests__/bugs/pro-zig2.json',{encoding:'utf8'});
    testParse(data);
});