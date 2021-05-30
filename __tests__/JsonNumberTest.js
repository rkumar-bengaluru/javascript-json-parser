import  JsonNumber  from '../src/json/JsonNumber.js';

const instance = new JsonNumber(false,false,12);

var appendable = {
    destination : 0
}

test('input', () => {
    expect(instance.input).toBe(12);
})

test('toString(\'\', 0)', () => {
    
    instance.toString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe(12);
})

test('toHtml(\'isKey=false\')', () => {
    instance.key = false;
    instance.toHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-number\">12</span>");
})

test('toHtml(\'isKey=true\')', () => {
    instance.key = true;
    instance.toHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-number\">12</span>");
})
