import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Items = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.inner}>
                {/* <Image style={styles.image} source={require("../images/Login.png")} /> */}
                <Text>{props.title}</Text>
            </View>
            <Text>{props.dis}</Text>
            {/* //TODO: Make a TouchableOpacity */}
            <Text onPress={() => {
                navigation.replace("ViewProduct"),
                    { screen: "ViewProduct", params: { id: props.id } }
            }}>Open</Text>
        </TouchableOpacity >
    )
}

export default Items

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D1C7C7',
        width: '85%',
        height: 110,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    inner: {
        // flexDirection: 'row'
    },
    image: {
        width: 85,
        height: 82,
        marginRight: "30%"
    },
    title: {
        // marginLeft: "30%"
    }
})  