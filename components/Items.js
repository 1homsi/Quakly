import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Items = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.navigate("ViewProduct", {id: props.id})
                // { screen: "ViewProduct", params: { id: props.id } }
        }}>
            <Text style={styles.title}>{props.title}</Text>
            <Text>{props.dis}</Text>
        </TouchableOpacity >
    )
}

export default Items

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dba0a3',
        width: '85%',
        height: 110,
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
    },
    image: {
        width: 85,
        height: 82,
        marginRight: "30%"
    },
    title: {
        fontSize: 20,
    }
})  