import  JsonBoolean  from '../../src/json/JsonBoolean.js';

const instance = new JsonBoolean(false,false,true);

var appendable = {
    destination : false
}

test('input=true', () => {
    instance.input = true;
    expect(instance.input).toBe(true);
})

test('formatJsonToString(\'\', 0)::input=true', () => {
    instance.input = true;
    instance.formatJsonToString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe(true);
})

test('formatJsonToHtml(\'isKey=false\')::input=true', () => {
    instance.input = true;
    instance.key = false;
    instance.formatJsonToHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-boolean\">true</span>");
})

test('formatJsonToHtml(\'isKey=true\')::input=true', () => {
    instance.input = true;
    instance.key = true;
    instance.formatJsonToHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-boolean\">true</span>");
})

test('input=false', () => {
    instance.input = false;
    expect(instance.input).toBe(false);
})

test('formatJsonToString(\'\', 0)::input=true', () => {
    instance.input = false;
    instance.formatJsonToString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe(false);
})

test('formatJsonToHtml(\'isKey=false\')::input=true', () => {
    instance.input = false;
    instance.key = false;
    instance.formatJsonToHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-boolean\">false</span>");
})

test('toHtml(\'isKey=true\')::input=false', () => {
    instance.input = false;
    instance.key = true;
    instance.formatJsonToHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-boolean\">false</span>");
})
