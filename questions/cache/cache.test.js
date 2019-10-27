const { cache } = require('./cache');

describe('Cache', () => {
  test('it should take a function and return a function', () => {
    expect(typeof cache(() => {}) === 'function').toBe(true);
  });

  test('it should throw if the passed in argument is not a function', () => {
    const stringCall = () => cache('not a function');
    const numberCall = () => cache(42);
    const arrCall = () => cache([]);

    expect(stringCall).toThrow('Input must be a function.');
    expect(numberCall).toThrow('Input must be a function.');
    expect(arrCall).toThrow('Input must be a function.');
  });

  test('the returned function should invoke the originally passed in function', () => {
    const adder = (a, b) => a + b;
    const mockAdd = jest.fn(adder);
    const cachedAdder = cache(mockAdd);

    cachedAdder();
    cachedAdder();
    cachedAdder();
    cachedAdder();

    expect(mockAdd.mock.calls.length).toBe(4);
  });

  test('the returned function should run the originally passed in function once. If the function is called with the same argument, then the original callback is not called.', () => {
    const adder = a => a + 42;
    const mockAdd = jest.fn(adder);
    const cachedAdder = cache(mockAdd);

    cachedAdder(12);
    cachedAdder(12);
    cachedAdder(12);
    cachedAdder(12);

    expect(mockAdd.mock.calls.length).toBe(1);
  });
});
