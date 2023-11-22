import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import SignInScreen from './src/screens/SignInScreen';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SubjectScreen from './src/screens/SubjectScreen';
import SubjectCard from './src/components/SubjectCard';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* Screens */}
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SubjectScreen" component={SubjectScreen} />
        {/* Some components that require navigation */}
        <Stack.Screen name="SubjectCard" component={SubjectCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
