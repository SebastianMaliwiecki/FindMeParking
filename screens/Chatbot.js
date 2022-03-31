import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useUserContext } from '../context/UserContext'

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
        const pathReference = ref(storage, '/Ulez_sign/ULEZ_sign_compliant.png');
        await getDownloadURL(pathReference).then(x => {
            setUlezImage(x)
        })
    }, [ulezData])

    return (
        <View style={styles.container}>
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
                        <Text style={styles.carDetails}>{ulezData.colour} {ulezData.make} {ulezData.model}</Text>
                        <Image
                            source={{uri:ulezImage}}
                            style={{
                                width: 300,
                                height:400
                            }}
                        />
                    </View>
                )
                :
                (
                    <Text>
                        
                    </Text>
                )
            }
        </View>
    )
}

export default Chatbot

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        alignItems: 'center'
    },
    carDetails: {
        fontSize: 20,
        color: 'white',
        padding: 7,
        textAlign:'center'
    }
})
