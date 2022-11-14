import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import * as LocalAuthentication from 'expo-local-authentication'
import { useNavigation } from "@react-navigation/native";

export default function Nivel3(){
    const [isbiometricsupported, setIsBiometricSupported] = useState(false);

    const navigation = useNavigation()
    
    useEffect(() => {
        (async() => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible); 
        });
    });

    const fallBacktoDefaultAuth = () => {
        console.log('fall Back to Password Authentication')
    }

    const alertComponent = (title, mess, btnText, btnFunc) => {
        return Alert.alert(title, mess,[
            {
                text: btnText,
                onPress: btnFunc
            }
        ])
    }

    const handleBiometricAuth = async () => {

        const isbiometricAvaliable = await LocalAuthentication.hasHardwareAsync();

        if(!isbiometricAvaliable){
            return alertComponent(
                "please enter your password",
                "biometric Authentication not Password",
                "Ok",
                ()=> fallBacktoDefaultAuth()
            )
        }

        let supportedBiometrics;
        
        if(isbiometricAvaliable)
        supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

        if(!savedBiometrics){
            return alertComponent(
                "please enter your password",
                "biometric Authentication not Password",
                "Ok",
                ()=> fallBacktoDefaultAuth()
            )
        }

        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometric',
            cancelLabel: 'Cancel',
            disableDeviceFallback: true,
        })

        if(biometricAuth){
            console.log('teste')
        }
        
    };

    return(
        <View style={styles.container}>

            <ImageBackground
            source={require('../assets/img/img3.png')}
            style={styles.container}
            >

            <View style={styles.containerText}>
                <Text style={styles.text}>Você chegou ao último nível!</Text>
            </View>

            <Text style={styles.text}>A natureza nos oferece felicidade através de lugares magníficos, é preciso apenar parar e olhar</Text>
            <Text style={styles.text}>Preserve-a!</Text>

            {/* {isbiometricsupported ? <Text style={styles.text}>Not Support</Text>:<Text style={styles.text}>Device Support</Text>} */}
            
            {/* <TouchableHighlight style={styles.finger} onPress={handleBiometricAuth}>
                <Ionicons name="finger-print" size={24} color="white"></Ionicons>
            </TouchableHighlight> */}

            </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex:1,
        backgroundColor: '#000',
        alignItems: "center",
        justifyContent: "space-around"
    },
    containerText: {
        flexDirection: 'row'
    },
    text: {
        color: '#fff'
    },
    finger: {
        height: 70,
        width: 70,
        borderRadius: 70,
        borderWidth: 1,
        borderColor: '#F4AE64',
        alignItems: "center",
        justifyContent: "center"
    }
})