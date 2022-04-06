import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, } from 'react-native'
import { useUserContext } from '../context/UserContext'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import { Octicons } from '@expo/vector-icons'

const Chatbot = () => {

    const {info} = useUserContext();
    const [errorMessae, setErrorMessage] = useState("");
    const [ulezData, setUlezData] = useState();
    const [ulezImage, setUlezImage] = useState();

    const fetchTFLUlez = async () => {
        try {
            const res = await fetch(`https://api.tfl.gov.uk/Vehicle/UlezCompliance?vrm=${info.car_registration}`);
            const data = await res.json();
            setUlezData(data);
        }
        catch {
            setErrorMessage("Error has occured whilst fetching vehicle ULEZ data from TFL.")
        }
    }

    useEffect(() => fetchTFLUlez(), [])

    useEffect( async () => {
        const storage = getStorage();
        const ulezSigns = ['ULEZ_sign_compliant.png', 'ULEZ_sign_NonCompliant.png']
        const pathReference = ref(storage, `/Ulez_sign/${ulezData.compliance=="Compliant" ? ulezSigns[0] : ulezSigns[1]}`);
        await getDownloadURL(pathReference).then(x => {
            setUlezImage(x)
        })
    }, [ulezData])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    <Text style={{color: 'rgb(56,166,255)'}}>
                        Car Info
                    </Text>
                </Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                
                <Text style={styles.carTitle}>
                    Your car:
                </Text>
                
                <View style={{alignItems:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.blueBox}/>
                        <View style={styles.numerplate}>
                            <Text style={styles.nunberPlateText}>
                                {info.car_registration}
                            </Text>
                        </View>
                    </View>
                </View>

                {
                    ulezData ?
                    (
                        <View style={styles.detailsContainer}>
                            <View style={{alignItems: 'center', paddingTop: 10}}>
                                <FontAwesome5 name="car-side" size={50} color={'white'} />
                            </View>
                            <Text style={styles.carDetails}><Text style={{color:'#B6B6B6',}}>{ulezData.colour}</Text> <Text style={{fontWeight:'bold'}}>{ulezData.make} {ulezData.model}</Text></Text>
                            <View style={styles.dividerWrapper}>
                                <View style={styles.divider}/>
                            </View>
                            {/* <View style={{alignItems: 'center'}}>
                                <Image
                                    source={{uri:ulezImage}}
                                    style={{
                                        width: 200,
                                        height: 330,
                                        resizeMode: 'contain',
                                        borderColor: 'white',
                                        //borderWidth: 1,
                                        alignItems: 'center'
                                    }}
                                />
                            </View> */}
                            <Text style={styles.chargeHeader}>
                                {ulezData.compliance=="Compliant" ? 'One charge applies to your vehicle:' : 'Two charges apply to your vehicle:'}
                            </Text>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontSize: 15, color:'#B6B6B6', padding: 7}}>ULEZ {'&'} LEZ</Text>
                            </View>
                            <View style={styles.charge}>
                                <View style={{backgroundColor: ulezData.compliance=="Compliant" ? 'rgb(94,151,50)' : 'red', justifyContent: 'center', alignItems: 'center', borderRadius:7, width: 50, height: 50 }}>
                                    {
                                        ulezData.compliance=="Compliant" ?
                                        <AntDesign name="checkcircle" size={32} color="white" />
                                        :
                                        <Octicons name="stop" size={32} color="white" />
                                    }
                                </View>
                                <Text style={{color: 'white', fontSize: 17,  fontWeight: 'bold', flex: 1, flexWrap: 'wrap', paddingLeft: 7}}>
                                    {
                                    ulezData.compliance=="Compliant" ?
                                            'Your vehicle meets the emission standards to enter Ultra Low Emission Zone or Low Emission Zone charge, no charge will apply entering those zones.'
                                        :
                                            'Your vehicle does not meet the emission standards to enter Ultra Low Emission Zone or Low Emission Zone charge, charges will apply when entering those zones.'
                                    }
                                </Text>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontSize: 15, color:'#B6B6B6', padding: 7}}>Congestion Charge</Text>
                            </View>
                            <View style={styles.charge}>
                                <View style={{backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius:7, width: 50, height: 50 }}>
                                    <Octicons name="stop" size={32} color="white" />
                                </View>
                                <Text style={{color: 'white', fontSize: 17,  fontWeight: 'bold', flex: 1, flexWrap: 'wrap', paddingLeft: 7}}>
                                    Your vehicle requires to pay congestion charge fee inorder to enter the zone.
                                </Text>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={async () => {
                                        await WebBrowser.openBrowserAsync('https://tfl.gov.uk/modes/driving/check-your-vehicle/')
                                    }}
                                >
                                    <Text style={styles.buttonText}>Check out TFL website for more info regarding payments</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    :
                    (
                        <Text>
                            
                        </Text>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Chatbot

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: 'rgb(7,10,14)'
    },
    button: {
        marginTop: 10,
        alignItems: "center",
        backgroundColor: 'rgb(13,17,23)',
        padding: 10,
        overflow: 'hidden',
        borderRadius: 7,
        width: '90%',
    },
    buttonText: {
        textAlign: 'center',
        color:'#B6B6B6'
    },
    carTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        padding: 10
    },
    blueBox: {
        height: 'auto', 
        width: 30, 
        backgroundColor: 'blue',
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7
    },
    numerplate: {
        backgroundColor: 'yellow',
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
    },
    nunberPlateText: {
        fontSize: 40,
        padding: 7,
        fontWeight: 'bold'
    },
    fetchMessage: {
        fontSize: 20,
        color: 'white',
    },
    detailsContainer: {
        //alignItems: 'center'
    },
    carDetails: {
        fontSize: 20,
        color: 'white',
        padding: 7,
        textAlign:'center'
    },
    header: {
        width: 'auto',
        height: 'auto',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 30,
        padding: 10,
        fontWeight: "700",
        marginLeft: 20,
    }, 
    dividerWrapper: {
        alignItems: 'center',
    },  
    divider: {
        backgroundColor: 'rgb(13,17,23)',
        marginTop: 10,
        marginBottom: 10,
        height: 7,
        borderRadius: 5,
        width: '90%'
    },
    chargeHeader: {
        padding: 7,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    charge: {
        flexDirection:'row', 
        padding: 5, 
        backgroundColor: 'rgb(13,17,23)', 
        margin: 5, 
        borderRadius: 15
    }
})
