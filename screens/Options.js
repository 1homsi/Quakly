import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/BottomNav";

export default function Option() {
  const navigation = useNavigation();

  // React.useEffect(() => {
  //     if (!auth.currentUser) {
  //         navigation.replace("Home")
  //     }
  // }, [])

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleDeleteUser = () =>
    Alert.alert(
      "Delete Account",
      "Are you sure, you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            auth.currentUser
              .delete()
              .then(() => {
                navigation.replace("Home");
              })
              .catch((error) => {
                alert(error.message);
              });
          },
        },
      ]
    );

  return (
    <SafeAreaView style={styles.bigMain}>
      <View style={styles.topNav}>
        <Text style={styles.title}>My Profile</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.emailSec}>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button1}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyProducts")}
          style={styles.button1}
        >
          <Text style={styles.buttonText}>My Products</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteUser} style={styles.button2}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bigMain: {
    flex: 1,
  },
  topNav: {
    marginTop: 80,
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    // paddingBottom: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
  },
  emailSec: {
    fontSize: 22,
  },
  button1: {
    backgroundColor: "#4ecdc4",
    width: "100%",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button2: {
    backgroundColor: "gray",
    width: "100%",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
