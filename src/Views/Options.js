import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { auth, db } from "../../firebase";
import BottomNav from "../components/BottomNav";
import LottieView from "lottie-react-native";

const Option = ({ navigation }) => {
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
        <Text style={styles.title}>Settings</Text>
        <LottieView
          source={require("../../assets/65035-profile.json")}
          style={styles.animation}
          autoPlay
        />
      </View>
      <View style={styles.container}>
        <View style={styles.UserInfo}>
          <View style={styles.outerImage}>
            <Image
              style={styles.Image}
              source={require("../../assets/images/Profile.jpg")}
            />
          </View>
          <View style={styles.Inner}>
            <Text style={styles.nameSec}>{auth.currentUser?.displayName}</Text>
            <Text style={styles.emailSec}>{auth.currentUser?.email}</Text>
          </View>
        </View>
        <View styles={styles.section1}>
          <View style={styles.option1}>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyProducts")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Posted Products</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.option2}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Fav")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>View Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View styles={styles.section2}>
          <View style={styles.option3}>
            <TouchableOpacity
              onPress={() => navigation.navigate("About")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section3}>
          <View style={styles.option4}>
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
              <Text style={styles.buttonTextRed}>Sign out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.option5}>
            <TouchableOpacity
              onPress={handleDeleteUser}
              style={styles.buttonOutline}
            >
              <Text style={styles.buttonTextRed}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomNav />
    </SafeAreaView>
  );
};

export default Option;

const styles = StyleSheet.create({
  animation: {
    marginTop: 2,
    marginLeft: "auto",
    width: "20%",
    height: "100%",
  },
  Inner: {
    marginLeft: 20,
  },
  UserInfo: {
    // borderWidth: 0.5,
    // borderLeftWidth: 0,
    // borderRightWidth: 0,
    borderRadius: 10,
    padding: 20,
    width: "95%",
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  bigMain: {
    flex: 1,
  },
  topNav: {
    flexDirection: "row",
    textAlign: "center",
    marginTop: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    fontSize: 40,
    fontWeight: "800",
    color: "#000",
  },
  nameSec: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
  },
  emailSec: {
    marginTop: 10,
    fontSize: 15,
  },
  button: {
    // backgroundColor: "#fc5c65",
    padding: 10,
    // borderRadius: 10,
    // alignItems: "center",
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 10,
    // borderBottomWidth: 1,
    // borderColor: "gray",
    marginBottom: 10,
    // backgroundColor: "#fff",
  },
  buttonOutline: {
    // backgroundColor: "gray",
    // padding: 15,
    // borderRadius: 30,
    // alignItems: "center",
    // width: "60%",
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 20,
    // backgroundColor: "#fc5c65",
    padding: 10,
    // borderRadius: 10,
    // alignItems: "center",
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 10,
    // borderBottomWidth: 1,
    // borderColor: "gray",
    marginBottom: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 17,
    marginLeft: 10,
  },
  buttonTextRed: {
    color: "#fc5c65",
    fontWeight: "700",
    fontSize: 17,
    marginLeft: 10,
  },
  Image: {
    width: 80,
    height: 80,
  },
  outerImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "red",
  },
  section1: {
    width: "100%",
    marginTop: 20,
  },
  section2: {
    width: "100%",
    marginTop: 20,
  },
  section3: {
    width: "100%",
    marginTop: 20,
  },
  option1: {
    width: "95%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  option2: {
    width: "95%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  option3: {
    width: "95%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
  },
  option4: {
    width: "95%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
    marginLeft: 10,
  },
  option5: {
    width: "95%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 10,
  },
});
