import React from 'react';
import { mount } from 'enzyme';
import App, { DumbApp } from '../../src/components/App';
import createStore from '../../src/store/createStore';

function plainSetup() {
  const props = {
    incrementCounterAsync: jest.fn(),
    decrementCounterAsync: jest.fn(),
    counter: 4,
  };

  const enzymeWrapper = mount(<DumbApp {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

function connectedSetup() {
  const store = createStore();
  const props = {
    store,
  };

  const enzymeWrapper = mount(<App {...props} />);

  return {
    props,
    enzymeWrapper,
    store,
  };
}

describe('App', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = plainSetup();

    expect(enzymeWrapper.find('div').length).toBe(0);
  });
});

describe('ConnectedApp', () => {
  it('should work with dispatch and state', () => {
    const { enzymeWrapper } = connectedSetup();

    expect(enzymeWrapper.find('div').length).toBe(0);
  });
});
