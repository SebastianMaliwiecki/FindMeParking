import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Map from './screens/Map';
import Settings from './screens/Settings';
import CarInfo from './screens/CarInfo';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Map" component={Map} />

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Car-Info" component={CarInfo} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator
