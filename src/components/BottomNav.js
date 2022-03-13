import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from '@react-navigation/native'
import { auth } from '../../firebase';

const BottomNav = () => {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <View style={styles.container}>
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Icon
                        style={styles.icon}
                        color={route.name != "Home" ?
                            '#000' :
                            '#ff7f77'
                        }
                        reverseColor
                        name="home"
                        type="font-awesome-5"
                        size={35}
                        onPress={() => {
                            if (route.name != "Home") {
                                navigation.replace("Home")
                            }
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.replace("AddProduct")}
                    style={route.name === "AddProduct" ?
                        [styles.SemiRed, styles.bottomNavItemAdd]
                        :
                        [styles.bottomNavItemAdd, styles.bottomNavItemAddNot]
                    }>
                    <Icon
                        style={styles.iconPlus}
                        reverseColor
                        name="plus"
                        type="font-awesome-5"
                        size={35}
                    />
                </TouchableOpacity>
                <View>
                    {!auth.currentUser ? (
                        <>
                            <Icon
                                style={styles.icon}
                                reverseColor
                                name="login"
                                type="Entypo"
                                size={35}
                                onPress={() => navigation.replace("Login")}
                            />
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.bottomNavItem}>
                                <Icon
                                    style={styles.icon}
                                    color={route.name === "Option" ?
                                        '#ff7f77' :
                                        '#000'
                                    }
                                    reverseColor
                                    name="user"
                                    type="feather"
                                    size={35}
                                    onPress={() => navigation.replace("Option")}
                                />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
            { }
        </View >
    )
}

export default BottomNav

const styles = StyleSheet.create({
    container: {
        flex: Platform.OS === 'ios' ? 0.08 : 0.1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "absolute",
        bottom: Platform.OS === 'ios' ? -5 : 0,
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
        borderColor: "white",
        borderWidth: 8,
        paddingTop: 17,
        paddingHorizontal: 20,
        paddingBottom: 17,
        borderRadius: 100,
        marginBottom: 40,
        height: 100,
        width: 100,
    },
    bottomNavItemAddNot: {
        backgroundColor: "#fc5c65",
    },
    SemiRed: {
        backgroundColor: "#ff7f73",
    },
    iconPlus: {
        position: "relative",
        color: "black",
    }
})