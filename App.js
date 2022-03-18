import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AddProduct from './src/screens/AddProduct';
import PorductView from './src/screens/PorductView';
import ResetPassword from './src/screens/ResetPassword';
import Options from './src/screens/Options';
import MyProducts from './src/screens/MyProducts';
import Choosen from './src/screens/Choosen';
import TermsAndConditions from './src/screens/TermsAndConditions';
import ContactUS from "./src/screens/ContactUs"

const Stack = createNativeStackNavigator();

export default function App() {

  // Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddProduct" component={AddProduct} />
          <Stack.Screen options={{ headerShown: false }} name="ViewProduct" component={PorductView} />
          <Stack.Screen options={{ headerShown: false }} name="ResetPassword" component={ResetPassword} />
          <Stack.Screen options={{ headerShown: false }} name="MyProducts" component={MyProducts} />
          <Stack.Screen options={{ headerShown: false }} name="Option" component={Options} />
          <Stack.Screen options={{ headerShown: false }} name="Terms" component={TermsAndConditions} />
          <Stack.Screen options={{ headerShown: false }} name="About" component={ContactUS} />
          <Stack.Screen options={{ headerShown: false }} name="Fav" component={Choosen} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}