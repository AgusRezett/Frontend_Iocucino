import { useState, useEffect } from 'react';

// Components
import { StyleSheet, View, Text, TouchableOpacity, Button, TextInput, Vibration } from 'react-native';
//import { Form, Item, Label, Input } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup'

// Functions
import { AsyncSetSessionToken } from '../../../functions/GlobalFunctions';

export default function FormContainer() {
    const [formulario, setFormulario] = useState('Login');
    const [formTitle, setFormTitle] = useState('Iniciar sesión');
    //const location = useLocation();
    //console.log(location);

    function changeForm(typeForm) {
        Vibration.vibrate(20);
        setFormulario(typeForm);
    }

    const navigation = useNavigation();

    const formActions = {
        navigation: navigation,
        changeForm: changeForm,
        setFormTitle: setFormTitle
    }

    return (
        <View style={styles.formContainer}>
            <View style={styles.formContent}>
                <View>
                    <Text style={styles.brand}>Mino</Text>
                    <Text style={styles.formTitle}>{formTitle}</Text>
                </View>
                {
                    formulario === 'Login' ? (
                        <>
                            <LoginForm formActions={formActions} />
                        </>
                    ) : formulario === 'Register' ? (
                        <RegisterForm formActions={formActions} />
                    ) : <Text>Nada</Text>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        width: '80%',
        minHeight: 500,
        maxHeight: 600,
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
        fontFamily: 'Nunito-Bold',
    },
    inputLabelUnactive: {
        position: 'absolute',
        top: -20,
        fontSize: 16,
        color: '#888a91',
        fontFamily: 'Nunito-Bold',
    },
    formInput: {
        width: '100%',
        height: 40,
        borderBottomColor: '#888a91',
        borderBottomWidth: 1,
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
    passwordContainer: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    formInputPassword: {
        width: '90%',
        height: 40,
        borderBottomColor: '#888a91',
        borderBottomWidth: 1,
        fontSize: 18,
        fontFamily: 'Nunito-Regular',
        color: '#212529',
    },
    formInputPasswordActive: {
        width: '90%',
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
        color: '#e81f37',
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
        fontFamily: 'Nunito-Bold',
        color: '#888a91',
        fontSize: 15,
    },
    lastMessageBtn: {
        marginLeft: 5,
        fontFamily: 'Nunito-Bold',
        color: '#ffc000',
        fontSize: 15,
    },
});

const LoginForm = ({ formActions }) => {
    const [emailActive, setEmailActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const logIn = (values) => {
        Vibration.vibrate(20);
        console.log(values)
        AsyncSetSessionToken("patata");
        formActions.navigation.navigate('ApplicationContent');
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

    useEffect(() => {
        formActions.setFormTitle('Iniciar sesión')
    }, [formActions])

    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, { resetForm }) => {
                    logIn(values)
                    resetForm({ email: '', password: '' })
                }}
                validationSchema={loginValidationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, isValid, }) => (
                    <View style={styles.inputsContainer}>
                        <View style={[styles.inputContainer]}>
                            <Text style={values.email.length > 0 ? emailActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel}>Email</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={() => { handleBlur('email'), setEmailActive(false), setFieldTouched('email') }}
                                onPressIn={() => { setEmailActive(true) }}
                                textContentType='emailAddress'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='email'
                                value={values.email.trim()}
                                style={[emailActive ? styles.formInputActive : styles.formInput, errors.email && touched.email ? { color: "#e81f37" } : null]}
                            />
                            {(errors.email && touched.email && errors.email != "a") &&
                                <Text style={styles.errorText}>{errors.email}</Text>
                            }
                        </View>
                        <View style={[styles.inputContainer, { marginTop: 50 }]}>
                            <Text style={values.password.length > 0 ? passwordActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel}>Contraseña</Text>
                            <View style={[styles.passwordContainer]}>
                                <TextInput
                                    secureTextEntry={!passwordVisible ? true : false}
                                    onChangeText={handleChange('password')}
                                    onBlur={() => { handleBlur('password'), setPasswordActive(false), setFieldTouched('password') }}
                                    onPressIn={() => { setPasswordActive(true) }}
                                    value={values.password.trim()}
                                    style={passwordActive ? styles.formInputPasswordActive : styles.formInputPassword}
                                />
                                <Ionicons
                                    style={[passwordActive ? { borderBottomColor: '#ffc000' } : { borderBottomColor: '#888a91' }, { borderBottomWidth: 1, height: 40, width: 30, paddingTop: 7 }]}
                                    name={passwordVisible ? `eye-outline` : `eye-off-outline`}
                                    size={24}
                                    color="#888a91"
                                    onPress={() => {
                                        Vibration.vibrate(20);
                                        setPasswordVisible(!passwordVisible)
                                    }}
                                />
                            </View>
                            {(errors.password && touched.password && errors.password != "a") &&
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
                <TouchableOpacity onPress={() => formActions.changeForm('Register')}>
                    <Text style={styles.lastMessageBtn}>Registrate</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const RegisterForm = ({ formActions }) => {
    const [nameActive, setNameActive] = useState(false);
    const [surnameActive, setSurnameActive] = useState(false);
    const [emailActive, setEmailActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmActive, setPasswordConfirmActive] = useState(false);

    const register = (values) => {
        Vibration.vibrate(20);
        console.log(values)
        AsyncSetSessionToken("patata");
        formActions.navigation.navigate('ApplicationContent');
    }

    /* const handleKeyPress = ({ nativeEvent: { key: keyValue } }) => {
        console.log(keyValue);
        if (keyValue === 'f') {
            return false;
        } else {
            return true;
        }
    }; */

    const registerValidationSchema = yup.object().shape({
        name: yup
            .string()
            .min(2, 'Ingresar un nombre válido')
            .max(20, 'El nombre no puede tener más de 20 caracteres')
            .required('Ingresar un nombre'),
        surname: yup
            .string()
            .min(2, 'Ingresar un apellido válido')
            .max(20, 'El apellido no puede tener más de 20 caracteres')
            .required('Ingresar un apellido'),
        email: yup
            .string()
            .email("Ingresar un correo electrónico válido")
            .required('Ingresar un correo electrónico'),
        password: yup
            .string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .max(20, 'La contraseña no puede tener más de 20 caracteres')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{6,20}$/, 'La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un caracter especial')
            .required('Ingresar una contraseña'),
        passwordConfirm: yup
            .mixed()
            .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
    })

    useEffect(() => {
        formActions.setFormTitle('Registrarse')
    }, [formActions])

    return (
        <>
            <Formik
                initialValues={{ name: '', surname: '', email: '', password: '', passwordConfirm: '' }}
                onSubmit={(values, { resetForm }) => {
                    register(values)
                    resetForm({ name: '', surname: '', email: '', password: '', passwordConfirm: '' })
                }}
                validationSchema={registerValidationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, isValid, }) => (
                    <View style={styles.inputsContainer}>
                        <View style={[styles.inputContainer, { marginTop: 30 }]}>
                            <Text style={values.name.length > 0 ? nameActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel}>Nombre</Text>
                            <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={() => { handleBlur('name'), setNameActive(false), setFieldTouched('name') }}
                                onPressIn={() => { setNameActive(true) }}
                                autoCapitalize='words'
                                value={values.name}
                                style={nameActive ? styles.formInputActive : styles.formInput}
                            />
                            {(errors.name && touched.name) &&
                                <Text style={styles.errorText}>{errors.name}</Text>
                            }
                        </View>
                        <View style={[styles.inputContainer, { marginTop: 30 }]}>
                            <Text style={values.surname.length > 0 ? surnameActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel}>Apellido</Text>
                            <TextInput
                                onChangeText={handleChange('surname')}
                                onBlur={() => { handleBlur('surname'), setSurnameActive(false), setFieldTouched('surname') }}
                                onPressIn={() => { setSurnameActive(true) }}
                                autoCapitalize='words'
                                value={values.surname}
                                style={surnameActive ? styles.formInputActive : styles.formInput}
                            />
                            {(errors.surname && touched.surname) &&
                                <Text style={styles.errorText}>{errors.surname}</Text>
                            }
                        </View>
                        <View style={[styles.inputContainer, { marginTop: 30 }]}>
                            <Text style={values.email.length > 0 ? emailActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel}>Email</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={() => { handleBlur('email'), setEmailActive(false), setFieldTouched('email') }}
                                onPressIn={() => { setEmailActive(true) }}
                                textContentType='emailAddress'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='email'
                                value={values.email.trim()}
                                style={emailActive ? styles.formInputActive : styles.formInput}
                            />
                            {(errors.email && touched.email) &&
                                <Text style={styles.errorText}>{errors.email}</Text>
                            }
                        </View>
                        <View style={[styles.inputContainer, { marginTop: 30 }]}>
                            <Text style={values.password.length > 0 ? passwordActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel}>Contraseña</Text>
                            <View style={[styles.passwordContainer]}>
                                <TextInput
                                    secureTextEntry={!passwordVisible ? true : false}
                                    onChangeText={handleChange('password')}
                                    onBlur={() => { handleBlur('password'), setPasswordActive(false), setFieldTouched('password') }}
                                    onPressIn={() => { setPasswordActive(true) }}
                                    value={values.password.trim()}
                                    style={passwordActive ? styles.formInputPasswordActive : styles.formInputPassword}
                                />
                                <Ionicons
                                    style={[passwordActive ? { borderBottomColor: '#ffc000' } : { borderBottomColor: '#888a91' }, { borderBottomWidth: 1, height: 40, width: 30, paddingTop: 7 }]}
                                    name={passwordVisible ? `eye-outline` : `eye-off-outline`}
                                    size={24}
                                    color="#888a91"
                                    onPress={() => {
                                        Vibration.vibrate(20);
                                        setPasswordVisible(!passwordVisible)
                                    }}
                                />
                            </View>
                            {(errors.password && touched.password && errors.password != "a") &&
                                <Text style={styles.errorText}>{errors.password}</Text>
                            }
                        </View>
                        <View style={[styles.inputContainer, { marginTop: 30 }]}>
                            <Text style={values.passwordConfirm.length > 0 ? passwordConfirmActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel}>Confirmar contraseña</Text>
                            <TextInput
                                secureTextEntry={!passwordVisible ? true : false}
                                onChangeText={handleChange('passwordConfirm')}
                                onBlur={() => { handleBlur('passwordConfirm'), setPasswordConfirmActive(false), setFieldTouched('passwordConfirm') }}
                                onPressIn={() => { setPasswordConfirmActive(true) }}
                                value={values.passwordConfirm.trim()}
                                style={passwordConfirmActive ? styles.formInputActive : styles.formInput}
                            />
                            {(errors.passwordConfirm && touched.passwordConfirm) &&
                                errors.passwordConfirm != "a" &&
                                <Text style={styles.errorText}>{errors.passwordConfirm}</Text>
                            }
                        </View>
                        <TouchableOpacity style={isValid ? styles.submitBtn : styles.submitBtnDisabled} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={styles.submitBtnText}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik >

            <View style={styles.lastMessageContainer}>
                <Text style={styles.lastMessageText}>¿Ya tenés una cuenta?</Text>
                <TouchableOpacity onPress={() => formActions.changeForm('Login')}>
                    <Text style={styles.lastMessageBtn}>Iniciá Sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

