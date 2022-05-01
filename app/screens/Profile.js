import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Vibration } from 'react-native';

// Components
import ProfileImage from '../../assets/images/profile.jpg';
import Verified from '../../assets/images/verified.svg';
import { ActionButton } from '../shared/components/common/ActionButton';

import { useNavigation } from '@react-navigation/native';
import { AsyncSetSessionToken } from '../functions/GlobalFunctions';

// Styles

// Funtions
//import { getSelectedBadges } from '../functions/HomeFunctions';

// Icons
import ClapHandsIcon from '../../assets/icons/clapping-hands.svg';
import LogOutIcon from '../../assets/icons/log-out.svg';


export default function Profile() {
    const [isPress, setIsPress] = useState(false);
    const navigation = useNavigation();

    const logOut = () => {
        Vibration.vibrate(20);
        AsyncSetSessionToken('');
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <View style={styles.profilePerson}>
                <Image style={styles.profilePersonImage} source={ProfileImage} />
                <View style={styles.personInfoContainer}>
                    <Text style={styles.profileName}>Agustin Nazareno Rezett</Text>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.profileAttribute}>DNI: </Text>
                        <Text style={styles.profileAttributeValue}>99-999-999</Text>
                    </View>
                </View>
            </View>
            <View style={styles.profileInfo}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.profileAttribute}>Correo: </Text>
                    <Text style={styles.profileAttributeValue}>agustin.rezett@gmail.com</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.profileAttribute}>Teléfono: </Text>
                    <Text style={styles.profileAttributeValue}>+54 9 11 9999-9999</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.profileAttribute}>Contraseña: </Text>
                    <Text style={styles.profileAttributeValue}>**********</Text>
                </View>
            </View>
            <ActionButton title="Solicitar cambios" />
            <View style={styles.profileVerified}>
                <View style={styles.verifiedInfoContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[styles.verifiedFirstMessage, { color: "#C4C4C4" }]}>¡ </Text>
                        <Text style={styles.verifiedFirstMessage}>Genial</Text>
                        <Text style={[styles.verifiedFirstMessage, { color: "#C4C4C4" }]}> !</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[styles.verifiedSecondMessage, { marginRight: 5 }]}>Tu cuenta está verificada</Text>
                        <ClapHandsIcon width="20" height="20" />
                    </View>
                    <Text style={styles.verifiedThirdMessage}>...ya podés disfrutar de la experiencia Mino.</Text>
                </View>
                <Verified style={styles.profilePersonImage} />
            </View>
            <TouchableOpacity
                style={styles.actionContainer}
                onPress={() => logOut()}
                activeOpacity={0.8}
            >
                <LogOutIcon width="24" height="24" fill="#EA596E" strokeWidth="2" />
                <Text style={styles.actionTitle}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#faf9f9',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
    },
    profilePerson: {
        width: '100%',
        height: 100,
        zIndex: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginBottom: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 12,
        shadowColor: '#bfbfbf',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    profilePersonImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    personInfoContainer: {
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    profileName: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        color: '#323232',
        lineHeight: 20,
        marginBottom: 10,
    },
    profileAttribute: {
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        color: '#4E4E4E',
        lineHeight: 20,
    },
    profileAttributeValue: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16,
        color: '#323232',
        lineHeight: 20,
    },
    profileInfo: {
        width: '100%',
        height: 120,
        zIndex: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        shadowColor: '#bfbfbf',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    profileVerified: {
        width: '100%',
        height: 100,
        zIndex: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginBottom: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 50,
        shadowColor: '#bfbfbf',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    verifiedInfoContainer: {
        height: '100%',
        marginRight: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    verifiedFirstMessage: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        color: '#323232',
        lineHeight: 20,
        marginBottom: 10,
    },
    verifiedSecondMessage: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16,
        color: '#4E4E4E',
        lineHeight: 20,
    },
    verifiedThirdMessage: {
        fontFamily: 'Nunito-Regular',
        fontSize: 10,
        color: '#4E4E4E',
        opacity: 0.75,
        lineHeight: 20,
    },
    actionContainer: {
        width: '100%',
        height: 60,
        zIndex: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        shadowColor: '#bfbfbf',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    actionTitle: {
        fontFamily: 'Nunito-Regular',
        fontSize: 18,
        color: '#EA596E',
        lineHeight: 26,
        marginLeft: 15,
    },
});
