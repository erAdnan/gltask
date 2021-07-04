import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import RNShake from 'react-native-shake';

import EnterDetailsView from "./src/components/EnterDetailView";
import { generatePlayers, getRandomColor, getRandomPlayerIndex, PlayerTypes } from './src/utils';
import Dice from './src/components/Dice';

const DICE_MIN_COUNT = 1;
const DICE_MAX_COUNT = 6;

const App: React.FC = () => {
  const [players, updatePlayers] = useState<PlayerTypes[]>([]);
  const [maxPoints, updatePoints] = useState("0");
  const [currentPlayerIndex, updateCurrentPlayerIndex] = useState<number>(0);
  const [diceIndex, updateDiceIndex] = useState<number>(-1);

  useEffect(() => {

    RNShake.addListener(() => {
      onDeviceShake();
    });

    return () => RNShake.removeAllListeners();

  }, []);

  const onDeviceShake = () => {
    if (players.length > 0) {
      const playersList = [...players];
      //first update current player data and then turn
      const diceScore = getRandomPlayerIndex(DICE_MAX_COUNT, DICE_MIN_COUNT);
      updateDiceIndex(diceScore);
      //Alert.alert("Dice Score: " + diceScore)
      if (playersList[currentPlayerIndex].previousDiceScore === 1 && diceScore === 1) {
        Alert.alert("You have to skip next turn as you got 1 twice. ")
        playersList[currentPlayerIndex].hasToSkip = true;
      } else {
        playersList[currentPlayerIndex].previousDiceScore = diceScore;
        playersList[currentPlayerIndex].hasToSkip = false;
      }
      playersList[currentPlayerIndex].currentScore = playersList[currentPlayerIndex].currentScore + diceScore;

      if (diceScore !== 6) {
        //wait for 3 seconds and update next turn if its not six
        setTimeout(() => {
          //get nextindex for the next turn
          updateCurrentPlayerIndex(currentPlayerIndex < players.length ? currentPlayerIndex + 1 : 0);
        }, 1000)
      }
    }
  }
  //will be called on every dice
  useEffect(() => {
    const playersList = [...players];
    for (let i = 0; i < playersList.length; i++) {
      if (i === currentPlayerIndex) {
        playersList[currentPlayerIndex].hisTurn = true;
      } else {
        playersList[i].hisTurn = false;
      }
    }
    updatePlayers(playersList);
  }, [currentPlayerIndex]);

  const onStartGame = (playerCount: string, points: string) => {
    updatePoints(points);

    const playersList = generatePlayers(playerCount);
    const randomIndex: number = getRandomPlayerIndex(parseInt(playerCount));
    updateCurrentPlayerIndex(randomIndex);
    playersList[randomIndex].hisTurn = true;
    updatePlayers(playersList);
  }

  const _renderItem = ({ item }: { item: { name: string, currentScore: number, hisTurn: boolean } }) => (
    <View style={[styles.item, { backgroundColor: getRandomColor(), }]}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Score: {item.currentScore}</Text>
      <Text style={styles.subtitle}>Your Turn: {item.hisTurn ? "Shake the device" : "Wait for your turn!!"}</Text>
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.safearea} testID={"safe-view-wrapper"} accessible={false}>
        <View style={styles.body}>
          {players.length > 0 ? (
            <View style={{ flex: 1 }} testID="player-list-container">
              <View style={{ width: "100%", padding: 5, alignItems: "center" }}>
                {diceIndex !== -1 && <Dice imageIndex={diceIndex} />}
              </View>
              <FlatList
                data={players}
                renderItem={_renderItem}
                ListHeaderComponent={() => (
                  <View style={styles.listHeader}>
                    <Text style={[styles.title, { flex: 1, color: "black" }]}>{`Players`}</Text>
                    <Text style={[styles.title, { color: "black" }]}>{`Points ${maxPoints}`}</Text>
                  </View>)}
                keyExtractor={(item) => item.name}
              />
            </View>
          ) : (
            <EnterDetailsView onStartGame={onStartGame} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonWrapper: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  item: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  subtitle: {
    fontSize: 16,
    color: "white"
  },
  listHeader: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20
  },
});

export default App;
