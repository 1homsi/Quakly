import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  Linking,
} from "react-native";
import React from "react";
import { db, auth } from '../../firebase'
import { useNavigation } from '@react-navigation/native'
import LottieView from "lottie-react-native";

const MyProducts = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!auth.currentUser) {
      navigation.replace("Login");
    }

    if (auth.currentUser) {
      db.collection("Product")
        .where("Email", "==", auth.currentUser?.email)
        .get()
        .then((querySnapshot) => {
          setLoading(false);
          querySnapshot.forEach((doc) => {
            let Userdata = Object.assign({ id: doc.id }, doc.data());
            setData((e) => [...e, Userdata]);
          });
        });
    }
  }, []);

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

  const handleDelete = (item) => {
    db.collection("Product").doc(item.id).delete();
    navigation.replace("Home");
  };

  const Item = (props) => (
    <View style={styles.item}>
      <Text style={styles.description}>{props.id}</Text>
      <Text
        style={styles.location}
        onPress={() => {
          openMaps(
            props.Location.coords.latitude,
            props.Location.coords.longitude
          );
        }}
      >
        Open Location
      </Text>
      <Text style={styles.delete} onPress={() => handleDelete(props.item)}>
        Delete item
      </Text>
      <Text style={styles.edit}>Edit Product</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item id={item.title} Location={item.Location} Delete={item.id} item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <>
          <LottieView
            source={require("../../assets/88404-loading-bubbles.json")}
            style={styles.animation}
            autoPlay
          />
        </>
      ) : (
        <>
          {data.length > 0 ? (
            <View style={styles.ListView}>
              <View style={styles.Top}>
                <View style={{ flex: 1 }}>
                  <Text placeholder="Test" style={styles.HeadTitlte}>
                    My Products
                  </Text>
                </View>
              </View>
              <FlatList
                style={styles.list}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <Text>No Products</Text>
          )}
        </>
      )}
      {/* <BottomNav /> */}
    </SafeAreaView>
  );
};

export default MyProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#dba0a3",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  animation: {
    width: "100%",
    height: "90%",
  },
  ListView: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    // marginTop: 50,

    // marginLeft: "15%",
  },
  list: {
    width: "100%",
    borderRadius: 50,
    borderColor: "black",
  },
  HeadTitlte: {
    marginLeft: "5%",
    fontSize: 40,
    fontWeight: "800",
    color: "#000",
  },
  Top: {
    marginTop: 20,
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
  },
  description: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
  },
  location: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
  },
  delete: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
  },
  edit: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
  },
});
