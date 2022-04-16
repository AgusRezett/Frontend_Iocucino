import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Components
import { useNavigation } from '@react-navigation/native';
import { AsyncSetSessionToken } from '../functions/GlobalFunctions';
import FormContainer from '../shared/components/login/FormContainer';

export default function Login() {
    const navigation = useNavigation();

    return (
        <View style={styles.loginView}>
            <FormContainer />
        </View>
    )
}

const styles = StyleSheet.create({
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
});