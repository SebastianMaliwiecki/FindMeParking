import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useUserContext } from '../context/UserContext'

const Chatbot = () => {

    const {info} = useUserContext();
    console.log(info)
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
    }
})
