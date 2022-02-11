import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

const authContext = React.createContext();

export function useAuthContext() {
    return useContext(authContext);
};

export function AuthProvider({ children }) {

    const [CurrentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => onAuthStateChanged(auth, (user) => {
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
        console.log(CurrentUser.uid);
        return setDoc(doc(db, "users", email), {
            name: name,
            email: email,
            car_registration: carReg,
        });
    };

    const userInfo = {
        CurrentUser,
        signUp,
        Login,
        Logout,
        insertUserInfo,
    };

    return (
        <authContext.Provider value={userInfo}>
            {!loading && children}
        </authContext.Provider>
    )
}