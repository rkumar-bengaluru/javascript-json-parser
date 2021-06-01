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
    var expected = "\n[\n\t\"fivesstar\",\n\t\"ratings\"\n]";
    instance.add(new JsonString(false,false,"fivesstar"));
    instance.add(new JsonString(false,false,"ratings"));
    instance.formatJsonToString(appendable,-1);
    logger.info("actual->" + appendable.destination);
    logger.info("expected->" + expected);
    expect(appendable.destination).toBe(expected);
})

test('formatJsonToString()', () => {
    var expected = "\n[\n\t\"Material: High Modulus Graphite\",\n\t\"Power Frame Series\"\n]";
    instance.add(new JsonString(false,false,"Material: High Modulus Graphite"));
    instance.add(new JsonString(false,false,"Power Frame Series"));
    instance.formatJsonToString(appendable,-1);
    logger.info("actual->" + appendable.destination);
    logger.info("expected->" + expected);
    expect(appendable.destination).toBe(expected);
})


afterEach(() => {
    // do nothing for this test cases.
});

