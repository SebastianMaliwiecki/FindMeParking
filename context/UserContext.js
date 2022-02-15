import { View, Text } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { useAuthContext } from './AuthContext';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase';

const userContext = React.createContext();

export function useUserContext() {
    return useContext(userContext);
};

export const UserProvider = ({children}) => {

    const { CurrentUser } = useAuthContext();
    const [userInfo, setUserInfo] = useState();
    
    useEffect(async () => {
        try {
            const docRef = doc(db, "users", CurrentUser.email);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            setUserInfo(docSnap.data());
        }
        catch(e) {
            console.log(e);
        }
    }, [])

    const updateProfile = () => {

    }

    const userOptions = {
        info: userInfo,
        update: updateProfile,
    }

    return (
        <userContext.Provider value={userOptions}>
            {children}
        </userContext.Provider>
    )
}