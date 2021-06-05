import  JsonString  from '../../src/json/JsonString.js';
import  JsonObject  from '../../src/json/JsonObject.js';

const instance = new JsonString(false,false,"{\"name\"=\"rupak\"}");


test('key test', () => {
    instance.key = true;
    expect(instance.key).toBe(true);
})

test('root test', () => {
    instance.root = true;
    expect(instance.root).toBe(true);
})



test('input', () => {
    expect(instance.input).toBe("{\"name\"=\"rupak\"}");
})

