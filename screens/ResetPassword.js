import { View, Text, TextInput, TouchableOpacity } from 'react-native'
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
        <View>
            <Text>Reset Password</Text>
            <TextInput
                placeholderTextColor="#003f5c"
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <View>
                <TouchableOpacity
                    onPress={handleReset}
                >
                    <Text >Login</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default ResetPassword