import React, {Component} from 'react';
import {
  DeviceEventEmitter,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import 'react-native-get-random-values';
import {v4 as uuidV4} from 'uuid';

import AsyncStorage from '@react-native-async-storage/async-storage';
const key = 'state';

class AddNote extends Component {
  state = {
    title: '',
    content: '',
    id: '',
  };

  componentDidMount() {
    const {route} = this.props;
    if (route.params) {
      this.setState({
        title: route.params.memo.title,
        content: route.params.memo.content,
        id: route.params.memo.id,
      });
    }
  }

  async componentWillUnmount() {
    let total = [];
    try {
      let memo = await AsyncStorage.getItem(key);
      if (memo) {
        memo = JSON.parse(memo);
        total.push(...memo);
      }
    } catch (e) {
      console.log('error from AsyncStorage: ', e);
    }
    if (this.state.id) {
      const idx = total.findIndex((n) => n.id === this.state.id);
      if (idx !== -1) {
        total[idx] = this.state;
        AsyncStorage.setItem(key, JSON.stringify(total))
          .then(() => console.log('success!'))
          .catch((e) => console.log('e: ', e));
        DeviceEventEmitter.emit('update', total);
      }
    } else if (this.state.title) {
      this.state.id = uuidV4();
      const memo = this.state;
      total.push(memo);
      AsyncStorage.setItem(key, JSON.stringify(total))
        .then(() => console.log('success!'))
        .catch((e) => console.log('e: ', e));
      DeviceEventEmitter.emit('update', total);
    }
  }

  inputTitle = (val) => {
    this.setState({
      title: val,
    });
  };
  inputContent = (val) => {
    console.log(this.state);
    this.setState({
      content: val,
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView keyboardShouldPersistTaps="always">
          <TextInput
            placeholder="제목"
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey',
            }}
            value={this.state.title}
            onChangeText={(val) => this.inputTitle(val)}
          />
          <TextInput
            multiline
            style={{padding: 10}}
            value={this.state.content}
            onChangeText={(val) => this.inputContent(val)}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 3,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddNote;
