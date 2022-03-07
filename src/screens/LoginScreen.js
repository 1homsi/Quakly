import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth } from "../../firebase";
import { Icon } from "react-native-elements";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.message));
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
          source={require("../images/Login.png")}
        />
        <Text style={styles.head}>Welcome Back!</Text>
        <Text style={styles.IntroText}>
          Please Log into your existing account
        </Text>
        <View style={styles.inputContainer}>
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
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={styles.NotAUser}
          onPress={() => {
            navigation.replace("Register");
          }}
        >
          Not a user? Register!
        </Text>
        <Text
          style={styles.ForgotPassword}
          onPress={() => {
            navigation.replace("ResetPassword");
          }}
        >
          Forgot Password?
        </Text>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  icon: {
    marginBottom: 25,
  },

  HeaderImage: {
    marginBottom: 15,
    width: 200,
    height: 200,
  },

  head: {
    color: "#003f5c",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 30,
  },
  IntroText: {
    color: "#003f5c",
    fontSize: 16,
    marginBottom: 30,
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#fc5c65",
    width: "100%",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
  NotAUser: {
    marginTop: 25,
    color: "#003f5c",
    fontSize: 16,
  },
  ForgotPassword: {
    color: "#003f5c",
    marginTop: 20,
  },
});
