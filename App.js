import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddProduct from './screens/AddProduct';
import PorductView from './screens/PorductView';
import ResetPassword from './screens/ResetPassword';
import Options from './screens/Options';
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddProduct" component={AddProduct} />
          <Stack.Screen options={{ headerShown: false }} name="ViewProduct" component={PorductView} />
          <Stack.Screen options={{ headerShown: false }} name="ResetPassword" component={ResetPassword} />
          <Stack.Screen options={{ headerShown: false }} name="Option" component={Options} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}