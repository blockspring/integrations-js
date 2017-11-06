import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../src/containers/Root';
import createStore from '../../src/store/createStore';

function setup() {
  const store = createStore();
  const props = {
    store,
  };

  const enzymeWrapper = shallow(<Root {...props} />);

  return {
    props,
    enzymeWrapper,
    store,
  };
}

describe('Root', () => {
  it('should render provider with store', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('Provider').props().store).toEqual(enzymeWrapper.props().store);
  });
});
