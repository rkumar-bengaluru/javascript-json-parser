import  JsonString  from '../../src/json/JsonString.js';

const instance = new JsonString(false,false,"name");

var appendable = {
    destination : ""
}

test('input', () => {
    expect(instance.input).toBe("name");
})

test('formatJsonToString(\'\', 0)', () => {
    
    instance.formatJsonToString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("\"name\"");
})

test('formatJsonToString(\'\', 1)', () => {
    instance.isKey = true;
    instance.formatJsonToString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("\t\"name\"");
})

test('formatJsonToHtml(\'isKey=false\')', () => {
    instance.isKey = false;
    expect(instance.isKey).toBe(false);
    instance.formatJsonToHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-string\">\"name\"</span>");
})

test('formatJsonToHtml(\'isKey=true\')', () => {
    instance.isKey = true;
    instance.formatJsonToHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-key\">\"name\"</span>");
})
