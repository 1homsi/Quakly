import { SafeAreaView, Text, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { db } from "../firebase";

const PorductView = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = React.useState([]);

  useEffect(() => {
    db.collection("Product")
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setData(doc.data());
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Image}>
        <Image
          style={styles.HeaderImage}
          source={require("../images/Login.png")}
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

          <Text style={styles.text}>Location</Text>
          {/* <View
            style={{
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
              marginBottom: 5,
            }}
          /> */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add to Fav</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PorductView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  HeaderImage: {
    position: "absolute",
    top: 40,
    width: 500,
    height: 300,
    height: 200,
  },
  Image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    flex: 1,
    bottom: 170,
    left: 5,
    marginLeft: 7,
    marginRight: 20,
    // justifyContent: "center",
    // alignItems: "center",
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
        // flex: 1,
        borderColor: "white",
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        elevation: 5,
        backgroundColor: "white",
        padding: 10,
        marginTop: 10,
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
