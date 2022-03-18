import { SafeAreaView, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TextInput, TouchableOpacity, Platform, Image, Alert } from "react-native";
import { auth, db, storage, firebase } from "../../firebase";
import * as Location from 'expo-location';
import LottieView from "lottie-react-native";
import * as ImagePicker from 'expo-image-picker';

const AddProduct = () => {
  const navigation = useNavigation();
  const [location, setLocation] = React.useState(null);
  const [loading, setloading] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState("");
  const [ImageUrl, setImageUrl] = React.useState("");
  const [uploadLoading, setUploadLoading] = React.useState(false);

  React.useEffect(() => {
    if (!auth.currentUser) {
      navigation.replace("Login");
    } else {
      db.collection("Users").doc(auth.currentUser?.email).get().then((doc) => {
        setName(doc.data().Name);
        console.log(doc.data().Name);
      });
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
      setloading(false)
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    if (pickerResult.cancelled === true) {
      const fileSize = pickerResult.base64.length * (3 / 4) - 2;
      if (fileSize >= 1000000) {
        Alert.alert("Choose a smaller sized image");
      } else {
        setFileSizeError(false);
        return
      }
    }
    var url = Platform.OS === 'ios' ? pickerResult.uri.replace('file://', '')
      : pickerResult.uri
    const filename = pickerResult.uri.substring(pickerResult.uri.lastIndexOf('/') + 1)
    setSelectedImage({
      uri: url,
      name: filename,
      type: 'image/jpg',
    });
    console.log(selectedImage)
  };

  var Data = {
    title: title,
    Name: name || "Anonymous",
    PhoneNumber: number,
    Description: description,
    Email: auth.currentUser?.email,
    Location: location,
    FavoritedBy: "",
    ProductTaken: false,
    Image: ImageUrl
  };

  var checkToUpload = setInterval(Up, 30);

  function Up() {
    if (title === "" || number === "" || description === "" || name === "" || selectedImage === null) {
      return
    } else {
      if (location != null && uploadLoading === false && ImageUrl != "") {
        db.collection("Product").add(Data);
        navigation.replace("Home");
        clearInterval(checkToUpload);
      }
    }
  }

  const onUpload = async () => {
    setUploadLoading(true);
    const response = await fetch(selectedImage.uri);
    const blob = await response.blob();
    var uploadTask = storage.ref().child(selectedImage.name).put(blob, {
      contentType: 'image/jpg',
    });
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImageUrl(downloadURL);
          setUploadLoading(false);
        });
      }
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <View>
        {loading ?
          <>
            <LottieView
              source={require("../../assets/88404-loading-bubbles.json")}
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

              <View style={styles.buttonContainer}>
                {/* //TODO: FIX Choose button */}
                <TouchableOpacity TouchableOpacity onPress={openImagePickerAsync} style={[styles.button, { marginBottom: 10 }]}>
                  <Text style={styles.buttonText}>Pick a photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onUpload} style={styles.button}>
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
