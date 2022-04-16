import { useState } from 'react';

// Components
import { StyleSheet, View, Text, TouchableOpacity, Button, TextInput, Vibration } from 'react-native';
//import { Form, Item, Label, Input } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup'

// Functions
import { AsyncSetSessionToken } from '../../../functions/GlobalFunctions';

export default function FormContainer() {
    const [formulario, setFormulario] = useState('Login');
    //const location = useLocation();
    //console.log(location);

    function changeForm(typeForm) {
        Vibration.vibrate(20);
        setFormulario(typeForm);
    }

    const navigation = useNavigation();

    return (
        <View style={styles.formContainer}>
            <View style={styles.formContent}>
                <View>
                    <Text style={styles.brand}>Mino</Text>
                    <Text style={styles.formTitle}>Ingresar</Text>
                </View>
                {
                    formulario === 'Login' ? (
                        <>
                            <LoginForm changeForm={changeForm} navigation={navigation} />
                        </>
                    ) : formulario === 'Register' ? (
                        <RegisterForm changeForm={changeForm} />
                    ) : <Text>Nada</Text>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        width: '80%',
        height: 500,
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
    inputsContainer: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    inputContainer: {
        width: '100%',
        height: 'auto',
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
        top: -20,
        fontSize: 16,
        color: '#ffc000',
        fontFamily: 'Nunito-Regular',
    },
    inputLabelUnactive: {
        position: 'absolute',
        top: -20,
        fontSize: 16,
        color: '#888a91',
        fontFamily: 'Nunito-Regular',
    },
    formInput: {
        width: '100%',
        height: 40,
        borderBottomColor: '#888a91',
        borderBottomWidth: 1,
        fontSize: 18,
        fontFamily: 'Nunito-Regular',
    },
    formInputActive: {
        width: '100%',
        height: 40,
        borderBottomColor: '#ffc000',
        borderBottomWidth: 1,
        fontSize: 18,
        fontFamily: 'Nunito-Regular',
    },
    submitBtn: {
        width: '100%',
        height: 50,
        backgroundColor: '#ffc000',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    submitBtnDisabled: {
        width: '100%',
        height: 50,
        backgroundColor: '#888a91',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    submitBtnText: {
        fontFamily: 'Nunito-Bold',
        color: '#fff',
        fontSize: 20,
    },
    errorText: {
        fontSize: 10,
        color: 'red',
    },
    lastMessageContainer: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    lastMessageText: {
        fontFamily: 'Nunito-Regular',
        color: '#888a91',
        fontSize: 15,
    },
    lastMessageBtn: {
        marginLeft: 5,
        fontFamily: 'Nunito-Regular',
        color: '#ffc000',
        fontSize: 15,
    },
});

const LoginForm = ({ changeForm, navigation }) => {
    const [emailActive, setEmailActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);

    const logIn = (values) => {
        Vibration.vibrate(20);
        console.log(values)
        AsyncSetSessionToken("patata");
        navigation.navigate('ApplicationContent');
    }

    /* const handleKeyPress = ({ nativeEvent: { key: keyValue } }) => {
        console.log(keyValue);
        if (keyValue === 'f') {
            return false;
        } else {
            return true;
        }
    }; */

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Ingresar un correo electrónico válido")
            .required('a'),
        password: yup
            .string()
            .required('a'),
    })

    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                    logIn(values)
                }}
                validationSchema={loginValidationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={values.email.length > 0 ? emailActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel}>Email</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={() => { handleBlur('email'), setEmailActive(false) }}
                                onPressIn={() => { setEmailActive(true) }}
                                textContentType='emailAddress'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='email'
                                value={values.email.trim()}
                                style={emailActive ? styles.formInputActive : styles.formInput}
                            />
                            {(errors.email /* && touched.email */) &&
                                errors.password != "a" &&
                                <Text style={styles.errorText}>{errors.email}</Text>
                            }
                        </View>
                        <View style={[styles.inputContainer, { marginTop: 50 }]}>
                            <Text style={values.password.length > 0 ? passwordActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel}>Contraseña</Text>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={() => { handleBlur('password'), setPasswordActive(false) }}
                                onPressIn={() => { setPasswordActive(true) }}
                                value={values.password.trim()}
                                style={passwordActive ? styles.formInputActive : styles.formInput}
                            />
                            {(errors.password/*  && touched.password */) &&
                                errors.password != "a" &&
                                <Text style={styles.errorText}>{errors.password}</Text>
                            }
                        </View>
                        <TouchableOpacity style={isValid ? styles.submitBtn : styles.submitBtnDisabled} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={styles.submitBtnText}>Ingresar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik >

            <View style={styles.lastMessageContainer}>
                <Text style={styles.lastMessageText}>¿Aún no tenés una cuenta?</Text>
                <TouchableOpacity onPress={() => changeForm('Register')}>
                    <Text style={styles.lastMessageBtn}>Registrate</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const RegisterForm = ({ changeForm }) => {
    return (
        <View style={styles.formContainer}>
            <Text>Register</Text>
            <Text style={{ marginTop: 50 }} onPress={() => changeForm("Login")}>cambiar a login</Text>
        </View>
    )
}

