import React, {Component} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView} from 'react-native';

export default class AddNote extends Component {
  state = {
    title: '',
    content: '',
  };

  componentDidMount() {
    const {route} = this.props;
    if (route.params) {
      this.setState({
        title: route.params.memo.title,
        content: route.params.memo.content,
      });
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
