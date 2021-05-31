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
    instance.add(new JsonString(false,false,"fivesstar"));
    instance.add(new JsonString(false,false,"ratings"));
    instance.formatJsonToString(appendable,-1);
    logger.info(appendable.destination);
    expect(appendable.destination).toBe("\n[\n\"fivesstar\",\"ratings\"\n]");
    //expect(appendable.destination).toBe("\n[\n\t\"name\",\"rupak\"\n]");
})

test('formatJsonToString()', () => {
    instance.add(new JsonString(false,false,"Material: High Modulus Graphite"));
    instance.add(new JsonString(false,false,"Power Frame Series"));
    instance.formatJsonToString(appendable,-1);
    logger.info("actual->" + appendable.destination);
    var expectedList = "\n[\n\"Material: High Modulus Graphite\",\"Power Frame Series\"\n]";
    logger.info("expected->" + expectedList);
    expect(appendable.destination).toBe(expectedList);
    //expect(appendable.destination).toBe("\n[\n\t\"name\",\"rupak\"\n]");
})


afterEach(() => {
    // do nothing for this test cases.
});

