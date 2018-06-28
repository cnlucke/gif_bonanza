import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Search from '../Search';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Search component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
  const wrapper = shallow(<Search {...props} />)
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}


test('renders without crashing', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-search');
  expect(appComponent.length).toBe(1);
});
test('renders search input field', () => {
  const wrapper = setup();
  const searchInput = findByTestAttr(wrapper, 'search-input');
  expect(searchInput.length).toBe(1);
});
test('renders search button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'search-button');
  expect(button.length).toBe(1);
});
test('entering value in input updates state', () => {
  const wrapper = setup();
  // Find search input field and enter value
  const searchInput = findByTestAttr(wrapper, 'search-input');
  searchInput.simulate('change', {target: {name: 'search', value: 'dogs'}})

  expect(wrapper.state('value')).toEqual('dogs');
});


// wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
