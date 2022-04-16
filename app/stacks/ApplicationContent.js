import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Screens
import Home from '../screens/Home';
import Settings from '../screens/Settings';

// Components
import Topbar from '../shared/components/Navigation/Navbar/Topbar';
import Bottombar from '../shared/components/Navigation/Navbar/Bottombar';

const Tab = createMaterialBottomTabNavigator();

export default function ApplicationContent() {
    const [fontsLoaded] = useFonts({
        /* 'RooneySans-Light': require('./assets/fonts/rooneysans/RooneySansLight.woff'),
        'RooneySans': require('./assets/fonts/rooneysans/RooneySansRegular.woff'),
        'RooneySans-Medium': require('./assets/fonts/rooneysans/RooneySansMedium.woff'),*/
        'RooneySans-Bold': require('../../assets/fonts/rooneysans/RooneySans-Bold.ttf'),
        /* 'RooneySans-Black': require('./assets/fonts/rooneysans/RooneySansBlk.woff'),  */
        'Nunito-Regular': require('../../assets/fonts/nunito/Nunito-Regular.ttf'),
        'Nunito-Bold': require('../../assets/fonts/nunito/Nunito-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <>
                <Topbar />
                <Tab.Navigator
                    initialRouteName="Inicio"
                    tabBarPosition="bottom"
                    // bottombar istabbar and shouls have a key prop
                    // tabBar={(props) => <Bottombar key={props.index} {...props} />}
                    screenOptions={{ headerShown: false }}
                    activeColor="#ffc000"
                    barStyle={{ backgroundColor: '#fff' }}
                >
                    <Tab.Screen
                        name="Inicio"
                        component={Home}
                        options={{
                            tabBarLabel: 'Inicio',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="home" color={color} size={26} />
                            ),
                        }} />
                    <Tab.Screen
                        name="Configuracion"
                        component={Settings}
                        options={{
                            tabBarLabel: 'Configuracion',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="cog" color={color} size={26} />
                            ),
                        }} />
                </Tab.Navigator>
                {/* <Bottombar /> */}
            </>
        );
    }
}
