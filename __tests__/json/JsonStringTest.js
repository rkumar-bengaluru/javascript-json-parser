import  JsonString  from '../../src/json/JsonString.js';

const instance = new JsonString(false,false,"name");

var appendable = {
    destination : ""
}

test('input', () => {
    expect(instance.input).toBe("name");
})

test('toString(\'\', 0)', () => {
    
    instance.toString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("\"name\"");
})

test('toString(\'\', 1)', () => {
    instance.isKey = true;
    instance.toString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("\t\"name\"");
})

test('toHtml(\'isKey=false\')', () => {
    instance.isKey = false;
    expect(instance.isKey).toBe(false);
    instance.toHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-string\">\"name\"</span>");
})

test('toHtml(\'isKey=true\')', () => {
    instance.isKey = true;
    instance.toHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-key\">\"name\"</span>");
})
