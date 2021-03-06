import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";
import Items from "../../components/Items";
import { auth, db } from "../../../firebase";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const FavProducts = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);

  const fetchAll = () => {
    db.collection("Product")
      .where("FavoritedBy", "==", auth.currentUser?.email)
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
    };
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([]);
    fetchAll();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      {data.length > 0 ? (
        <View style={styles.ListView}>
          <Text style={styles.title}>Favorites</Text>
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
              <Items
                id={item.id}
                title={item.title}
                dis={item.Description}
                img={item.Image}
                isNotFav={false}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.Text}>No Choosen products</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavProducts;

const styles = StyleSheet.create({
  ListView: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    // flex: 1,
    alignItems: "center",
  },
  list: {
    width: "85%",
  },
  Text: {
    textAlign: "center",
    marginTop: "50%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
    marginTop: "10%",
  },
  refresh: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});
