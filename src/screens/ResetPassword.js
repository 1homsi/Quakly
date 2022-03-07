import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPassword = () => {
  const [email, setEmail] = React.useState("");
  const navigation = useNavigation();

  const handleReset = () => {
    auth.sendPasswordResetEmail(email).catch((error) => {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      alert("Error please try again later");
    });
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.bigMain}>
      <View style={styles.topNav}>
        <Text style={styles.title}>Reset Password</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholderTextColor="#003f5c"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleReset} style={styles.button}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.replace("Login")}
            style={styles.buttonOutline}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  bigMain: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#003f5c",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 15,
  },
  button: {
    backgroundColor: "#fc5c65",
    width: "80%",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  topNav: {
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 5,
  },
  title: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
  },
  //   resetPass:{
  //     borderWidth: 1.5,
  //     borderColor: "#89CFF0",
  //     backgroundColor: "#89CFF0",
  //     paddingHorizontal: 15,
  //     paddingVertical: 10,
  //     borderRadius: 15,
  //     marginTop: 20,
  //     color: 'white',
  //     fontWeight: '700',
  //     fontSize: 17,
  //     textAlign: 'center',
  //   },
  buttonOutline: {
    marginTop: 10,
    backgroundColor: "gray",
    width: "60%",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
