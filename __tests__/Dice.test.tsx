import 'react-native';
import React from 'react';
import Dice from '../src/components/Dice';

import renderer from 'react-test-renderer';

describe('renders correctly', () => {
    it("should have an ID and render a button and logo", () => {
        const props = {
            imageIndex: 1
        }
        const wrapper = renderer.create(<Dice {...props} />);
        const wrapperInstance = wrapper.root;
        expect(wrapperInstance.find(ele => ele.props.testID === "dice-image")).toBe(true)
    });
});
