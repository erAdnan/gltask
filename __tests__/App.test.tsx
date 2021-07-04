/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

describe('renders correctly', () => {
  it("should have an ID and render a button and logo", () => {
    const wrapper = renderer.create(<App />);
    const wrapperInstance = wrapper.root;
    expect(wrapperInstance.find(ele => ele.props.testID === "image-logo")).toBe(true)
    expect(wrapperInstance.find(ele => ele.props.testID === "custom-button")).toBe(true)
});
});
