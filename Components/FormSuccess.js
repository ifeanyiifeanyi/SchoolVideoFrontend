import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, useColorScheme } from 'react-native';
import { Overlay } from '@rneui/themed';


const FormSuccess = (props) => {
    const colorScheme = useColorScheme()

    return (
        props.successMessage ?

            <Overlay overlayStyle={colorScheme === 'light' ? styles.lightBackground : styles.darkBackground} isVisible={true}>
                <View style={styles.errorView}>
                    <Image style={styles.errorIcon} source={require('../assets/images/checked.png')} />
                </View>
                <View style={styles.errorText}>
                    <Text style={styles.textPrimary}>Successful!</Text>
                    <Text style={styles.textSecondary}>
                        {props.successMessage}
                    </Text>

                </View>
                <TouchableOpacity style={styles.btnError} onPress={() => props.hideErrorOverlay(false)}>
                    <Text style={styles.btnErrorTxt}>Okay</Text>
                </TouchableOpacity>
            </Overlay>
            :
            <Overlay overlayStyle={colorScheme === 'light' ? styles.lightBackground : styles.darkBackground} isVisible={true}>

                <ActivityIndicator size={'large'} color={'green'} />
            </Overlay>
    );
}

const styles = StyleSheet.create({
    lightBackground: {
        backgroundColor: '#ffffff',
        width: '75%',
        height: 320,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    darkBackground: {
        backgroundColor: '#111111',
        width: '75%',
        height: 320,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    Overlay: {

    },
    errorIcon: {
        width: 70,
        height: 70,
    },
    errorView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 19

    },
    errorText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 19

    },
    textSecondary: {
        marginTop: 20,
        textAlign: 'center'
    },
    btnError: {
        backgroundColor: 'teal',
        width: '100%',
        borderRadius: 10,
        padding: 10,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnErrorTxt: {
        color: '#dddfff',
        fontSize: 20
    }
})

export default FormSuccess;
