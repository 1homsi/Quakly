import React from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";


export default function Option() {

    const navigation = useNavigation();

    // React.useEffect(() => {
    //     if (!auth.currentUser) {
    //         navigation.replace("Home")
    //     }
    // }, [])



    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const handleDeleteUser = () =>
        Alert.alert(
            "Delete Account",
            "Are you sure, you want to delete your account?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        auth.currentUser.delete()
                            .then(() => {
                                navigation.replace("Home")
                            })
                            .catch((error) => {
                                alert(error.message)
                            });
                    }
                }
            ]
        );

    return (
        <SafeAreaView style={styles.bigMain}>

            <View style={styles.topNav}>
                <Text style={styles.title}>Reset Password</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.emailSec}>Email: {auth.currentUser?.email}</Text>
                <TouchableOpacity
                    onPress={handleSignOut}
                    style={styles.button1}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.replace("MyProducts")}
                    style={styles.button1}
                >
                    <Text style={styles.buttonText}>My Products</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleDeleteUser}
                    style={styles.button2}
                >
                    <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bigMain: {
        flex: 1,
        backgroundColor: '#fff'
    },
    topNav: {
        backgroundColor: "darkblue",
        paddingTop: 60
    },
    container: {
        paddingBottom: "80%",
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginLeft: 10,
        marginBottom: 40,
        color: 'white',
        fontSize: 25,
        fontWeight: "bold"
    },
    emailSec: {
        fontSize: 22
    },
    button1: {
        backgroundColor: '#89CFF0',
        width: '100%',
        padding: 20,
        borderRadius: 30,
        alignItems: 'center',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button2: {
        backgroundColor: 'red',
        width: '100%',
        padding: 20,
        borderRadius: 30,
        alignItems: 'center',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});
