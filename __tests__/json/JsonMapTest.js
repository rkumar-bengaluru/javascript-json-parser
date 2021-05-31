var logger = require('../../src/logger/logger');

import  JsonMap  from '../../src/json/JsonMap.js';
import  JsonString  from '../../src/json/JsonString.js';

const instance = new JsonMap(true,false,new Map());

var appendable = {
    destination : ""
}

test('input', () => {
    expect(instance.input.size).toBe(0);
})

test('isKey', () => {
    expect(instance.isKey).toBe(false);
})

test('root', () => {
    expect(instance.root).toBe(true);
})

test('put test', () => {
    instance.put(new JsonString(false,true,"name"),new JsonString(false,false,"rupak"));
    expect(instance.input.size).toBe(1);
})

test('formatJsonToString()', () => {
    instance.input = new Map();
    instance.put(new JsonString(false,true,"name"),new JsonString(false,false,"rupak"));
    logger.info('calling map formatJsonToString()');
    instance.formatJsonToString(appendable,-1);
    logger.info(appendable.destination);
    expect(appendable.destination).toBe("\n{\n\t\"name\" : \"rupak\"\n}");
})


