import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

function HomeScreen({navigation, route}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => navigation.navigate('CreatePost')}
        style={styles.button}>
        <Text style={styles.text}>메모 작성</Text>
      </TouchableHighlight>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: 'coral',
    width: 80,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
