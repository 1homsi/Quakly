import { SafeAreaView, Text } from 'react-native'
import React from 'react'
import { auth } from "../firebase"

const AddProduct = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            {/* {!auth.currentUser ?
                <>
                    {navigation.replace("Home")}
                </>
                :
                <>
                    <Text>Hello world</Text>
                </>
            } */}
        </SafeAreaView>
    )
}

export default AddProduct