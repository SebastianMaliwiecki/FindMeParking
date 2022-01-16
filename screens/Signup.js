import React,{ useRef, useState } from 'react'
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import { useAuthContext } from '../context/AuthContext';

const Signup = ({navigation}) => {

    const[email, setEmail] =  useState("");
    const[password, setPassword] =  useState("");

    const [buttonActive, setButtonActive] = useState(false);
    const [signUpError, setSignUpError] = useState("");

    const { signUp } = useAuthContext();

    const submisionHandler = async (e) => {
        try {
            setSignUpError(""); // Resets the error state
            await signUp(
                email, 
                password,
            );
        }
        catch (error) {
            setSignUpError(error.message);
            //console.log(error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View>
                <Text style={styles.text}>Sign up</Text>
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
            <Button
                title="Already have an account?"
                onPress={() => {
                    Keyboard.dismiss();
                    navigation.navigate('Login');
                }}
                style={styles.button}
            />
            
        </KeyboardAvoidingView>
    )
}

export default Signup

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
        color: 'white'
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
    },
    button: {
        marginTop: 30,
    }
});

