import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Platform,
  DeviceEventEmitter,
} from 'react-native';

import axios from 'axios';

export default class NoteList extends React.Component<{}> {
  state = {
    memo: [],
  };

  componentDidMount() {
    this.init();
  }

  UNSAFE_componentWillMount() {
    DeviceEventEmitter.addListener('update', () => {
      this.init();
    });
  }

  async init() {
    try {
      const result = await axios.get('http://172.30.1.9:3030/get/memo');
      this.setState({memo: result.data.memo});
    } catch (e) {
      console.log(e);
    }
  }

  async removeMemo(memo) {
    try {
      await axios.delete(`http://172.30.1.9:3030/remove/memo/:${memo._id}`);
    } catch (e) {
      console.log(e);
    }
    const remove = this.state.memo.filter((n) => n._id !== memo._id);
    this.setState({memo: remove});
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView keyboardShouldPersistTaps="always" style={{width: '100%'}}>
          <TouchableHighlight
            underlayColor="#f2f2f2"
            onPress={() => navigation.navigate('CreatePost')}
            style={styles.button}>
            <Text style={styles.text}>새 메모 작성</Text>
          </TouchableHighlight>
          {this.state.memo.map((memo, index) => (
            <View style={styles.memoContainer} key={index}>
              <TouchableHighlight
                style={{flex: 15}}
                underlayColor="#f2f2f2"
                onPress={() => navigation.navigate('CreatePost', {memo})}>
                <View>
                  <Text style={styles.memoTitle}>
                    {memo.title.length > 15
                      ? memo.title.substring(0, 15) + '...'
                      : memo.title}
                  </Text>
                  <Text style={styles.memoContent} numberOfLines={1}>
                    {memo.content.length > 30
                      ? memo.content.substring(0, 30)
                      : memo.content}
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.deleteButton}
                onPress={() => this.removeMemo(memo)}>
                <Text>―</Text>
              </TouchableHighlight>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  memoContainer: {
    width: '94%',
    height: 80,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: '#e8b0c1',
    width: 90,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  memoTitle: {
    fontSize: 20,
    margin: 10,
    ...Platform.select({
      ios: {
        fontFamily: 'American Typewriter',
      },
      android: {
        fontFamily: 'monospace',
      },
    }),
  },
  memoContent: {
    marginLeft: 10,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#CE3000',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
  },
});
