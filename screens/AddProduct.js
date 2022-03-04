import { Platform, SafeAreaView, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
import { withTheme } from "react-native-elements";

const AddProduct = () => {
  const navigation = useNavigation();



  return (
    <SafeAreaView style={styles.main}>
        
      {!auth.currentUser ? (
        <View>{/* {navigation.replace("Home")} */}</View>
      ) : (
        //   <>
        // <View style={styles.container}>
        //   <Text style={styles.head}>Quakly</Text>
        // </View>

        // <View styles={styles.section}>
        //   <Text style={styles.title}>Share Your Food</Text>
        //   <TextInput styles={styles.name} placeholder={'Enter your name'}>Name: </TextInput>
        // </View>
        // </>
        <View styles={styles.container}>
          <Text style={styles.sectionTitle}>Share Your Food</Text>
          <TextInput
            placeholder="Enter your Name"
            placeholderTextColor="#003f5c"
            // onChangeText={(text) => {
            //   this.setState({ name: text });
            // }}
            style={styles.inputs}
          />
          <TextInput
            placeholder="Enter your PhoneNumber"
            placeholderTextColor="#003f5c"
            // onChangeText={(text) => {
            //   this.setState({ phoneNumber: text });
            // }}
            style={styles.inputs}
          />
          <TextInput
            placeholder="Enter Food Description"
            placeholderTextColor="#003f5c"
            // onChangeText={(text) => {
            //   this.setState({ desc: text });
            // }}
            style={styles.inputs}
          />
          <TextInput
            placeholder="Enter your Country"
            placeholderTextColor="#003f5c"
            // onChangeText={(text) => {
            //   this.setState({ country: text });
            // }}
            style={styles.inputs}
          />
          <TextInput
            placeholder="Enter your City"
            placeholderTextColor="#003f5c"
            // onChangeText={(text) => {
            //   this.setState({ city: text });
            // }}
            style={styles.inputs}
          />
          <TextInput
            placeholder="Location Link"
            placeholderTextColor="#003f5c"
            // onChangeText={(text) => {
            //   this.setState({ location: text });
            // }}
            style={styles.inputs}
          />
          {/* <TouchableOpacity>
              <View styles={styles.button}>
                    <Text styles={buttonText}>Send</Text>
              </View>
          </TouchableOpacity> */}
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    // width: "100%",
    // alignContent: "center",
    // justifyContent: "center",
  },
  nav: {
    position: "relative",  
    backgroundColor: "red"
  },
  container: {
    // margin: 50,
    // marginTop: 150,
    // backgroundColor: "white",
    
    paddingTop: 120,
    paddingHorizontal: 20,
      
    
  },
  sectionTitle: {
    color: '#4ecdc4',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    marginTop: 30,
  },

  //   head: {
  //     color: "#003f5c",
  //     fontWeight: "bold",
  //     fontSize: 25,
  //     paddingTop: 80,
  //     paddingHorizontal: 20,
  //     backgroundColor: 'red',
  //     alignItems: "center",
  //   },

  //   title: {
  //       paddingBottom: '160%',
  //       color: 'black',
  //       paddingHorizontal: '5%',
  //       fontSize: 28
  //   },

  inputs: {
    borderWidth: 1.5,
    borderColor: "white",
    backgroundColor: '#f8f4f4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 10,
  },

  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#f01d71',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  }
});
