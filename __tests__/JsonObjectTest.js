import  JsonString  from '../src/json/JsonString.js';

const instance = new JsonString(false,false,"{\"name\"=\"rupak\"}");

test('getInput()', () => {
    expect(instance.getInput()).toBe("{\"name\"=\"rupak\"}");
})

test('input', () => {
    expect(instance.input).toBe("{\"name\"=\"rupak\"}");
})
