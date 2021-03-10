import React from 'react';
import { Image } from 'react-native'
import { Icon } from 'react-native-elements'
import WelcomeScreen from './Screens/WelcomeScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import Sidebar from './components/Sidebar'
import DonateScreen from './Screens/DonateScreen'
import RequestScreen from './Screens/RequestScreen';
import SettingScreen from './Screens/SettingScreen'
import RecieverDetails from './Screens/RecieverDetails'
import MyDonations from './Screens/MyDonations'
import Notification from './Screens/NotificationScreen'
import RecievedBooks from './Screens/RecievedBooks'

export default class App extends React.Component {
  render() {
    return (
        <Container />
    );
  }
}

const Stack = createStackNavigator({
  Donate: {screen: DonateScreen,
  navigationOptions: {
    headerShown: false
  }},
  Details: { screen: RecieverDetails}
})
const Tab = createBottomTabNavigator({
  Donate: {screen: Stack},
  Request: {screen: RequestScreen},
}, {
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: () => {
      var routeName = navigation.state.routeName
      if(routeName == "Donate") {
        return(
          <Image style={{width: 40,height: 40}}source={require('./assets/Donate_Books.png')}></Image>
        )
      } else if(routeName == "Request") {
        return(
          <Image style={{width: 40,height: 40}} source={require('./assets/Request_Books.jpg')}></Image>
        )
      }
    }
  }) 
}

)
const Drawer = createDrawerNavigator({
  Home: {screen: Tab, navigationOptions: {
    drawerIcon: <Icon name="home" type="fontawesome5"/>
  }},
  Settings: { screen: SettingScreen, navigationOptions: {
    drawerIcon: <Icon name="settings" type="fontawesome5"/>
  }},
  Donations: { screen: MyDonations, navigationOptions: {
    drawerIcon: <Icon name="gift" type="font-awesome"/>
  }},
  Notifications: { screen: Notification, navigationOptions: {
    drawerIcon: <Icon name="bell" type="font-awesome"/>
  }},
  Recieved_Books: { screen: RecievedBooks, navigationOptions: {
    drawerIcon: <Icon name="gift" type="font-awesome"/>
  }}
  },{
  contentComponent: Sidebar
  },{
  initialRouteName: 'Home'
  }
)
const  Switch = createSwitchNavigator({
  WelecomeScreen: {screen: WelcomeScreen},
  drawerNavigation: {screen: Drawer}
})
const Container = createAppContainer(Switch)