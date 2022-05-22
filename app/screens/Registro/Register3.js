import { useState } from 'react';

import {
    ActivityIndicator,
    View,
    Text,
    TouchableOpacity,
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

// Styles
import { loginStack } from '../../shared/styles/loginStack';
import { background, logo, status, text } from '../../shared/styles/colors';
import { createNewUser } from '../../database/requests';

export const Register3 = ({ navigation, route }) => {
    const [registerLoading, setRegisterLoading] = useState(false)
    const { userValues } = route.params;
    const [phoneActive, setPhoneActive] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false)
    const [policyChecked, setPolicyChecked] = useState(false)

    const submitForm = (values) => {
        setRegisterLoading(true)
        Vibration.vibrate(20);
        userValues.phone = values.phone;
        userValues.country = values.country;
        createNewUser(userValues, navigation, setRegisterLoading);
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
            style={loginStack.otherMainView}
            onPress={Keyboard.dismiss}
            accessible={false}
            activeOpacity={1}
        >
            <View style={{ ...loginStack.formContainer, marginBottom: 40 }}>
                <View style={loginStack.formContent}>
                    <View>
                        <TouchableOpacity
                            style={loginStack.otherBackBtn}
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
                        <Text style={{ ...loginStack.formTitle, fontSize: 26 }}>Bien,</Text>
                        <Text style={loginStack.formTitleAdditional}>ahora te pediremos que ingreses tu celular</Text>
                    </View>
                    <Formik
                        initialValues={{ country: '', phone: '', terms: false, policy: false }}
                        onSubmit={(values, { resetForm }) => {
                            submitForm(values)
                        }}
                        validationSchema={loginValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, setFieldValue, isValid, }) => (
                            <View style={loginStack.otherInputsContainer}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={loginStack.countryInput}>
                                        <Text style={loginStack.countrySign}>+</Text>
                                        <TextInput
                                            onChangeText={handleChange('country')}
                                            onBlur={() => { handleBlur('country'), setFieldTouched('country') }}
                                            keyboardType='number-pad'
                                            placeholder='54'
                                            maxLength={3}
                                            placeholderTextColor={text.placeholderInverted}
                                            style={{
                                                ...loginStack.formInput,
                                                color: (errors.country && touched.country) ? status.error : text.principal,
                                                borderBottomWidth: 0,
                                            }}
                                        />
                                    </View>
                                    <View style={[loginStack.phoneInput, phoneActive && {
                                        borderBottomColor: logo.orange,
                                        borderBottomWidth: 1,
                                        borderBottomStyle: 'solid'
                                    }]}>
                                        <TextInput
                                            onChangeText={handleChange('phone')}
                                            onBlur={() => { handleBlur('phone'), setPhoneActive(false), setFieldTouched('phone') }}
                                            onPressIn={() => setPhoneActive(true)}
                                            keyboardType='number-pad'
                                            placeholder='11 9999-9999'
                                            placeholderTextColor={text.placeholderInverted}
                                            maxLength={12}
                                            style={{
                                                ...loginStack.formInput,
                                                color: (errors.phone && touched.phone) ? status.error : text.principal,
                                                borderBottomWidth: 0,
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{ width: '100%' }}>
                                    <View style={loginStack.inputContainer}>
                                        <View style={loginStack.inputRadioContainer}>
                                            <RadioButton
                                                value={values.terms}
                                                color={logo.orange}
                                                status={termsChecked ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setTermsChecked(!termsChecked)
                                                    setFieldValue('terms', !values.terms)
                                                }}
                                                onValueChange={() => setFieldValue('terms', termsChecked)}
                                            />
                                            <Text style={loginStack.radioBtnText}>
                                                He leído y estoy de acuerdo con los
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Vibration.vibrate(20);
                                                        Linking.openURL('https://minoapp.com/terms-of-use')
                                                    }}
                                                >
                                                    <Text style={loginStack.linkText}>Términos y Condiciones</Text>
                                                </TouchableOpacity>
                                            </Text>
                                        </View>
                                        <View style={loginStack.inputRadioContainer}>
                                            <RadioButton
                                                value={values.policy}
                                                color={logo.orange}
                                                status={policyChecked ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setPolicyChecked(!policyChecked)
                                                    setFieldValue('policy', !values.policy)
                                                }}
                                                onValueChange={() => setFieldValue('policy', policyChecked)}
                                            />
                                            <Text style={loginStack.radioBtnText}>
                                                He leído y estoy de acuerdo con las
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Vibration.vibrate(20);
                                                        Linking.openURL('https://minoapp.com/privacy-policy')
                                                    }}
                                                >
                                                    <Text style={loginStack.linkText}>Políticas de Privacidad</Text>
                                                </TouchableOpacity>
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={isValid ? loginStack.submitBtn : loginStack.submitBtnDisabled} onPress={handleSubmit} disabled={!isValid}>
                                        {
                                            registerLoading ?
                                                <ActivityIndicator size='small' color={background.principal} />
                                                :
                                                <Text style={loginStack.submitBtnText}>Continuar</Text>
                                        }
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