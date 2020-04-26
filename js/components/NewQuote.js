import React, { Component } from 'react';
import { Button, View, TextInput, StyleSheet, Modal } from 'react-native';

export default class newQuote extends Component {
  state = { content: null, author: null };

  render() {
    const { visible, onSave } = this.props;
    const { content, author } = this.state;
    return (
      <Modal
        visible={visible}
        onRequestClose={() => {
          this.setState({ content: null, author: null });
          onSave(null, null);
        }}
        animationType="slide"
      >
        <View style={styles.container}>
          <TextInput
            style={[styles.input, { height: 200 }]}
            multiline={true}
            placeholder="Zitat"
            underlineColorAndroid='transparent'
            onChangeText={text => this.setState({ content: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor/in"
            underlineColorAndroid='transparent'
            onChangeText={text => this.setState({ author: text })}
          />
          <Button
            title="Speichern"
            onPress={() => {
              this.setState({ content: null, author: null });
              onSave(content, author);
            }}
          />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'deepskyblue',
    borderRadius: 4,
    width: '80%',
    marginBottom: 20,
    fontSize: 20,
    padding: 10,
    height: 50
  }
});