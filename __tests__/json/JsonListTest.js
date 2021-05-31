var logger = require('../../src/logger/logger');

import  JsonList  from '../../src/json/JsonList.js';
import  JsonString  from '../../src/json/JsonString.js';

const instance = new JsonList(true,false,[]);

var appendable = {
    destination : ""
}

beforeEach(() => {
    appendable.destination = "";
    instance.input = [];
});
    

test('input', () => {
    expect(instance.input.length).toBe(0);
})

test('isKey', () => {
    expect(instance.isKey).toBe(false);
})

test('root', () => {
    expect(instance.root).toBe(true);
})

test('add test', () => {
    instance.add(new JsonString(false,true,"name"));
    instance.add(new JsonString(false,false,"rupak"));
    expect(instance.input.length).toBe(2);
})

test('formatJsonToString()', () => {
    instance.add(new JsonString(false,true,"name"));
    instance.add(new JsonString(false,false,"rupak"));
    instance.formatJsonToString(appendable,-1);
    logger.info(appendable.destination);
    expect(appendable.destination).toBe("\n[\n\t\"name\",\"rupak\"\n]");
})

afterEach(() => {
    // do nothing for this test cases.
});

