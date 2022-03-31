import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import MapView, {Polygon, PROVIDER_GOOGLE} from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import mapStyle from '../assets/map/MapStyle';
import * as Location from 'expo-location'; 
import * as geolib from 'geolib';
import { doc, getDoc, collection, getDocs, setDoc, GeoPoint} from "firebase/firestore";
import {db} from '../firebase';
import { usePermitContext } from '../context/PermitContext';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { fetchReverseGeocoding } from '../api/GoogleMaps';

const Map = ({navigation}) => {

    const latitudeDelta = 0.0922;
    const longitudeDelta = 0.0421;

    let currentDay = new Date().getDay();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const { permitData } = usePermitContext();
    
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
    const [currentLocation, setCurrentLocation] = useState() 

    const sheetRef = useRef();
    const fall = new Animated.Value(1);

    const [inPermitZone, setInPertmitZone] = useState(false)
    const [currentPermitZone, setCurreontPermitZone] = useState({})
    
    const fetchPermitData = async () => {
        try {
            const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentUserLocation.latitude}, ${currentUserLocation.longitude}&key=AIzaSyCem1zT06KxaFp1ORi5NjG6_cYF1OxfPeo`)
            const data = await res.json()
            setCurrentLocation(data.results)

            if(inPermitZone) {
                if(!geolib.isPointInPolygon({ latitude: currentUserLocation.latitude, longitude: currentUserLocation.longitude }, currentPermitZone.boundary)) {
                    //setPermitMessage(`You cannot park here till ${decimalToHourMinsConverter(currentPermitZone.end)}`)
                    setInPertmitZone(false)
                }
            }
            else {
                permitData.map((item) => {
                    let boundaries = geolib.isPointInPolygon({ latitude: currentUserLocation.latitude, longitude: currentUserLocation.longitude }, item.boundary)
                    
                    if(boundaries) {
                        setPermitMessage(`You can park here till ${item.end}`)
                        setCurreontPermitZone(item)
                        setInPertmitZone(true)
                    }
                })
            }
        }
        catch(e) {
            setPermitMessage("Fetching data!")
        }
    }

    const fetchReverseGeocoding = async (lat, long) => {
        try {
            const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCem1zT06KxaFp1ORi5NjG6_cYF1OxfPeo`)
            const data = await res.json()
            return data
        }
        catch {
            console.log("Error with API call.")
        }
    }

    

    useEffect(async () => {
        fetchPermitData()
        // const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=51.53455214235189, 0.1357554733307456&key=AIzaSyCem1zT06KxaFp1ORi5NjG6_cYF1OxfPeo`)
        // const data = await res.json()
        // setCurrentLocation(data.results)
        // console.log(data.results[5].formatted_address, "fs")
    }, [])

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

    useEffect(async () => {
        animateToRegion();
        // const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude}, ${region.longitude}&key=AIzaSyCem1zT06KxaFp1ORi5NjG6_cYF1OxfPeo`)
        // const data = await res.json()
        // setCurrentLocation(data.results)
        // console.log(data.results[4].formatted_address)
    }, [region])

    const animateToRegion = () => {
        mapRef.current.animateToRegion(region, 1000);
    }
    
    const permitBoundary =  {
    }

    const permitTimes = {
        1:[8.5, 17.5],
        2:[8.5, 17.5],
        3:[8.5, 17.5],
        4:[8.5, 17.5],
        5:[8.5, 17.5],
        6:[0],
        7:[0],
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
        fetchPermitData()
    }, [currentUserLocation])

    function timeToDecimal(t) {
        var arr = t.split(':');
        var dec = parseInt((arr[1]/6)*10, 10);
    
        return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);
    }  

    const currentDecimalTime = timeToDecimal(`${new Date().getHours()}:${new Date().getMinutes()}`)

    const permitZoneColour = (start, end) => {
        const currentTimeStringFormat = `${new Date().getHours()}:${new Date().getMinutes()}`
        const now = timeToDecimal(currentTimeStringFormat)
        
        //console.log(timeToDecimal("17:26"))
        if (currentDecimalTime >= start && currentDecimalTime < end) {
            return "rgba(238, 22, 22, 0.12)" // red - cannot paork
        } 
        else if (start == 0 && end ==0 ) {
            return "rgba(39, 245, 50, 0.14)" // green - can park
        }
        return "rgba(39, 245, 50, 0.14)" // green - can park
    }

    //console.log(timeToDecimal("20:43"))
    
    const checkIfPermitZonesApplies = (start, end) => {
        try {
            const currentTimeStringFormat = `${new Date().getHours()}:${new Date().getMinutes()}`
            const now = timeToDecimal(currentTimeStringFormat)
            if (now >= start && now < end) {
                return true
            } 
            else if (start==0 && end ==0) {
                return false
            }
            return false
        }
        catch {
            return null
        }
    }

    const displayPermitMessage = () => {
        const currentTimeStringFormat = `${new Date().getHours()}:${new Date().getMinutes()}`
        const now = timeToDecimal(currentTimeStringFormat)
        
        try {
            const start = currentPermitZone.permit_times[currentDay][0]
            const end = currentPermitZone.permit_times[currentDay][1]
            const monday = currentPermitZone.permit_times[1][0]
            //console.log(start)
            if(start==0 && end==0) {
                return `Free parking till ${decimalToHourMinsConverter(monday)} Monday`
            }
    
            if (now >= start && now < end) {
                return `Free to park after ${decimalToHourMinsConverter(end)}pm`
            } 
            else {
               return `Free parking till ${decimalToHourMinsConverter(start)}am ${currentPermitZone.permit_times[currentDay+1][0]==0 && now>= currentPermitZone.permit_times[currentDay][1]?"Monday": ""}` 
            }
            
        }
        catch {
            if(!inPermitZone) {
                return "No zone detected, check street signs"
            }
            return "Fetching data..."
        }
    }

    const permitTimesD = () => {
        try {
            return (
                currentPermitZone.permit_times.map((item, index) => (
                    <View style={{ marginRight: 60, borderColor: currentDay==index ? 'rgb(56,166,255)' : 'white', borderWidth: currentDay==index ? 2 : 1, marginTop: 5, marginBottom: 5, borderRadius: 5, }}>
                        <Text style={{color:'white',  padding: 10, textAlign: 'center', fontWeight: currentDay==index ? '800' : 'normal'}}>
                            {days[index]} {"\n"} 
                            {item[0]==0 ? "Free parking" : `${decimalToHourMinsConverter(item[0])} to ${decimalToHourMinsConverter(item[1])}`}
                        </Text>
                    </View>
                ))
            )
        }
        catch {
            return (
                <Text style={{color:'white', padding: 10, fontWeight: '800'}}>
                    Fetching data...
                </Text>
            )
        }
    }
    
    const displayIcon = () => {
        try {
            return (
                checkIfPermitZonesApplies(currentPermitZone.permit_times[currentDay][0], currentPermitZone.permit_times[currentDay][1]) ?
                (
                    <View style={{backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius:7, width: 50, height: 50 }}>
                        <Octicons name="stop" size={33} color="white" />
                    </View>
                ) 
                    :
                (
                    <View style={{backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius:7, width: 50, height: 50 }}>
                        <Entypo name="check" size={33} color="white" />
                    </View>
                )
            )
        }
        catch {
            if(!inPermitZone) {
                return (
                    <View style={{backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', borderRadius:7, width: 50, height: 50 }}>
                        <AntDesign name="questioncircle" size={33} color="white" />
                    </View>
                    
                )
            }
            return (
                <View style={{backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', borderRadius:7, width: 50, height: 50 }}>
                    <AntDesign name="loading1" size={33} color="white" />
                </View>
            )
        }
    }

    const DisplayPermitMessage = (start, end) => {
        try {
            return displayPermitMessage(start, end)
        }
        catch {
            return  "Fetching data..."
        }
    }

    const displayLocation = () => {
        try {
            return `${currentLocation[4].formatted_address} ${"\n"}${currentLocation[8].formatted_address}` //8
        }
        catch {
            return "Fetching oprox. location"
        }
    }

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'rgb(7,10,14)',
                padding: 16,
                height: 450,
            }}
        >
            <View style={{flexDirection:'row'}}>
                { displayIcon() }
                <Text style={{color: 'white', fontSize: 23, marginLeft: 20, fontWeight: 'bold'}}>
                    {checkIfPermitZonesApplies() ? "No Parking" : "Free Parking"}
                    {"\n"}
                    <Text style={{fontSize: 15, color: '#B6B6B6', fontWeight: 'normal'}}>
                        Residential bays
                    </Text>
                </Text>
                
            </View>
            <View style={{alignItems: 'center', marginTop: 5, marginBottom: 5}}> 
                <View style={{backgroundColor: '#90EE90', alignItems: 'center', borderRadius: 5}}>
                    <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold', padding: 7}}>
                        {currentPermitZone!={}? displayPermitMessage() : "Free parking all time"}
                    </Text>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.divider}/>

                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17, marginBottom:5}}>
                        Current Location 
                    </Text>
                    <Text style={{color: 'white'}}>
                        {displayLocation()}
                    </Text>
                </View>

                <View style={styles.divider}/>

                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17, marginBottom:5}}>
                        Operating times
                    </Text>
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            permitTimesD()
                        }
                    </ScrollView>
                    
                </View>
                <View style={styles.divider}/>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
                        Buy Permit
                    </Text>
                    {
                        inPermitZone ?
                        (
                            <Text>
                                show link
                            </Text>
                        ) 
                        :
                        (
                            <Text style={{color:'white'}}>
                                No permit charge present
                            </Text>
                        )
                    }
                </View>
                <View style={styles.divider}/>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
                        Data problems?
                    </Text>
                    <Text style={{color: 'white', marginTop: 20}}>
                        Have you seen a discrepancy in our data? Please let us know so that we can investigate.
                    </Text>
                    <View style={{
                        shadowColor: "white",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        
                        elevation: 3,
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            
                        }}
                        style={styles.button}
                    >
                        <Text style={{color: 'white'}}>Let us know</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            
        </View>
    );

    const headerRender = () => (
        <View>
            <Text>
                23423
            </Text>
        </View>
    )

    return (
        <View style={styles.container}>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[523, 200]}
                borderRadius={10}
                initialSnap={1}
                callbackNode={fall}
                enabledContentGestureInteraction={true}
                //renderHeader={headerRender}
                renderContent={renderContent}
                enabledInnerScrolling={true}
            />

            {/* <TouchableOpacity
                style={styles.permitInfo}
                onPress={() => sheetRef.current.snapTo(0)}
            >
                <View style={{}}>
                    <Text style={{color:"white",}}>
                        {permitMessage}
                    </Text>
                </View>
            </TouchableOpacity> */}

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
            
            <MapView
                ref={mapRef}
                mapPadding={{
                    bottom: 170,
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
                rotateEnabled={false}
                //onPress={ (event) => console.log(event.nativeEvent) }
                onUserLocationChange={ region => setCurrentUserLocation(region.nativeEvent.coordinate)}
            >
                {
                    permitData.map(item => {
                        return (
                            <Polygon
                                //"rgba(238, 22, 22, 0.12)"
                                // 0.40 for darker red
                                fillColor={permitZoneColour(item.permit_times[currentDay][0], item.permit_times[currentDay][1])}
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
    },
    button: {
        marginTop: 10,
        alignItems: "center",
        backgroundColor: 'rgb(13,17,23)',
        padding: 10,
        overflow: 'hidden',
        borderRadius: 5,
        width: 'auto',
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        marginBottom: 20
    },
    header: {
        backgroundColor: 'rgb(7,10,14)',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    divider: {
        backgroundColor: 'rgb(13,17,23)',
        marginTop: 10,
        marginBottom: 10,
        height: 7,
        borderRadius: 5,
    }
})