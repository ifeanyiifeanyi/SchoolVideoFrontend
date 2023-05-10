import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Device from 'expo-device';
import FormError from '../Components/FormError';
import FormSuccess from '../Components/FormSuccess';
import axios from 'axios';
import { BASE_URL } from '@env'
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation, route }) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [errMessage, setErrMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isloading, setIsLoading] = useState(false)


    const [displayFormSuccess, setDisplayFormSuccess] = useState(false);
    const [displayFormErr, setDisplayFormErr] = useState(false);
    function passwordChange(value) {
        setPassword(value);
    }
    function userChange(value) {
        setUser(value)
    }

    function loginUserAccount() {
        setIsLoading(true);
        axios.post(`${BASE_URL}/api/login`, {
            user: user,
            password: password,
            deviceName: Device.deviceName
        }).then(response => {
            console.log(response.data);
            if (response.data.status === false) {
                setIsLoading(false)
                setErrMessage(response.data.message);
                return setDisplayFormErr(true);
            }
            if (response.data.status === true) {
                setIsLoading(false);
                setSuccessMessage("Login successful")
                setUser('');
                setPassword('')
                AsyncStorage.setItem('token', response.data.token);
                AsyncStorage.setItem('name', response.data.username.name);
                AsyncStorage.setItem('username', response.data.username.username);
                AsyncStorage.setItem('email', response.data.username.email);
            }
        }).catch(err => {
            setIsLoading(false)
            console.log("catch:: ", err)
            setErrMessage("Error occurred, please try again later.");
            return setDisplayFormErr(true);
        })
    }
    const validateInput = () => {
        let inputValue = [user, password];
        if (inputValue.includes('') || inputValue.includes(undefined)) {
            setErrMessage("All fields are required!")
            return setDisplayFormErr(true);
        }
        if (password.length < 6) {
            setErrMessage("Password must be at least 6 characters long")
            return setDisplayFormErr(true);
        }
        loginUserAccount();
    }
    return (
        <SafeAreaView style={styles.mainViewContainer}>

            <View style={styles.TopView}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            </View>
            <ScrollView style={styles.BottomView}>
                <Text style={styles.header}>
                    Welcome {'\n'}
                    Back
                </Text>
                <KeyboardAvoidingView style={styles.formView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <TextInput onChangeText={userChange} value={user} placeholder='Email Address | Username' style={styles.input} placeholderTextColor={'#acace6'} />

                    <TextInput onChangeText={passwordChange} value={password} placeholder='Password' style={styles.input} placeholderTextColor={'#acace6'} secureTextEntry={true} />

                    <TouchableOpacity style={styles.btn} onPress={validateInput}>
                        <Text style={styles.btnText}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signUpTouch} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signupText}>Sign up here</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </ScrollView>
            {
                displayFormErr === true ? <FormError hideErrorOverlay={setDisplayFormErr} err={errMessage} /> : null
            }
            {
                isloading === true ? <FormSuccess /> : successMessage == "Login successful" ? <FormSuccess successMessage={successMessage} close={setSuccessMessage} /> : null
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainViewContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000',
        flexDirection: 'column',
        marginTop: 30,
    },
    TopView: {
        width: '100%',
        height: '40%',
        backgroundColor: '#21abcd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    BottomView: {
        backgroundColor: '#002e63',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    logo: {
        objectFit: 'contain',
        width: '100%',
        height: '100%',
        marginTop: 30,
        marginBottom: 10,
    },
    header: {
        color: '#21abc1',
        fontSize: 33,
        fontWeight: 'bold',
        marginLeft: 35,
        marginTop: 50
    },
    formView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
    },
    input: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#73a9c2',
        height: 52,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 20,
    },
    btn: {
        backgroundColor: '#21abc1',
        width: '90%',
        borderRadius: 10,
        padding: 20,
    },
    btnText: {
        textAlign: 'center',
        color: '#ddd',
        fontSize: 18,
        fontWeight: 'bold'
    },
    signUpText: {
        color: '#dcdcdc',
        marginTop: 10,
    },
    signUpTouch: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    signupText: {
        color: '#d3d3d3',
        fontSize: 12,
        marginLeft: 20,
        marginTop: 17,
        fontWeight: 'bold'
    }
});

export default SignIn;
