import  JsonString  from '../../src/json/JsonString.js';

var logger = require('../../src/logger/logger');

var instance = new JsonString(false,false,"name");

var appendable = {
    destination : ""
}

test('input', () => {
    expect(instance.input).toBe("name");
})

test('cr test(\'\', 0)', () => {
    appendable.destination = '';
    var expected = "\"name\"";
    var crinstance = new JsonString(false,false,"\rname");
    crinstance.formatJsonToString(appendable,-1);
    logger.info("actual->" + appendable.destination);
    logger.info("expected->" + expected);
    expect(appendable.destination).toBe(expected);
})

test('formatJsonToString(\'\', 0)', () => {
    var expected = "\"name\"";
    instance.formatJsonToString(appendable,-1);
    logger.info("actual->" + appendable.destination);
    logger.info("expected->" + expected);
    expect(appendable.destination).toBe(expected);
})

test('formatJsonToString(\'\', 1)', () => {
    var expected = "\"name\"";
    instance.isKey = true;
    instance.formatJsonToString(appendable,-1);
    logger.info("actual->" + appendable.destination);
    logger.info("expected->" + expected);
    expect(appendable.destination).toBe(expected);
})

test('formatJsonToHtml(\'isKey=false\')', () => {
    instance.isKey = false;
    expect(instance.isKey).toBe(false);
    instance.formatJsonToHtml(appendable,-1);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-string\">\"name\"</span>");
})

test('formatJsonToHtml(\'isKey=true\')', () => {
    instance.isKey = true;
    instance.formatJsonToHtml(appendable,-1);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-key\">\"name\"</span>");
})
