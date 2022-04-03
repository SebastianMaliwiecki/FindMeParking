import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import { useUserContext } from '../context/UserContext'
import { AntDesign } from '@expo/vector-icons'

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
            <View style={{flexDirection:'row'}}>
                <View style={styles.blueBox}/>
                <View style={styles.numerplate}>
                    <Text style={styles.nunberPlateText}>
                        {info.car_registration}
                    </Text>
                </View>
            </View>
            {
                ulezData ?
                (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.carDetails}>{ulezData.colour} <Text style={{fontWeight:'bold'}}>{ulezData.make} {ulezData.model}</Text></Text>
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
                            <View style={{flexDirection:'row', padding: 5, backgroundColor: 'rgb(13,17,23)', margin: 5, borderRadius: 15}}>
                                <View style={{backgroundColor: 'rgb(94,151,50)', justifyContent: 'center', alignItems: 'center', borderRadius:7, width: 50, height: 50 }}>
                                    <AntDesign name="checkcircle" size={32} color="white" />
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
                    </View>
                )
                :
                (
                    <Text>
                        
                    </Text>
                )
            }
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
})
