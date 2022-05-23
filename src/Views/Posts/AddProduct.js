import { SafeAreaView, Text } from "react-native";
import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Platform, Image, Switch } from "react-native";
import { auth, db, storage, firebase } from "../../../firebase";
import * as Location from 'expo-location';
import LottieView from "lottie-react-native";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from "react-redux";
import { PostProduct } from "../../redux/actions/postAction";

const AddProduct = ({ navigation }) => {
  const [location, setLocation] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState("");
  const [switchValue, setSwitchValue] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!auth.currentUser) {
      navigation.replace("Login");
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    const fileSize = pickerResult.base64.length * (3 / 4) - 2;
    if (fileSize >= 1000000) {
      alert("Choose a smaller sized image");
    } else {
      var url = Platform.OS === 'ios' ? pickerResult.uri.replace('file://', '')
        : pickerResult.uri;
      const filename = pickerResult.uri.substring(pickerResult.uri.lastIndexOf('/') + 1);
      setSelectedImage({
        uri: url,
        name: filename,
        type: 'image/jpg',
      });
      return;
    }
    return;
  };

  function handleUpload() {
    if (title === "" || number === "" || description === "" || selectedImage === null) {
      alert("Fill all fields");
      return;
    } else {
      if (location != null) {
        dispatch(PostProduct(selectedImage, {
          title: title,
          Name: auth.currentUser?.displayName,
          PhoneNumber: number,
          Description: description,
          Email: auth.currentUser?.email,
          Location: new firebase.firestore.GeoPoint(location?.coords.latitude, location?.coords.longitude),
          Switch: switchValue,
        }));
        navigation.replace("Home");
      }
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <View>
        {!location ?
          <>
            <LottieView
              source={require("../../../assets/88404-loading-bubbles.json")}
              style={styles.animation}
              autoPlay
            />
          </>
          :
          <>
            <View>
              <View style={styles.topNav}>
                <Text style={styles.title}>Share Your Food</Text>
              </View>
              <View style={styles.ImageContainer}>
                <Image source={{ uri: selectedImage.uri }} style={styles.Image} />
              </View>
              <TextInput
                placeholder="Enter title"
                placeholderTextColor="#003f5c"
                maxLength={30}
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.inputs}
              />
              <TextInput
                placeholder="Enter your Phone Number"
                placeholderTextColor="#003f5c"
                maxLength={15}
                value={number}
                onChangeText={(text) => setNumber(text)}
                style={styles.inputs}
              />
              <TextInput
                maxLength={220}
                placeholder="Enter Food Description"
                placeholderTextColor="#003f5c"
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.inputs}
              />
              <Switch
                trackColor={{ false: "#767577", true: "red" }}
                thumbColor={switchValue ? "red" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => {
                  setSwitchValue(value);
                }}
                value={switchValue}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity TouchableOpacity onPress={openImagePickerAsync} style={[styles.button, { marginBottom: 10 }]}>
                  <Text style={styles.buttonText}>Pick a photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleUpload} style={styles.button}>
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
          </>
        }
      </View>
    </SafeAreaView >
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  Image: {
    width: 150,
    height: 150,
  },
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  topNav: {
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
  },
  nav: {
    position: "relative",
  },
  container: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginLeft: 15,
    fontSize: 33,
    fontWeight: "900",
    color: "#000",
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
    backgroundColor: "#fc5c65",
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
  animation: {
    width: "100%",
    height: "90%",
  },
});
