import  JsonObject  from '../src/json/JsonObject.js';

const instance = new JsonObject(false,false,"{\"name\"=\"rupak\"}");

test('getInput()', () => {
    expect(instance.getInput()).toBe("{\"name\"=\"rupak\"}");
})

test('input', () => {
    expect(instance.input).toBe("{\"name\"=\"rupak\"}");
})
