import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import db from '../Config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class DonateScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      requestedBooks: [],
      fromInput: "",
      otherBooks: []
    }
  }
  getRequestedBooks = () => {
    db.collection("Requested_Books").onSnapshot((snapshot) => {
      var books = snapshot.docs.map((doc) => doc.data())
      this.setState({
        requestedBooks: books
      })
    })
  }
  componentDidMount() {
    this.getRequestedBooks()
  }
  renderItem = ({item,i}) => {
    return(
      <ListItem
        key = {i}
        title = {item.book_name}
        subtitle = {item.reason}
        titleStyle= {{fontSize: 20, fontFamily: "Courier New"}}
        rightElement = {<TouchableOpacity onPress={() => {
          this.props.navigation.navigate("Details",{'Data':item})
        }} style={styles.details}>
          <Text style={styles.textStyle}>View Details</Text>
        </TouchableOpacity>}
        bottomDivider
      />
    )
  }
  keyExtractor = (item, index) => index.toString()
  getBooks = () => {
    this.state.requestedBooks.map(item => {
      if(item.book_name == this.state.fromInput) {
        this.setState({
          otherBooks: item,
        })
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <MyHeader
            title="Donate"
        ></MyHeader>
        <View>
          <TextInput 
           placeholder={"Enter the book name!"}
            onChangeText = {(text) => {
              this.setState({
                fromInput: text
              })
            }}
          />
          <TouchableOpacity onPress={this.getBooks()}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <View>
          {this.state.requestedBooks.length == 0 ? 
          (<Text>Loading...</Text>): 
          (<FlatList 
            data={this.state.otherBooks.length != 0 ? this.state.otherBooks: this.state.requestedBooks}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          ></FlatList>)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  details: {
    width: 100,
    height: 40,
    backgroundColor: "#c1b8e3",
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 15, 
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10
  }
});
