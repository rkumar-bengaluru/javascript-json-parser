import  JsonMap  from '../../src/json/JsonMap.js';

const instance = new JsonMap(true,false,[]);

var appendable = {
    destination : ""
}

test('input', () => {
    expect(instance.input.length).toBe(0);
})
