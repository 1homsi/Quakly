import { StyleSheet, SafeAreaView, Text, View, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import Items from '../components/Items';
import { auth, db } from '../../firebase';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Choosen = () => {
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
        }
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setData([]);
        fetchAll();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView>
            {
                data.length > 0 ?
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
                                <Items id={item.id} title={item.title} dis={item.Description} img={item.Image} isNotFav={false} />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View> :
                    <View>
                        <Text>No Choosen products</Text>
                    </View>
            }

        </SafeAreaView>
    )
}

export default Choosen

const styles = StyleSheet.create({})