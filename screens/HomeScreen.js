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
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchAll = () => {
    db.collection("Product")
      .where("ProductTaken", "!=", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let Userdata = Object.assign({ id: doc.id }, doc.data());
          setData((e) => [...e, Userdata]);
        });
      });
  };

  React.useEffect(() => {
    fetchAll();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([]);
    fetchAll();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Top}>
        <View style={{ flex: 1 }}>
          <Text placeholder="Test" style={styles.HeadTitlte}>
            Quakly
          </Text>
        </View>
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
          renderItem={({ item }) => (
            <Items title={item.title} dis={item.Description} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Icon
            style={styles.icon}
            reverseColor
            name="home"
            type="font-awesome"
            size={35}
            onPress={() => navigation.replace("Home")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItemAdd}>
          <Icon
            style={styles.icon}
            reverseColor
            name="plus"
            type="font-awesome"
            size={35}
            onPress={() => navigation.replace("AddProduct")}
          />
        </TouchableOpacity>
        <View>
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
              <TouchableOpacity style={styles.bottomNavItem}>
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
        </View>
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
  Top: {
    marginTop: 20,
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    height: "10%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  bottomNavItem: {
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  bottomNavItemAdd: {
    color: "black",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fc5c65",
    borderColor: "white",
    borderWidth: 8,
    paddingTop: 35,
    paddingHorizontal: 21,
    paddingBottom: 35,
    borderRadius: 100,
    marginBottom: 40,
  },
});
