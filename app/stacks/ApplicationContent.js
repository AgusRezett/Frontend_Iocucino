
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Screens
import Home from '../screens/Home';
import Wallets from '../screens/Wallets';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import NewWallet1 from '../screens/NewWallet/NewWallet1';
import WalletDetails from '../screens/WalletDetails';

// Components
import { TouchableOpacity, Vibration, View } from 'react-native';
import Topbar from '../shared/components/Navigation/Navbar/Topbar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import HomeIcon from '../../assets/icons/home.svg';
import WalletIcon from '../../assets/icons/wallet.svg';
import SettingsIcon from '../../assets/icons/config.svg';
import ProfileIcon from '../../assets/icons/profile.svg';

// Database
import { getUserData } from '../database/requests';
import { useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();

export default function ApplicationContent({ navigation, route }) {
    const { userData } = route.params;
    /*  const userData = {
         country: '54',
         document: '44749102',
         expoToken: 'ExponentPushToken[BAkxroLmgv26UHENhVXseQ]',
         gender: 'm',
         name: 'Agustin',
         surname: 'Rezett',
         phone: '1121707490',
         photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhmHxifKgQDKlrbYqv1aeKsTjXqmI8qvCEkTFcL=s83-c-mo',
         status: {
             account: 'verified',
             email: 'unverified',
             phone: 'unverified'
         }
     } */

    const [fontsLoaded] = useFonts({
        /* 'RooneySans-Light': require('./assets/fonts/rooneysans/RooneySansLight.woff'),
        'RooneySans': require('./assets/fonts/rooneysans/RooneySansRegular.woff'),
        'RooneySans-Medium': require('./assets/fonts/rooneysans/RooneySansMedium.woff'),*/
        'RooneySans-Bold': require('../../assets/fonts/rooneysans/RooneySans-Bold.ttf'),
        /* 'RooneySans-Black': require('./assets/fonts/rooneysans/RooneySansBlk.woff'),  */
        'Nunito-Regular': require('../../assets/fonts/nunito/Nunito-Regular.ttf'),
        'Nunito-SemiBold': require('../../assets/fonts/nunito/Nunito-SemiBold.ttf'),
        'Nunito-Bold': require('../../assets/fonts/nunito/Nunito-Bold.ttf'),
    });

    const TabIcon = ({ routeName, focused, Icon }) => {
        return (
            <TouchableOpacity onPress={() => {
                Vibration.vibrate(10);
                navigation.navigate(routeName)
            }}>
                <View
                    style={{
                        width: 55,
                        height: 45,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: focused ? '#3D0052' : '#f5f5f5',
                        borderRadius: 10,
                    }}
                >
                    <Icon width={25} height={25} fill={focused ? '#ffc000' : '#4E4E4E'} />
                </View>
            </TouchableOpacity>
        )
    };

    if (!fontsLoaded || !userData) {
        return <AppLoading />;
    } else {
        return (
            <>
                <Topbar />
                <Tab.Navigator
                    initialRouteName="home"
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: '#fff',
                            position: 'absolute',
                            bottom: 20,
                            left: 0,
                            marginHorizontal: 20,
                            paddingHorizontal: 15,
                            height: 75,
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: 10,
                            shadowColor: '#bfbfbf',
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            borderTopWidth: 0,
                        },
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={Home}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <TabIcon routeName={'Home'} focused={focused} Icon={HomeIcon}></TabIcon>
                            ),
                        }} />
                    <Tab.Screen
                        name="Wallets"
                        component={Wallets}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <TabIcon routeName={'Wallets'} focused={focused} Icon={WalletIcon}></TabIcon>
                            ),
                        }} />
                    <Tab.Screen
                        name="NewWallet1"
                        component={NewWallet1}
                        options={{ tabBarItemStyle: { display: 'none', } }}
                    />
                    <Tab.Screen
                        name="WalletDetails"
                        component={WalletDetails}
                        options={{ tabBarItemStyle: { display: 'none', } }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <TabIcon routeName={'Settings'} focused={focused} Icon={SettingsIcon}></TabIcon>
                            ),
                        }} />
                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        initialParams={{ user: userData }}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <TabIcon routeName={'Profile'} focused={focused} Icon={ProfileIcon}></TabIcon>
                            ),
                        }} />
                </Tab.Navigator>
            </>
        );
    }
}
