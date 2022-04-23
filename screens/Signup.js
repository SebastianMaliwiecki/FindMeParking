import React,{ useRef, useState } from 'react'
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, TouchableOpacity  } from 'react-native';
import { useAuthContext } from '../context/AuthContext';

const Signup = ({navigation}) => {

    const[email, setEmail] =  useState("");
    const[password, setPassword] =  useState("");
    const[name, setName] = useState("");
    const[carReg, setCarReg] = useState("");

    const [buttonActive, setButtonActive] = useState(false);
    const [signUpError, setSignUpError] = useState("");

    const { signUp, insertUserInfo } = useAuthContext();

    const submisionHandler = async (e) => {
        try {
            setSignUpError(""); // Resets the error state
            await signUp(
                email, 
                password,
            );
            await insertUserInfo(
                name,
                email,
                carReg
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
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    placeholderTextColor='rgb(186, 181, 181)'
                    onChangeText={setName} 
                    keyboardAppearance='dark'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor='rgb(186, 181, 181)'
                    onChangeText={setEmail}
                    keyboardAppearance='dark'
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor='rgb(186, 181, 181)'
                    onChangeText={setPassword} 
                    keyboardAppearance='dark'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Car Registration'
                    placeholderTextColor='rgb(186, 181, 181)'
                    onChangeText={setCarReg} 
                    keyboardAppearance='dark'
                    autoCapitalize = {"characters"}
                />
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                        submisionHandler();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.signUpText}>{buttonActive ? "Creating account..." : "Sign up"}</Text>
                </TouchableOpacity>
                <View style={{marginTop: 50, justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{color: 'white', fontSize: 15}}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss();
                            navigation.goBack();
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.signUpText}>Login!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgb(7,10,14)'
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
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 50,
        borderRadius: 25,
        marginBottom: 30,
        marginLeft: 25,
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
    formContainer: {
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 15,
        color: 'rgb(56,166,255)',
        margin: 0,
    },
});

