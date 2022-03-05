import { View, FlatList, StyleSheet, SafeAreaView, Text, Platform, Linking } from 'react-native'
import React from 'react'
import { db, auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const MyProducts = () => {
    const navigation = useNavigation();
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (!auth.currentUser) {
            navigation.replace("Login")
        }


        if (auth.currentUser) {
            db.collection("Product").where("Email", "==", auth.currentUser?.email)
                .get()
                .then((querySnapshot) => {
                    setLoading(false)
                    querySnapshot.forEach((doc) => {
                        // console.log(Object.assign({ id: doc.id }, doc.data()));
                        let Userdata = Object.assign({ id: doc.id }, doc.data())
                        setData(e => [...e, Userdata]);
                    });
                });
        }
    }, [])

    const openMaps = (lat, lng) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    }

    const handleDelete = (item) => {
        // console.log(item.id)
        db.collection("Product").doc(item.id).delete()
        //TODO: remove product from state array
        navigation.replace("Home")
    }

    const Item = (props) => (
        <View style={styles.item}>
            <Text style={styles.description}>{props.id}</Text>
            <Text onPress={() => { openMaps(props.Location.coords.latitude, props.Location.coords.longitude) }}>Open Location</Text>
            <Text onPress={() => handleDelete(props.item)}>Delete item</Text>
        </View >
    );

    const renderItem = ({ item }) => (
        <Item id={item.id} Location={item.Location} Delete={item.id} item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            {loading ?
                <>
                    <Text>Loading</Text>
                </>
                :
                <>
                    {data.length > 0 ?
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                        :
                        <Text>No Products</Text>
                    }
                </>
            }
        </SafeAreaView>
    )
}

export default MyProducts

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#D1C7C7',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});