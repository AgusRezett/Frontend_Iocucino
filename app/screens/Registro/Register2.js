import { useState, useRef } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Vibration,
    Animated,
    Keyboard
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Components
import { Formik } from 'formik';
import * as yup from 'yup'

// Styles
import { loginStack } from '../../shared/styles/loginStack';
import { logo, text } from '../../shared/styles/colors';

export const Register2 = ({ navigation, route }) => {
    const { userValues } = route.params;
    const [documentActive, setDocumentActive] = useState(false);

    const topEmailAnim = useRef(new Animated.Value(8)).current;
    const moveUp = (type) => {
        Animated.timing(topEmailAnim, {
            toValue: -20,
            duration: 200,
            useNativeDriver: false
        }).start();
    }
    const moveDown = (type) => {
        Animated.timing(topEmailAnim, {
            toValue: 8,
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    const submitForm = (values) => {
        Vibration.vibrate(20);
        userValues.document = values.document;
        userValues.gender = values.gender
        navigation.navigate('Register3', {
            userValues: userValues
        });
    }

    const loginValidationSchema = yup.object().shape({
        document: yup
            .number()
            .positive()
            .required('Campo requerido'),
        gender: yup
            .string()
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
                        <Text style={{ ...loginStack.formTitle, fontSize: 26 }}>¡Hola!</Text>
                        <Text style={loginStack.formTitleAdditional}>Comencemos por algunos datos tuyos</Text>
                    </View>
                    <Formik
                        initialValues={{ document: '', gender: '' }}
                        onSubmit={(values, { resetForm }) => {
                            submitForm(values)
                        }}
                        validationSchema={loginValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, setFieldValue, isValid, }) => (
                            <View style={loginStack.otherInputsContainer}>
                                <View style={{ width: '100%' }}>
                                    <View style={loginStack.inputContainer}>
                                        <Animated.Text style={[
                                            values.document.length > 0 ? documentActive ? loginStack.inputLabelActive : loginStack.inputLabelUnactive : loginStack.inputLabel,
                                            { top: topEmailAnim }
                                        ]}
                                        >
                                            Dni
                                        </Animated.Text>
                                        <TextInput
                                            onChangeText={handleChange('document')}
                                            onBlur={() => { handleBlur('document'), setDocumentActive(false), setFieldTouched('document'), values.document.length <= 0 ? moveDown('document') : moveUp('document') }}
                                            onPressIn={() => { setDocumentActive(true), moveUp('document') }}
                                            keyboardType='number-pad'
                                            autoCapitalize='none'
                                            maxLength={8}
                                            value={values.document.trim()}
                                            style={[documentActive ? loginStack.formInputActive : loginStack.formInput, errors.document && touched.document ? { color: "#e81f37" } : null]}
                                        />
                                        {(errors.document && touched.document) &&
                                            <Text style={loginStack.errorText}>{errors.document}</Text>
                                        }
                                    </View>
                                    <View style={loginStack.inputContainer}>
                                        <Text style={loginStack.genderTitle}>Sexo</Text>
                                        <RadioButton.Group
                                            onValueChange={handleChange('gender')}
                                            value={values.gender}
                                        >
                                            <View style={loginStack.inputRadioContainer}>
                                                <RadioButton
                                                    value='m'
                                                    color={logo.orange}
                                                    onValueChange={() => setFieldValue('gender')}
                                                />
                                                <Text style={loginStack.radioBtnText}>Masculino</Text>
                                            </View>
                                            <View style={loginStack.inputRadioContainer}>
                                                <RadioButton
                                                    value='f'
                                                    color={logo.orange}
                                                    onValueChange={() => setFieldValue('gender')}
                                                />
                                                <Text style={loginStack.radioBtnText}>Femenino</Text>
                                            </View>
                                        </RadioButton.Group>
                                        {(errors.gender && touched.gender && errors.gender != "b") &&
                                            <Text style={loginStack.errorText}>{errors.document}</Text>
                                        }
                                    </View>
                                </View>
                                <TouchableOpacity style={isValid ? loginStack.submitBtn : loginStack.submitBtnDisabled} onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={loginStack.submitBtnText}>Siguiente</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </View >
        </TouchableOpacity >
    )
}
