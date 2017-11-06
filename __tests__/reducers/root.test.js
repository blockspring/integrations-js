import createRootReducer from '../../src/reducers/root';

test('createRootReducer should be a function', () => {
  const rootReducer = createRootReducer();
  expect(typeof rootReducer).toBe('function');
});

test('createRootReducer return default state', () => {
  const rootReducer = createRootReducer();
  expect(rootReducer(undefined, {})).toMatchSnapshot();
});
