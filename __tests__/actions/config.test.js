import {
  setConfig,
} from '../../src/actions/config';

test('test counter increment action with default count', () => {
  expect(setConfig({
    siteId: 'pk_a809f32f',
  })).toEqual({
    config: {
      siteId: 'pk_a809f32f',
    },
    type: 'set_config',
  });
});
