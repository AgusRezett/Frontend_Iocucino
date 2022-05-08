import { useState, useRef } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Vibration,
    Keyboard,
    Linking
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Components
import { Formik } from 'formik';
import * as yup from 'yup'
import { loginStack } from '../shared/styles/loginStack';
import { text } from '../shared/styles/colors';

export const Validation = ({ navigation }) => {
    const [phoneActive, setPhoneActive] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false)
    const [policyChecked, setPolicyChecked] = useState(false)

    const submitForm = (values) => {
        Vibration.vibrate(20);
        userValues.phone = values.phone;
        userValues.country = values.country
        console.log(userValues)
        //AsyncSetSessionToken("patata");
        //navigation.navigate('ApplicationContent');
    }

    const loginValidationSchema = yup.object().shape({
        phone: yup
            .number()
            .required(),
        country: yup
            .number()
            .required(),
        terms: yup
            .bool()
            .oneOf([true], 'Field must be checked'),
        policy: yup
            .bool()
            .oneOf([true], 'Field must be checked'),
    })

    return (
        <TouchableOpacity
            style={loginStack.mainView}
            onPress={Keyboard.dismiss}
            accessible={false}
            activeOpacity={1}
        >
            <View style={loginStack.formContainer}>
                <View style={loginStack.formContent}>
                    <View>
                        <TouchableOpacity
                            style={loginStack.backBtn}
                            onPress={() => {
                                Vibration.vibrate(20);
                                navigation.goBack()
                            }}
                        >
                            <Ionicons
                                name={`ios-arrow-back`}
                                size={24}
                                color={text.placeholder}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity style={loginStack.submitBtn}>
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
        fontSize: 18,
    },
})