import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import Items from '../components/Items'
import { auth } from '../firebase'
import Data from '../Data'
import { Icon } from "react-native-elements"

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Email: {auth.currentUser?.email}</Text> */}
      <View style={styles.Top}>
        <View style={{ flex: 1 }}>
          <Text placeholder="Test" style={styles.HeadTitlte} >Quakly</Text>
        </View>
        <Icon
          style={styles.icon}
          reverseColor
          name='plus'
          type='font-awesome'
          size={35}
          onPress={() => navigation.replace("AddProduct")}
        />
      </View>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <View style={styles.ListView}>
        <FlatList
          style={styles.list}
          data={Data}
          renderItem={({ item }) => (
            <Items title={item.title} dis={item.dis} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

    </SafeAreaView >
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  HeadTitlte: {
    marginLeft: "10%",
    fontSize: 30,
    fontWeight: "800",
    color: "#89CFF0",
  },
  icon: {
    marginRight: "15%",
    color: "#003f5c",
  },
  Top: {
    marginTop: 80,
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 15
  },
  ListView: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: "15%",
  },
  list: {
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
