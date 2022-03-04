import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useAuthContext } from '../context/AuthContext';

const Settings = ({navigation, route}) => {

    const { Logout } = useAuthContext();
    const {perm} = route.params

    console.log(perm)

    const logoutHandler = async () => {
        try {
            await Logout();
            history.push("/login");
        }
        catch {

        }
    };

    return (
        <View style={styles.container}>
            <Text style={{color:'white'}}>No settings yet</Text>
            <Button
                title="Press me"
                onPress={() => logoutHandler()}
            />
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
