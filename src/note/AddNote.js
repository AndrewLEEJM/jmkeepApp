import React, {Component} from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView} from 'react-native';

import {addMemo} from '../redux/Action';
import {connect} from 'react-redux';

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

  componentWillUnmount() {
    this.props.dispatchAddMemo(this.state);
  }

  addMemo = () => {
    this.props.dispatchAddMemo(this.state);
  };

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

const mapDispatchToProps = {
  dispatchAddMemo: (memo) => addMemo(memo),
};

export default connect(
  (state) => ({memo: state.memo}),
  mapDispatchToProps,
)(AddNote);
