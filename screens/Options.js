import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/BottomNav";
import LottieView from "lottie-react-native";


export default function Option() {

  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    db.collection("Users").doc(auth.currentUser?.email).get().then((doc) => {
      setUser(doc.data());
    });
  }, []);

  const navigation = useNavigation();

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


  let Name = ""

  if (user.Namse) {
    Name = user.Name.substring(0, 1).toUpperCase();
  } else {
    Name = "";
  }


  return (
    <SafeAreaView style={styles.bigMain}>
      <View style={styles.topNav}>
        <Text style={styles.title}>Settings</Text>
        <LottieView
          source={require("../assets/65035-profile.json")}
          style={styles.animation}
          autoPlay
        />
      </View>
      <View style={styles.container}>
        <View style={styles.UserInfo}>
          <View style={styles.outerImage}>
            <Image style={styles.Image} source={require("../images/Profile.jpg")} />
          </View>
          <View style={styles.Inner}>
            <Text style={styles.nameSec}>{user.Name}</Text>
            <Text style={styles.emailSec}>{auth.currentUser?.email}</Text>
          </View>

        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyProducts")}
          style={styles.button1}
        >
          <Text style={styles.buttonText}>Posted Products</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.button1}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteUser} style={styles.buttonOutline}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </SafeAreaView>
  );
}

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
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 20,
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
  },
  bigMain: {
    flex: 1,
  },
  topNav: {
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 10,
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
    fontSize: 35,
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
  button1: {
    backgroundColor: "#fc5c65",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonOutline: {
    backgroundColor: "gray",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
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
    borderColor: "red"
  }
});
