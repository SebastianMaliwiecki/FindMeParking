import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={{color:'white'}}>No settings yet</Text>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(7,10,14)'
    }
})
