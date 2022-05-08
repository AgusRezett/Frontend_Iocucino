import { useState, useRef } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
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

export const Register2 = ({ navigation, route }) => {
    const { userValues } = route.params;
    const [dniActive, setDniActive] = useState(false);

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
        userValues.dni = values.dni;
        userValues.gender = values.gender
        navigation.navigate('Register3', {
            userValues: userValues
        });
    }

    const loginValidationSchema = yup.object().shape({
        dni: yup
            .number()
            .positive()
            .required('Campo requerido'),
        gender: yup
            .string()
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
                        <Text style={{ ...styles.formTitle, fontSize: 26 }}>¡Hola!</Text>
                        <Text style={styles.formTitleAdditional}>Comencemos por algunos datos tuyos</Text>
                    </View>
                    <Formik
                        initialValues={{ dni: '', gender: '' }}
                        onSubmit={(values, { resetForm }) => {
                            submitForm(values)
                        }}
                        validationSchema={loginValidationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, setFieldValue, isValid, }) => (
                            <View style={styles.inputsContainer}>
                                <View style={{ width: '100%' }}>
                                    <View style={styles.inputContainer}>
                                        <Animated.Text style={[
                                            values.dni.length > 0 ? dniActive ? styles.inputLabelActive : styles.inputLabelUnactive : styles.inputLabel,
                                            { top: topEmailAnim }
                                        ]}
                                        >
                                            Dni
                                        </Animated.Text>
                                        <TextInput
                                            onChangeText={handleChange('dni')}
                                            onBlur={() => { handleBlur('dni'), setDniActive(false), setFieldTouched('dni'), values.dni.length <= 0 ? moveDown('dni') : moveUp('dni') }}
                                            onPressIn={() => { setDniActive(true), moveUp('dni') }}
                                            keyboardType='number-pad'
                                            autoCapitalize='none'
                                            maxLength={8}
                                            value={values.dni.trim()}
                                            style={[dniActive ? styles.formInputActive : styles.formInput, errors.dni && touched.dni ? { color: "#e81f37" } : null]}
                                        />
                                        {(errors.dni && touched.dni) &&
                                            <Text style={styles.errorText}>{errors.dni}</Text>
                                        }
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.genderTitle}>Sexo</Text>
                                        <RadioButton.Group
                                            onValueChange={handleChange('gender')}
                                            value={values.gender}
                                        >
                                            <View style={styles.inputRadioContainer}>
                                                <RadioButton
                                                    value='m'
                                                    color="#ffc000"
                                                    onValueChange={() => setFieldValue('gender')}
                                                />
                                                <Text style={styles.radioBtnText}>Masculino</Text>
                                            </View>
                                            <View style={styles.inputRadioContainer}>
                                                <RadioButton
                                                    value='f'
                                                    color="#ffc000"
                                                    onValueChange={() => setFieldValue('gender')}
                                                />
                                                <Text style={styles.radioBtnText}>Femenino</Text>
                                            </View>
                                        </RadioButton.Group>
                                        {(errors.gender && touched.gender && errors.gender != "b") &&
                                            <Text style={styles.errorText}>{errors.dni}</Text>
                                        }
                                    </View>
                                </View>
                                <TouchableOpacity style={isValid ? styles.submitBtn : styles.submitBtnDisabled} onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={styles.submitBtnText}>Siguiente</Text>
                                </TouchableOpacity>
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
    inputContainer: {
        width: '100%',
        height: 'auto',
        marginTop: 40,
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
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    radioBtnText: {
        fontFamily: 'Nunito-Regular',
        color: "#787878",
        fontSize: 18,
        marginLeft: 5,
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