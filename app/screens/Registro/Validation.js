
import {
    Alert,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Vibration,
    Keyboard,
    Image
} from 'react-native';

// Components
import { loginStack } from '../../shared/styles/loginStack';
import { text } from '../../shared/styles/colors';
import * as ImagePicker from "expo-image-picker";

// Images
// import Illustration from '../../assets/illustration/security.svg';

export const Validation = ({ navigation }) => {
    const submitForm = async () => {
        Vibration.vibrate(20);

        let permissionResult = null;
        permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permisos denegados", "Debes conceder los permisos a tus fotos para continuar con el proceso.", [{ text: "OK" }]);
            return false;
        } else {
            permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert("Permisos denegados", "Debes conceder los permisos de camara para continuar con el proceso.", [{ text: "OK" }]);
                return false;
            } else {
                navigation.navigate('DocumentValidation');
            }
        }
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
                            source={require('../../../assets/illustration/mino-validating.png')}
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
                                submitForm();
                            }}
                        >
                            <Text style={loginStack.submitBtnText}>Comenzar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => {
                                Vibration.vibrate(20);
                                navigation.navigate('ValidationWaiting');
                            }}
                        >
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
        marginTop: 20,
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