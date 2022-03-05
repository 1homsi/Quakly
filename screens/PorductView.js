import { SafeAreaView, Text } from 'react-native'
import React from 'react'

const PorductView = ({ route }) => {
    const { id } = route.params;
    return (
        <SafeAreaView>
            <Text>{id}</Text>
        </SafeAreaView>
    )
}

export default PorductView