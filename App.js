/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

var { height, width } = Dimensions.get('window')

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      patientListPage : true,
      patientPage : false,
      scorePage: false,
      patient: {},
      patients: [
        {
          name: 'Marine Anna',
          scores: [
            {name: 'cognitif', score: 14, max_score: 30, displayName: 'COGNITIF - MMSE'},
            {name: 'autonomie', score: 20, max_score: 32, displayName: 'AUTONOMIE - KATZ'},
            {name: 'douleur', score: 9, max_score: 10, displayName: 'DOULEUR - EVA'}
          ]
        },
        {
          name: 'Yves Bonnet',
          scores: [
            {name: 'cognitif', score: 14, max_score: 30, displayName: 'COGNITIF - MMSE'},
            {name: 'autonomie', score: 20, max_score: 32, displayName: 'AUTONOMIE - KATZ'},
            {name: 'douleur', score: 9, max_score: 10, displayName: 'DOULEUR - EVA'}
          ]
        },
        {
          name: 'Daniel Boulanger',
          scores: [
            {name: 'cognitif', score: 14, max_score: 30, displayName: 'COGNITIF - MMSE'},
            {name: 'autonomie', score: 20, max_score: 32, displayName: 'AUTONOMIE - KATZ'},
            {name: 'douleur', score: 9, max_score: 10, displayName: 'DOULEUR - EVA'}
          ]
        },
        {
          name: 'Odette Dubois',
          scores: [
            {name: 'cognitif', score: 14, max_score: 30, displayName: 'COGNITIF - MMSE'},
            {name: 'autonomie', score: 20, max_score: 32, displayName: 'AUTONOMIE - KATZ'},
            {name: 'douleur', score: 9, max_score: 10, displayName: 'DOULEUR - EVA'}
          ]
        },
        {
          name: 'Benoit Dupuis',
          scores: [
            {name: 'cognitif', score: 14, max_score: 30, displayName: 'COGNITIF - MMSE'},
            {name: 'autonomie', score: 20, max_score: 32, displayName: 'AUTONOMIE - KATZ'},
            {name: 'douleur', score: 9, max_score: 10, displayName: 'DOULEUR - EVA'}
          ]
        }
      ],
      patientScore : {}
    }
  }

  backNavigation(){
    // todo
  }

  showPatient(patient){
    this.state.patientListPage = false
    this.state.patientPage = true
    this.state.patient = patient
  }

  showScore(score){
    this.state.patientPage = false
    this.scorePage = true
    this.patientScore = score
  }

  modifyScore(scoreString){
    let score = parseInt(scoreString)
    this.patientScore.score = score
    let scoreIndex = this.patient.scores.findIndex(score => score.name === this.patientScore.name)
    this.patientScore.scores[scoreIndex].score = score
    let patientIndex = this.patients.findIndex(patient => patient.name === this.patient.name)
    this.patients[patientIndex].scores[scoreIndex].score = score
  }

  modifyAutonomyScore(scoreString){
    let score = parseInt(scoreString)
    let realScore = 32 - score
    this.modifyScore(realScore)
  }

  saveScore(){
    this.state.scorePage = false
    this.patientPage = true
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <TouchableHighlight onPress={this.backNavigation()}>
            <Image
              source={require('./assets/back-icon.png')}
            />
            <Text style={{fontSize: 15, color:'#DBE9EE'}}>
              {this.state.patient}
            </Text>
          </TouchableHighlight>
          <Text style={{fontSize: 25, color:'#DBE9EE'}}>
            Veazy
          </Text>
        </View>
        <View style={styles.page}>
          {this.state.patientListPage ? 
          <ListView
              dataSource={this.state.patients}
              renderRow={(patient) => 
              <TouchableHighlight onPress={this.showPatient(patient)}>
                <Text>
                  {patient.name}
                </Text>
              </TouchableHighlight>}
            /> : null}
          {this.state.patientPage ?
          <ListView
              dataSource={this.state.patient.scores}
              renderRow={(score) => 
              <TouchableHighlight onPress={this.showScore(score)}>
                <Text>
                  {score.name}
                </Text>
                <View>
                  <View></View>
                </View>
              </TouchableHighlight>
            }
            /> : null}
          {this.state.scorePage ? <View>
            <Text>{this.patientScore.name}</Text>
            {this.state.patientScore.name === 'cognitif' ?
              <Picker
                selectedValue={this.state.patientScore.score}
                onValueChange={(newScore, itemIndex) => this.modifyScore(itemValue)}>
                <Picker.Item label="30" value="30" />
                <Picker.Item label="29" value="29" />
                <Picker.Item label="28" value="28" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="26" value="26" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="23" value="23" />
                <Picker.Item label="22" value="22" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="19" value="19" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="17" value="17" />
                <Picker.Item label="16" value="16" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="14" value="14" />
                <Picker.Item label="13" value="13" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="0" value="0" />
              </Picker> : null 
            }
            {this.state.patientScore.name === 'douleur' ?
              <Picker
                selectedValue={this.state.patientScore.score}
                onValueChange={(newScore, itemIndex) => this.modifyScore(itemValue)}>
                <Picker.Item label="10" value="10" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="0" value="0" />
              </Picker> : null 
            }
            {this.state.patientScore.name === 'autonomie' ?
              <Picker
                selectedValue={this.state.patientScore.score}
                onValueChange={(newScore, itemIndex) => this.modifyAutonomyScore(itemValue)}>
                <Picker.Item label="32" value="32" />
                <Picker.Item label="31" value="31" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="29" value="29" />
                <Picker.Item label="28" value="28" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="26" value="26" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="23" value="23" />
                <Picker.Item label="22" value="22" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="19" value="19" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="17" value="17" />
                <Picker.Item label="16" value="16" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="14" value="14" />
                <Picker.Item label="13" value="13" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="0" value="0" />
              </Picker> : null 
            }
            <TouchableHighlight onPress={this.saveScore()}>
              <Text>ENREGISTRER</Text>
            </TouchableHighlight>
          </View> : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#DBE9EE',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#4F6D7A',
    width: width,
  },
  page: {
    flex: 9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#DBE9EE',
    width: width,
  }
});
