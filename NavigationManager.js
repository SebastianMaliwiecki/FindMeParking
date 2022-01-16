import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Login from './screens/Login';
import { useAuthContext } from './context/AuthContext';
import TabNavigator from './TabNavigator';
import AuthStackNav from './AuthStackNav';

const NavigationManager = () => {

    const { CurrentUser } = useAuthContext();
    
    return (
        <>{CurrentUser ? <TabNavigator /> : <AuthStackNav/>}</>
    )
}

export default NavigationManager

const styles = StyleSheet.create({})
