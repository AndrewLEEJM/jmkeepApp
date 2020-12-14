import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NoteList from './note/NoteList';
import AddNote from './note/AddNote';
import rootReducer from './redux/NoteReducer';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

const options = {
  headerStyle: {
    backgroundColor: '#e8b0c1',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
const options2 = {
  title: '',
  headerStyle: {
    backgroundColor: '#e8b0c1',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const store = createStore(rootReducer);
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator mode="JMKeepApp">
          <Stack.Screen
            name="JMKeepApp"
            component={NoteList}
            options={options}
          />
          <Stack.Screen
            name="CreatePost"
            component={AddNote}
            options={options2}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
