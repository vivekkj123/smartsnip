import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import CreateNoteScreen from './src/screens/CreateNoteScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SubjectScreen from './src/screens/SubjectScreen';
import NoteScreen from './src/screens/NoteScreen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SubjectScreen" component={SubjectScreen} />
        <Stack.Screen name="CreateNoteScreen" component={CreateNoteScreen} />
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
