import React, {useEffect} from 'react';
import { View, StyleSheet, Button, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import {BASE_URL} from '@env'

const SignIn = () => {
    const navigation = useNavigation();

    // useEffect(() => {
    //     try {
    //         const r = axios.get('https://bc5b-102-88-62-60.ngrok-free.app');
    //         console.log("u",r)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })

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
                    <TextInput placeholder='Email Address | Username' style={styles.input} placeholderTextColor={'#acace6'} />

                    <TextInput placeholder='Password' style={styles.input} placeholderTextColor={'#acace6'} secureTextEntry={true} />

                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signUpTouch} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signupText}>Sign up here</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </ScrollView>
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
