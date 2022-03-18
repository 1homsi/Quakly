import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import Items from "../components/Items";
import { db } from "../../firebase";
import BottomNav from "../components/BottomNav";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
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
    return () => {
      setData();
    }
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([]);
    fetchAll();
    wait(1000).then(() => setRefreshing(false));
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
            <Items id={item.id} title={item.title} dis={item.Description} img={item.Image} isNotFav={true} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <BottomNav />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  refresh: {

  }
});
