import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements'
import db from '../Config'
import firebase from 'firebase'

export default class MyHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      userId: firebase.auth().currentUser.email
    }
  }
  getValue = () => {
    db.collection("All_Notifications").where("notification_status","==","unread").where("target_user_id","==",this.state.userId)
    .onSnapshot(snapshot => {
      var count = snapshot.docs.map(doc => doc.data())
      this.setState({
        value: count.length
      })
    })
  }
  componentDidMount() {
    this.getValue()
  }
  render() {
    return (
      <Header 
        centerComponent={{
            text: this.props.title,
            style: {fontSize: 28, fontFamily: "Fantasy"}
        }}
        backgroundColor="#c1b8e3"
        leftComponent={<Icon name="bars" type="font-awesome" onPress={() => {
          this.props.navigation.toggleDrawer()
        }}/>}
        rightComponent={<View><Icon name="bell" type="font-awesome" size={25} color={"black"}/>
      <Badge value={this.state.value} containerStyle={{position: "absolute", top:-4, right:-4}}/></View>}
    />
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
