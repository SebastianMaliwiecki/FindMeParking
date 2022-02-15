import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

const authContext = React.createContext();

export function useAuthContext() {
    return useContext(authContext);
};

export function AuthProvider({ children }) {

    const [CurrentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(async () => onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
    }));

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const Login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
     
    const Logout = () => { 
        return signOut(auth); 
    };

    const insertUserInfo = (name, email, carReg) => {
        return setDoc(doc(db, "users", email), {
            name: name,
            email: email,
            car_registration: carReg,
        });
    };

    const getUserInfo = async () => {
        const docRef = await getDoc(doc(db, "users", CurrentUser.email));
        const docSnap = await getDoc(docRef);
        console.log("test")
        return docSnap.data();
    }

    const authOptions = {
        CurrentUser,
        signUp,
        Login,
        Logout,
        insertUserInfo,
        getUserInfo,
    };

    return (
        <authContext.Provider value={authOptions}>
            {!loading && children}
        </authContext.Provider>
    )
}