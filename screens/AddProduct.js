import { SafeAreaView, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase";

const AddProduct = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);

  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (!auth.currentUser) {
      navigation.replace("Login");
    }
    if (auth.currentUser) {
      arr = [];
      db.collection("Product")
        .where("Email", "==", auth.currentUser?.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.id);
            arr.push(doc.data());
            console.log(arr[0] + " " + arr[1].Name);
            setData(arr);
            arr = [];
          });
        });
    }
  }, []);

  const handleAddProduct = () => {
    var Data = {
      Name: name,
      PhoneNumber: number,
      Description: description,
      Email: auth.currentUser?.email,
    };

    db.collection("Product").add(Data);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View styles={styles.container}>
        <View style={styles.topNav}>
          <Text style={styles.title}>Share Your Food</Text>
        </View>
        <TextInput
          placeholder="Enter your Name"
          placeholderTextColor="#003f5c"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.inputs}
        />
        <TextInput
          placeholder="Enter your Phone Number"
          placeholderTextColor="#003f5c"
          value={number}
          onChangeText={(text) => setNumber(text)}
          style={styles.inputs}
        />
        <TextInput
          placeholder="Enter Food Description"
          placeholderTextColor="#003f5c"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.inputs}
        />
        <TextInput
          placeholder="Enter your Country"
          placeholderTextColor="#003f5c"
          style={styles.inputs}
        />
        <TextInput
          placeholder="Enter your City"
          placeholderTextColor="#003f5c"
          style={styles.inputs}
        />
        {/* <TextInput
          placeholder="Location Link"
          placeholderTextColor="#003f5c"
          style={styles.inputs}
        /> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddProduct} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.replace("Home")}
            style={styles.buttonOutline}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  topNav: {
    marginTop: 80,
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "#fc5c65",
  },
  nav: {
    position: "relative",
    backgroundColor: "red",
  },

  container: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "notoserif",
    color: "#fff",
  },

  inputs: {
    borderWidth: 1.5,
    borderColor: "#003f5c",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
  },

  buttonContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  button: {
    backgroundColor: "#4ecdc4",
    width: "80%",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },

  buttonOutline: {
    marginTop: 10,
    backgroundColor: "gray",
    width: "60%",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  },
});
