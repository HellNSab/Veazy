/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Text,
  View
} from 'react-native'

import './UserAgent.js'
import io from 'socket.io-client/dist/socket.io.js'

var { height, width } = Dimensions.get('window')

class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addRoomDialog : false,
      configIpDialog : false,
    }
  }

  componentWillUnmount(){
    if(this.socket){
      this.socket.close()
      Alert.alert('Connection closed')
    }
  }

  _onAboutPress(){
    Alert.alert('About DomotikApp', 'Just a cool app built by Léon and HallNSab to deal with annoying cold bedrooms and bathrooms')
  }

  _onAddRoom(){
    this.setState({addRoomDialog : true})
  }

  _onConfigIp(){
    this.setState({configIpDialog : true})
  }

  _onSaveIp(){
    this.setState({configIpDialog : false})
  }

  _newRoom(){
    this.setState({addRoomDialog : false})
  }
 
  render() {
    var root = this

    return (
      <View style={styles.container}>
        { !this.state.addRoomDialog && !this.state.configIpDialog ?
          <View style={styles.list}>
            <TouchableHighlight style={styles.button} onPress={this._onAboutPress}>
              <Text style={styles.text}>
                About
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this._onAddRoom.bind(this)}>
              <Text style={styles.text}>
                Add a room
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this._onConfigIp.bind(this)}>
              <Text style={styles.text}>
                Configure RaspberryPi IP address
              </Text>
            </TouchableHighlight>
          </View> : null
        }
        { this.state.addRoomDialog ?
          <View style={styles.dialog}>
            <Text style={{fontSize : 20, color : '#B3BFB8'}}>
              Complete the information about the room below :
            </Text>
            <TextInput
              style={{height: 40, alignSelf : 'center', width: width - 60}}
              placeholder="Room Name"
              onChangeText={(roomName) => this.setState({roomName})}
            />
            <TextInput
              style={{height: 40, alignSelf : 'center', width: width - 60}}
              placeholder="Day temperature"
              onChangeText={(dayTemp) => this.setState({dayTemp})}
            />
            <TextInput
              style={{height: 40, alignSelf : 'center', width: width - 60}}
              placeholder="Night temperature"
              onChangeText={(nightTemp) => this.setState({nightTemp})}
            />
            <TouchableHighlight style={styles.saveButton} onPress={this._newRoom.bind(this)}>
              <Text style={{fontSize : 30, color : '#B3BFB8'}}>
                ADD ROOM
              </Text>
            </TouchableHighlight>
          </View> : null
        }
        { this.state.configIpDialog ?
          <View style={styles.dialog}>
            <Text style={{fontSize : 20, color : '#B3BFB8'}}>
              Type in your new RaspberryPi IP address below :
            </Text>
            <TextInput
              style={{height: 40, alignSelf : 'center', width: width - 60}}
              placeholder="Type here to modify the address!"
              onChangeText={(ipAddress) => this.setState({ipAddress})}
            />
            <TouchableHighlight style={styles.saveButton} onPress={this._onSaveIp.bind(this)}>
              <Text style={{fontSize : 30, color : '#B3BFB8'}}>
                SAVE
              </Text>
            </TouchableHighlight>
          </View> : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBE9EE',
  },
  list: {
    flex : 1,
    flexDirection : 'column',
    alignItems : 'center',
    justifyContent : 'flex-start',
    margin : 5,
  },
  dialog:{
    flex : 1,
    flexDirection : 'column',
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
    margin : 20,
  },
  button: {
    width : width - 20,
    height : 40,
    margin : 5,
    backgroundColor: '#114B5F',
    alignItems : 'center',
    justifyContent : 'center',
  },
  saveButton: {
    width : width - 60,
    height : 40,
    margin : 10,
    backgroundColor: '#DBE9EE',
    alignItems : 'flex-end',
    justifyContent : 'flex-end',
  },
  text: {
    color : '#DBE9EE',
    fontSize : 20,
  },
})

export default Settings