import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { doc, getDoc, collection, getDocs} from "firebase/firestore";
import {db} from '../firebase';

const AddPermit = ({permitBoundaries, setPermitBoundaries}) => {
    useEffect(async()=> {
        // const querySnapshot = await getDocs(collection(db, "LBBD"));
        
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data().boundary);
        //     let geoPoints = [];
        //     doc.data().boundary.map(coor => {
        //         geoPoints.push({
        //             latitude: coor.latitude,
        //             longitude: coor.longitude,
        //         })
        //     })
        //     console.log(doc.id, geoPoints)
        //     setPermitBoundaries([...permitBoundaries, {
        //         boundary: geoPoints,
        //     }])
        //     //geoPoints = []
        //     console.log(allBoundaries)
        // });
        //console.log("FIRE: ", fireBound);

        const docRef = doc(db, "LBBD", "zone-a");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            let geoPoints = [];
            docSnap.data().boundary.map(coor => {
                geoPoints.push({
                    latitude: coor.latitude,
                    longitude: coor.longitude,
                })
            })
            console.log(geoPoints)
            appendNew(geoPoints, 2345234)
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }

        //console.log("permit", permitBoundaries)

        // const docRefb = doc(db, "LBBD", "zone-b");
        // const docSnapb = await getDoc(docRefb);

        // if (docSnapb.exists()) {
        //     //console.log("Document data:", docSnapb.data());
        //     let geoPointsb = [];
        //     docSnapb.data().boundary.map(coor => {
        //         geoPointsb.push({
        //             latitude: coor.latitude,
        //             longitude: coor.longitude,
        //         })
        //     })
        //     //console.log(geoPointsb)
        //     setPermitBoundaries([...permitBoundaries, {
        //         boundary: geoPointsb,
        //     }])
        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        // }

        // setPermitBoundaries([...permitBoundaries, {
        //     boundary: [
        //         {longitude:0.1410627, latitude:51.5395023},
        //         {longitude:0.1416636, latitude:51.5381544},
        //         {longitude:0.1446033, latitude:51.5384480},
        //         {longitude:0.1439166, latitude:51.5395691},
        //         {longitude:0.1410627, latitude:51.5395023},
        //     ],
        // }])
        appendNew([
            {longitude:0.1410627, latitude:51.5395023},
            {longitude:0.1416636, latitude:51.5381544},
            {longitude:0.1446033, latitude:51.5384480},
            {longitude:0.1439166, latitude:51.5395691},
            {longitude:0.1410627, latitude:51.5395023},
        ], 34534758)
        console.log("permit", permitBoundaries)
    },[])
     
    function appendNew(object, key) {
        setPermitBoundaries([permitBoundaries, {
            boundary: object,
            key: key
        }])
    }

    return (
        <>
        </>
    )
}

export default AddPermit