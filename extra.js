import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import db from '../Config'
import firebase from 'firebase'

export default class DonateScreen extends React.Component {
  getBooksfromAPI = async (text) => {
    if(text.length > 2) {
      var books = await BookSearch.searchBook(text, 'AIzaSyCdq9_2VhmbfDK3KyEoc7R6f1si-EjRZF4')
      this.setState({
        bookName: text
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
