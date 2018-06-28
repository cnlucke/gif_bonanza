import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GifGrid from '../GifGrid';
import * as data from '../test-data/test-gif-data'

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Search component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
  const wrapper = shallow(<GifGrid {...props} />)
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
  const wrapper = setup({ list: [] })
  const appComponent = findByTestAttr(wrapper, 'component-gifgrid');
  expect(appComponent.length).toBe(1);
});
test('renders see favorites button', () => {
  const wrapper = setup({ list: [] })
  const seeFavoritesButton = findByTestAttr(wrapper, 'see-favorites-button');
  expect(seeFavoritesButton.length).toBe(1);
});
test('button contains correct text on initial render', () => {
  const wrapper = setup({ list: [] })
  const seeFavoritesButtonLink = findByTestAttr(wrapper, 'see-fave-button-text');
  expect(seeFavoritesButtonLink.props().children).toEqual('see favorites');
});
test('button contains correct text if showFavorites is false', () => {
  const wrapper = setup({ list: [], showFavorites: false })
  const seeFavoritesButtonLink = findByTestAttr(wrapper, 'see-fave-button-text');
  expect(seeFavoritesButtonLink.props().children).toEqual('see favorites');
});
test('button contains correct text if showFavorites is true', () => {
  // This test needs to be replaced with one that tests behavior and not implementation
  const wrapper = setup({ list: [], showFavorites: false })

  const seeFavoritesButton = findByTestAttr(wrapper, 'see-favorites-button');

  wrapper.setProps({ showFavorites: true }); // update prop and re-render

  // find inner link and view text
  const seeFavoritesButtonLink = findByTestAttr(wrapper, 'see-fave-button-text');
  expect(seeFavoritesButtonLink.props().children).toEqual('back to search results');
});
test('add message not rendered on initial load', () => {
  const wrapper = setup({ list: [], showFavoriteAdded: false })
  const addMessage = findByTestAttr(wrapper, 'add-message');
  expect(addMessage.length).toBe(0);
});
test('click gif message not rendered on initial load', () => {
  const wrapper = setup({ list: [], showFavoriteAdded: false })
  const clickGifMessage = findByTestAttr(wrapper, 'click-gif-message');
  expect(clickGifMessage.length).toBe(0);
});
test('add message rendered when showFavoriteAdded true', () => {
  const wrapper = setup({ list: [], showFavoriteAdded: true })
  const addMessage = findByTestAttr(wrapper, 'add-message');
  expect(addMessage.length).toBe(1);
});
test('click gif message rendered on non-empty list', () => {
  const wrapper = setup({ list: [data["GIF"]], showFavoriteAdded: false })
  const clickGifMessage = findByTestAttr(wrapper, 'click-gif-message');
  expect(clickGifMessage.length).toBe(1);
});
test('grid renders 1 gif image', () => {
  const wrapper = setup({ list: [data["GIF"]] })
  const renderedGifs = findByTestAttr(wrapper, 'gif');
  expect(renderedGifs.length).toBe(1);
});
test('grid renders 3 gif images', () => {
  const wrapper = setup({ list: [data["GIF"], data["GIF"], data["GIF"]] })
  const renderedGifs = findByTestAttr(wrapper, 'gif');
  expect(renderedGifs.length).toBe(3);
});
