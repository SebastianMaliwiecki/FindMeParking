import React, {useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { checkIfPermitZonesApplies, timeToDecimal } from '../components/PermitHelper';
import { usePermitContext } from '../context/PermitContext';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import IndividualPermit from './PermitList/components/IndividualPermit';

const PermitList = ({navigation}) => {

    const { permitData } = usePermitContext();
    
    console.log(new Date().getMinutes())

    // Calcuate the closes zones to users location
    // Than sort them

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    <Text style={{color: 'rgb(56,166,255)'}}>
                        Permit List
                    </Text>
                </Text>
            </View>
            <FlatList
                keyExtractor={(item) => item.id}
                data={permitData}
                renderItem={({item}) => <IndividualPermit navigation={navigation} item={item}/>}
            />
        </SafeAreaView>
    )
}

export default PermitList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(7,10,14)'
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
})
