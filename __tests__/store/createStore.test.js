import createStore from '../../src/store/createStore';

describe('store', () => {
  const store = createStore();

  test('should be an object', () => {
    expect(typeof store).toBe('object');
  });

  test('should be a proper store', () => {
    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');
  });

  test('should have proper default state', () => {
    expect(store.getState()).toMatchSnapshot();
  });
});
