import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';

class NoteList extends React.Component<{}> {
  render() {
    const {navigation, memo} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView keyboardShouldPersistTaps="always" style={{width: '100%'}}>
          {memo.map((memo, index) => (
            <TouchableHighlight
              underlayColor="#f2f2f2"
              onPress={() => navigation.navigate('CreatePost', {memo})}
              key={index}>
              <View style={styles.memoContainer}>
                <Text>{memo.title}</Text>
                <Text>{memo.content}</Text>
              </View>
            </TouchableHighlight>
          ))}
          <TouchableHighlight
            underlayColor="#f2f2f2"
            onPress={() => navigation.navigate('CreatePost')}
            style={styles.button}>
            <Text style={styles.text}>새 메모 작성</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  memoContainer: {
    width: '94%',
    height: 100,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 10,
    alignSelf: 'center',
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
});

// const mapStateToProps = () => ({
//   memo: this.state.memo,
// });
export default connect((state) => ({memo: state.memo}))(NoteList);
