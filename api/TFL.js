import { Text, View } from 'react-native'
import React from 'react'

export const TFL = () => {
    return (
        <View>
        <Text>TFL</Text>
        </View>
    )
}

export const getULEZInfo = async (carReg) => {
    try {
        const res = await fetch(`https://api.tfl.gov.uk/Vehicle/UlezCompliance?vrm=${carReg}`)
        const data = await res.json()
        console.log(data)
        return data
    }
    catch(e) {
        console.log(e)
    }
}