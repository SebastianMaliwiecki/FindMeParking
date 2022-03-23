import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { checkIfPermitZonesApplies, decimalToHourMinsConverter, timeToDecimal } from '../../../components/PermitHelper';
import { GoogleAuthProvider } from 'firebase/auth';

const IndividualPermit = ({navigation, item}) => {

    const currentTimeStringFormat = `${new Date().getHours()}:${new Date().getMinutes()}`
    const now = timeToDecimal(currentTimeStringFormat)
    const date = new Date()

    const addExtraDay = () => {
        if(item.permit_times[date.getDay()][1]>=now) {
            return date.getDate()+1
        }
        return date.getDate()
    }

    let hour;
    let mins = 0;

    const setTime = () => {
        if(now >= item.permit_times[date.getDay()][0] && now < item.permit_times[date.getDay()][1]) {
            const time = (item.permit_times[date.getDay()][1]).toString()
            if(time.includes(".")) {
                let stringTime = time.split('.')
                hour = parseInt(stringTime[0])
                mins = parseInt(stringTime[1]) * 6
            }
            else {
                hour = parseInt(time[0])
            }
        }
        else {
            const time = (item.permit_times[date.getDay()][0]).toString()
            if(time.includes(".")) {
                let stringTime = time.split('.')
                hour = parseInt(stringTime[0])
                mins = parseInt(stringTime[1]) * 6
            }
            else {
                hour = parseInt(time[0])
            }
        }
    }

    setTime()

    var countDownDate = new Date(date.getFullYear(), date.getMonth(), addExtraDay() , hour, mins, 0, 0).getTime();

    const [permitTimer, setPermitTimer] = useState();

    const displayMessage = () => {
        
        if((item.permit_times[date.getDay()+1][0] == 0 && now >= item.permit_times[date.getDay()+1][1]) || item.permit_times[date.getDay()][0]==0 && item.permit_times[date.getDay()][1]==0) {
            return `Free parking till ${decimalToHourMinsConverter(item.permit_times[1][0])} Monday`
        }
        else {
            return `${permitTimer} of free parking`
        }
    }

    useEffect(() => {
        setInterval(function() {
            var now = new Date().getTime();
              
            var distance = countDownDate - now;
            
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
              
            setPermitTimer(hours + " hours, " + minutes + " mins and " + seconds+" s")
        }, 1000);
    })

    return (
        <View style={{
            //borderWidth: 1,
            borderColor: 'white',
            margin: 10,
            borderRadius: 10,
        }}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Permit zone", {zone: item, timer: permitTimer})}
            >
                <Text style ={{
                    color:'#B6B6B6',
                    fontWeight: '500',
                    fontSize: 20,
                    alignSelf: 'center'
                }}>
                    {item.name.toUpperCase()}
                </Text>
                <View style={{flexDirection:'row', padding: 7}}>
                    {
                        checkIfPermitZonesApplies(item.permit_times[4][0], item.permit_times[4][1]) ?
                            (
                                <View style={{backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius:7, width: 50, height: 50 }}>
                                    <Octicons name="stop" size={33} color="white" />
                                </View>
                            ) 
                                :
                            (
                                <View style={{backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius:7, width: 50, height: 50 }}>
                                    <Entypo name="check" size={33} color="white" />
                                </View>
                            )
                    }
                    <Text style={{color: 'white', fontSize: 23, marginLeft: 20, fontWeight: 'bold'}}>
                        {checkIfPermitZonesApplies(item.start, item.end) ? "No Parking" : "Free Parking"}
                        {"\n"}
                        <Text style={{fontSize: 15, color: '#B6B6B6', fontWeight: 'normal'}}>
                            Residential bays 
                        </Text>
                    </Text>
                </View>
                <View>
                <View style={{alignItems: 'center', marginTop: 5, marginBottom: 5}}> 
                    <View style={{backgroundColor: '#90EE90', alignItems: 'center', borderRadius: 5}}>
                        <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold', padding: 7}}>
                            {displayMessage()} 
                        </Text>
                    </View>
                </View>
                    <Text style={{color: 'white'}}>
                        
                    </Text>
                </View>
            </TouchableOpacity>
            <View
                style={{
                    backgroundColor: 'rgb(13,17,23)',
                    marginTop: 10,
                    marginBottom: 10,
                    height: 7,
                    borderRadius: 5,
                }}
            />
        </View>
    )
}

export default IndividualPermit

const styles = StyleSheet.create({})