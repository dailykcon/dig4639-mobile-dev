import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Input, Button } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-elements';

var radio_props = [
  {label: '1', value: 0 },
  {label: '2', value: 1 },
  {label: '3', value: 3}
];

export default class AddScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      submitDisabled:true,
      taskText: "",
      taskPriority:0
    }
  }

  handleTextInput(text) {
    if(text.length > 0) {
      this.setState(
        {
          submitDisabled:false,
          taskText:text
      })
    } else {
      this.setState({submitDisabled:true})
      console.log(text)
    }
  }
  handleCreateTask() {
    console.log("Added!")
    console.log(this.state.taskText)
  }

  handlePriorityInput(text) {

  }
  render() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Input placeholder="Final Project for DIG4639"
        onChangeText={text => this.handleTextInput(text)} />

        <Button title="Add Contact"
          disabled={this.state.submitDisabled}
          onPress={() => this.handleCreateTask()}/>
    </ScrollView>
  );
}
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

