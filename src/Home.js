import React from "react";
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Switch,
} from "react-native";
import Items from "./components/Items";
import { db } from "../firebase";
import BottomNav from "./components/BottomNav";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = () => {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [isEnabled, setIsEnabled] = React.useState(true);

  const fetchAll = async () => {
    db.collection("Product")
      .where("ProductTaken", "!=", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let Userdata = Object.assign({ id: doc.id }, doc.data());
          if (isEnabled) {
            if (!doc.data().isMedicine) setData((e) => [...e, Userdata]);
            setIsEnabled(false);
          } else {
            if (doc.data().isMedicine) setData((e) => [...e, Userdata]);
            setIsEnabled(true);
          };
        });
      });
  };

  React.useEffect(() => {
    fetchAll();
    return () => {
      setData();
    };
  }, []);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([]);
    fetchAll();
    wait(500).then(() => setRefreshing(false));
  }, []);

  const filtered = data?.filter((prop) =>
    prop.title.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Top}>
        <Text placeholder="Test" style={styles.HeadTitlte}>
          Quakly
        </Text>
        <Switch
          style={styles.Switch}
          trackColor={{ false: "#767577", true: "red" }}
          thumbColor={isEnabled ? "red" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => {
            setIsEnabled(value);
            setData([]);
            fetchAll();
          }}
          value={isEnabled}
        />
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
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
          data={filtered}
          renderItem={({ item }) => (
            <Items id={item.id} title={item.title} dis={item.Description} img={item.Image} isNotFav={true} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <BottomNav />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Switch: {
    position: "absolute",
    left: 160,
    top: 7,
  },
  searchBarContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
  },
  searchBar: {
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    paddingLeft: 20,
    marginTop: 4,
    fontWeight: "bold",
  },
  HeadTitlte: {
    fontSize: 40,
    fontWeight: "800",
    color: "#000",
  },
  Top: {
    marginTop: "15%",
    marginBottom: 12,
  },
  ListView: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  list: {
    width: "85%",
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
  refresh: {

  }
});
