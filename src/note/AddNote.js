import * as React from 'react';
import {Text, TextInput, View, StyleSheet, ScrollView} from 'react-native';

function CreatePostScreen({navigation, route}) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView keyboardShouldPersistTaps="always">
          <TextInput
            multiline
            placeholder="제목"
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey',
            }}
            value={postText}
            onChangeText={setPostText}
          />
          <TextInput
            multiline
            style={{padding: 10}}
            value={postText}
            onChangeText={setPostText}
          />
        </ScrollView>
      </View>
    </>
  );
}

export default CreatePostScreen;

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
