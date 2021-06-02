import String from '../../src/io/String.js';
var logger = require('../../src/logger/logger');

test('toString()', () => {
    try {
        var testStr = "Rupak Kumar"
        var instance = new String(testStr.split(''),0,4);
        logger.debug("string value->" + instance.stringify());
        
        expect(instance.stringify()).toBe("Rupak");
    } catch (e) {
        throw e;
    }
})