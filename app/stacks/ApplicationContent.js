import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Screens
import Home from '../screens/Home';
import Settings from '../screens/Settings';

// Components
import Topbar from '../shared/components/Navigation/Navbar/Topbar';
import Bottombar from '../shared/components/Navigation/Navbar/Bottombar';

const Tab = createMaterialTopTabNavigator();

export default function ApplicationContent() {
    const [fontsLoaded] = useFonts({
        /* 'RooneySans-Light': require('./assets/fonts/rooneysans/RooneySansLight.woff'),
        'RooneySans': require('./assets/fonts/rooneysans/RooneySansRegular.woff'),
        'RooneySans-Medium': require('./assets/fonts/rooneysans/RooneySansMedium.woff'),*/
        'RooneySans-Bold': require('../../assets/fonts/rooneysans/RooneySans-Bold.ttf'),
        /* 'RooneySans-Black': require('./assets/fonts/rooneysans/RooneySansBlk.woff'),  */
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <NavigationContainer>
                <Topbar />
                <Tab.Navigator initialRouteName="Home" tabBarPosition="bottom">
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Settings" component={Settings} />
                </Tab.Navigator>
                <Bottombar />
            </NavigationContainer>
        );
    }
}
