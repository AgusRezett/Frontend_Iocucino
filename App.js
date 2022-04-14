/* import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'; */

/* import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native'; */

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Stacks
import ApplicationContent from './app/stacks/ApplicationContent';

// Hooks
import { LangProvider } from './app/hooks/useContext/LangContext';

export default function App() {
    const [fontsLoaded] = useFonts({
        /* 'RooneySans-Light': require('./assets/fonts/rooneysans/RooneySansLight.woff'),
        'RooneySans': require('./assets/fonts/rooneysans/RooneySansRegular.woff'),
        'RooneySans-Medium': require('./assets/fonts/rooneysans/RooneySansMedium.woff'),*/
        'RooneySans-Bold': require('./assets/fonts/rooneysans/RooneySans-Bold.ttf'),
        /* 'RooneySans-Black': require('./assets/fonts/rooneysans/RooneySansBlk.woff'),  */
        'Nunito-Regular': require('./assets/fonts/nunito/Nunito-Regular.ttf'),
        'Nunito-Bold': require('./assets/fonts/nunito/Nunito-Bold.ttf'),
        'Nunito-ExtraBold': require('./assets/fonts/nunito/Nunito-ExtraBold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <>
                <LangProvider>
                    <ApplicationContent />
                </LangProvider>
            </>
        );
    }
}
