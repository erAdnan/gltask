import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

/* eslint-disable */
const images = [
    require('../assets/dice_1.png'),
    require('../assets/dice_2.png'),
    require('../assets/dice_3.png'),
    require('../assets/dice_4.png'),
    require('../assets/dice_5.png'),
    require('../assets/dice_6.png')
];
export interface Props {
    imageIndex: number;
}

const Dice = (props: Props) => {
    const [bounceValue] = useState(new Animated.Value(0))

    useEffect(() => {
        bounceValue.setValue(0.2);

        Animated.spring(bounceValue, {
            toValue: 1,
            friction: 3,
            tension: 80,
            useNativeDriver: true
        }).start();
    }, [])
 

    const style = [
        styles.dicePlaceholder,
        { transform: [{ scale: bounceValue }] },
    ];

    return (
        <Animated.Image source={images[props.imageIndex]} style={style} testID="dice-image"/>
    );
}

const styles = {
  dicePlaceholder: {
    height: 36,
    width: 36,
    margin: 4,
    borderRadius: 1,
    backgroundColor: "black",
},
}

export default Dice;
