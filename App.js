import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AddProduct from './src/screens/AddProduct';
import PorductView from './src/screens/PorductView';
import ResetPassword from './src/screens/ResetPassword';
import Options from './src/screens/Options';
import { LogBox } from 'react-native';
import MyProducts from './src/screens/MyProducts';
import AboutUs from './src/screens/AboutUs';
import Favorites from './src/screens/Favorites';
import TermsAndConditions from './src/screens/TermsAndConditions';


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
          <Stack.Screen options={{ headerShown: false }} name="MyProducts" component={MyProducts} />
          <Stack.Screen options={{ headerShown: false }} name="Option" component={Options} />
          <Stack.Screen options={{ headerShown: false }} name="Terms" component={TermsAndConditions} />
          <Stack.Screen options={{ headerShown: false }} name="About" component={AboutUs} />
          <Stack.Screen options={{ headerShown: false }} name="Fav" component={Favorites} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}