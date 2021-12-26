import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Chatbot = () => {
    return (
        <View style={styles.container}>
            <Text style={{color:'white'}}>Soon to be chatbot</Text>
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
    }
})
