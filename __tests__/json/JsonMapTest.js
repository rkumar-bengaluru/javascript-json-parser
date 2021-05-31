var logger = require('../../src/logger/logger');

import  JsonMap  from '../../src/json/JsonMap.js';
import  JsonString  from '../../src/json/JsonString.js';
import  JsonList  from '../../src/json/JsonList.js';

const instance = new JsonMap(true,false,new Map());

var appendable = {
    destination : ""
}

beforeEach(() => {
    appendable.destination = "";
    instance.input = new Map();
});

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

test('formatJsonToString()', () => {
    
    instance.put(new JsonString(false,true,"name"),new JsonString(false,false,"rupak"));
    instance.put(new JsonString(false,true,"age"),new JsonString(false,false,"43"));
    logger.info('calling map formatJsonToString()');
    instance.formatJsonToString(appendable,-1);
    logger.info(appendable.destination);
    expect(appendable.destination).toBe("\n{\n\t\"name\" : \"rupak\",\n\t\"age\" : \"43\"\n}");
})

test('formatJsonToString()->mapWithList', () => {
    var list = new JsonList(false,false,[]);
    list.add(new JsonString(false,false,"Material: High Modulus Graphite"));
    list.add(new JsonString(false,false,"Power Frame Series"));
    var listKey = new JsonString(false,true,"keyFeatures");

    instance.put(new JsonString(false,true,"productId"),new JsonString(false,false,"0ENJMZAXX2"));
    instance.put(new JsonString(false,true,"Title"),new JsonString(false,false,"APACS Finapi 262 Unstrung Badminton Racquet"));
    instance.put(listKey,list);
    logger.info('calling map formatJsonToString()');
    instance.formatJsonToString(appendable,-1);
    var expectedList = "\n\t[\n\"Material: High Modulus Graphite\",\"Power Frame Series\"\n\t]";
    var keyValues = "\n\t\"productId\" : \"0ENJMZAXX2\",\n\t\"Title\" : \"APACS Finapi 262 Unstrung Badminton Racquet\",\n\t";
    var expected = "\n{" + keyValues + "\"keyFeatures\"" + " : " + expectedList + "\n}"; 
    logger.info("actual->" + appendable.destination);
    logger.info("expected->" + expected);
    expect(appendable.destination).toBe(expected);
})


