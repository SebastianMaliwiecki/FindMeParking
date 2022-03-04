import React, {useContext, useEffect, useState} from 'react'
import { doc, getDoc, collection, getDocs} from "firebase/firestore";
import {db} from '../firebase';

const permitContext = React.createContext();

export function usePermitContext() {
    return useContext(permitContext);
};

export const PermitProvider = ({children}) => {

    let permsD = [];

    useEffect( async () => {
        try {
            const permits = collection(db, 'LBBD');
            await getDocs(permits).then((snapshoot)=> {
                snapshoot.docs.forEach(doc => {
                    let geoPoints = [];
                    doc.data().boundary.map(coor => {
                        geoPoints.push({
                            latitude: coor.latitude,
                            longitude: coor.longitude,
                        })
                    })
                    permsD.push({boundary: geoPoints})
                })
            })
        } catch {
            console.log("Error has occured when fetching permit data!")
        }
    }, [])

    permitInfo={
        permitData: permsD
    }

    return (
        <permitContext.Provider value={permitInfo}>
            {children}
        </permitContext.Provider>
    )
}