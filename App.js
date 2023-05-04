import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Home from './Screens/SignedIn/Home';
import Article from './Screens/SignedIn/Article';
import Notification from './Screens/SignedIn/Notification';
import Profile from './Screens/SignedIn/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(true);

  if (isSignedIn == true) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              <ion-icon name=""></ion-icon>
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-phone-portrait' : 'ios-phone-portrait-outline';

              } else if (route.name === 'Notification') {
                iconName = focused ? 'ios-notifications-circle' : 'ios-notifications-circle-outline';
                
              } else if (route.name === 'Article') {

                iconName = focused ? 'md-file-tray-full' : 'md-file-tray-full-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Tab.Screen name="Article" component={Article} options={{ headerShown: false }} />
          <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
          <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    )

  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

}
const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  }
})
export default App;
