import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const TermsAndConditions = () => {
    return (
        <SafeAreaView>
            <View style={styles.Top}>
                <View style={{ flex: 1 }}>
                  <Text placeholder="Test" style={styles.HeadTitlte}>
                    Terms&Conditions
                  </Text>
                </View>
              </View>
              <View style={styles.main}>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
              </View>
        </SafeAreaView>
    )
}

export default TermsAndConditions

const styles = StyleSheet.create({
    Top: {
        marginTop: 20,
        flexDirection: "row",
        textAlign: "center",
        marginBottom: 12,
        marginTop: 40,
        paddingBottom: 10,
        paddingTop: 10,
      },
      HeadTitlte: {
        marginLeft: "5%",
        fontSize: 40,
        fontWeight: "800",
        color: "#000",
      },
        main: {
            marginTop: 10,
            flexDirection: "row",
            textAlign: "center",
            marginBottom: 12,
            marginTop: 30,
            paddingBottom: 30,
            paddingTop: 20,
            marginLeft: "7%",
            marginRight: "7%",
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: "#fff",
        },
        text: {
            marginLeft: "5%",
            fontSize: 20,
            fontWeight: "800",
            color: "#000",
            width: "auto",
            height: "auto",
        },
})