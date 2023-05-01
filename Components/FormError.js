import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import {Overlay } from '@rneui/themed';


const FormError = (props) => {
    return (
        <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={() => props.hideErrorOverlay(false)}>
        <View style={styles.errorView}>
            <Image style={styles.errorIcon} source={require('../assets/images/error.png')} />
        </View>
            <View style={styles.errorText}>
                <Text style={styles.textPrimary}>Error!</Text>
                <Text style={styles.textSecondary}>
                    { props.err }
                </Text>
                
            </View>
            <TouchableOpacity style={styles.btnError} onPress={() => props.hideErrorOverlay(false)}>
                    <Text style={styles.btnErrorTxt}>Okay</Text>
                </TouchableOpacity>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    Overlay: {
        width: '75%',
        height: 320,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#cc8899'
    },
    errorIcon:{
        width: 70,
        height: 70,
    },
    errorView:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText:{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 19

    },
    textSecondary:{
        marginTop: 20,
        textAlign: 'center'
    },
    btnError: {
        backgroundColor: 'crimson',
        width: '100%',
        borderRadius: 10,
        padding: 10,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
      },
      btnErrorTxt:{
        color: '#dddfff',   
        fontSize: 20
      }
})

export default FormError;
