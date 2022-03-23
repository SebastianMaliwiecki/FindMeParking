import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PermitList from '../../PermitList';
import PermitZone from '../components/PermitZone';


const Stack = createNativeStackNavigator();

const ListStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Permit_List'
            screenOptions={{
                headerStyle: {
                  backgroundColor: 'rgb(7,10,14)',
                },
                headerTintColor: '#03a9f4',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: '#fff',
                  opacity: 0.5,
                },
            }}
        >
            <Stack.Screen 
                name="Permit_List" 
                component={PermitList} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="Permit zone" 
                component={PermitZone} 
                options={{

                }}
            />
        </Stack.Navigator>
    )
}

export default ListStackNavigator

const styles = StyleSheet.create({})