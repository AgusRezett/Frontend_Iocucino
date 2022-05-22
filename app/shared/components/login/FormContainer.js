import { useEffect, useState, useRef } from 'react';

// Components
import { View, Text, TouchableOpacity, TextInput, Vibration, Animated, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup'

// Functions

// Styles
import { loginStack } from '../../styles/loginStack';
import { logo, status, text } from '../../styles/colors';

// Database
import { getDbConnection, loginDatabase } from '../../../database';
import { auth } from '../../../database/firebase';
import { getUserData } from '../../../database/requests';

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

    const submitForm = async (values) => {
        Vibration.vibrate(20);
        try {
            auth.signInWithEmailAndPassword(values.email, values.password);
        } catch (error) {
            console.log("Hubo un error");
        }
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

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                getUserData().then(
                    (userData) => {
                        switch (userData.status.account) {
                            case "created":
                                navigation.navigate('Validation');
                                break;
                            case "unverified":
                                navigation.navigate('ValidationComplete');
                                break;
                            case "verified":
                                navigation.navigate('ApplicationContent');
                                break;
                            default:
                                break;
                        }
                    }
                );
            }
        });

        return () => {
            unsuscribe();
        }
    }, [navigation]);

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
                        <Text style={loginStack.brand}>Mino</Text>
                        <Text style={loginStack.formTitle}>Iniciar sesion</Text>
                    </View>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values, { resetForm }) => {
                            submitForm(values)
                            //resetForm({ email: '', password: '' })
                        }}
                        validationSchema={loginValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, isValid, }) => (
                            <>
                                <View style={loginStack.inputsContainer}>
                                    <View style={loginStack.inputContainer}>
                                        <Animated.Text style={[
                                            values.email.length > 0 ? emailActive ? loginStack.inputLabelActive : loginStack.inputLabelUnactive : loginStack.inputLabel,
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
                                            style={[emailActive ? loginStack.formInputActive : loginStack.formInput, errors.email && touched.email ? { color: status.error } : null]}
                                        />
                                        {(errors.email && touched.email && errors.email != "a") &&
                                            <Text style={loginStack.errorText}>{errors.email}</Text>
                                        }
                                    </View>
                                    <View style={[loginStack.inputContainer]}>
                                        <Animated.Text
                                            style={[
                                                values.password.length > 0 ? passwordActive ? loginStack.inputLabelActive : loginStack.inputLabelUnactive : loginStack.inputLabel,
                                                { top: topPasswordAnim }
                                            ]}
                                        >
                                            Contraseña
                                        </Animated.Text>
                                        <View style={[loginStack.passwordContainer]}>
                                            <TextInput
                                                secureTextEntry={!passwordVisible ? true : false}
                                                onChangeText={handleChange('password')}
                                                onBlur={() => { handleBlur('password'), setPasswordActive(false), setFieldTouched('password'), values.password.length <= 0 ? moveDown('password') : moveUp('password') }}
                                                onPressIn={() => { setPasswordActive(true), moveUp("password") }}
                                                value={values.password.trim()}
                                                style={passwordActive ? loginStack.formInputPasswordActive : loginStack.formInputPassword}
                                            />
                                            <Ionicons
                                                style={[passwordActive ? { borderBottomColor: logo.orange } : { borderBottomColor: text.placeholder }, { borderBottomWidth: 1, height: 40, width: 30, paddingTop: 7 }]}
                                                name={passwordVisible ? `eye-outline` : `eye-off-outline`}
                                                size={24}
                                                color={text.placeholder}
                                                onPress={() => {
                                                    Vibration.vibrate(20);
                                                    setPasswordVisible(!passwordVisible)
                                                }}
                                            />
                                        </View>
                                        {(errors.password && touched.password && errors.password != "a") &&
                                            <Text style={loginStack.errorText}>{errors.password}</Text>
                                        }
                                    </View>
                                </View>
                                <TouchableOpacity style={isValid ? loginStack.submitBtn : loginStack.submitBtnDisabled} onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={loginStack.submitBtnText}>Ingresar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik >
                    <View style={loginStack.lastMessageContainer}>
                        <Text style={loginStack.lastMessageText}>¿Aún no tenés una cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterForm')}>
                            <Text style={loginStack.lastMessageBtn}>Registrate</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export const RegisterForm = ({ navigation }) => {
    const [nameActive, setNameActive] = useState(false);
    const [surnameActive, setSurnameActive] = useState(false);
    const [emailActive, setEmailActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmActive, setPasswordConfirmActive] = useState(false);

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

    const submitForm = (values) => {
        Vibration.vibrate(20);
        navigation.navigate('Register2', {
            userValues: values
        });
    }

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
            color: active ? logo.orange : error && value.length > 0 ? status.error : touched && value.length > 0 ? status.success : text.placeholder,
            //color: active ? logo.orange : text.principal,
            fontFamily: active || value.length > 0 ? 'Nunito-Bold' : 'Nunito-Regular',
        }, {
            top: anim,
        }]
    }

    const inputStyles = (active) => {
        return [{
            width: '100%',
            height: 40,
            borderBottomColor: active ? logo.orange : text.placeholder,
            borderBottomWidth: 1,
            fontSize: 18,
            fontFamily: 'Nunito-Regular',
            color: text.principal,
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
                        <Text style={loginStack.brand}>Mino</Text>
                        <Text style={loginStack.formTitle}>Crear cuenta</Text>
                    </View>
                    <Formik
                        initialValues={{ name: '', surname: '', email: '', password: '', passwordConfirm: '' }}
                        onSubmit={(values, { resetForm }) => {
                            submitForm(values)
                        }}
                        validationSchema={registerValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, isValid, }) => (
                            <View style={loginStack.inputsContainer}>
                                <View style={[loginStack.inputContainer]}>
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
                                        <Text style={loginStack.errorText}>{errors.name}</Text>
                                    }
                                </View>
                                <View style={[loginStack.inputContainer]}>
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
                                        <Text style={loginStack.errorText}>{errors.surname}</Text>
                                    }
                                </View>
                                <View style={[loginStack.inputContainer]}>
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
                                        <Text style={loginStack.errorText}>{errors.email}</Text>
                                    }
                                </View>
                                <View style={[loginStack.inputContainer]}>
                                    <Animated.Text style={labelStyles("password", values.password, passwordActive, errors.password, touched.password)}>Contraseña</Animated.Text>
                                    <View style={[loginStack.passwordContainer]}>
                                        <TextInput
                                            secureTextEntry={!passwordVisible ? true : false}
                                            onChangeText={handleChange('password')}
                                            onBlur={() => { handleBlur('password'), setFieldTouched('password'), blurInput("password", values.password) }}
                                            onPressIn={() => { setPasswordActive(true), moveUp('password') }}
                                            value={values.password.trim()}
                                            style={inputStyles(passwordActive, errors.password && touched.password)}
                                        />
                                        <Ionicons
                                            style={[passwordActive ? { borderBottomColor: logo.orange } : { borderBottomColor: text.placeholder }, { borderBottomWidth: 1, height: 40, width: 30, paddingTop: 7 }]}
                                            name={passwordVisible ? `eye-outline` : `eye-off-outline`}
                                            size={24}
                                            color={text.placeholder}
                                            onPress={() => {
                                                Vibration.vibrate(20);
                                                setPasswordVisible(!passwordVisible)
                                            }}
                                        />
                                    </View>
                                    {(errors.password && touched.password && errors.password != "a") &&
                                        <Text style={loginStack.errorText}>{errors.password}</Text>
                                    }
                                </View>
                                <View style={[loginStack.inputContainer]}>
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
                                        <Text style={loginStack.errorText}>{errors.passwordConfirm}</Text>
                                    }
                                </View>
                                <TouchableOpacity style={isValid ? loginStack.submitBtn : loginStack.submitBtnDisabled} onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={loginStack.submitBtnText}>Siguiente</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik >

                    <View style={loginStack.lastMessageContainer}>
                        <Text style={loginStack.lastMessageText}>¿Ya tenés una cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
                            <Text style={loginStack.lastMessageBtn}>Iniciá Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );
}

