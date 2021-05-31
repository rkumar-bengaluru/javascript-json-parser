import  JsonNumber  from '../../src/json/JsonNumber.js';

const instance = new JsonNumber(false,false,12);

var appendable = {
    destination : 0
}

test('input', () => {
    expect(instance.input).toBe(12);
})

test('formatJsonToString(\'\', 0)', () => {
    
    instance.formatJsonToString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe(12);
})

test('formatJsonToHtml(\'isKey=false\')', () => {
    instance.key = false;
    instance.formatJsonToHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-number\">12</span>");
})

test('formatJsonToHtml(\'isKey=true\')', () => {
    instance.key = true;
    instance.formatJsonToHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-number\">12</span>");
})
