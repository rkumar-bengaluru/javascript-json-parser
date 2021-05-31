import  JsonNull  from '../../src/json/JsonNull.js';

const instance = new JsonNull(false,false,null);

var appendable = {
    destination : null
}

test('input=true', () => {
    expect(instance.input).toBe(null);
})

test('toString(\'\', 0)::null', () => {
    instance.toString(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe(null);
})

test('toHtml(\'isKey=false\')::null', () => {
    instance.key = false;
    instance.toHtml(appendable,0);
    //console.log('destination->' + appendable.destination);
    expect(appendable.destination).toBe("<span class=\"type-null\">null</span>");
})
