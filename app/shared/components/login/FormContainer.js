import { useEffect, useState, useRef } from 'react';

// Components
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Vibration, Animated } from 'react-native';
//import { Form, Item, Label, Input } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup'

// Functions
import { AsyncSetSessionToken } from '../../../functions/GlobalFunctions';

export const LoginForm = ({ navigation }) => {
    const [emailActive, setEmailActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const topEmailAnim = useRef(new Animated.Value(8)).current;
    const topPasswordAnim = useRef(new Animated.Value(8)).current;
    const moveUp = (type) => {
        let anim = type === 'email' ? topEmailAnim : topPasswordAnim;
        Animated.timing(anim, {
            toValue: -20,
            duration: 200,
            useNativeDriver: false
        }).start();
    }
    const moveDown = (type) => {
        let anim = type === 'email' ? topEmailAnim : topPasswordAnim;
        Animated.timing(anim, {
            toValue: 8,
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    const logIn = (values) => {
        Vibration.vibrate(20);
        console.log(values)
        AsyncSetSessionToken("patata");
        navigation.navigate('ApplicationContent');
    }

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
        <View style={styles.loginView}>
            <View style={styles.formContainer}>
                <View style={styles.formContent}>
                    <View>
                        <Text style={styles.brand}>Mino</Text>
                        <Text style={styles.formTitle}>Iniciar sesion</Text>
                    </View>
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
                                <View style={styles.inputContainer}>
                                    <Animated.Text style={[
                                        values.email.length > 0 ? emailActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel,
                                        { top: topEmailAnim }
                                    ]}
                                    >
                                        Email
                                    </Animated.Text>
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        onBlur={() => { handleBlur('email'), setEmailActive(false), setFieldTouched('email'), values.email.length <= 0 ? moveDown('email') : moveUp('email') }}
                                        onPressIn={() => { setEmailActive(true), moveUp('email') }}
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
                                <View style={[styles.inputContainer]}>
                                    <Animated.Text
                                        style={[
                                            values.password.length > 0 ? passwordActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel,
                                            { top: topPasswordAnim }
                                        ]}
                                    >
                                        Contraseña
                                    </Animated.Text>
                                    <View style={[styles.passwordContainer]}>
                                        <TextInput
                                            secureTextEntry={!passwordVisible ? true : false}
                                            onChangeText={handleChange('password')}
                                            onBlur={() => { handleBlur('password'), setPasswordActive(false), setFieldTouched('password'), values.password.length <= 0 ? moveDown('password') : moveUp('password') }}
                                            onPressIn={() => { setPasswordActive(true), moveUp("password") }}
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
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterForm')}>
                            <Text style={styles.lastMessageBtn}>Registrate</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export const RegisterForm = ({ navigation }) => {
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
        navigation.navigate('ApplicationContent');
    }

    const topNameAnim = useRef(new Animated.Value(8)).current;
    const topSurnameAnim = useRef(new Animated.Value(8)).current;
    const topEmailAnim = useRef(new Animated.Value(8)).current;
    const topPasswordAnim = useRef(new Animated.Value(8)).current;
    const topPasswordConfirmAnim = useRef(new Animated.Value(8)).current;

    const moveUp = (type) => {
        let anim;
        switch (type) {
            case 'name':
                anim = topNameAnim;
                break
            case 'surname':
                anim = topSurnameAnim;
                break
            case 'email':
                anim = topEmailAnim;
                break
            case 'password':
                anim = topPasswordAnim;
                break
            case 'passwordConfirm':
                anim = topPasswordConfirmAnim;
                break
            default:
                break;
        }

        Animated.timing(anim, {
            toValue: -20,
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    const moveDown = (type) => {
        let anim;
        switch (type) {
            case 'name':
                anim = topNameAnim;
                break
            case 'surname':
                anim = topSurnameAnim;
                break
            case 'email':
                anim = topEmailAnim;
                break
            case 'password':
                anim = topPasswordAnim;
                break
            case 'passwordConfirm':
                anim = topPasswordConfirmAnim;
                break
            default:
                break;
        }
        Animated.timing(anim, {
            toValue: 8,
            duration: 200,
            useNativeDriver: false
        }).start();
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

    const labelStyles = (label, value, active, error, touched) => {
        let anim;
        switch (label) {
            case 'name':
                anim = topNameAnim;
                break
            case 'surname':
                anim = topSurnameAnim;
                break
            case 'email':
                anim = topEmailAnim;
                break
            case 'password':
                anim = topPasswordAnim;
                break
            case 'passwordConfirm':
                anim = topPasswordConfirmAnim;
                break
            default:
                break;
        }

        return [{
            position: 'absolute',
            fontSize: value.length <= 0 ? active ? 16 : 18 : 16,
            color: active ? '#ffc000' : error && value.length > 0 ? '#e81f37' : touched && value.length > 0 ? '#0ec45a' : '#888a91',
            //color: active ? '#ffc000' : '#888a91',
            fontFamily: active || value.length > 0 ? 'Nunito-Bold' : 'Nunito-Regular',
        }, {
            top: anim,
        }]
    }

    const inputStyles = (active) => {
        return [{
            width: '100%',
            height: 40,
            borderBottomColor: active ? '#ffc000' : '#888a91',
            borderBottomWidth: 1,
            fontSize: 18,
            fontFamily: 'Nunito-Regular',
            color: "#212529",
        }]
    }

    const blurInput = (label, value) => {
        switch (label) {
            case 'name':
                setNameActive(false)
                value.length <= 0 ? moveDown('name') : moveUp('name')
                break;
            case 'surname':
                setSurnameActive(false)
                value.length <= 0 ? moveDown('surname') : moveUp('surname')
                break;
            case 'email':
                setEmailActive(false)
                value.length <= 0 ? moveDown('email') : moveUp('email')
                break;
            case 'password':
                setPasswordActive(false)
                value.length <= 0 ? moveDown('password') : moveUp('password')
                break;
            case 'passwordConfirm':
                setPasswordConfirmActive(false)
                value.length <= 0 ? moveDown('passwordConfirm') : moveUp('passwordConfirm')
                break;
            default:
                break;
        }
    }

    return (
        <View style={styles.loginView} >
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
                        <Text style={styles.brand}>Mino</Text>
                        <Text style={styles.formTitle}>Crear cuenta</Text>
                    </View>
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
                                <View style={[styles.inputContainer]}>
                                    <Animated.Text style={labelStyles("name", values.name, nameActive, errors.name, touched.name)}>Nombre</Animated.Text>
                                    <TextInput
                                        onChangeText={handleChange('name')}
                                        onBlur={() => { handleBlur('name'), setFieldTouched('name'), blurInput("name", values.name) }}
                                        onPressIn={() => { setNameActive(true), moveUp('name') }}
                                        autoCapitalize='words'
                                        value={values.name}
                                        style={inputStyles(nameActive, errors.name && touched.name)}
                                    />
                                    {(errors.name && touched.name) &&
                                        <Text style={styles.errorText}>{errors.name}</Text>
                                    }
                                </View>
                                <View style={[styles.inputContainer]}>
                                    <Animated.Text style={labelStyles("surname", values.surname, surnameActive, errors.surname, touched.surname)}>Apellido</Animated.Text>
                                    <TextInput
                                        onChangeText={handleChange('surname')}
                                        onBlur={() => { handleBlur('surname'), setFieldTouched('surname'), blurInput("surname", values.surname) }}
                                        onPressIn={() => { setSurnameActive(true), moveUp('surname') }}
                                        autoCapitalize='words'
                                        value={values.surname}
                                        style={inputStyles(surnameActive, errors.surname && touched.surname)}
                                    />
                                    {(errors.surname && touched.surname) &&
                                        <Text style={styles.errorText}>{errors.surname}</Text>
                                    }
                                </View>
                                <View style={[styles.inputContainer]}>
                                    <Animated.Text style={labelStyles("email", values.email, emailActive, errors.email, touched.email)}>Correo electrónico</Animated.Text>
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        onBlur={() => { handleBlur('email'), setFieldTouched('email'), blurInput("email", values.email) }}
                                        onPressIn={() => { setEmailActive(true), moveUp('email') }}
                                        textContentType='emailAddress'
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        autoCompleteType='email'
                                        value={values.email.trim()}
                                        style={inputStyles(emailActive, errors.email && touched.email)}
                                    />
                                    {(errors.email && touched.email) &&
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    }
                                </View>
                                <View style={[styles.inputContainer]}>
                                    <Animated.Text style={labelStyles("password", values.password, passwordActive, errors.password, touched.password)}>Contraseña</Animated.Text>
                                    <View style={[styles.passwordContainer]}>
                                        <TextInput
                                            secureTextEntry={!passwordVisible ? true : false}
                                            onChangeText={handleChange('password')}
                                            onBlur={() => { handleBlur('password'), setFieldTouched('password'), blurInput("password", values.password) }}
                                            onPressIn={() => { setPasswordActive(true), moveUp('password') }}
                                            value={values.password.trim()}
                                            style={[passwordActive ? styles.formInputPasswordActive : styles.formInputPassword, errors.password && touched.password ? { color: "#e81f37" } : null]}
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
                                <View style={[styles.inputContainer]}>
                                    <Animated.Text style={labelStyles("passwordConfirm", values.passwordConfirm, passwordConfirmActive, errors.passwordConfirm, touched.passwordConfirm)}>Confirmar contraseña</Animated.Text>
                                    <TextInput
                                        secureTextEntry={!passwordVisible ? true : false}
                                        onChangeText={handleChange('passwordConfirm')}
                                        onBlur={() => { handleBlur('passwordConfirm'), setFieldTouched('passwordConfirm'), blurInput("passwordConfirm", values.passwordConfirm) }}
                                        onPressIn={() => { setPasswordConfirmActive(true), moveUp('passwordConfirm') }}
                                        value={values.passwordConfirm.trim()}
                                        style={inputStyles(passwordConfirmActive, errors.passwordConfirm && touched.passwordConfirm)}
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
                        <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
                            <Text style={styles.lastMessageBtn}>Iniciá Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: -50,
        left: 0,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginView: {
        width: '100%',
        height: "100%",
        backgroundColor: '#fefcff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
    },
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
        marginTop: 40,
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
        position: 'absolute',
        top: 40,
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