import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import db from '../Config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class RequestScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            bookName: "",
            reason: "",
            userId: firebase.auth().currentUser.email,
            bookRequestActive: false,
            requestId: '',
            requestedBookName: '',
            bookStatus: '',
            docId: '',
            username: '',
        }
    }
    requestBook = async () => {
      var rID = Math.random().toString(36).substring(7)
      db.collection("Requested_Books").add({
        user_id: this.state.userId,
        book_name: this.state.bookName,
        reason: this.state.reason,
        request_id: rID,
        book_status: "Requested"
      })
      await this.getBookRequest()
      db.collection("Users").where("email_id","==",this.state.userId).get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          var data = doc.data()
          db.collection("Users").doc(doc.id).update({
            book_request_active: true
          })
        });
      })
      alert("Book was requested succesfully!")
    }
    getBookRequest = () => {
      db.collection("Users").where("email_id","==",this.state.userId).get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          var data = doc.data()
          this.setState({
            bookRequestActive: data.book_request_active,
            username: data.first_name + " " + data.last_name
          })
        });
      })
    }
    getBookInfo = () => {
      db.collection("Requested_Books").where("user_id","==",this.state.userId).get().then((snapshot) => {
        snapshot.forEach(doc => {
          var data = doc.data()
          if(data.book_status != "Recieved") {
            this.setState({
              requestId: data.request_id,
              requestBookName: data.book_name,
              bookStatus: data.book_status,
              docId: doc.id
            })
          }
        })
      })
    }
    updateBookStatus = () => {
      db.collection("Requested_Books").doc(this.state.docId).update({
        book_status: "Recieved"
      })
      db.collection("Users").where("email_id","==",this.state.userId).get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          var data = doc.data()
          db.collection("Users").doc(doc.id).update({
            book_request_active: false
          })
        });
      })
    }
    sendNotification = async () => {
      var targetUserID = ""
      await db.collection("All_Notifications").where("request_id","==",this.state.requestId).get().then(snapshot => {
        shapshot.forEach(doc => {
          var data = doc.data()
          targetUserID = data.donor_id
        })
      })
      db.collection("All_Notifications").add({
        book_name: this.state.requestBookName,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        message: this.state.username + " has recieved the book " + this.state.requestBookName + ".",
        target_user_id: targetUserID,
        notificationStatus: "unread"
      })
    }
    recievedBook = (bookName) => {
      db.collection("Recieved_Books").add({
        user_id: this.state.userId,
        book_name: bookName,
        request_id: this.state.requestId,
        bookStatus: "recieved"
      })
    }
    componentDidMount() {
      this.getBookRequest()
      this.getBookInfo()
    }
    render() {
        if(this.state.bookRequestActive == true) {
          return(
            <View style={styles.container}>
              <MyHeader 
                title="Request"
              />
              <View style={styles.center}>
                <Text style={styles.login1}>Book Name: {this.state.requestBookName}</Text>
                <Text style={styles.login1}>Book Status: {this.state.bookStatus}</Text>
              </View>
              <View style={styles.center}> 
              <TouchableOpacity onPress={() => {
                this.sendNotification()
                this.updateBookStatus()
                this.recievedBook(this.state.requestBookName)
              }} style={styles.requestButton1}>
                <Text style={styles.login}>Book Recieved!</Text>
              </TouchableOpacity>
              </View>
            </View>
          )
        } else {
          return (
            <View style={styles.container}>
                <MyHeader
                    title="Request"
                ></MyHeader>
                <View styles={styles.center}>
                    <TextInput
                        placeholder={'Name of the Book'}
                        style={styles.textInput1}
                        onChangeText={(text) => {
                          this.setState({
                            bookName: text
                          })
                        }}>
                    </TextInput>
                    <TextInput
                        placeholder={'Reason of Request'}
                        style={styles.textInput2}
                        multiline={true}
                        onChangeText={(text) => {
                        this.setState({
                            reason: text
                        });}}>
                    </TextInput>
                    <TouchableOpacity onPress={() => {
                      this.requestBook()
                    }} style={styles.RequestButton}>
                        <Text style={styles.login}>Request</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center'
  },
  textInput1: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    width: '30%',
    height: 50,
    borderRadius: 5,
    fontSize: 20,
    marginTop: 200,
    marginLeft: 30,
    textAlign: 'center',
  },
  textInput2: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    width: '30%',
    height: 70,
    borderRadius: 5,
    fontSize: 20,
    marginTop: 30,
    marginLeft: 30,
    textAlign: 'center',
  },
  RequestButton: {
    marginTop: 10,
    backgroundColor: '#c1b8e3',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  requestButton1: {
    marginTop: 10,
    backgroundColor: '#c1b8e3',
    width: 150,
    height: 50,
    borderRadius: 5,
    alignText: 'center'
  },
  login: {
    fontSize: 16,
    fontFamily: 'Courier New',
    fontWeight: 'bold'
  },
  login1: {
    marginTop: 20,
    fontSize: 22,
    fontFamily: 'Georgia',
  },
});
