import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PermitList = () => {
    return (
        <View style={styles.container}>
            <Text style={{color:'white'}}>Permit list</Text>
        </View>
    )
}

export default PermitList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(7,10,14)'
    }
})
