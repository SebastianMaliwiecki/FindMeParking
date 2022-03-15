import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { usePermitContext } from '../context/PermitContext';

const PermitList = () => {

    const { permitData } = usePermitContext();

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
                renderItem={({item}) => (
                    <View style={{
                        borderWidth: 1,
                        borderColor: 'white',
                        margin: 10,
                        borderRadius: 10,
                    }}>
                        <TouchableOpacity>
                            <Text style={{color:'white', padding: 10}}>Test</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
