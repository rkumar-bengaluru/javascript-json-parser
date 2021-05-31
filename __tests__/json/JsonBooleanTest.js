import  JsonBoolean  from '../../src/json/JsonBoolean.js';

const instance = new JsonBoolean(false,false,true);

var appendable = {
    destination : false
}

test('input=true', () => {
    instance.input = true;
    expect(instance.input).toBe(true);
})

test('toString(\'\', 0)::input=true', () => {
    instance.input = true;
    instance.toString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe(true);
})

test('toHtml(\'isKey=false\')::input=true', () => {
    instance.input = true;
    instance.key = false;
    instance.toHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-boolean\">true</span>");
})

test('toHtml(\'isKey=true\')::input=true', () => {
    instance.input = true;
    instance.key = true;
    instance.toHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-boolean\">true</span>");
})

test('input=false', () => {
    instance.input = false;
    expect(instance.input).toBe(false);
})

test('toString(\'\', 0)::input=true', () => {
    instance.input = false;
    instance.toString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe(false);
})

test('toHtml(\'isKey=false\')::input=true', () => {
    instance.input = false;
    instance.key = false;
    instance.toHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-boolean\">false</span>");
})

test('toHtml(\'isKey=true\')::input=false', () => {
    instance.input = false;
    instance.key = true;
    instance.toHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-boolean\">false</span>");
})
