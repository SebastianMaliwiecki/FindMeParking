import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import mapStyle from '../../../assets/map/MapStyle';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const ZoneDirection = ({navigation, route}) => {

    const {coord, userLocation} = route.params;
    const mapRef = useRef();
    const [userLocattion, setUserLocation] = useState();
    const [travelInformation, setTraveInformation] = useState();

    const latitudeDelta = 0.0922;
    const longitudeDelta = 0.0421;
    const sheetRef = useRef();
    const fall = new Animated.Value(1);
    
    const origin = {latitude: 51.535232538269454, longitude: 0.13572297277591183};
    const destination = {latitude: coord.latitude, longitude: coord.longitude};
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCem1zT06KxaFp1ORi5NjG6_cYF1OxfPeo';

    // Follows users location as the user travels to their destination.
    useEffect(() => {
        mapRef.current.animateToRegion({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta,
            longitudeDelta
        }, 1);
    }, [userLocattion])

    const timeCoverter = (num) => {
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
    }

    return (
        <View>
            
            <BottomSheet
                ref={sheetRef}
                snapPoints={[300, 165]}
                borderRadius={10}
                initialSnap={1}
                callbackNode={fall}
                enabledContentGestureInteraction={true}
                renderContent={() => (
                    <View
                        style={{
                            backgroundColor: 'rgb(7,10,14)',
                            padding: 16,
                            height: 300,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
                            }}
                            style={styles.button}
                        >
                            <View>
                                <Text style={{padding: 5, fontSize: 20, color: '#748c94', fontWeight: '800'}}>
                                    Finish journey
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.divider}/>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17, marginBottom:5}}>
                            Distance
                        </Text>
                        <Text style={{fontSize: 15, color: '#B6B6B6', fontWeight: 'normal'}}>
                            {travelInformation.distance} km
                        </Text>
                        <View style={styles.divider}/>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17, marginBottom:5}}>
                            Duration
                        </Text>
                        <Text style={{fontSize: 15, color: '#B6B6B6', fontWeight: 'normal'}}>
                            {timeCoverter(travelInformation.duration)}
                        </Text>
                    </View>
                )}
                enabledInnerScrolling={true}
            />

            <MapView
                ref={mapRef}
                mapPadding={{
                    bottom: 130,
                    top: 0
                }}
                style={{height:'100%', width:'100%'}}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 51.50850191003386,
                    longitude: -0.12300140741851891,
                    latitudeDelta,
                    longitudeDelta
                }}
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
                onUserLocationChange={ region => setUserLocation(region.nativeEvent.coordinate)}
            >
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={2}
                    strokeColor="hotpink"
                    onReady={(params) => {
                        setTraveInformation(params);
                    }}
                />
            </MapView>
        </View>
    )
}

export default ZoneDirection

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: 'rgb(13,17,23)',
        padding: 5,
        overflow: 'hidden',
        borderRadius: 15,
    },
    divider: {
        backgroundColor: 'rgb(13,17,23)',
        marginTop: 10,
        marginBottom: 10,
        height: 7,
        borderRadius: 5,
    }
})