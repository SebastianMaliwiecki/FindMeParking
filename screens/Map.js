import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import mapStyle from '../assets/map/MapStyle';
import * as Location from 'expo-location'; 

const latitudeDelta = 0.0922
const longitudeDelta = 0.0421

const Map = ({navigation}) => {
    
    // Set intial region location
    const [region, setRegion] = useState({
        latitude: 51.50850191003386,
        longitude: -0.12300140741851891,
        latitudeDelta,
        longitudeDelta
    });
    // Region location
    const [location, setLocation] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    // Current location of the user whilst travelling
    const [currentUserLocation, setCurrentUserLocation] = useState([]);
    const mapRef = useRef()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                lat: location.coords.latitude,
                long : location.coords.longitude,
            });
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta,
                longitudeDelta
            })
        })();
    }, []);

    useEffect(() => {
        animateToRegion();
    }, [region])

    const animateToRegion = () => {
        mapRef.current.animateToRegion(region, 1000);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Settings")
                }}
                style={styles.settings}
            >
                <View >
                    <Ionicons name="settings" size={27} color="white" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Car-Info")
                }}
                style={styles.car}
            >
                <View>
                    <FontAwesome5 name="car-side" size={24} color="white" />
                </View>
            </TouchableOpacity>
            
            <MapView
                ref={mapRef}
                mapPadding={{
                    bottom: 80,
                    top: 50
                }}
                style={{height:'100%', width:'100%'}}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                customMapStyle={mapStyle}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                showsScale={true}
                showsBuildings={true}
                showsPointsOfInteres={true}
                minZoomLevel={15}
                maxZoomLevel={16}
                onPress={ (event) => console.log(event.nativeEvent) }
                onUserLocationChange={ region => setCurrentUserLocation(region.nativeEvent.coordinate)}
            >
            </MapView>

            {/* <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'OK',
                onPress: () => {
                    // Do something
                },
                }}>
                Region location has been updated!
            </Snackbar> */}
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {

    },
    settings: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1
    },
    car: {
        position: 'absolute',
        top: 95,
        right: 20,
        zIndex: 1
    }
})