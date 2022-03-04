import { View, FlatList } from 'react-native'
import React from 'react'
import { db, auth } from '../firebase'
import Items from "../components/Items"

const MyProducts = () => {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        if (!auth.currentUser) {
            navigation.replace("Login")
        }
        if (auth.currentUser) {
            db.collection("Product").where("Email", "==", auth.currentUser?.email)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setData(doc.id + doc.data())
                        console.log(data)
                    });
                });
        }
    }, [])

    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Items title={item.id} dis={item.Description} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default MyProducts