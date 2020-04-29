import React, { Component } from 'react';
import { Alert, StyleSheet, View, Button, DrawerLayoutAndroidBase } from 'react-native';

import Firebase from './js/Firebase';
import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';


function StyledButton(props) {
  if (props.visible)
    return (
      <View style={props.style}>
        <Button
          title={props.title}
          onPress={props.onPress}
        />
      </View>
    );
  else return null;
}

export default class App extends Component {
  state = { index: 0, showNewQuoteScreen: false, quotes: [] };

  _retrieveData() {
    //FB
  }

  _saveQuoteToDB(text, author, quotes) {
    Firebase.db.collection('quotes').add({ text, author });
  }

  _removeQuoteFromDB(id) {
    //FB
  }

  _addQuote = (text, author) => {
    let { quotes } = this.state;
    if (text && author) {
      quotes.push({ text, author });
      this._saveQuoteToDB(text, author, quotes);
    }
    this.setState({ index: quotes.length - 1, showNewQuoteScreen: false, quotes });
  };

  _displayNextQuote() {
    let { index, quotes } = this.state;
    let nextIndex = index + 1;
    if (nextIndex === quotes.length) nextIndex = 0;
    this.setState({ index: nextIndex });
  }

  _displayPreviousQuote() {
    let { index, quotes } = this.state;
    let previousIndex = index - 1;
    if (previousIndex < 0) previousIndex = (quotes.length - 1);
    this.setState({ index: previousIndex });
  }

  _deleteButton() {
    Alert.alert(
      'Zitat löschen',
      'Soll das Zitat unwiederbringlich gelöscht werden?',
      [
        { text: 'Abbrechen' },
        {
          text: 'Löschen',
          onPress: () => this._deleteQuote()
        }
      ]
    );
  }

  _deleteQuote() {
    let { index, quotes } = this.state;
    this._removeQuoteFromDB(quotes[index].id);
    quotes.splice(index, 1);
    this.setState({ index: 0, quotes })
  }

  componentDidMount() {
    Firebase.init();
    this._retrieveData();
  }

  render() {
    let { index, quotes } = this.state;
    const quote = quotes[index];
    let content = <Quote text="Keine Zitate. Beginne indem du auf 'Neues Zitat' drückst." author="Entwickler" />
    if (quote) {
      content = <Quote text={quote.text} author={quote.author} />
    }
    return (
      <View style={styles.container}>

        <StyledButton
          style={styles.button3}
          visible={true}
          title="Neues Zitat"
          onPress={() => this.setState({ showNewQuoteScreen: true })}
        />

        <StyledButton
          style={styles.button4}
          visible={quotes.length >= 1}
          title="Löschen"
          onPress={() => this._deleteButton()}
        />

        <NewQuote
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}
        />

        {content}

        <StyledButton
          style={styles.button1}
          visible={quotes.length > 1}
          title="Nächstes"
          onPress={() => this._displayNextQuote()}
        />

        <StyledButton
          style={styles.button2}
          visible={quotes.length > 1}
          title="Vorheriges"
          onPress={() => this._displayPreviousQuote()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    position: 'absolute',
    bottom: 50,
    right: 30,
  },
  button2: {
    position: 'absolute',
    bottom: 50,
    left: 30
  },
  button3: {
    position: 'absolute',
    top: 70,
    right: 30,
  },
  button4: {
    position: 'absolute',
    top: 70,
    left: 30,
  }
});
