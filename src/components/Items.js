import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Items = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.navigate("ViewProduct", { id: props.id, IsFav: props.isNotFav })
        }}>
            {
                props.img ? <Image
                    style={styles.image}
                    source={{ uri: `${props.img}` }} /> :
                    <>
                        {/* TODO:Do something */}
                    </>
            }
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{
                    props.title.length > 19 ? props.title.substring(0, 19) + "..." : props.title
                }</Text>
                <Text style={styles.des}>{
                    props.dis.length > 75 ?
                        props.dis.substring(0, 75) + `... \nPress to read more` : props.dis
                }</Text>
            </View>
        </TouchableOpacity >
    )
}

export default Items

const styles = StyleSheet.create({
    des: {
        width: 230
    },
    image: {
        borderRadius: 10,
        width: 85,
        height: 85
    },
    container: {
        backgroundColor: '#dba0a3',
        width: '85%',
        height: 115,
        padding: 15,
        borderRadius: 10,
        marginTop: 25,
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    innerContainer: {
        marginLeft: 15,
    }
})  