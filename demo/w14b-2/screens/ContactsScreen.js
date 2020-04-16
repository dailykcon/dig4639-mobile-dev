import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default class ContactsScreen extends React.Component {
  state = {contactsList:[]}

  componentDidMount() {
    fetch('http://plato.mrl.ai:8080/contacts', {
        headers: {
          "API":"connolly"
        }
    })
      .then(res => res.json())
      .then(body => {
        console.log(body)
        this.setState({contactsList:body.contacts})
      })
  }

  // Implement completing the task on the server
  completeTask(position, state) {
    fetch('http://plato.mrl.ai:8080/todo/setState', {
      method: "POST",
      headers: {
        "API":"connolly",
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({position:position, status:true})
    })
      .then(res => res.json())
      .then(body => {
        console.log(body)
        if(body.updated != undefined) {
          const currentList = [...this.state.contactsList]
          currentList[position].completed = state
          this.setState({contactsList: currentList})
        }
        // this.setState({contactsList:body.contacts})
      })
  } 

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Button title="Add Contact" onPress={() => this.props.navigation.navigate('Add')}/>
        {this.state.contactsList.map((item, index) =>
          <View key={index} style={styles.contactsView}>
           <CheckBox
            checked={item.completed}
            onPress={() => this.completeTask(index, !item.completed)}
          />
            <Text>{item.text} {item.completed ? "COMPLETED" : ""}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
    );
  }
}

ContactsScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  contactsView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  ContactsScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
