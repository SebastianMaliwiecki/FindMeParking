import React, {useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import RoadUpdate from './TravelUpdate/components/RoadUpdate'


const TravelUpdate = ({navigation}) => {

    const preSetRoads = [
        {id: 0,road:'a406'}, 
        {id: 1,road:'a13'}, 
        {id: 2,road:'a205'}, 
        {id: 3,road:'a4'}
    ]

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    <Text style={{color: 'rgb(56,166,255)'}}>
                        Travel Update
                    </Text>
                </Text>
            </View>
            <View style={{justifyContent: 'center',}}>
                <View style={styles.preSetWrap}>
                    {
                        preSetRoads.map((item,index) => (
                            // <View style={styles.optionWrap} key={item.id}>
                            //     <TouchableOpacity
                            //         style={{height: '100%'}}
                            //         onPress={() => navigation.navigate("Single_road_update", {item: item})}
                            //     >
                            //         <Text style={styles.taskHeader}>
                            //             {item.road.toUpperCase()}
                            //         </Text>
                            //         <Text style={styles.number}>
                            //         </Text>
                            //     </TouchableOpacity>
                            // </View>
                            <RoadUpdate navigation={navigation} item={item}/>
                        ))
                    }
                </View>
            </View>
            
        </SafeAreaView>
    )
}

export default TravelUpdate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: 'rgb(7,10,14)',
        
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
    preSetWrap: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        
    },
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
        color: 'rgb(170,170,170)',
        fontSize: 25,
        fontWeight: "500",
        position: 'absolute',
    },
})
