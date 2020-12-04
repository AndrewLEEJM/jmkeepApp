import * as React from 'react';
import {Text, TextInput, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NoteList from './note/NoteList';
import AddNote from './note/AddNote';

const options = {
  headerStyle: {
    backgroundColor: 'coral',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
const options2 = {
  title: '',
  headerStyle: {
    backgroundColor: 'coral',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="JMKeepApp">
        <Stack.Screen name="JMKeepApp" component={NoteList} options={options} />
        <Stack.Screen
          name="CreatePost"
          component={AddNote}
          options={options2}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
