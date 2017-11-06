import {
  setConfig,
} from '../../src/actions/config';

import configReducer from '../../src/reducers/config';

test('configReducer default', () => {
  expect(configReducer(undefined, {})).toMatchSnapshot();
});

test('configReducer data', () => {
  expect(configReducer(undefined, setConfig({ siteId: 'pk_efh893f' }))).toMatchSnapshot();
});
