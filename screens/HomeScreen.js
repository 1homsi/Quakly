import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import Items from "../components/Items";
import { auth, db } from "../firebase";
import { Icon } from "react-native-elements";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchAll = () => {
    db.collection("Product").where("ProductTaken", "!=", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let Userdata = Object.assign({ id: doc.id }, doc.data())
          setData(e => [...e, Userdata]);
        });
      });
  }

  React.useEffect(() => {
    fetchAll()
  }, []);




  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([]);
    fetchAll()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Top}>
        {!auth.currentUser ? (
          <>
            <Text
              onPress={() => {
                navigation.replace("Login");
              }}
            >
              lol
            </Text>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.ProfileDot}>
              <Icon
                style={styles.icon}
                reverseColor
                name="user"
                type="font-awesome"
                size={35}
                onPress={() => navigation.navigate("Option")}
              />
            </TouchableOpacity>
          </>
        )}

        <View style={{ flex: 1 }}>
          <Text placeholder="Test" style={styles.HeadTitlte}>
            Quakly
          </Text>
        </View>
        <TouchableOpacity style={styles.addProd}>
          <Icon
            style={styles.iconAdd}
            reverseColor
            name="plus"
            type="font-awesome"
            size={36}
            onPress={() => navigation.replace("AddProduct")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.ListView}>
        <FlatList
          refreshControl={
            <RefreshControl
              style={styles.refresh}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          style={styles.list}
          data={data}
          renderItem={({ item }) => <Items title={item.title} dis={item.Description} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HeadTitlte: {
    marginLeft: "5%",
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
  },
  icon: {
    marginRight: "10%",
    color: "#003f5c",
  },
  ProfileDot: {
    paddingLeft: "3%",
    paddingTop: "0.5%",
  },
  Top: {
    marginTop: 20,
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
    // backgroundColor: "#fc5c65",
  },
  ListView: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: "15%",
  },
  list: {
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  iconAdd: {
    color: "#003f5c",
  },
  addProd: {
    paddingRight: "3%",
    paddingTop: "0.8%",
  },
});
