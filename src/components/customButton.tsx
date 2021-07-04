
import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

export type ButtonType = "start" | "waiting";
export interface ButtonProps {
    testID: string;
    type?: ButtonType;
    onPress: () => void;
}

const getBGColor = {
    start: '#2196F3',
    waiting: "yellow"
}

const getLabel = {
    start: 'Start Game',
    waiting: "Waiting..."
}

export const CustomButton: React.FC<ButtonProps> = ({
    onPress,
    testID,
    type = "start",
}) => {

    return (
        <TouchableOpacity
            testID={testID}
            accessibilityRole={"button"}
            style={[styles.touchableWrapper, { backgroundColor: getBGColor[type] }]}
            onPress={onPress}
            disabled={type === 'waiting'}
        >
            <View
                style={styles.buttonView}
            >
                <>
                    {
                        type === 'waiting' && (<ActivityIndicator style={styles.btnIcon} color={"white"} />)
                    }
                </>
                <Text style={[styles.text]} testID={"button-title"}>
                    {getLabel[type]}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableWrapper: {
        elevation: 4,
        backgroundColor: "#2196F3",
        borderRadius: 20,
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    btnIcon: {
        height: 20,
        width: 20
    },
    text: {
        textAlign: "center",
        padding: 5,
        color: "white",
        fontWeight: "500"
    },
});

export default CustomButton;