import { useState } from 'react';
import { StyleSheet, Text, View, Icon, TouchableHighlight, Vibration } from 'react-native';

// Components
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AsyncSetSessionToken } from '../../../../functions/GlobalFunctions';

// Styles

export default function Topbar() {
    const [isPress, setIsPress] = useState(false);
    const navigation = useNavigation();

    const logOut = () => {
        Vibration.vibrate(20);
        AsyncSetSessionToken('');
        navigation.navigate('Login');
    }

    return (
        <View style={[styles.navbarContainer, styles.navbarShadow]}>
            <View style={styles.navbarContent}>
                <Text style={styles.navbarBrand}>Mino</Text>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={'#f2f2f2'}
                    style={isPress ? styles.btnPress : styles.btnNormal}
                    onHideUnderlay={() => setIsPress(false)}
                    onShowUnderlay={() => setIsPress(true)}
                    onPress={() => logOut()}
                >
                    <Feather name="log-out" size={24} color="#8f8f8f" />
                </TouchableHighlight>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    navbarShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    navbarContent: {
        width: '100%',
        height: 70,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    navbarBrand: {
        fontSize: 36,
        color: '#ffc000',
        fontFamily: 'RooneySans-Bold',
    },
    navbarMenu: {
        marginRight: 20,
    },
    btnNormal: {
        borderRadius: 10,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnPress: {
        borderRadius: 10,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
