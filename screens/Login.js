import React,{ useRef, useState } from 'react'
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import { useAuthContext } from '../context/AuthContext';

const Login = ({navigation}) => {

    const[email, setEmail] =  useState("");
    const[password, setPassword] =  useState("");

    const [loginError, setloginError] = useState("");
    const [buttonActive, setButtonActive] = useState(false)

    const { Login} = useAuthContext();

    const submisionHandler = async (e) => {
        try {
            setButtonActive(true);
            setloginError(""); // Resets the error state
            await Login(email, password);
        }
        catch (error) {
            console.log(error.message)
            setloginError(error.message);
            setButtonActive(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View>
                <Text style={styles.text}>Login</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor="white" 
                onChangeText={setEmail}
                keyboardAppearance='dark'
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor="white"
                onChangeText={setPassword} 
                keyboardAppearance='dark'
            />
            <Button
                title={buttonActive ? "Logging in..." : "Press to login"}
                onPress={() => {
                    Keyboard.dismiss();
                    submisionHandler();
                }}
                style={styles.button}
            />
            <View style={styles.singUpButton}>
                <Button
                    title="Don't have an account?"
                    onPress={() => {
                        Keyboard.dismiss();
                        navigation.navigate('Signup');
                    }}
                />
            </View>
            
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(7,10,14)'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'white',
        width: '90%',
        color: 'white',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomStartRadius: 25,
        borderTopEndRadius: 25,
        borderTopLeftRadius: 25,
        fontSize: 20,
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 50,
    },
    button: {
        marginTop: 30,
    },
    singUpButton: {
        marginTop: 20,
    }
});

