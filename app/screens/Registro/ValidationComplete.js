
import { useState, useEffect, useRef } from 'react';

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
import * as Notifications from 'expo-notifications';

import { auth, firebase } from '../../database/firebase';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        console.log("existingStatus", existingStatus)
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        console.log("finalStatus", finalStatus)
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            showBadge: true,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FE9018',
        });
    }

    return token;
}

export const ValidationComplete = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(async token => {
            setExpoPushToken(token)
            await firebase.firestore().collection('users').doc(auth.currentUser.uid).update({
                expoToken: token
            })
        }).catch(error => {
            console.log(error)
        });
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const { notification: { request: { content: { data: { screen } } } } } = response
            //when the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen 
            if (screen) {
                navigation.navigate("Validacion")
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

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
                            source={require('../../../assets/illustration/mino-calendar.png')}
                        />
                        <View style={styles.messageContainer}>
                            <Text style={styles.screenTitle}>
                                ¡ Eso es todo !
                            </Text>
                            <Text style={styles.screenMessage}>
                                Ahora nos toca a trabajar a nosotros. Vas a recibir una notificación dentro de las próximas 48hs hábiles avisandote cuando esté lista tu cuenta de Mino.
                            </Text>
                        </View>
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