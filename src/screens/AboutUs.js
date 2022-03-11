import { StyleSheet, SafeAreaView, Text, TextInput, View } from 'react-native'
import { Icon } from "react-native-elements";
import React from 'react'

const AboutUs = () => {
    return (
        <SafeAreaView>
            <Text style={styles.title}>
                Contact Us
            </Text>
            <View style={styles.mainCard}>
                <View style={styles.info}>
                    <Icon
                        style={styles.iconPlus}
                        color="#fc5c65"
                        name="phone"
                        type="font-awesome-5"
                        size={30}
                    />
                    <Text style={styles.info_text}>
                        XXX-XXX-XXXX
                    </Text>

                </View>
                <View style={styles.info}>
                <Icon
                        style={styles.iconPlus}
                        color="#fc5c65"
                        name="envelope"
                        type="font-awesome-5"
                        size={30}
                    />
                    <Text style={styles.info_text}>
                        XXX-XXX-XXXX
                    </Text>
                </View>
                <View style={styles.info}>
                <Icon
                        style={styles.iconPlus}
                        color="#fc5c65"
                        name="paper-plane"
                        type="font-awesome-5"
                        size={30}
                    />
                    <Text style={styles.info_text}>
                        XXX-XXX-XXXX
                    </Text>
                    
                </View>
                <View style={styles.info}>
                    <TextInput
                    placeholder='Name'
                    style={styles.input}
                    />
                    <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onFocus={() => this.onFocus()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AboutUs

// onFocus() {
//     this.setState({
//         color: '#fc5c65'
//     })
// }

const styles = StyleSheet.create({
    mainCard: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '15%',
        height: '70%',
        width: '90%',
        backgroundColor: '#fff',
        borderTopRightRadius: 150,   
        borderRadius: 5,   
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowColor: "red",
        elevation: 10,
        
        

    },
    title: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'Roboto',
        fontSize: 40,
        fontWeight: 'bold',
        borderBottomWidth: 3,
        borderBottomColor: '#fc5c65',
        color: '#fc5c65',
        marginTop: '10%',
    },
    iconPlus: {

        marginTop: '10%',
        marginBottom: '10%',
        color: '#fc5c65',
        marginLeft: '10%',
    },
    info: {
        flexDirection: 'row',
        marginTop: '10%',
    },
    info_text: {
        marginTop: '2%',
        fontFamily: 'Roboto',
        fontSize: 20,

    },
    input: {
        width: '42.5%',
        marginLeft: '5%',
        color: '#003f5c',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        // onfocus: {
        //     borderBottomColor: '#fc5c65',
        //     color: '#fc5c65',
        // }
    },
})