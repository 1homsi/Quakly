import { View, Text } from 'react-native'
import React from 'react'
import { auth } from "../firebase"

const AddProduct = () => {
    const navigation = useNavigation()
    return (
        <View>
            {!auth.currentUser ?
                <>
                    {navigation.replace("Home")}
                </>
                :
                <>
                    <Text>Hello world</Text>
                </>
            }
        </View>
    )
}

export default AddProduct