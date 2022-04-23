import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, {useEffect, useState} from 'react'

const SingleRoadUpdate = ({route}) => {

    const {item, roadData} = route.params;

    return (
        <SafeAreaView style={styles.container}>
            {roadData ? 
                roadData.map(item => (<Text style={styles.infoText}>{item.comments}{'\n'}</Text>))
            : 
            (<Text style={styles.infoText}>Fetching</Text>)}
            
        </SafeAreaView>
    )
}

export default SingleRoadUpdate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgb(7,10,14)',
        justifyContent: 'center',
    },
    infoText: {
        color: 'white'
    }
})