import React,{useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {db} from './firebase/index'


export default function App() {
  useEffect(()=>{
    db.collection("test").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          console.log("test")
      });
    });
  })
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
