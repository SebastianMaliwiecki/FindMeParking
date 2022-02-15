import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { doc, getDoc } from "firebase/firestore"
import {db} from '../firebase';
import { useAuthContext } from '../context/AuthContext';
import { getULEZInfo } from '../api/TFL';
import { useUserContext } from '../context/UserContext';

const CarInfo = () => {

  const { CurrentUser} = useAuthContext();
  const {info} = useUserContext();
  console.log(info);

  const[carInfo, setCarInfo] = useState("");

  useEffect(async () => {
    const docRef = doc(db, "users", CurrentUser.email);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().name);
    // setCarInfo(getULEZInfo(docSnap.data().car_registration));
    //console.log(getULEZInfo(docSnap.data().car_registration));
    //const info = await (await getDoc(doc(db, "users", CurrentUser.email))).data();
    // const res = await fetch(`https://api.tfl.gov.uk/Vehicle/UlezCompliance?vrm=${info.car_registration}`)
    // const data = await res.json()
    console.log(docSnap.data())
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CarInfo</Text>
    </View>
  )
}

export default CarInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(7,10,14)'
  },
  text : {
    color : 'white',
  }
})