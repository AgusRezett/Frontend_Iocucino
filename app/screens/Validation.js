import { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Vibration,
    Keyboard,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import { loginStack } from '../shared/styles/loginStack';
import { text } from '../shared/styles/colors';

// Images
// import Illustration from '../../assets/illustration/security.svg';

export const Validation = ({ navigation }) => {
    const submitForm = (values) => {
        Vibration.vibrate(20);
        console.log(userValues)
        //AsyncSetSessionToken("patata");
        //navigation.navigate('ApplicationContent');
    }

    return (
        <TouchableOpacity
            style={{ ...loginStack.otherMainView }}
            onPress={Keyboard.dismiss}
            accessible={false}
            activeOpacity={1}
        >
            <View style={loginStack.formContainer}>
                <View style={loginStack.formContent}>
                    <View style={styles.illustrationContainer}>
                        <Image
                            style={styles.illustration}
                            source={require('../../assets/illustration/security.png')}
                        />
                        <View style={styles.messageContainer}>
                            <Text style={styles.screenTitle}>
                                Vamos a validar tu identidad
                            </Text>
                            <Text style={styles.screenMessage}>
                                Puede tomarte unos minutos. Asegurate de tener tu DNI a mano y tomá asiento en un lugar bien iluminado.
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity
                            style={loginStack.submitBtn}
                            onPress={() => {
                                Vibration.vibrate(20);
                                navigation.navigate('DocumentValidation');
                            }}
                        >
                            <Text style={loginStack.submitBtnText}>Comenzar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.skipButton}>
                            <Text style={styles.skipBtnText}>Omitir por ahora</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </TouchableOpacity >
    )
}


const styles = StyleSheet.create({
    skipButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    skipBtnText: {
        fontFamily: 'Nunito-Light',
        color: text.placeholder,
        fontSize: 16,
    },
    illustrationContainer: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -20,
    },
    illustration: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    messageContainer: {
        width: '100%',
        height: "auto",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -20,
    },
    screenTitle: {
        fontFamily: 'Nunito-Bold',
        color: text.principal,
        fontSize: 20,
        letterSpacing: 0,
        marginBottom: 10,
    },
    screenMessage: {
        fontFamily: 'Nunito-Regular',
        color: text.placeholder,
        fontSize: 14,
        letterSpacing: 0,
        marginBottom: 10,
        textAlign: 'center',
    }
})