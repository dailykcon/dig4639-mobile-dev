import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

const HEADERS = {
  "method": "GET",
  "headers": {
    "API":"connolly",
    "Content-Type":"application/json",
    "Accept":"application/json" 
  }
}

export default function ContactsScreen(props) {
  const { promiseInProgress } = usePromiseTracker();
  const [contacts, setContacts] = React.useState([])
  const removeTask = React.useCallback(()=> console.log("Removed"), [])
  const addUser = React.useCallback(()=>
  {
    let newHeaders = {...HEADERS, 
      "method": "POST",
      body: JSON.stringify({
        name: "Spyro the Dragon",
        number: "Artisans Homeworld"
      })} 

    fetch('http://plato.mrl.ai:8080/contacts/add', newHeaders)
      .then(response => response.json())
      .then(body => console.log(body))
  }
  , [])

  React.useEffect(() => {
    console.log("Use effect")
    trackPromise(fetch('http://plato.mrl.ai:8080/contacts', HEADERS)
      .then(response => response.json())
      .then(body => setContacts(body.contacts)))
    }, [])
  return (
    <View style={styles.container}>
      <ScrollView>
    <Button title="Add Contact" onPress={() => props.navigation.navigate('Add')} />
      {/*  <Button title="Add User" onPress={(addUser)} /> */}
        { promiseInProgress ?
        <ActivityIndicator />
        :
          contacts.map((contact, i) => 
          <Card key={i} title={contact.name}>
            <Button title="x" onPress={() => this.removeTask(index)}/>
          </Card>
          )
        }
      </ScrollView>
    </View>
  );
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
  contactsScreenFilename: {
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
