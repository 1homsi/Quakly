import { SafeAreaView, Text, Image, StyleSheet, View, TouchableOpacity, Platform, Linking } from "react-native";
import React, { useEffect } from "react";
import { db, auth } from "../../firebase";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";


const PorductView = ({ route }) => {
  const { id, IsFav } = route.params;
  const [data, setData] = React.useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    db.collection("Product")
      .doc(id)
      .get()
      .then((doc) => {
        setData(doc.data());
      });
  }, []);

  const handleAdd = () => {
    if (auth.currentUser?.email === data.Email) {
      alert("You can't add your own product");
    }
    else {
      db.collection("Product").doc(id).update({
        "FavoritedBy": auth.currentUser?.email,
        "ProductTaken": true,
      })
      navigation.replace("Home")
    }
  }

  const openMaps = (lat, lng) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${lat},${lng}`;
    const label = "Custom Label";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        Platform.OS === "Ios" ? <Icon
          style={styles.icon}
          reverseColor
          name="home"
          type="font-awesome"
          size={40}
          onPress={() => navigation.replace("Home")}
        /> : <></>
      }

      <View style={styles.Image}>
        <Image
          style={styles.HeaderImage}
          source={{ uri: data.Image }}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.headTitle}>{data.title}</Text>
        <View style={styles.box}>
          <Text style={styles.text}>{data.Name}</Text>
          <View
            style={{
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
              marginBottom: 5,
            }}
          />
          <Text style={styles.text}>{data.PhoneNumber}</Text>
          <View
            style={{
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
              marginBottom: 5,
            }}
          />
          <Text style={styles.text}>{data.Description}</Text>
          <View
            style={{
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
              marginBottom: 5,
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {
            IsFav ? handleAdd() : openMaps(
              data.Location.coords.latitude,
              data.Location.coords.longitude
            );
          }}>
            {
              IsFav ? <Text style={styles.buttonText} >Add</Text>
                :
                <>
                  <Text style={styles.buttonText}>Open Location</Text>
                </>
            }
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PorductView;

const styles = StyleSheet.create({
  icon: {
    marginTop: 20,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HeaderImage: {
    position: "absolute",
    top: 50,
    width: "60%",
    height: "60%",
  },
  Image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  description: {
    flex: 1,
    bottom: 120,
    left: 5,
    marginLeft: 7,
    marginRight: 20,
  },
  headTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#003f5c",
  },
  text: {
    fontSize: 25,
    color: "#003f5c",
  },
  box: {
    borderColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
    backgroundColor: "white",
    padding: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    left: 75,
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
});
