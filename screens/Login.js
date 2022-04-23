import React,{ useRef, useState } from 'react'
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, Button, Keyboard, TouchableOpacity, Alert  } from 'react-native';
import { useAuthContext } from '../context/AuthContext';

const Login = ({navigation}) => {

    const[email, setEmail] =  useState("");
    const[password, setPassword] =  useState("");

    const [loginError, setloginError] = useState("");
    const [buttonActive, setButtonActive] = useState(false)
    const [isFocused, setIsFocused] = useState(true)

    const { Login } = useAuthContext();

    const LoginAlert = () => {
        Alert.alert(
            "Login error!",
            "Make sure both email and password field are not empty",
            [
                { text: "OK", onPress: () => {} }
            ]
        );
    }

    const submisionHandler = async (e) => {
        try {
            if(!email || !password) {
                LoginAlert();
                return
            }
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

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = () => {
        setIsFocused(false);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.text2}>
                <Text style={styles.text}>Login</Text>
            </View>
            <View style={styles.formContainer}>
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
                    secureTextEntry={true} 
                />
                {/* <Button
                    title={buttonActive ? "Logging in..." : "Press to login"}
                    onPress={() => {
                        Keyboard.dismiss();
                        submisionHandler();
                    }}
                /> */}
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                        submisionHandler();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.signUpText}>{buttonActive ? "Logging in..." : "Login"}</Text>
                </TouchableOpacity>
                <View style={styles.singUpButton}>
                    <Text style={{color: 'white', fontSize: 15}}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss();
                            navigation.navigate('Signup');
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.signUpText}>Sign up!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(7,10,14)',
        justifyContent: 'center',
    },
    formContainer: {
        alignItems: 'center',
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
    singUpButton: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 15,
        color: 'rgb(56,166,255)',
        margin: 0,
    },  
});

