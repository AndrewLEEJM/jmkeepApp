import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Platform,
  DeviceEventEmitter,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const key = 'state';

class NoteList extends React.Component<{}> {
  state = {
    memo: [],
  };

  async componentDidMount() {
    try {
      let memo = await AsyncStorage.getItem(key);
      if (memo) {
        memo = JSON.parse(memo);
        this.state.memo.push(...memo);
        this.setState(memo);
      }
    } catch (e) {
      console.log('error from AsyncStorage: ', e);
    }
  }

  UNSAFE_componentWillMount() {
    DeviceEventEmitter.addListener('update', (val) => {
      this.state.memo = [];
      this.state.memo.push(...val);
      this.setState(val);
    });
  }

  removeMemo(val) {
    const idx = this.state.memo.findIndex((n) => n.id === val.id);
    if (idx !== -1) {
      const memo = [
        ...this.state.memo.slice(0, idx),
        ...this.state.memo.slice(idx + 1),
      ];
      AsyncStorage.setItem(key, JSON.stringify(memo))
        .then(() => console.log('success!'))
        .catch((e) => console.log('e: ', e));

      this.setState({memo});
    }
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
                  <Text style={styles.memoTitle}>{memo.title}</Text>
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
    backgroundColor: 'coral',
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

export default NoteList;
