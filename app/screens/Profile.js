import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Vibration } from 'react-native';

// Components
import ProfileImage from '../../assets/images/profile.jpg';
import Verified from '../../assets/images/verified.svg';
import { ActionButton } from '../shared/components/common/ActionButton';

import { useNavigation } from '@react-navigation/native';

// Styles

// Funtions
//import { getSelectedBadges } from '../functions/HomeFunctions';

// Icons
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ClapHandsIcon from '../../assets/icons/clapping-hands.svg';
import LogOutIcon from '../../assets/icons/log-out.svg';
import { auth } from '../database/firebase';
import { getUserData } from '../database/requests';
import { background, logo, text } from '../shared/styles/colors';


export default function Profile({ route }) {
    const { user } = route.params;
    const navigation = useNavigation();

    const logOut = () => {
        Vibration.vibrate(20);
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.profilePerson}>
                {
                    user.photoURL ?
                        <View style={styles.profileImage}>

                            <Image
                                source={{ uri: user.photoURL }}
                                style={styles.profilePersonImage}
                            />
                        </View>
                        :
                        <View style={styles.profileDefault}>
                            <View style={styles.cameraBtn}>
                                <MaterialIcons name="camera-alt" size={20} color={text.principal} />
                            </View>
                            <Text style={styles.profileDefaultLetter}>{user.name.charAt(0).toUpperCase()}</Text>
                        </View>
                }
                {/* <Image style={styles.profilePersonImage} source={ProfileImage} /> */}
                <View style={styles.personInfoContainer}>
                    <Text style={styles.profileName}>{`${user.name} ${user.surname}`}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.profileAttribute}>DNI: </Text>
                        <Text style={styles.profileAttributeValue}>
                            {user.document.substring(0, 2) + "." + user.document.substring(2, 5) + "." + user.document.substring(5, 8)}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.profileInfo}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.profileAttribute}>Correo: </Text>
                    <Text style={styles.profileAttributeValue}>{auth.currentUser?.email}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.profileAttribute}>Teléfono: </Text>
                    <Text style={styles.profileAttributeValue}>{`+${user.country} ${
                        //format phone
                        user.phone.substring(0, 2) + " " + user.phone.substring(2, 6) + "-" + user.phone.substring(6, 10)
                        }`}</Text>
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
    profileDefault: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: logo.purple,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: background.naviconDisable,
        borderWidth: 5,
    },
    cameraBtn: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: background.naviconDisable,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    profileDefaultLetter: {
        fontSize: 40,
        color: background.secondary,
        fontFamily: 'RooneySans-Bold',
    },
    personInfoContainer: {
        marginLeft: 15,
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
        marginRight: 15,
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
