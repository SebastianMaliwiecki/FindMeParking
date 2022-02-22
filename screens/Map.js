import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import MapView, {Polygon, PROVIDER_GOOGLE} from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import mapStyle from '../assets/map/MapStyle';
import BD from '../data/BD'
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
    const [boundary, setBoundary] = useState([]);

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

    // useEffect(async () => {
    //     const res = await fetch(`https://mapit.mysociety.org/area/2511.geojson`);
    //     const data = await res.json();
    //     console.log(JSON.stringify(data.coordinates[0][1][0]));
    //     data.coordinates[0].forEach(element => {
    //         setBoundary([...boundary, { 
    //             lat: element[1],   
    //             long: element[0]
    //         }])
    //     });
    //     // for(let i=0; i<20; i++) {
    //     //     setBoundary([...boundary, {id:i, bound:"test"}])
    //     // }
    //     // console.log("we are done")
    //     console.log(boundary[0])
    //     // console.log("we are done")
    // },[])

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
                maxZoomLevel={15.5}
                onPress={ (event) => console.log(event.nativeEvent) }
                onUserLocationChange={ region => setCurrentUserLocation(region.nativeEvent.coordinate)}
            >
                <Polygon
                    fillColor={"rgba(39, 245, 50, 0.14)"}
                    coordinates={[
                        // {latitude:51.5364326, longitude:0.1329982},
                        // {latitude:51.5336564, longitude:0.1329446},
                        // {latitude:51.5334027, longitude:0.1368527},
                        // {latitude:51.5364126, longitude:0.1367453},
                        // {latitude:51.5364326, longitude:0.1329982},

                        {longitude:0.1347274, latitude:51.5332426},
                        {longitude:0.1348078, latitude:51.5340635},
                        {longitude:0.1363850, latitude:51.5339667},
                        {longitude:0.1364440, latitude:51.5340935},
                        {longitude:0.1479936, latitude:51.5400962},
                        {longitude:0.1479506, latitude:51.5402764},
                        {longitude:0.1472211, latitude:51.5402164},
                        {longitude:0.1470387, latitude:51.5410438},
                        {longitude:0.1419425, latitude:51.5407435},
                        {longitude:0.1419747, latitude:51.5405633},
                        {longitude:0.1421678, latitude:51.5405700},
                        {longitude:0.1425540, latitude:51.5399094},
                        {longitude:0.1407838, latitude:51.5397960},
                        {longitude:0.1404405, latitude:51.5402964},
                        {longitude:0.1399577, latitude:51.5404899},
                        {longitude:0.1396358, latitude:51.5405166},
                        {longitude:0.1375329, latitude:51.5403965},
                        {longitude:0.1374471, latitude:51.5402831},
                        {longitude:0.1375759, latitude:51.5395624},
                        {longitude:0.1366425, latitude:51.5395090},
                        {longitude:0.1364493, latitude:51.5407569},
                        {longitude:0.1317823, latitude:51.5404099},
                        {longitude:0.1317930, latitude:51.5392021},
                        {longitude:0.1278985, latitude:51.5389285},
                        {longitude:0.1278448, latitude:51.5406901},
                        {longitude:0.1275229, latitude:51.5422115},
                        {longitude:0.1263857, latitude:51.5444668},
                        {longitude:0.1238537, latitude:51.5457913},
                        {longitude:0.1189774, latitude:51.5437596},
                        {longitude:0.1186126, latitude:51.5435627},
                        {longitude:0.1127064, latitude:51.5411305},
                        {longitude:0.1124597, latitude:51.5385347},
                        {longitude:0.1122987, latitude:51.5374737},
                        {longitude:0.1114082, latitude:51.5354650},
                        {longitude:0.1096380, latitude:51.5335095},
                        {longitude:0.1098633, latitude:51.5329956},
                        {longitude:0.1175988, latitude:51.5325952},
                        {longitude:0.1178348, latitude:51.5343438},
                        {longitude:0.1330268, latitude:51.5340835},
                        {longitude:0.1330483, latitude:51.5333026},
                    ]}
                />
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