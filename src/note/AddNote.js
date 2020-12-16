import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';

import axios from 'axios';
export default class AddNote extends Component {
  state = {
    title: '',
    content: '',
    _id: '',
  };

  componentDidMount() {
    const {route} = this.props;
    console.log(route);
    if (route.params) {
      this.setState({
        title: route.params.memo.title,
        content: route.params.memo.content,
        _id: route.params.memo._id,
      });
    }
  }

  async componentWillUnmount() {
    if (!this.state.title && !this.state.content) {
      console.log('아무것도 없음');
      return;
    } else if (!this.state._id) {
      console.log('신규 메모');
      try {
        const result = await axios.post('http://172.30.1.9:3030/write/memo', {
          title: this.state.title,
          content: this.state.content,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('업뎃메모');
      try {
        await axios.put('http://172.30.1.9:3030/update/memo', {
          title: this.state.title,
          content: this.state.content,
          _id: this.state._id,
        });
      } catch (e) {
        console.log(e);
      }
    }
    DeviceEventEmitter.emit('update');
  }

  inputTitle = (val) => {
    this.setState({
      title: val,
    });
  };
  inputContent = (val) => {
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
