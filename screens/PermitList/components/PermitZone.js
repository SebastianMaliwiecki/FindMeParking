import { StyleSheet, Text, View, TouchableOpacity, ScrollView  } from 'react-native'
import React, {useState, useEffect, useRef, SafeAreaView} from 'react'
import MapView, {Polygon, PROVIDER_GOOGLE} from 'react-native-maps'
import mapStyle from '../../../assets/map/MapStyle'
import * as geolib from 'geolib';
import { FontAwesome5 } from '@expo/vector-icons';
import { decimalToHourMinsConverter } from '../../../components/PermitHelper';

const PermitZone = ({route}) => {

    const latitudeDelta = 0.0922;
    const longitudeDelta = 0.0421;
    const date = new Date()
    var countDownDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 30, 0, 0).getTime();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const {zone} = route.params;
    const mapRef = useRef();
    const [centerOfZone, setCenterOfZone] = useState({
        latitude: 51.50850191003386,
        longitude: -0.12300140741851891,
        latitudeDelta,
        longitudeDelta
    });
    const [permitTimer, setPermitTimer] = useState();

    useEffect(() => {
        const centerCoord = geolib.getCenter(zone.boundary)
        setCenterOfZone({
            latitude: centerCoord.latitude,
            longitude: centerCoord.longitude,
            latitudeDelta,
            longitudeDelta
        })
    }, [])

    useEffect(() => {
        animateToRegion();
    }, [centerOfZone])

    useEffect(() => {
            setInterval(function() {
                // Get today's date and time
                var now = new Date().getTime();
                  
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                  
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                  
                setPermitTimer(hours + ":" + minutes + ":" + seconds)
            }, 1000);
        
    })

    const animateToRegion = () => {
        mapRef.current.animateToRegion(centerOfZone, 1);
    }

    return (
        <View style={styles.container}>
            
            <MapView
                ref={mapRef}
                mapPadding={{
                }}
                initialRegion={centerOfZone}
                style={{height:'50%', width:'100%', borderRadius: 10, bottom: 0}}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                showsUserLocation={true}
                showsCompass={true}
                showsScale={true}
                showsBuildings={true}
                showsPointsOfInteres={true}
                minZoomLevel={13.5}
                maxZoomLevel={17}
                pitchEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                zoomEnabled={false}
                //onPress={ (event) => console.log(event.nativeEvent) }
                //onUserLocationChange={ region => setCurrentUserLocation(region.nativeEvent.coordinate)}
            >
                <Polygon
                    //"rgba(238, 22, 22, 0.12)"
                    // 0.40 for darker red
                    fillColor={"rgba(39, 245, 50, 0.14)"}
                    coordinates={zone.boundary}
                />
            </MapView>
            <Text style ={{
                    color:'#B6B6B6',
                    fontWeight: '500',
                    fontSize: 20,
                    alignSelf: 'center',
                    marginTop: 10,
                }}>
                {zone.name.toUpperCase()}
            </Text>

            <View style={{padding: 16}}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17, marginBottom:5}}>
                    Operating times
                </Text>
                <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {zone.permit_times.map((item, index) => (
                        <View style={{ marginRight: 60, borderColor: date.getDay()==index ? 'rgb(56,166,255)' : 'white', borderWidth: date.getDay()==index ? 2 : 1, marginTop: 5, marginBottom: 5, borderRadius: 5, }}>
                            <Text style={{color:'white',  padding: 10, textAlign: 'center', fontWeight: date.getDay()==index ? '800' : 'normal'}}>
                                {days[index]} {"\n"} 
                                {item[0]==0 ? "Free parking" : `${decimalToHourMinsConverter(item[0])} to ${decimalToHourMinsConverter(item[1])}`}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={{alignSelf:'center'}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}><FontAwesome5 name="directions" size={30} color="white" /></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PermitZone

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgb(7,10,14)'
    },
    button: {
        marginTop: 10,
        alignItems: "center",
        backgroundColor: 'rgb(13,17,23)',
        padding: 10,
        overflow: 'hidden',
        borderRadius: 25,
        width: '90%',
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontSize: 15,
        fontWeight: '700',
        alignSelf: 'center',
    }
})