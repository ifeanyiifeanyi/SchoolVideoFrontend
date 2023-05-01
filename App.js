import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown:false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown:false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
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
