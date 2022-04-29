import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TravelUpdate from '../../TravelUpdate';
import SingleRoadUpdate from '../components/SingleRoadUpdate';
import SearchRoad from '../components/SearchRoad';





const Stack = createNativeStackNavigator();

const TravelStackNavigator = () => {
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
                name="Travel_update" 
                component={TravelUpdate} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="Single_road_update" 
                component={SingleRoadUpdate} 
                
                options={{
                    title: ''
                }}
            />
            <Stack.Screen 
                name="Search_road" 
                component={SearchRoad} 
                
                options={{
                    title: ''
                }}
            />
        </Stack.Navigator>
    )
}

export default TravelStackNavigator

const styles = StyleSheet.create({})