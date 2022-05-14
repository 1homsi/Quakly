import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { auth, db } from "../../../firebase";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Otherpassword, setOtherPassword] = useState("");
  const [name, setName] = useState("");


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (password !== Otherpassword) {
      alert("Passwords do not match");
    } else {

      db.collection("Users").doc(email).set({
        Name: name,
        Email: email,
      });

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          user.updateProfile({
            displayName: name,
          });
        })
        .catch((error) => alert(error.message));
    }
  };


  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Icon
          style={styles.icon}
          reverseColor
          name="home"
          type="font-awesome"
          size={35}
          onPress={() => navigation.replace("Home")}
        />
        <Image
          style={styles.HeaderImage}
          source={require("../../../assets/images/Register.png")}
        />
        <Text style={styles.head}>Create Account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#003f5c"
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor="#003f5c"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor="#003f5c"
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholderTextColor="#003f5c"
            placeholder="Repeat Password"
            value={Otherpassword}
            onChangeText={(text) => setOtherPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={styles.GoToLogin}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          Already have an account? Log In!
        </Text>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  icon: {
    marginBottom: 25,
  },
  HeaderImage: {
    marginBottom: 50,
    width: 180,
    height: 180,
  },
  head: {
    color: "#003f5c",
    fontWeight: "bold",
    fontSize: 29,
    marginBottom: 20,
  },
  IntroText: {
    color: "#003f5c",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#003f5c",
    backgroundColor: "white",
    paddingHorizontal: 17,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  button: {
    backgroundColor: "#fc5c65",
    width: "80%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
  GoToLogin: {
    marginTop: 20,
    color: "#003f5c",
    fontSize: 15,
  },
});
