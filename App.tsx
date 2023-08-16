/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import RoundScoreDisplay from './RoundScoreDisplay';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const [team1Name, setTeam1Name] = useState("Team 1")
  const [team2Name, setTeam2Name] = useState("Team 2")
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)
  const [roundScore1, setRoundScore1] = useState([])
  const [roundScore2, setRoundScore2] = useState([])

  const [updateTeam1Modal, setUpdateTeam1Modal] = useState(false)
  const [updateTeam2Modal, setUpdateTeam2Modal] = useState(false)

  const pointFor1 = () => setScore1(score1 + 1)
  const pointFor2 = () => setScore2(score2 + 1)

  const nextRound = () => {
    const previousScore1 : number[] = [...roundScore1]
    previousScore1.push(score1)
    setRoundScore1(previousScore1)
    setScore1(0)
    const previousScore2 : number[]= [...roundScore2]
    previousScore2.push(score2)
    setRoundScore2(previousScore2)
    setScore2(0)
  }

  const confirmNextRound = () => {
    Alert.alert("Confirmation",
      "Are you sure you want to score this round?", [
        { text: "No", onPress: () => {} },
        { text: "Yes", onPress: () => nextRound() }
      ]
    )
  }

  const reset = () => {
    setScore1(0)
    setScore2(0)
    setRoundScore1([])
    setRoundScore2([])
  }

  const confirmReset = () => {
    Alert.alert("Confirmation",
      "Are you sure you want reset the score?",[
        { text: "No", onPress: () => {} },
        { text: "Yes", onPress: () => reset() }
      ]
    )
  }

  return (
    <SafeAreaView style={styles.background}>
      <Button title="End Round" onPress={() => confirmNextRound()}/>
      <View style={styles.scoreTitles}>
        <TouchableOpacity onLongPress={() => {setUpdateTeam1Modal(true)}}>
          <Text style={styles.scoreTitle}>{team1Name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onLongPress={() => {setUpdateTeam2Modal(true)}}>
          <Text style={styles.scoreTitle}>{team2Name}</Text>
        </TouchableOpacity>
      </View>
      <TouchableHighlight onPress={pointFor1}>
        <View style={[styles.scoreBox, styles.scoreBox1]}>
          <Text style={styles.scoreDisplay}>{score1}</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={pointFor2}>
        <View style={[styles.scoreBox, styles.scoreBox2]}>
            <Text style={styles.scoreDisplay}>{score2}</Text>
        </View>
      </TouchableHighlight>
      <RoundScoreDisplay roundScore1={roundScore1} roundScore2={roundScore2}/>
      <View style={styles.resetButton}>
        <Button title="Reset" onPress={() => confirmReset()}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(220,220,220,1)"
  },
  scoreTitles: {
    width: "100%",
    position: "absolute",
    top: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  scoreTitle: {
    fontSize: 25,
    color: "black",
  },
  scoreDisplay: {
    fontSize: 60,
    fontWeight: "500",
    color: "black"
  },
  scoreBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreBox1: {
    position: "absolute",
    left: 0,
    top: 50,
    width: "50%",
    height: 150,
    backgroundColor: "green",
    zIndex: 100
  },
  scoreBox2: {
    position: "absolute",
    right: 0,
    top: 50,
    width: "50%",
    height: 150,
    backgroundColor: "red",
    zIndex: 100
  },
  resetButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  }
});

export default App;