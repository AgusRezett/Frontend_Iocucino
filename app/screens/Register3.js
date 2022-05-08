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

export const Register3 = ({ navigation, route }) => {
    const { userValues } = route.params;
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
            style={styles.loginView}
            onPress={Keyboard.dismiss}
            accessible={false}
            activeOpacity={1}
        >
            <View style={styles.formContainer}>
                <View style={styles.formContent}>
                    <View>
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => {
                                Vibration.vibrate(20);
                                navigation.goBack()
                            }}
                        >
                            <Ionicons
                                name={`ios-arrow-back`}
                                size={24}
                                color="#888a91"
                            />
                        </TouchableOpacity>
                        <Text style={{ ...styles.formTitle, fontSize: 26 }}>Bien,</Text>
                        <Text style={styles.formTitleAdditional}>ahora te pediremos que ingreses tu celular</Text>
                    </View>
                    <Formik
                        initialValues={{ country: '', phone: '', terms: false, policy: false }}
                        onSubmit={(values, { resetForm }) => {
                            submitForm(values)
                        }}
                        validationSchema={loginValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, setFieldValue, isValid, }) => (
                            <View style={styles.inputsContainer}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={styles.countryInput}>
                                        <Text style={styles.countrySign}>+</Text>
                                        <TextInput
                                            onChangeText={handleChange('country')}
                                            onBlur={() => { handleBlur('country'), setFieldTouched('country') }}
                                            keyboardType='number-pad'
                                            placeholder='54'
                                            maxLength={3}
                                            placeholderTextColor="#D9D9D9"
                                            style={{ ...styles.formInput, color: (errors.country && touched.country) ? "#e81f37" : "#323232" }}
                                        />
                                    </View>
                                    <View style={[styles.phoneInput, phoneActive && {
                                        borderBottomColor: '#ffc000',
                                        borderBottomWidth: 1,
                                        borderBottomStyle: 'solid'
                                    }]}>
                                        <TextInput
                                            onChangeText={handleChange('phone')}
                                            onBlur={() => { handleBlur('phone'), setPhoneActive(false), setFieldTouched('phone') }}
                                            onPressIn={() => setPhoneActive(true)}
                                            keyboardType='number-pad'
                                            placeholder='11 9999-9999'
                                            placeholderTextColor="#D9D9D9"
                                            maxLength={12}
                                            style={{ ...styles.formInput, color: (errors.phone && touched.phone) ? "#e81f37" : "#323232" }}
                                        />
                                    </View>
                                    {
                                        <>
                                            <Text style={styles.errorText}>{errors.phone}</Text>
                                            <Text style={styles.errorText}>{errors.country}</Text>
                                            <Text style={styles.errorText}>{errors.terms}</Text>
                                            <Text style={styles.errorText}>{errors.policy}</Text>
                                        </>
                                    }
                                </View>
                                <View style={{ width: '100%' }}>
                                    <View style={styles.inputContainer}>
                                        <View style={styles.inputRadioContainer}>
                                            <RadioButton
                                                value={values.terms}
                                                color="#ffc000"
                                                status={termsChecked ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setTermsChecked(!termsChecked)
                                                    setFieldValue('terms', !values.terms)
                                                }}
                                                onValueChange={() => setFieldValue('terms', termsChecked)}
                                            />
                                            <Text style={styles.radioBtnText}>
                                                He leído y estoy de acuerdo con los
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Vibration.vibrate(20);
                                                        Linking.openURL('https://minoapp.com/terms-of-use')
                                                    }}
                                                >
                                                    <Text style={styles.linkText}>Términos y Condiciones</Text>
                                                </TouchableOpacity>
                                            </Text>
                                        </View>
                                        <View style={styles.inputRadioContainer}>
                                            <RadioButton
                                                value={values.policy}
                                                color="#ffc000"
                                                status={policyChecked ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setPolicyChecked(!policyChecked)
                                                    setFieldValue('policy', !values.policy)
                                                }}
                                                onValueChange={() => setFieldValue('policy', policyChecked)}
                                            />
                                            <Text style={styles.radioBtnText}>
                                                He leído y estoy de acuerdo con las
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Vibration.vibrate(20);
                                                        Linking.openURL('https://minoapp.com/privacy-policy')
                                                    }}
                                                >
                                                    <Text style={styles.linkText}>Políticas de Privacidad</Text>
                                                </TouchableOpacity>
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={isValid ? styles.submitBtn : styles.submitBtnDisabled} onPress={handleSubmit} disabled={!isValid}>
                                        <Text style={styles.submitBtnText}>Continuar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </View >
        </TouchableOpacity >
    )
}


const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: -30,
        left: 0,
        borderRadius: 20,
        backgroundColor: '#fefcff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginView: {
        width: '100%',
        height: "100%",
        backgroundColor: '#fefcff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 50,
    },
    formContainer: {
        width: '80%',
        minHeight: 500,
        maxHeight: 630,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContent: {
        width: '100%',
        height: "100%",
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    brand: {
        fontFamily: 'RooneySans-Bold',
        color: "#ffc000",
        fontSize: 25,
    },
    formTitle: {
        marginTop: 10,
        fontFamily: 'Nunito-Bold',
        color: "#212529",
        fontSize: 35,
    },
    formTitleAdditional: {
        fontFamily: 'Nunito-Regular',
        color: "#787878",
        fontSize: 22,
    },
    inputsContainer: {
        width: '100%',
        height: '85%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    countrySign: {
        fontFamily: 'Nunito-Regular',
        color: "#888a91",
        fontSize: 20,
        paddingRight: 10,
    },
    countryInput: {
        width: '21%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 40,
        borderBottomColor: '#888a91',
        borderBottomWidth: 1,
    },
    phoneInput: {
        width: '71%',
        height: 'auto',
        marginTop: 40,
        borderBottomColor: '#888a91',
        borderBottomWidth: 1,
    },
    genderTitle: {
        fontFamily: 'Nunito-Regular',
        color: "#323232",
        fontSize: 20,
    },
    inputRadioContainer: {
        width: '100%',
        height: 'auto',
        marginTop: 10,
        marginLeft: -10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    radioBtnText: {
        width: '100%',
        fontFamily: 'Nunito-Regular',
        color: "#787878",
        fontSize: 16,
        marginLeft: 5,
        marginTop: 5,
    },
    inputLabel: {
        position: 'absolute',
        top: 8,
        fontSize: 18,
        color: '#888a91',
        fontFamily: 'Nunito-Regular',
    },
    inputLabelActive: {
        position: 'absolute',
        // top: -20,
        fontSize: 16,
        color: '#ffc000',
        fontFamily: 'Nunito-Bold',
    },
    inputLabelUnactive: {
        position: 'absolute',
        // top: -20,
        fontSize: 16,
        color: '#888a91',
        fontFamily: 'Nunito-Bold',
    },
    formInput: {
        width: '100%',
        height: 40,
        fontSize: 18,
        fontFamily: 'Nunito-Regular',
        color: '#212529',
    },
    formInputActive: {
        width: '100%',
        height: 40,
        borderBottomColor: '#ffc000',
        borderBottomWidth: 1,
        fontSize: 18,
        fontFamily: 'Nunito-Regular',
        color: '#212529',
    },
    submitBtn: {
        width: '100%',
        height: 50,
        backgroundColor: '#ffc000',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    submitBtnDisabled: {
        width: '100%',
        height: 50,
        backgroundColor: '#888a91',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    submitBtnText: {
        fontFamily: 'Nunito-Bold',
        color: '#fff',
        fontSize: 20,
    },
    errorText: {
        fontSize: 10,
        color: '#e81f37',
        position: 'absolute',
        top: 40,
    },
    linkText: {
        fontFamily: 'Nunito-Regular',
        color: '#323232',
        fontSize: 16,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#ffc000',
    }
});