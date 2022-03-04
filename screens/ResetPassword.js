import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const ResetPassword = () => {
    const [email, setEmail] = React.useState('')
    const navigation = useNavigation()

    const handleReset = () => {
        auth.sendPasswordResetEmail(email)
            .catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                alert("Error please try again later")
            });
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Reset Password</Text>
            <TextInput
                placeholderTextColor="#003f5c"
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />

            <View>
                <TouchableOpacity
                    onPress={handleReset}
                >
                    <Text style={styles.resetPass}>Reset Password</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1.5,
        borderColor: "#003f5c",
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 10,
      },
      sectionTitle: {
        color: '#4ecdc4',
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        marginTop: 30,
        textAlign: 'center'
      },
      resetPass:{
        borderWidth: 1.5,
        borderColor: "#89CFF0",
        backgroundColor: "#89CFF0",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 20,
        color: 'white',
        fontWeight: '700',
        fontSize: 17,
        textAlign: 'center',
      }
});