import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import MapView, {Polygon, PROVIDER_GOOGLE} from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import mapStyle from '../assets/map/MapStyle';
import * as Location from 'expo-location'; 
import * as geolib from 'geolib';
import { doc, getDoc, collection, getDocs, setDoc, GeoPoint} from "firebase/firestore";
import {db} from '../firebase';
import { usePermitContext } from '../context/PermitContext';

const latitudeDelta = 0.0922
const longitudeDelta = 0.0421

const Map = ({navigation}) => {

    const {permitData} = usePermitContext();
    
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
    const polyRef = useRef()
    const [permitMessage, setPermitMessage] = useState("");

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
    
    const permitBoundary =  {
    }

    // useEffect(async () => {
    //     console.log("run")
    //     let bounds = []
    //     for(let i=0; i<permitBoundary.coordinates[0].length; i++) {
    //         bounds.push({
    //             latitude: permitBoundary.coordinates[0][i][1],
    //             longitude: permitBoundary.coordinates[0][i][0],
    //         })
    //     }
    //     console.log(bounds)
    //     return await setDoc(doc(db, "Permit_zones", "zone-c"), {
    //         boundary: bounds
    //     });
    // }, [])

    const [inPermitZone, setInPertmitZone] = useState(false)
    const [currentPermitZone, setCurreontPermitZone] = useState([])

    /*
        - a way to check what the time is and set a message based on the time, if the user is in zone during permit time display proper message and
        vice versa.
        
    */

    function decimalToHourMinsConverter(time) {
        var n = new Date(0,0);
        n.setMinutes(+time * 60);
        return n.toTimeString().slice(0, 5);
    }

    useEffect(() => {
        try {
            if(inPermitZone) {
                if(geolib.isPointInPolygon({ latitude: currentUserLocation.latitude, longitude: currentUserLocation.longitude }, currentPermitZone.boundary)) {
                    setPermitMessage(`You cannot park here till ${decimalToHourMinsConverter(currentPermitZone.end)}`)
                }
            }

            if(!inPermitZone) {
                
                permitData.map((item) => {
                    let boundaries = geolib.isPointInPolygon({ latitude: currentUserLocation.latitude, longitude: currentUserLocation.longitude }, item.boundary)
                    
                    if(boundaries) {
                        setPermitMessage(`You can park here till ${item.end}`)
                        setCurreontPermitZone(item)
                        setInPertmitZone(true)
                    }
                    else {
                        setPermitMessage("Not in any zone")
                    }
                })
            }
        }
        catch(e) {
            setPermitMessage("Fetching data!")
        }
    }, [currentUserLocation])

    function timeToDecimal(t) {
        var arr = t.split(':');
        var dec = parseInt((arr[1]/6)*10, 10);
    
        return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);
    }  

    const permitZoneColour = (start, end) => {
        const currentTimeStringFormat = `${new Date().getHours()}:${new Date().getMinutes()}`
        const now = timeToDecimal(currentTimeStringFormat)
        //console.log(timeToDecimal("17:26"))
        if (now >= start && now < end) {
            return "rgba(238, 22, 22, 0.12)" // red - cannot paork
        } else {
            return "rgba(39, 245, 50, 0.14)" // green - can park
        }
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.permitInfo}
            >
                <View style={{
                    
                }}>
                    <Text style={{color:"white",}}>
                        {permitMessage}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={async () => {
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
                    bottom: 50,
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
                minZoomLevel={14}
                maxZoomLevel={15.3}
                //onPress={ (event) => console.log(event.nativeEvent) }
                onUserLocationChange={ region => setCurrentUserLocation(region.nativeEvent.coordinate)}
            >
                {
                    permitData.map(item => {
                        return (
                            <Polygon
                                //"rgba(238, 22, 22, 0.12)"
                                // 0.40 for darker red
                                fillColor={permitZoneColour(item.start, item.end)}
                                coordinates={item.boundary}
                                tappable={true}
                                onPress = {() => console.log("test")}
                            />
                        )
                    })
                }
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
        top: 50,
        right: 70,
        zIndex: 1
    },
    permitInfo: {
        position: 'absolute', 
        top: 40, 
        zIndex: 1, 
        left: 0, 
        right: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        height: 50,
        backgroundColor: 'rgb(13,17,23)',
        bottom: 0,
        width: '67%',
        flex: 1,
        marginLeft: 7,
        borderRadius: 15,
    }
})