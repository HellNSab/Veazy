/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Slider,
  Image,
  ScrollView
} from 'react-native'

var { height, width } = Dimensions.get('window')

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      patientListPage: true,
      patientScoresPage: false,
      patientScorePage: false,
      currentPatientIndex: 0,
      currentScoreIndex: 0,
      patients: [
        {
          name: 'Jules Cottin', 
          scores: [
            {name: 'douleur', value: 9, maxValue: 10},
            {name: 'cognitif', value: 8, maxValue: 10},
            {name: 'autonomie', value: 8, maxValue: 10}
          ]
        },
        {
          name: 'Marion Creuset', 
          scores: [
            {name: 'douleur', value: 8, maxValue: 10},
            {name: 'cognitif', value: 4, maxValue: 10},
            {name: 'autonomie', value: 7, maxValue: 10}
          ]
        },
        {
          name: 'Loqman Dahhali', 
          scores: [
            {name: 'douleur', value: 9, maxValue: 10},
            {name: 'cognitif', value: 8, maxValue: 10},
            {name: 'autonomie', value: 8, maxValue: 10}
          ]
        },
        {
          name: 'Aurelie Douchet', 
          scores: [
            {name: 'douleur', value: 8, maxValue: 10},
            {name: 'cognitif', value: 4, maxValue: 10},
            {name: 'autonomie', value: 7, maxValue: 10}
          ]
        },
        {
          name: 'Juan Lopez', 
          scores: [
            {name: 'douleur', value: 9, maxValue: 10},
            {name: 'cognitif', value: 8, maxValue: 10},
            {name: 'autonomie', value: 8, maxValue: 10}
          ]
        },
        {
          name: 'Martin Maille', 
          scores: [
            {name: 'douleur', value: 8, maxValue: 10},
            {name: 'cognitif', value: 4, maxValue: 10},
            {name: 'autonomie', value: 7, maxValue: 10}
          ]
        },
        {
          name: 'Fatou Mamo', 
          scores: [
            {name: 'douleur', value: 9, maxValue: 10},
            {name: 'cognitif', value: 8, maxValue: 10},
            {name: 'autonomie', value: 8, maxValue: 10}
          ]
        },
        {
          name: 'Edmund Muller', 
          scores: [
            {name: 'douleur', value: 8, maxValue: 10},
            {name: 'cognitif', value: 4, maxValue: 10},
            {name: 'autonomie', value: 7, maxValue: 10}
          ]
        }
      ]
    }
    this.showScores = this.showScores.bind(this)
    this.showScore = this.showScore.bind(this)
    this.updateScoreValue = this.updateScoreValue.bind(this)
    this.naviguateBack = this.naviguateBack.bind(this)
  }

  showScores = (patientIndex) => {
    this.setState({patientListPage: false})
    this.setState({patientScoresPage: true})
    this.setState({currentPatientIndex: patientIndex})
  }

  showScore = (scoreIndex) => {
    this.setState({patientScoresPage: false})
    this.setState({patientScorePage: true})
    this.setState({currentScoreIndex: scoreIndex})
  }

  updateScoreValue = (newValue) => {
    let newPatientList = this.state.patients
    newPatientList[this.state.currentPatientIndex].scores[this.state.currentScoreIndex].value = newValue
    this.setState({patients: newPatientList})
  }

  naviguateBack = () => {
    if (this.state.patientScoresPage) {
      this.setState({patientScoresPage: false})
      this.setState({patientListPage: true})
    } else if (this.state.patientScorePage) {
      this.setState({patientScorePage: false})
      this.setState({patientScoresPage: true})
    }
  }

  scorePage = () => {
    let scoreStatLink = './assets/' + this.state.patients[this.state.currentPatientIndex].scores[this.state.currentScoreIndex].name + '.png'
    return (
      <View>
        <Text style={styles.scoretitle}>{this.state.patients[this.state.currentPatientIndex].scores[this.state.currentScoreIndex].name}</Text>
        <Slider 
          style={styles.slider}
          maximumValue={this.state.patients[this.state.currentPatientIndex].scores[this.state.currentScoreIndex].maxValue}
          onSlidingComplete={this.updateScoreValue}
          value={this.state.patients[this.state.currentPatientIndex].scores[this.state.currentScoreIndex].value}/>
        <Text style={styles.text}>{this.state.patients[this.state.currentPatientIndex].scores[this.state.currentScoreIndex].value}/{this.state.patients[this.state.currentPatientIndex].scores[this.state.currentScoreIndex].maxValue}</Text>
        <TouchableHighlight onPress={this.naviguateBack}>
          <Text style={styles.submitbutton}>Envoyer</Text>
        </TouchableHighlight>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={{uri: './assets/' + this.state.patients[this.state.currentPatientIndex].scores[this.state.currentScoreIndex].name + '.png'}}/>
      </View>
    );
  }

  render() {

    let patientList = this.state.patients.map((patient, index) => {
      return (
        <TouchableHighlight onPress={this.showScores.bind(this, index)} key={patient.name} style={styles.button}><Text style={styles.text}>{patient.name}</Text></TouchableHighlight>
      )}
    )

    let patientScoresList = this.state.patients[this.state.currentPatientIndex].scores.map((score, index) => {
      return (
        <TouchableHighlight onPress={this.showScore.bind(this, index)} key={score.name}>
          <View>
            <Text style={styles.text}>{score.name}</Text>
            <View style={styles.scorebarcontainer}>
              <View style={{ height: 20, backgroundColor: 'blue', width: score.value * 30}}></View>
            </View>
          </View>
        </TouchableHighlight>
      )
    })

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {!this.state.patientListPage ? 
            <TouchableHighlight onPress={this.naviguateBack}>
              <Text style={styles.text}>
                &lt; {this.state.patients[this.state.currentPatientIndex].name}
              </Text>
            </TouchableHighlight> : null}
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require('./assets/logo.png')}/>
        </View>
        <View style={styles.content}>
          {this.state.patientListPage ? <ScrollView>{patientList}</ScrollView> : null}
          {this.state.patientScoresPage ? <View>{patientScoresList}</View> : null}
          {this.state.patientScorePage ? <View>{this.scorePage()}</View> : null}
        </View>
        <Text style={styles.footer}>Veazy group</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F2F9',
    width: width,
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#E8F2F9',
    width: width,
  },
  logo: {
    margin: 20,
    width: 100,
    height: 50,
  },
  content: {
    flex: 9,
    marginBottom: 5,
    width: width,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    margin: 5,
    color: '#0F3B5F',
  },
  button: {
    padding: 5,
    margin: 5,
  },
  scorebarcontainer: {
    margin: 10,
    height: 20,
    borderWidth: 0.5,
    borderColor: 'grey',
    width: 300,
  },
  slider: {
    margin: 20,
  },
  scoretitle: {
    color: '#0F3B5F',
    fontSize: 30,
    margin: 5,
  },
  submitbutton: {
    color: '#0F3B5F',
    fontSize: 25,
    margin: 20,
    alignSelf: 'flex-end',
  },
  footer: {
    color: '#0F3B5F',
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
  },
})
