import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import MapView, {Polygon, PROVIDER_GOOGLE} from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import mapStyle from '../assets/map/MapStyle';
import BD from '../data/BD'
import * as Location from 'expo-location'; 
import * as geolib from 'geolib';
import { doc, getDoc, collection, getDocs} from "firebase/firestore";
import {db} from '../firebase';
import AddPermit from './AddPermit';
import { usePermitContext } from '../context/PermitContext';

const latitudeDelta = 0.0922
const longitudeDelta = 0.0421

const Map = ({navigation}) => {

    const {permitData} = usePermitContext()
    //console.log("From maps", permitData)

    const [fireBound, setFireBound] = useState([]);
    const [testOf, setTestOf] = useState([])
    const allBoundaries = [];

    
    //console.log("FIRE: ", fireBound);
    
    
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
    const [boundary, setBoundary] = useState([]);
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

    const [tempBoundary, setTempBoundary] = useState([]);

    // useEffect(async () => {
    //     const res = await fetch(`https://mapit.mysociety.org/area/2511.geojson`);
    //     const data = await res.json();
    //     console.log(JSON.stringify(data.coordinates[0][1][0]));
        
    //     data.coordinates[0].forEach(element => {
    //         setTempBoundary(...tempBoundary, {
    //             latitude: element[1],
    //             longitude: element[0],
    //         })
    //     });
    //     console.log(tempBoundary)
    //     // for(let i=0; i<20; i++) {
    //     //     setBoundary([...boundary, {id:i, bound:"test"}])
    //     // }
    //     // console.log("we are done")
    //     // console.log("we are done")
    // }, [])

    useEffect(() => {
        animateToRegion();
    }, [region])

    const animateToRegion = () => {
        mapRef.current.animateToRegion(region, 1000);
    }
    
    const [permitBoundaries, setPermitBoundaries] = useState([
        {
            boundary: [
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
            ]
        },
        {
            boundary: [
                {longitude:0.1364064, latitude:51.5340368},
                {longitude:0.1362455, latitude:51.5328555},
                {longitude:0.1383805, latitude:51.5326286},
                {longitude:0.1381445, latitude:51.5314673},
                {longitude:0.1432621, latitude:51.5314606},
                {longitude:0.1429081, latitude:51.5331491},
                {longitude:0.1477790, latitude:51.5317476},
                {longitude:0.1519847, latitude:51.5304394},
                {longitude:0.1541519, latitude:51.5296518},
                {longitude:0.1547313, latitude:51.5293448},
                {longitude:0.1554179, latitude:51.5299055},
                {longitude:0.1556325, latitude:51.5307064},
                {longitude:0.1556110, latitude:51.5316274},
                {longitude:0.1558685, latitude:51.5324951},
                {longitude:0.1565337, latitude:51.5332960},
                {longitude:0.1578426, latitude:51.5341502},
                {longitude:0.1599884, latitude:51.5355517},
                {longitude:0.1637006, latitude:51.5377807},
                {longitude:0.1638937, latitude:51.5380009},
                {longitude:0.1632500, latitude:51.5383279},
                {longitude:0.1615119, latitude:51.5384346},
                {longitude:0.1596451, latitude:51.5384480},
                {longitude:0.1586366, latitude:51.5385814},
                {longitude:0.1585078, latitude:51.5395023},
                {longitude:0.1575851, latitude:51.5397693},
                {longitude:0.1559758, latitude:51.5397960},
                {longitude:0.1547635, latitude:51.5400695},
                {longitude:0.1529396, latitude:51.5400028},
                {longitude:0.1506972, latitude:51.5401229},
                {longitude:0.1480258, latitude:51.5401530},
            ]
        }
    ])

    
    const permitBoundary = [
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
    ]

    useEffect(() => {//51.53519584120305, 0.13566027023156216
        try {
            // permitBoundaries.forEach((item) => {
            //     console.log("test")
            // })
            const isIn = geolib.isPointInPolygon({ latitude: currentUserLocation.latitude, longitude: currentUserLocation.longitude }, permitBoundary);
            if(isIn) {
                setPermitMessage("Currently in permit zone!")
            }
            else {
                setPermitMessage("Not in any zone")
            }
        }
        catch(e) {
            setPermitMessage("Fetching data!")
        }
        
        // permitBoundaries.forEach((item) => {
        //     console.log(item)
        // })
        //console.log("I have moved")
    }, [currentUserLocation])

    // const now = new Date().getHours()

    // /**
    //  *  check if value in now is between 9am and 6pm
    //  *  9am -> 9
    //  *  6pm -> 18
    //  */
    // if (now >= 8.5 && now <= 17.5) {
    // console.log('Cannot park here!')
    // } else {
    // console.log('You can park!')
    // }

    // const isIn = geolib.isPointInPolygon({ latitude: currentUserLocation.latitude, longitude: currentUserLocation.longitude }, permitBoundary);
    // console.log(isIn);

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
                    permsD.map(el => {
                        setPermitBoundaries([...permitBoundaries, {boundary: el.boundary}])
                    })
                    navigation.navigate("Settings", {perm: permitBoundaries})
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
                onPress={ (event) => console.log(event.nativeEvent) }
                onUserLocationChange={ region => setCurrentUserLocation(region.nativeEvent.coordinate)}
            >
                {
                    permitData.map(item => {
                        return (
                            <Polygon
                                //"rgba(39, 245, 50, 0.14)"
                                // 0.40 for darker red
                                fillColor={"rgba(238, 22, 22, 0.12)"}
                                coordinates={item.boundary}
                            />
                        )
                    })
                }
                {/* <Polygon
                    //"rgba(39, 245, 50, 0.14)"
                    fillColor={"rgba(238, 22, 22, 0.12)"}
                    coordinates={permsD[1].boundary}
                    ref={polyRef}
                /> */}
                {/* <Polygon
                    //"rgba(39, 245, 50, 0.14)"
                    fillColor={"rgba(238, 22, 22, 0.12)"}
                    coordinates={permitBou2}
                    ref={polyRef}
                /> */}
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