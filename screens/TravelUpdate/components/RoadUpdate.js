import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'

const RoadUpdate = ({navigation, item}) => {

    const [roadData, setRoadData] = useState()

    useEffect(async () => {
        try {
            const res = await fetch(`https://api.tfl.gov.uk/Road/${item.road}/Disruption`)
            const data = await res.json()
            setRoadData(data)
        }
        catch {
            console.log("Error when fetching traffic data")
            return ['error']
        }
    }, [])

    return (
        <View style={styles.optionWrap} key={item.id}>
            <TouchableOpacity
                style={{height: '100%'}}
                onPress={() => navigation.navigate("Single_road_update", {item: item, roadData: roadData})}
            >
                <Text style={styles.taskHeader}>
                    {item.road.toUpperCase()} 
                </Text>
                <Text style={styles.number}>
                    {roadData?roadData.length:0}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default RoadUpdate

const styles = StyleSheet.create({
    optionWrap: {
        height: 90,
        backgroundColor: 'rgb(29,29,29)',
        width: '47%',
        marginBottom: 10,
        borderRadius: 15,
    },
    taskHeader: {
        left: 15,
        bottom: 10,
        color: 'white',
        fontSize: 25,
        fontWeight: "500",
        position: 'absolute',
    },
    number: {
        position: 'absolute',
        right: 10,
        top: 5,
        color: 'rgb(170,170,170)',
        padding: 5,
        borderRadius: 25,
        fontSize: 30,
        fontWeight: "600",
    },
})