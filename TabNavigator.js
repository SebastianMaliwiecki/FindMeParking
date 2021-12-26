import * as React from 'react';
import { Settings, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }

const TabNavigator = () => {

    const tabColour = {
        focused: 'rgb(56,166,255)',
        notNofuced: '#748c94'
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions = {{
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 25,
                        left: 20,
                        right: 20,
                        height: 75,
                        borderRadius: 15,
                        backgroundColor: 'rgb(13,17,23)'
                    },
                    tabBarShowLabel: false,
                    headerShown: false
                }}
            >
                <Tab.Screen 
                    name="Permit_Map" 
                    component={HomeScreen} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems:'center', justifyContent:'center', top: 10}}>
                                <Entypo 
                                    name="map" 
                                    size={24} 
                                    color={focused ? tabColour.focused : tabColour.notNofuced} 
                                />
                                <Text style={{color: focused ? tabColour.focused : tabColour.notNofuced}}>Permit Map</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen 
                    name="Ask Chatbot" 
                    component={SettingsScreen} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems:'center', justifyContent:'center', top: 10}}>
                                <Entypo 
                                    name="chat" 
                                    size={24} 
                                    color={focused ? tabColour.focused : tabColour.notNofuced} 
                                />
                                <Text style={{color: focused ? tabColour.focused : tabColour.notNofuced}}>Ask Chatbot..</Text>
                            </View>
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigator
