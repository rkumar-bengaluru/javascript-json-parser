
const fs = require("fs");
var logger = require('../../src/logger/logger');
const { default: RJsonParser } = require('../../src/parser/RJsonParser');

var instance = null;

beforeEach(() => {
    var jsonStr = " {\"name\":\"sonoo\",\"salary\":600000.0,\"age\":27}         ";
    instance = new RJsonParser(jsonStr);
});

test('parse()', () => {
    try {
        var obj = instance.parse();
        logger.debug('----------------');
        var appendable = {
            destination: ""
        }
        obj.formatJsonToHtml(appendable, -1);
        logger.debug(appendable.destination);
    } catch (e) {
        logger.debug(e.stack);
    }
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

test('product()', () => {
    const data = fs.readFileSync('./__tests__/parser/product.json',{encoding:'utf8'});
    testParse(data);

    
});

test('product1()', () => {
    const data = fs.readFileSync('./__tests__/parser/product1.json',{encoding:'utf8'});
    testParse(data);
});