import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
} from 'react-native';

import CustomButton, { ButtonType } from './customButton';

export interface CardProps {
    onStartGame: (playerCount: string, points: string) => void;
}

export const EnterDetailsView = (props: CardProps) => {
    const [startButtonState, updateStartButtonState] = useState<ButtonType>("start");
    const [playersCount, updatePlayerCount] = useState("");
    const [points, updatePointsNumber] = useState("");

    const onInputPlayerChange = (value: string) => {
        updatePlayerCount(value);
    }
    const onInputPointsChange = (value: string) => {
        updatePointsNumber(value);
    }
    const onStartGame = () => {
        if (parseInt(playersCount) > 0 && parseInt(points) > 0) {
            props.onStartGame(playersCount, points);
        } else {
            Alert.alert("Please enter player count and points both")
        }
    }

    return (
        <>
            <View style={styles.buttonWrapper} testID={"button-wrapper"} accessible={false}>
                <Text style={[styles.title, { color: "black" }]}>{`Enter player Number`}</Text>
                <TextInput
                    placeholder="Enter number of players"
                    value={playersCount}
                    onChangeText={onInputPlayerChange}
                    style={styles.input}
                    keyboardType="number-pad"
                />

                <Text style={[styles.title, { color: "black" }]}>{`Enter Points to Accumulate`}</Text>
                <TextInput
                    placeholder="Enter points to accumulate"
                    value={points}
                    onChangeText={onInputPointsChange}
                    style={styles.input}
                    keyboardType="number-pad"
                />
                <CustomButton
                    testID="custom-start-button"
                    type={startButtonState}
                    onPress={onStartGame}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        margin: 10,
        justifyContent: "center"
    },
    inpuWrapper: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
    input: {
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        height: 40
    }
});

export default EnterDetailsView;
