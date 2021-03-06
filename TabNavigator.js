import * as React from 'react';
import { Settings, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';

import Map from './screens/Map';
import Chatbot from './screens/Chatbot';
import PermitList from './screens/PermitList';
import TravelUpdate from './screens/TravelUpdate';
import ListStackNavigator from './screens/PermitList/navigation/ListStackNavigator';
import TravelStackNavigator from './screens/TravelUpdate/navigation/TravelStackNavigator';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    const tabColour = {
        focused: 'rgb(56,166,255)',
        notNofuced: '#748c94'
    }

    return (
        <Tab.Navigator
            screenOptions = {{
                tabBarStyle: {
                    position: 'absolute',
                    justifyContent: 'center',
                    height: 85,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: 'rgb(13,17,23)',
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderBottomWidth: 0,
                },
                tabBarShowLabel: false,
                headerShown: false
            }}
        >
            <Tab.Screen 
                name="Permit_Map" 
                component={StackNavigator} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems:'center', justifyContent:'center',  width: 100,}}>
                            <Entypo 
                                name="map" 
                                size={20} 
                                color={focused ? tabColour.focused : tabColour.notNofuced} 
                            />
                            <Text style={{color: focused ? tabColour.focused : tabColour.notNofuced, fontSize: 11}}>Permit Map</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="PermitList" 
                component={ListStackNavigator} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems:'center', justifyContent:'center', width: 100,}}>
                            <Entypo 
                                name="list" 
                                size={20} 
                                color={focused ? tabColour.focused : tabColour.notNofuced} 
                            />
                            <Text style={{color: focused ? tabColour.focused : tabColour.notNofuced, fontSize: 11}}>Permit List</Text>
                        </View>
                    )
                }}
            /> 
            <Tab.Screen 
                name="TravelUpdate" 
                component={TravelStackNavigator} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems:'center', justifyContent:'center', width: 100,}}>
                            <FontAwesome name="road" size={20} color={focused ? tabColour.focused : tabColour.notNofuced} />
                            <Text style={{color: focused ? tabColour.focused : tabColour.notNofuced, fontSize: 11}}>Travel update</Text>
                        </View>
                    )
                }}
            /> 
            <Tab.Screen 
                name="Ask Chatbot" 
                component={Chatbot} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems:'center', justifyContent:'center', width: 100,}}>
                            <FontAwesome5 name="car-side" size={20} color={focused ? tabColour.focused : tabColour.notNofuced} />
                            <Text style={{color: focused ? tabColour.focused : tabColour.notNofuced, fontSize: 11}}>Car compliance</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator
