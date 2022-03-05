import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native'
import React from 'react'
import { db, auth } from '../firebase'

const MyProducts = () => {
    const [data, setData] = React.useState([])


    // if (auth.currentUser) {
    //     db.collection("Product").where("Email", "==", auth.currentUser?.email)
    //         .get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 console.log(Object.assign({ id: doc.id }, doc.data()));
    //                 let Userdata = Object.assign({ id: doc.id }, doc.data())
    //                 setData(e => [...e, Userdata]);
    //             });
    //         });
    // }


    React.useEffect(() => {
        if (!auth.currentUser) {
            navigation.replace("Login")
        }

        if (auth.currentUser) {
            if (auth.currentUser) {
                db.collection("Product").where("Email", "==", auth.currentUser?.email)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log(Object.assign({ id: doc.id }, doc.data()));
                            let Userdata = Object.assign({ id: doc.id }, doc.data())
                            setData(e => [...e, Userdata]);
                        });
                    });
            }
        }
    }, [])

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.description}>{title}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.id} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default MyProducts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});