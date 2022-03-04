import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
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
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleDeleteUser}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    }
});
