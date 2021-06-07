import IOString from '../../src/io/IOString.js';
var logger = require('../../src/logger/logger');

test('toString()', () => {
    try {
        var testStr = "Rupak Kumar"
        var instance = new IOString(testStr.split(''),0,5);
        logger.debug("string value->" + instance.stringify());
        
        expect(instance.stringify()).toBe("Rupak");
    } catch (e) {
        throw e;
    }
})