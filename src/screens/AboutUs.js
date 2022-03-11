import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AboutUs = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Contact Us</Text>
      <View style={styles.mainCard}>
        <View style={styles.info}>
          <Icon
            style={styles.iconPlus}
            color="#fc5c65"
            name="phone"
            type="font-awesome-5"
            size={30}
          />
          <Text style={styles.info_text}>XXX-XXX-XXXX</Text>
        </View>
        <View style={styles.info}>
          <Icon
            style={styles.iconPlus}
            color="#fc5c65"
            name="envelope"
            type="font-awesome-5"
            size={30}
          />
          <Text style={styles.info_text}>XXX-XXX-XXXX</Text>
        </View>
        <View style={styles.info}>
          <Icon
            style={styles.iconPlus}
            color="#fc5c65"
            name="paper-plane"
            type="font-awesome-5"
            size={30}
          />
          <Text style={styles.info_text}>XXX-XXX-XXXX</Text>
        </View>
        <View style={styles.info}>
          <TextInput placeholder="Name" style={styles.input} />
          <TextInput placeholder="Email" style={styles.input} />
        </View>
        <TextInput
          placeholder="Message"
          style={styles.input_field}
          textAlignVertical="top"
          multiline={true}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.replace("Option")}
        style={styles.buttonOutline}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  mainCard: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "15%",
    height: "60%",
    width: "90%",
    backgroundColor: "#fff",
    borderTopRightRadius: 150,
    borderRadius: 5,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    shadowColor: "red",
    elevation: 10,
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Roboto",
    fontSize: 40,
    fontWeight: "bold",
    borderBottomWidth: 3,
    borderBottomColor: "#fc5c65",
    color: "#fc5c65",
    marginTop: "10%",
  },
  iconPlus: {
    marginTop: "10%",
    marginBottom: "10%",
    color: "#fc5c65",
    marginLeft: "10%",
  },
  info: {
    flexDirection: "row",
    marginTop: "10%",
  },
  info_text: {
    marginTop: "2%",
    fontFamily: "Roboto",
    fontSize: 20,
  },
  input: {
    width: "42.5%",
    marginLeft: "5%",
    color: "#003f5c",
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  input_field: {
    width: "90%",
    marginLeft: "5%",
    borderWidth: 1,
    borderColor: "grey",
    marginTop: "5%",
    height: "30%",
    borderRadius: 5,
    fontSize: 17,
    padding: 15,
    marginBottom: "5%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  buttonOutline: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
  },

  button: {
    backgroundColor: "#fc5c65",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
  },
  safeArea: {
    width: "100%",
  },
});
