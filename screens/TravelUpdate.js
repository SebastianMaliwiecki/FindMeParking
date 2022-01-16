import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TravelUpdate = () => {
    return (
        <View style={styles.container}>
            <Text style={{color:'white'}}>Travel updates</Text>
        </View>
    )
}

export default TravelUpdate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(7,10,14)'
    }
})
