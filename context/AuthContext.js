import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword ,
    signOut
} from "firebase/auth";

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

    const insertUserInfo = (email, password, firstName, lastName) => {
        return db.collection('users').doc(email).set({
            Firstname: firstName,
            Lastname: lastName,
            Email: email,
            Password: password
        })
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