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
} from 'react-native';
import {removeMemo} from '../redux/Action';
import {connect} from 'react-redux';

class NoteList extends React.Component<{}> {
  removeMemo = (memo) => {
    this.props.dispatchRemoveMemo(memo);
  };

  render() {
    const {navigation, memo} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView keyboardShouldPersistTaps="always" style={{width: '100%'}}>
          <TouchableHighlight
            underlayColor="#f2f2f2"
            onPress={() => navigation.navigate('CreatePost')}
            style={styles.button}>
            <Text style={styles.text}>새 메모 작성</Text>
          </TouchableHighlight>
          {memo.map((memo, index) => (
            <View style={styles.memoContainer} key={index}>
              <TouchableHighlight
                style={{flex: 15}}
                underlayColor="#f2f2f2"
                onPress={() => navigation.navigate('CreatePost', {memo})}>
                <View>
                  <Text style={styles.memoTitle}>{memo.title}</Text>
                  <Text style={styles.memoContent}>
                    {memo.content.length > 30
                      ? memo.content.substring(0, 28) + ' · · · ·'
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

const mapDispatchToProps = {
  dispatchRemoveMemo: (memo) => removeMemo(memo),
};

export default connect(
  (state) => ({memo: state.memo}),
  mapDispatchToProps,
)(NoteList);
