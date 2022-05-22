
import {
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

export const ValidationWaiting = ({ navigation }) => {
    const continueValidation = async () => {
        Vibration.vibrate(20);
        navigation.navigate('Validation');
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
                            source={require('../../../assets/illustration/mino-waiting.png')}
                        />
                        <View style={styles.messageContainer}>
                            <Text style={styles.screenTitle}>
                                Tomate tu tiempo...
                            </Text>
                            <Text style={styles.screenMessage}>
                                Cuando estés list@ presioná el botón para continuar con el proceso de validación y terminar la verficiación de tu cuenta Mino.
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity
                            style={loginStack.submitBtn}
                            onPress={() => {
                                Vibration.vibrate(20);
                                continueValidation();
                            }}
                        >
                            <Text style={loginStack.submitBtnText}>Continuar</Text>
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