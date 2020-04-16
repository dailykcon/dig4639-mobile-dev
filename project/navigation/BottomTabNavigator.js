import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ContactsScreen from '../screens/ContactsScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Contacts';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          title: 'Contact List',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-contacts" />,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={AddScreen}
        options={{
          title: 'Add Contact',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-add" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'View Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Contacts':
      return 'Contact List';
    case 'Add':
      return 'Add Contact';
    case 'Profile':
      return 'View Profile';
  }
}
