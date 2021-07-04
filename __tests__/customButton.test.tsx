import 'react-native';
import React from 'react';
import { CustomButton, ButtonProps } from '../src/components/customButton';

import renderer from 'react-test-renderer';

describe('renders correctly', () => {

    it("activate state: should have an ID and render a button and logo", () => {
        const props: ButtonProps = {
            onPress: jest.fn(),
            testID: "custom-button",
            type: "start",
        };
        const wrapper = renderer.create(<CustomButton {...props} />);
        const wrapperInstance = wrapper.root;

        const buttonLeftText = wrapperInstance.findByProps(({ testID }: ButtonProps) => testID === "button-title");
        expect(buttonLeftText.children).toBe("Start Game");
    });

    it("waiting state: should have an ID and render a button and logo", () => {
        const props: ButtonProps = {
            onPress: jest.fn(),
            testID: "custom-button",
            type: "waiting",
        };
        const wrapper = renderer.create(<CustomButton {...props} />);
        const wrapperInstance = wrapper.root;

        const buttonLeftText = wrapperInstance.findByProps(({ testID }: ButtonProps) => testID === "button-title");
        expect(buttonLeftText.children).toBe("Waiting...");
    });

    it("activated state: should have an ID and render a button and logo", () => {
        const props: ButtonProps = {
            onPress: jest.fn(),
            testID: "custom-button",
            type: "start",
        };
        const wrapper = renderer.create(<CustomButton {...props} />);
        const wrapperInstance = wrapper.root;

        const buttonLeftText = wrapperInstance.findByProps(({ testID }: ButtonProps) => testID === "button-title");
        expect(buttonLeftText.children).toBe("Start Game");
    });
});