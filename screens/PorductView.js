import { SafeAreaView, Text } from 'react-native'
import React, { useEffect } from 'react'
import { db } from '../firebase';

const PorductView = ({ route }) => {
    const { id } = route.params;
    const [data, setData] = React.useState([]);

    useEffect(() => {
        db.collection("Product").doc(id).get().then((doc) => {
            console.log(doc.data());
            setData(doc.data());
        })
    }, [])

    return (
        <SafeAreaView>
            <Text>{id}</Text>
            <Text>{data.Name}</Text>
        </SafeAreaView>
    )
}

export default PorductView