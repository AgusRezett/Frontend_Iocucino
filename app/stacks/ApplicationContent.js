import { TouchableOpacity, Vibration, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Screens
import Home from '../screens/Home';
import Wallets from '../screens/Wallets';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';

// Components
import Topbar from '../shared/components/Navigation/Navbar/Topbar';

// Icons
import HomeIcon from '../../assets/icons/home.svg';
import WalletIcon from '../../assets/icons/wallet.svg';
import SettingsIcon from '../../assets/icons/config.svg';
import ProfileIcon from '../../assets/icons/profile.svg';

const Tab = createBottomTabNavigator();

export default function ApplicationContent() {
    const navigation = useNavigation();
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

    if (!fontsLoaded) {
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
                    < Tab.Screen
                        name="Wallets"
                        component={Wallets}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <TabIcon routeName={'Wallets'} focused={focused} Icon={WalletIcon}></TabIcon>
                            ),
                        }} />
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
