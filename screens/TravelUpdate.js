import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, TextInput } from 'react-native'
import RoadUpdate from './TravelUpdate/components/RoadUpdate'
import { Entypo } from '@expo/vector-icons';


const TravelUpdate = ({navigation}) => {

    const preSetRoads = [
        {id: 0,road:'a406'}, 
        {id: 1,road:'a13'}, 
        {id: 2,road:'a205'}, 
        {id: 3,road:'a4'}
    ]

    const [searchRoad, setSearchRoad] = useState('');

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
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSearchRoad}
                        placeholder='Enter road...'
                        placeholderTextColor='rgb(186, 181, 181)'
                        keyboardAppearance='dark'
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                    <View style={{alignSelf:'center'}}>
                        <TouchableOpacity style={styles.button} onPress={async () => {
                            try {
                                const res = await fetch(`https://api.tfl.gov.uk/Road/${searchRoad}/Disruption`)
                                const data = await res.json()
                                navigation.navigate("Search_road", {roadData: data})
                            }
                            catch {
                                console.log("error whislt fetching road")
                            }
                        }}>
                            <Text style={styles.buttonText}><Entypo name="magnifying-glass" size={30} color="white" /></Text>
                        </TouchableOpacity>
                    </View>
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
        marginBottom: 40,
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '90%',
        color: 'white',
        height: 50,
        borderRadius: 25,
        fontSize: 17,
        elevation: 0,
        backgroundColor: 'rgb(13,17,23)',
        borderWidth: 0, 
    },
    button: {
        marginTop: 10,
        alignItems: "center",
        backgroundColor: 'rgb(13,17,23)',
        padding: 10,
        overflow: 'hidden',
        borderRadius: 25,
        width: '90%',
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontSize: 15,
        fontWeight: '700',
        alignSelf: 'center',
    }
})
