import React from 'react';

//Basic React Native Imports
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

//Screen Imports
import Home from './src/Views/Home';
import LoginScreen from './src/Views/Authentication/LoginScreen';
import RegisterScreen from './src/Views/Authentication/RegisterScreen';
import ResetPassword from './src/Views/Authentication/ResetPassword';
import AddProduct from './src/Views/Posts/AddProduct';
import Product from './src/Views/Posts/Product';
import FavProducts from "./src/Views/Posts/FavPorducts";
import MyProducts from './src/Views/Posts/MyProducts';
import Options from './src/Views/Options';
import TermsAndConditions from './src/Views/TermsAndConditions';
import ContactUS from "./src/Views/ContactUs";

//Permission Imports
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const Stack = createNativeStackNavigator();

export default function App() {
  // Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
  LogBox.ignoreLogs(['Setting a timer']);

  React.useEffect(() => {
    //The following function will be called when the app is opened.
    //It is async because it needs to wait for the user to grant permission.
    (async () => {
      //wait for the user to accept the permissions for location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access Location is required!');
        return;
      }
      //Get the Image picker permissions
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
    }
    )();
  }, []);


  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Intro'
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="ViewProduct" component={Product} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="MyProducts" component={MyProducts} />
          <Stack.Screen name="Option" component={Options} />
          <Stack.Screen name="Terms" component={TermsAndConditions} />
          <Stack.Screen name="About" component={ContactUS} />
          <Stack.Screen name="Fav" component={FavProducts} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="Dark" />
    </>
  );
}