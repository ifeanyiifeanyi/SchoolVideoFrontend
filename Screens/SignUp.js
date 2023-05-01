import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Device from 'expo-device';
import FormError from '../Components/FormError';
import FormSuccess from '../Components/FormSuccess';
import axios from 'axios';
import { BASE_URL } from '@env'

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');

  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isloading, setIsLoading] = useState(false)


  const [displayFormSuccess, setDisplayFormSuccess] = useState(false);
  const [displayFormErr, setDisplayFormErr] = useState(false);
  

  const toggleOverlay = () => {
    setVisible(!visible);
  };


  function fullNameChange(value) {
    setName(value);
  }
  function usernameChange(value) {
    setUsername(value);
  }
  function emailChange(value) {
    setEmail(value);
  }
  function registrationCodeChange(value) {
    setRegistrationCode(value);
  }
  function passwordChange(value) {
    setPassword(value);
  }
  function confirmPasswordChange(value) {
    setPassword_confirmation(value);
  }

  function createUserAccount() {
    // console.log('createUserAccount')
    setIsLoading(true);

    axios.post(`${BASE_URL}/api/signup`, {
      name: name,
      username: username,
      activation_code: registrationCode,
      email: email,
      password: password,
      deviceName: Device.deviceName
    }).then(response => {
      console.log("r", response.data.message);
      if(response.data.status === false){
        setIsLoading(false)
        setErrMessage("Username | Registration Code | Email is incorrect. Please try again");
        return setDisplayFormErr(true);
      }

      if(response.data.status === true){
        setIsLoading(false);
        setSuccessMessage("Your account has been created, please check your email for verification")
      }
    }).catch(error => {
      setIsLoading(false)
      console.log("catch:: ",error)
      setErrMessage("Error occurred, please try again later.");
        return setDisplayFormErr(true);
    });
  }

  function validateForm() {
    var formInputs = [name, username, registrationCode, email, password, password_confirmation];
    var passwordMatch = password === password_confirmation;

    if (formInputs.includes('') || formInputs.includes(undefined)) {
      setErrMessage("All fields are required!")
      return setDisplayFormErr(true);

    }

    if (password.length < 6) {
      setErrMessage("Password must be at least 6 characters long")
      return setDisplayFormErr(true);
    }

    if (!passwordMatch) {
      setErrMessage("Passwords does not match")
      return setDisplayFormErr(true);

    }

    if (passwordMatch) createUserAccount();
  }
  return (
    <SafeAreaView style={styles.mainViewContainer}>

      <View style={styles.TopView}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>
      <ScrollView style={styles.BottomView}>
        <Icon style={styles.icon} name="chevron-left" size={60} color={"#acac16"} onPress={() => navigation.navigate('SignIn')} />
        <Text style={styles.header}>Signup Here</Text>
        <KeyboardAvoidingView style={styles.formView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TextInput onChangeText={fullNameChange} value={name} placeholder='Name' style={styles.input} placeholderTextColor={'#acace6'} autoFocus={true} />

          <TextInput onChangeText={usernameChange} value={username} placeholder='Username' style={styles.input} placeholderTextColor={'#acace6'} />


          <TextInput autoCapitalize='characters' onChangeText={registrationCodeChange} value={registrationCode} placeholder='Registration Code' style={styles.input} placeholderTextColor={'#acace6'} />

          <TextInput onChangeText={emailChange} value={email} placeholder='Email' inputMode='email' keyboardType='email-address' style={styles.input} placeholderTextColor={'#acace6'} />

          <TextInput onChangeText={passwordChange} value={password} placeholder='Password' style={styles.input} placeholderTextColor={'#acace6'} secureTextEntry={true} />

          <TextInput onChangeText={confirmPasswordChange} value={password_confirmation} placeholder='Confirm Password' style={styles.input} placeholderTextColor={'#acace6'} secureTextEntry={true} />

          <TouchableOpacity style={styles.btn} onPress={validateForm}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </ScrollView>
      {
        displayFormErr === true ? <FormError hideErrorOverlay={setDisplayFormErr} err={errMessage} /> : null
      }
      {
        isloading === true ? <FormSuccess /> : successMessage == "Your account has been created, please check your email for verification" ? <FormSuccess successMessage={successMessage} /> : null
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
    height: '20%',
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
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 25,
    marginTop: 10
  },
  formView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
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
    marginBottom: 20,
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
  },
  icon: {
    marginLeft: 8,
    marginTop: 12
  }
});
